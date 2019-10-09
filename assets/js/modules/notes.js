class Notes extends BlockControl{

	constructor ({block = document.querySelector('#client_notes'), tpl, clientData, emotions = GlobalVars.emotions}) {
		super(block, 'notes');
		super.initActions();
		this.tpl = tpl;
		this.data = {};
		this.clientData = clientData;
		this.emotions = emotions;
		this.countRowsOnPage = 4;
		if (clientData) this.getDataByClient(this.clientData.clientId);
		this.innerNote = new NotesInner({	block: document.querySelector('#client_notes_inner'), 
											tpl: this.tpl});
		this.__handleActions();
	}

	getDataByClient(clientId){

		let err = (error) => {
					if (Object.keys(error).length !== 0)
						console.log(error);
				},
				ans = (answer) => {
					console.log(answer);
					this.create(answer);
					
				} 

				backendApiRequest([
			    	formAction(
			    	    'getAll',
			    	    'ClientsNotes',
			    	    {clientId: clientId}
			    	)],
			    	{
			    		callbackError: err,
			    		callbackAnswer: ans
			    	});
	}

	create(notes) {

		this.data = notes;

		let optionsAdd = {
		      	valueNames: [	'note-block_client-title', 
		      					'note-block_date', 
		      					'note-block-text', 
		      					{data: ['id'] },
		      					{name: 'note-block_client-photo', attr: 'src'},
		      					{name: 'note-block_client-emotion', attr: 'src'}
		      				],
			    item: 	`<div class="note-block">
							<div class="note-block__head">
								<div class="note-block__head-left-side">
									<img class="note-block_client-photo" block="notes" action="photo" src="http://localhost/hook/assets/img/users/photo-92-3.jpg" alt="">
									<div class="note-block_title-and-date">
										<span class="note-block_client-title">Юлия Барабулько</span>
										<span class="note-block_date">10:15 15.05.19</span>
									</div>
								</div>
								<div class="note-block__head-right-side">
									<img class="note-block_client-emotion" src="http://localhost/hook/assets/img/051-cute.png" alt="">
									<i class="note_block__delete red-trash hidden" action="delete"></i>
								</div>
							</div>
							<div class="note-block__body">
								<span class="note-block-text">Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта.</span>
							</div>
						</div>`,
						pagination: {
							left: 0
						}
		    },
		    values = [];

		for (var key in notes){
			let note = notes[key];
			values.push({
				'note-block_client-photo': GlobalVars.baseUrl+note.img, 
			    'note-block_client-title': note.title, 
			    'note-block_date': note.date, 
			    'note-block-text': note.text,
			    'note-block_client-emotion': GlobalVars.baseUrl+note.emotionImg,
			    id:key 
			})
		};

		if (this.notesList) this.notesList.clear();
		this.notesList = new List('client_notes', optionsAdd, values);	
		
		
		this.notesList.items.forEach((el)=>{this.handleNoteActions(el.elm);})
		this.notesList.page = this.countRowsOnPage;
		this.notesList.update();

		
		if (this.notesList.items.length <= this.countRowsOnPage) this.block.querySelector('.pagination').classList.add('hidden');
		
	}

	__pageFirst(){
		if (this.notesList.size()>this.countRowsOnPage){
			this.notesList.pagination.left = 1;
			this.block.querySelectorAll('.services-list__pagination a')[0].click();
			this.notesList.pagination.left = 0;
		}
	}

	__handleActions(){

		this.block.querySelector('#create').addEventListener('click', (event)=>{
			this.innerNote.clientId = this.clientData.clientId;
			this.innerNote.open();
			this.tpl.changeCondition('creating');
		})

		this.tpl.block.addEventListener('edit',() => {
			if (this.tpl.currentPage=='client-notes') this.tpl.changeCondition('editing');
		});

        this.tpl.block.addEventListener('done',() => {
        	if (this.tpl.currentPage=='client-notes') this.tpl.changeCondition('viewing');
        });

        this.tpl.block.addEventListener('exit',() => {
        	if (this.tpl.currentPage=='client-notes' && !this.innerNote.isOpen){
				if (this.tpl.currentCond!='viewing') this.tpl.changeCondition('viewing');
				this.tpl.close();
			}
        });

		this.tpl.block.addEventListener('close', ()=>{
			if (this.innerNote.isOpen) this.innerNote.close();
		})

		this.tpl.block.addEventListener('conditionChange', (event)=>{
		if (this.tpl.currentPage == 'client-notes'){
			if (event.detail.from == 'viewing' && event.detail.to == 'editing'){
				this.block.querySelectorAll('.note_block__delete').forEach((trash)=>{
					trash.classList.remove("hidden")
				})
				this.block.querySelectorAll('.note-block_client-emotion').forEach((trash)=>{
					trash.classList.add("hidden")
				})
			}

			if (event.detail.from == 'editing' && event.detail.to == 'viewing'){
				this.block.querySelectorAll('.note-block_client-emotion').forEach((trash)=>{
					trash.classList.remove("hidden")
				})
				this.block.querySelectorAll('.note_block__delete').forEach((trash)=>{
					trash.classList.add("hidden")
				})
			}
			
		}});

		this.tpl.block.addEventListener('pageChange', (event)=>{
			if (event.detail.to !== this.tpl.currentPage) this.block.querySelector('#client_notes>.list').innerHTML='';
		})

		this.tpl.block.addEventListener('noteEdited', (ev)=>{

			let id = ev.detail.emotion,
				item = this.notesList.get("id", event.detail.id)[0],
				update = {};

				for (let key in ev.detail){
					switch (key){
						case 'title':
							update['note-block_client-title'] = event.detail.title;
						break;
						case 'text':
							update['note-block-text'] = event.detail.text;
						break;
						case 'date':
							update['note-block_date'] = event.detail.date;
						break;
						case 'emotion':
							let emotion = this.emotions.find(el=>el.id == id);
							update['note-block_client-emotion'] = GlobalVars.baseUrl+emotion.img;
							this.data[ev.detail.id]['emotionImg'] = emotion.img;
						break;
					}
				}
			item.values(update);
			console.log(update)
			for(let key in event.detail){
				this.data[ev.detail.id][key] = ev.detail[key];
			}
		})

		this.tpl.block.addEventListener('noteCreated', (ev)=>{

			this.data[ev.detail.id] = ev.detail;
			let id = ev.detail.emotion,
				emotion = this.emotions.find(el=>el.id == id),
				newItem = this.notesList.add({
					'note-block_client-photo': GlobalVars.baseUrl+ev.detail.img, 
				    'note-block_client-title': ev.detail.title, 
				    'note-block_date': ev.detail.date, 
				    'note-block-text': ev.detail.text,
				    'note-block_client-emotion': GlobalVars.baseUrl+emotion.img,
				    id:ev.detail.id 
				});
			if (this.notesList.size()==this.countRowsOnPage+1) this.block.querySelector('.pagination').classList.remove('hidden');	

			this.data[ev.detail.id]['emotionImg'] = emotion.img;	
			delete this.data[ev.detail.id]['id'];

			this._initSorting();
			this.__pageFirst();

			this.handleNoteActions(newItem[0]['elm']);

			
				console.log(this.data)

			
		})
	}

	_initSorting(){
		this.notesList.sort('note-block_date', {order: "desc"});

		let sortBlock = this.block.querySelector('.services-bar__sort-dropdown'),
			cond = 'z-a',
			upArrow = sortBlock.querySelector('.icon-arrow-up'),
			downArrow = sortBlock.querySelector('.icon-arrow-down');

		sortBlock.addEventListener('click', (ev)=>{
			switch (cond){
				case 'a-z':
					this.notesList.sort('note-block_date', {order: "desc"});
					if (downArrow.classList.contains('hidden')) downArrow.classList.remove('hidden');
					if (!upArrow.classList.contains('hidden')) upArrow.classList.add('hidden');
					cond = 'z-a';
				break;
				case 'z-a':
					this.notesList.sort('note-block_date', {order: "asc"});
					if (upArrow.classList.contains('hidden')) upArrow.classList.remove('hidden');
					if (!downArrow.classList.contains('hidden')) downArrow.classList.add('hidden');
					cond = 'a-z';
				break;
			}
		})
	}

	__deleteNote(id){
		this.notesList.remove('id', id);
		let lastBlock = this.notesList.visibleItems[this.countRowsOnPage-1].elm;
		if (lastBlock) {
			lastBlock.querySelector('.note_block__delete').classList.remove("hidden");
			lastBlock.querySelector('.note-block_client-emotion').classList.add("hidden")
		}
		if (this.notesList.items.length <= this.countRowsOnPage) this.block.querySelector('.pagination').classList.add('hidden');
	}

	handleNoteActions(note){

		note.addEventListener('click', (event) => {			
			if ((event.target.tagName === 'IMG') || 
				(event.target.classList.contains('note-block_client-photo'))) {
				//открывать профиль клиента?
			}
			else {
				if ((event.target.tagName === 'I') && 
					(event.target.classList.contains('note_block__delete'))) {
					
					notie.confirm('Вы хотите удалить эту заметку?', 'Да', 'Нет', () => {

						let el = event.target,
							noteId;
						while(!el.hasAttribute('data-id')) el = el.parentNode;
						noteId = el.getAttribute('data-id');	

						let suc = () => {
							notie.alert(1, GlobalVars.clientLang['success'], 1);
							this.__deleteNote(noteId);						
						},
							error = (error) => {
								notie.alert(2, GlobalVars.clientLang['error'], 2);
								console.log(error);
							}
						backendApiRequest([
							formAction(
									'edit',
									'ClientsNotes',
									{id: noteId, deleted: 1}
								)
							],
							{
								callbackSuccess: suc,
								callbackError: error
							}
						);
					});
				}
				else {

					let el = event.target,
							noteId,
							noteData;
						while(!el.hasAttribute('data-id')) el = el.parentNode;
						noteId = el.getAttribute('data-id');
						noteData = this.data[noteId];
						noteData['id'] = parseInt(noteId); 
							
						this.innerNote.open();
						this.tpl.changeCondition('viewing');
						this.innerNote.viewNote(noteData);						
				}
			}
		});


	}
}