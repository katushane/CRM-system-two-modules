class Notes extends BlockControl{

	constructor ({block = document.querySelector('#client_notes'), tpl, clientData}) {
		super(block);
		this.tpl = tpl;
		this.data = {};
		this.clientData = clientData;
		this.selectNote = undefined;
		if (clientData) this.getDataByClient(this.clientData.clientId);
		this._initInnerNotes();
		this.__handleActions();
	}

	getDataByClient(clientId){

		let err = (error) => {
					if (Object.keys(error).length !== 0)
						console.log(error);
				},
				ans = (answer) => {
					this.create(answer);
					console.log(answer)
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

	_initInnerNotes() {
		let innerN = document.querySelector('#client_notes_inner');
		this.innerNote = new NotesInner({block: innerN, tpl: this.tpl, clientId: this.clientId});
		innerN.addEventListener('changeReady', (event) => {
			let note = event.detail;
			this.innerNote.close();
			for (let key in note) 
				this.selectNote.dataset[key] = note[key];
			if ('text' in note)
				this.selectNote.dataset.text = note.text;
		});

		innerN.addEventListener('closeInnerNote', () => {
			this.innerNote.close();
			this.tpl.endEditing();
		});

		innerN.addEventListener('createReady', (event) => {
			let note = event.detail;
		    this.innerNote.close();
		    for (let key in note)
		    	this.selectNote.dataset[key] = note[key];
		    console.log(this.selectNote.dataset)
		    this.selectNote.dataset.text = note.text;
      		this.selectNote.dataset.id = note.id;
      		this.selectNote.dataset.datenote = moment().format('DD-MM-YYYY');
      		this.selectNote.classList.remove('hidden');
      		this.selectNote = undefined;
      	});

		/*innerN.addEventListener('removeClone', () => {
			this.selectNote.parentElement.removeChild(this.selectNote);
      	});*/	
	};

	__handleActions(){
		this.block.querySelector('#create').addEventListener('click', (event)=>{
			let data = {
                id: 0, //id заметки
                first_name: this.clientData.first_name,
                last_name: this.clientData.last_name,
                img: this.clientData.avatar
            }
            
            this.innerNote.block.querySelector('.innerEdit').classList.add('hidden');
            this.innerNote.block.querySelector('.innerDone').classList.remove('hidden');
            this.innerNote.selectNote = {};

            this.innerNote.open();
            this.innerNote.clientId = this.clientData.clientId;
            this.tpl.changeCondition('editing');
            this.innerNote.add();
            
            let note = this.block.querySelector('article.notesArticle');
            if (note) {
                note = note.parentElement.insertBefore(note.cloneNode(true), note);
                note.classList.add('hidden');
                this.selectNote = note;
                this.bindNeedsEventsOnNote();
                this.createNoteObserver();

                for (let key in data)
                    note.dataset[key] = data[key];
            }
            else {
                note = this.create({
                    0: data
                });
                note.classList.add('hidden');
                this.selectNote = note;
            }
		})

		this.tpl.block.addEventListener('edit',() => {
			if (this.tpl.currentPage=='client-notes'){
				this.tpl.changeCondition('editing');
				this.block.querySelectorAll('.notes_header__delete').forEach((trash)=>{trash.classList.remove("hidden")})
			}
        });

        this.tpl.block.addEventListener('done',() => {
        	if (this.tpl.currentPage=='client-notes'){
				this.tpl.changeCondition('viewing');
				this.block.querySelectorAll('.notes_header__delete').forEach((trash)=>{trash.classList.add("hidden")})
				//this.tpl.block.querySelector('[action="edit"]').style.display = 'block';
			}
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
				this.block.querySelectorAll('.notes_header__delete').forEach((trash)=>{
					trash.classList.remove("hidden");
				});
			}

			if (event.detail.from == 'editing' && event.detail.to == 'viewing'){
				this.block.querySelectorAll('.notes_header__delete').forEach((trash)=>{
					trash.classList.add("hidden");
				});
			}
			
		}})
	}

	create(notes) {

		this.clearAllNotes();
		// this.innerNote.close();
		let form = this.block,
			block = form.querySelector('.panel-body'),
			note = undefined;

		//создание блока заметок
		for (let key in notes) {
			if(note) 
				note = block.insertBefore(note.cloneNode(true), note);	
			else
				note = this.createOneNote(block);
			this.selectNote = note;
			this.bindNeedsEventsOnNote();

			this.createNoteObserver();



			note.setAttribute('data-id', key);
			for (let param in notes[key])
				note.setAttribute('data-' + param, notes[key][param]);
		}

		if (note) {
			form.classList.remove('hidden');
			form.classList.add('panel', 'panel-default', 'scrollable', 'notesPanel');
			//инициализация блока
			form.addEventListener('init.lobiPanel', (ev, lobiPanel) => {
				$(form.querySelector('.panel-title')).classList.add('.for-panel-title');
				$(form.querySelector('.panel-heading')).classList.add('for-panel-heading');
			});
			this.makeEvent('panelCreate');
		}
		else
			form.classList.remove('hidden');

		this.makeEvent('createNotesReady');
		this.selectNote = undefined;
		return note;
	}

	clearAllNotes (block = this.block.querySelector('.panel-body')) {
		block.querySelectorAll(`article`).forEach((elem) => {
			elem.dataset.deleted = true;
		});
	}

	createOneNote (block = this.block.querySelector('#f_mainNotes .panel-body')) {

		let art = document.createElement('article');
		art.classList = "activity-line-item box-typical notesArticle";
		art.setAttribute('action','openNote');
		art.innerHTML = `<header class="activity-line-item-header" style="border-bottom: 0px!important;">
			<div class="activity-line-item-user">
				<div class="activity-line-item-user-photo">
					<a href="#">
						<img src="#" alt="${GlobalVars.clientLang['no-img']}">
					</a>
				</div>
				<div class="row">
					<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
						<div class="activity-line-item-user-name"></div>
						<div class="activity-line-item-user-status"></div>
					</div>
					<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
					<div class="notes_header__delete red-trash hidden" style="left: 45px;" action="delete"></div>
					</div>
					
				</div>
			</div>
		</header>
		<section class="proj-page-section">
			<div class="proj-page-txt">
				<header class="proj-page-subtitle">
					<h3></h3>
				</header>
				<p></p>
			</div>
		</section>`;

		block.appendChild(art);
		return art;
	}

	bindNeedsEventsOnNote (id = 0) {
		let note = this.selectNote;
		note.addEventListener('click', (event) => {	
		    //console.log(event);		
			if ((event.target.tagName === 'IMG') || 
				(event.target.className === 'activity-line-item-user-name')) {
				//открыть юзера
			}
			else {
				if ((event.target.tagName === 'DIV') && 
					(event.target.classList.contains('notes_header__delete'))) {
					notie.confirm('Вы хотите удалить эту заметку?', 'Да', 'Нет', () => {
						//console.log(note)
						let suc = () => {
							notie.alert(1, GlobalVars.clientLang['success'], 1);
							note.parentNode.removeChild(note);
						},
							error = (error) => {
								notie.alert(2, GlobalVars.clientLang['error'], 2);
								console.log(error);
							}
						backendApiRequest([
							formAction(
									'edit',
									'ClientsNotes',
									{id: note.dataset.id, deleted: 1}
								)
							],
							{
								callbackSuccess: suc,
								callbackError: error
							}
						);
						//удаление
						//языки
					});
				}
				else {
					//открыть заметку
					this.tpl.endEditing();
					this.tpl.endCreating();
					this.selectNote = note;
					this.innerNote.open();
					this.innerNote.showNote(note.dataset);
				}
			}
		});
	}

	createNoteObserver () {
		let elem = this.selectNote;
		new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				switch (mutation.attributeName) {
					case 'data-datenote':
						elem.querySelector('.activity-line-item-user-status').innerHTML = (elem.dataset.datenote == 'null') ? '(дата не указана)' : elem.dataset.datenote;
						break;
					case 'data-emotion':
						switch (elem.dataset.emotion) {
							case 'good':
								elem.querySelector('.activity-line-item-user-photo img').style = 'border:2px solid green;borderRadius:50%;padding:1px;'
								break;
							case 'medium':
								elem.querySelector('.activity-line-item-user-photo img').style = 'border:2px solid orange;borderRadius:50%;padding:1px;'
								break;
							case 'bad':
								elem.querySelector('.activity-line-item-user-photo img').style = 'border:2px solid red;borderRadius:50%;padding:1px;'
								break;
							default:
								elem.querySelector('.activity-line-item-user-photo img').style = 'border:2px solid orange;borderRadius:50%;padding:1px;'
								break;
						}
						break;
					case 'data-first_name':
						elem.querySelector('.activity-line-item-user-name').innerHTML = elem.dataset.first_name;
						break;
					case 'data-img':
						elem.querySelector('.activity-line-item-user-photo img').src = GlobalVars.baseUrl + elem.dataset.img;
						break;
					case 'data-last_name':
						elem.querySelector('.activity-line-item-user-name').innerHTML +=" "+elem.dataset.last_name;
						break;
					case 'data-text':
						elem.querySelector('.proj-page-txt p').innerHTML = elem.dataset.text;
						break;
					case 'data-title':
						elem.querySelector('.proj-page-subtitle h3').innerHTML = elem.dataset.title;
						break;
					case 'data-deleted':
						elem.parentElement.removeChild(elem);
						break;
					default:
						break;
				}
			});
		}).observe(elem, {
			attributes: true,
			attributeOldValue: true
		});
	}

}