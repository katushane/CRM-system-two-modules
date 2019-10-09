class NotesInner extends TplInner {
	constructor({
		block = document.querySelector('#client_notes_inner'), 
		tpl
	}) {
		super(block);
		super.initActions();
		this.tpl = tpl;
		this.clientId;
		this.note;
		this.iconSelected;
		this.newNote = {}; 
		this.__initHandlers();

	}

	__initHandlers(){

		let viewCondition = ()=>{
				//вид блока смайлов
				if (this.block.querySelector('.inner-note-emotions-view').classList.contains('hidden')) this.block.querySelector('.inner-note-emotions-view').classList.remove('hidden');
				if (!this.block.querySelector('.inner-note-emotions-edit').classList.contains('hidden')) this.block.querySelector('.inner-note-emotions-edit').classList.add('hidden');
				
				//header иннер-тплки
				this.block.querySelector('[data-id = inner-tpl-header-title]').innerHTML = 'Просмотр заметки';

				//иконки edit\done
				if (this.block.querySelector('[action = innerEdit]').classList.contains('hidden')) this.block.querySelector('[action = innerEdit]').classList.remove('hidden');
				if (!this.block.querySelector('[action = innerDone]').classList.contains('hidden')) this.block.querySelector('[action = innerDone]').classList.add('hidden');
				
				//lock полей
				Fields.lock(this.block);

			},
			editCondition = ()=>{
				//вид блока смайлов
				if (this.block.querySelector('.inner-note-emotions-edit').classList.contains('hidden')) this.block.querySelector('.inner-note-emotions-edit').classList.remove('hidden');
				if (!this.block.querySelector('.inner-note-emotions-view').classList.contains('hidden')) this.block.querySelector('.inner-note-emotions-view').classList.add('hidden');
			
				//header иннер-тплки
				this.block.querySelector('[data-id = inner-tpl-header-title]').innerHTML = 'Редактирование заметки';

				//иконки edit\done
				if (this.block.querySelector('[action = innerDone]').classList.contains('hidden')) this.block.querySelector('[action = innerDone]').classList.remove('hidden');
				if (!this.block.querySelector('[action = innerEdit]').classList.contains('hidden')) this.block.querySelector('[action = innerEdit]').classList.add('hidden');

				//иконки эмоций
				if (this.iconSelected) {
					this.block.querySelectorAll('.note-emotion-icon').forEach((el)=>{
						if (el.getAttribute('data-icon') != this.iconSelected) el.classList.add('unselected')
						else {
							if (el.classList.contains('unselected')) 
								el.classList.remove('unselected');
							if (el.parentNode.classList.contains('hidden-emotions') && !this.block.querySelector('[data-id=emotions-button]').classList.contains('transform')) 
								this.block.querySelector('[data-id=emotions-button]').click();
						}
					})
				}

				//unlock полей
				Fields.unlock(this.block);
			},

			createCondition = ()=>{
				if (this.block.querySelector('.inner-note-emotions-edit').classList.contains('hidden')) this.block.querySelector('.inner-note-emotions-edit').classList.remove('hidden');
				if (!this.block.querySelector('.inner-note-emotions-view').classList.contains('hidden')) this.block.querySelector('.inner-note-emotions-view').classList.add('hidden');
			
				//header иннер-тплки
				this.block.querySelector('[data-id = inner-tpl-header-title]').innerHTML = 'Добавление заметки';

				//иконки edit\done
				if (this.block.querySelector('[action = innerDone]').classList.contains('hidden')) this.block.querySelector('[action = innerDone]').classList.remove('hidden');
				if (!this.block.querySelector('[action = innerEdit]').classList.contains('hidden')) this.block.querySelector('[action = innerEdit]').classList.add('hidden');
				
				//иконки эмоций
				this.block.querySelectorAll('.note-emotion-icon.unselected').forEach((el)=>{
					el.classList.remove('unselected');
				})
				if (this.block.querySelector('[data-id = emotions-button]').classList.contains('transform'))
					this.block.querySelector('[data-id = emotions-button]').click();
				this.iconSelected = null;

				//unlock полей
				Fields.unlock(this.block);

			};

		this.tpl.block.addEventListener('conditionChange', (ev)=>{
			if (this.tpl.currentPage == "client-notes") {
				switch (ev.detail.to) {
					case 'editing':
						editCondition();
					break;
					case 'creating':
						createCondition();
					break;
					default:
						viewCondition();
					break;
				}
			}
		});

		this.block.addEventListener('innerEdit', (ev)=>{
			if (this.isOpen)
			this.tpl.startEditing();
		});

		this.block.addEventListener('innerDone', ()=>{
			if (this.isOpen){ 
				let changes = this.checkChangeNote();
				console.log(changes)
				if (changes) {
					if (changes.emotion === null || changes.text === null){
						notie.alert(2, GlobalVars.clientLang['no-ready'], 2);
					}
					else {
						let note = {},
							suc = {},
							error = {},
							answ = {};
						switch (this.tpl.currentCond) {
							case 'editing':
								note = Object.assign({}, changes);
								note['id'] = this.note.id;
								note['date'] = moment().format('YYYY-MM-DD HH:mm');

								suc = () => {
									notie.alert(1, GlobalVars.clientLang['success'], 1);
									this.tpl.makeEvent('noteEdited', note);
									this.close();	
									this.tpl.changeCondition('viewing');					
								};
								error = (error) => {
									notie.alert(2, GlobalVars.clientLang['error'], 2);
									console.log(error);
								}
								backendApiRequest([formAction('edit', 'ClientsNotes', note)], {callbackSuccess: suc, callbackError: error});
							break;
							case 'creating':
								note = Object.assign({}, changes);
								note['date'] = moment().format('YYYY-MM-DD HH:mm');
								note['clientId'] = this.clientId;
								note.title = note.title ? note.title : '(без заголовка)';

								suc = () => {
									notie.alert(1, GlobalVars.clientLang['success'], 1);
														
								};
								error = (error) => {
									notie.alert(2, GlobalVars.clientLang['error'], 2);
									console.log(error);
								};
								answ = (data) => {
									console.log(data);
									note['id'] = data['id'];
									note['img'] = data['userAvatar'];
									this.tpl.makeEvent('noteCreated', note);
									this.close();	
									this.tpl.changeCondition('viewing');
								}
								backendApiRequest([formAction('create', 'ClientsNotes', note)], {callbackSuccess: suc, callbackError: error, callbackAnswer: answ});
							break;
							default:
								this.close();
							break;
						}
					}
				}
			}
		});

		this.block.addEventListener('back', ()=>{
			if (this.isOpen){
				if (this.checkChangeNote()){
				notie.confirm(
						GlobalVars.clientLang["no-save"],
						GlobalVars.clientLang["yes"],
						GlobalVars.clientLang["cancel"],
						() => {
							if (this.startCreateNotice) {
								this.startCreateNotice = false;
								this.selectNotice = undefined;
								this.newNoticeData = {};
								super.makeEvent('removeClone');
							}
							this.close();
						}
					);
				}
				else {
					this.close();
				}
			}			
		})

		this.block.addEventListener('close', ()=>{
			this.tpl.changeCondition('viewing');
		})

		this.block.querySelector('[data-id=emotions-button]').addEventListener('click', ()=>{
			let btn = this.block.querySelector('[data-id=emotions-button]');

			if (btn.classList.contains('transform')) {
				this.block.querySelectorAll('.hidden-emotions').forEach((el)=>{el.classList.add('toggle-emotions-up')});
				this.block.querySelectorAll('.hidden-emotions').forEach((el)=>{el.classList.remove('toggle-emotions-down')});	
				btn.classList.remove('transform');
			} else {
				this.block.querySelectorAll('.hidden-emotions').forEach((el)=>{el.classList.add('toggle-emotions-down')});
				this.block.querySelectorAll('.hidden-emotions').forEach((el)=>{el.classList.remove('toggle-emotions-up')});
				btn.classList.add('transform');
			}
		});

		//переключение иконок
		let icons = this.block.querySelectorAll('.note-emotion-icon');
		icons.forEach((el)=>{
			el.addEventListener('click', (ev)=>{
				let idIcon = ev.target.getAttribute('data-icon');
				if (!this.iconSelected) {
					icons.forEach((icon)=>{	
						if (icon.getAttribute('data-icon') != idIcon) {
							icon.classList.add('unselected');
							this.iconSelected = idIcon;
						}
					})
				} else {
					if (idIcon == this.iconSelected){
						icons.forEach((el)=>{el.classList.remove('unselected')});
						this.iconSelected = null;
					} else {
						this.block.querySelector(`[data-icon="${this.iconSelected}"]`).classList.add('unselected');
						ev.target.classList.remove('unselected');
						this.iconSelected = idIcon;
					}
				}
				console.log(this.iconSelected)
			})
		})

		this.block.addEventListener('innerEdit', ()=>{
			this.tpl.changeCondition('editing');
		})
	}

	viewNote(data) {
		console.log(this.clientId)
		this.note = data;
		this.iconSelected = data.emotion;
		Fields.findFields(this.block).forEach((el) => {
			console.log(el);
			switch (el.tagName) {
				case 'INPUT':
				case 'TEXTAREA':
					el.value = data[el.getAttribute('data-id')];
				break;
				case 'IMG':
					let img = GlobalVars.baseUrl + data.emotionImg;
					el.setAttribute('src', img)
				break;
				default:
				break;
			}
		});
	}

	checkChangeNote(){
		let changedData,
			changes = {};


		switch (this.tpl.currentCond){
			case 'creating':
				changedData = this.collectNoteData();
				
			break;
			case 'editing':
				changedData = this.compareNoteData(this.collectNoteData(), this.note);
				
			break;
			default:
			break;
		}
		return changedData ? changedData : false;
	}

	collectNoteData(){
		let data ={};
		data['emotion'] = this.iconSelected;
		data['title'] = this.block.querySelector('[data-id=title]').value == ''	? null : this.block.querySelector('[data-id=title]').value;
		data['text'] = 	this.block.querySelector('[data-id=text]').value == ''	? null : this.block.querySelector('[data-id=text]').value;
		return data;
	}

	compareNoteData(newData, oldData) {
		let changes = {};
		for (let key in newData){
			if (newData[key] != oldData[key])
				changes[key] = newData[key];
		}
		return Object.keys(changes).length === 0 ? false : changes;
	}
}