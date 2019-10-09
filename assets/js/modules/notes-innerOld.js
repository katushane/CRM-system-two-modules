class NotesInner extends TplInner {

	/*constructor ({
		block = document.querySelector('#client_notes_inner'),
		tpl
	}){
		super(block);
		this.tpl = tpl;
	}*/

	constructor({block = document.querySelector('#client_notes_inner'), tpl}) {
		super(block, 'notes-inner');
		super.initActions();
		this.tpl = tpl;
		this.clientId;
		this.newNoteData = {};
		this.startEditNote = false;
		this.startCreateNote = false;
		this.selectNote;
		this._initHandlers ();
	};

	colorEmotions (emotion = undefined) {
		let color = '#d6dbdf',
		colors = {
			good: '#46c35f',
			medium: 'orange',
			bad: 'red',
			default: '#d6dbdf'
		};

		this.block.querySelectorAll('#emotion i').forEach((el) => {
			if (emotion) {
				if (emotion === el.parentElement.getAttribute('emotion'))
					color = colors[emotion];
				else
					color = colors.default;
			}
			else 
				color = colors[el.parentElement.getAttribute('emotion')];

			el.style.color = color;
		});
	};

	showNote (note) {
		this.selectNote = note;
		//this.block.querySelector('#innerNotesTitle').innerHTML = GlobalVars.clientLang['viewing'];
		//this.block.querySelector('#emotionLock').style.display = 'block';
		//this.block.querySelector('.innerEdit').classList.remove('hidden');
		//this.block.querySelector('.innerDone').classList.add('hidden');

		this.newNoteData = {};
		this.colorEmotions(note.emotion);
		Fields.push(this.block, {
			'title': note.title,
			'textNote': note.text
		});
	};

	_initHandlers () {
        let block = this.block;

        //работа с текстовым полем
		block.querySelector('#textNote').addEventListener('change', (ev) => {
			if (this.selectNote) {
				if (ev.target.value !== this.selectNote.text) 
					this.newNoteData.text = ev.target.value;
				else
					delete this.newNoteData.text;
			}
		});

		//работа с полем заговка
		block.querySelector('#title').addEventListener('change', (ev) => {
			if (this.selectNote) {
				if (ev.target.value !== this.selectNote.title) 
					this.newNoteData.title = ev.target.value;
				else
					delete this.newNoteData.title;
			}
   		});

   		//работа с эмоциями
		block.querySelectorAll('#emotion i').forEach((emotions) => {
			emotions.addEventListener('click', (emotion) => {
				let selectEmotion = emotion.target.parentElement.getAttribute('emotion');
				this.colorEmotions(selectEmotion);
				if (this.selectNote && this.selectNote.emotion !== selectEmotion) {
					this.newNoteData.emotion = selectEmotion;
					super.makeEvent('emotionChanged');
				}
				else
					delete this.newNoteData.emotion;
			});
		});

		//редактирование заметки
		this.tpl.block.addEventListener('edit', (ev) => {
			this.startEditNote = true;

			block.querySelector('.innerEdit').classList.add('hidden');
			block.querySelector('.innerDone').classList.remove('hidden');
			this.tpl.startEditing();

			block.querySelector('#emotionLock').style.display = 'none';
			Fields.unlock(ev.target.parentElement);
		});

		//нажатие на галочку в innerTpl
		this.tpl.block.addEventListener('done', () => {
			this.tpl.endEditing();
			/*switch (this.isRCTplInner()) {
				case 'ready':
					this._readyDone();
                    break;
				case 'change':
					this._changeDone();
					break;
				case 'close':
					this._closeDone();
					break;
				default:
					notie.alert(2, GlobalVars.clientLang['no-ready'], 2);
					break;
			}*/
		});

		//выход из tplInner
		let close = (ev)=>{
			console.log(ev)
			this.close();
			this.tpl.changeCondition('viewing')
			/*switch (this.isRCTplInner()) {
				case 'close':
					if (this.startEditNote) 
						this.startEditNote = false;
					if (this.startCreateNote) {
						this.startCreateNote = false;
						//super.makeEvent('removeClone');
						
					}
					
					this.selectNote = undefined;
					Fields.lock(this.block.parentElement);
					this.close();
					if (ev.type == 'exit') this.tpl.close();
					break;
				default:
					notie.confirm(
						GlobalVars.clientLang["no-save"],
						GlobalVars.clientLang["yes"],
						GlobalVars.clientLang["cancel"],
						() => {
							if (this.startEditNote) 
								this.startEditNote = false;
							if (this.startCreateNote) {
								this.startCreateNote = false;
								//super.makeEvent('removeClone');
							}
							
							this.selectNote = undefined;
							this.newNoteData = {};
							Fields.lock(this.block.parentElement);
							this.close();
							if (ev.type == 'exit') this.tpl.close();
						}
					);
					break;
			}*/
		}
		block.addEventListener('back', close);
		this.tpl.block.addEventListener('exit', close);

		block.addEventListener('open', ()=>{
			this.tpl.block.querySelector('.tpl-header-right').classList.add('hidden');

		})

		block.addEventListener('close', ()=>{
			this.tpl.block.querySelector('.tpl-header-right').classList.remove('hidden');
			if (this.tpl.currentCond=='editing') this.tpl.changeCondition('viewing');
			block.querySelector('button[action=innerDone]>i').classList.contains('fa-blue') ? block.querySelector('button[action=innerDone]>i').classList.remove('fa-blue') : false; 
		})

		

		let setBlue = function(){
			block.querySelector('button[action=innerDone]>i').classList.contains('blue') ? false : block.querySelector('button[action=innerDone]>i').classList.add('blue'); 
		},
			editCondition = ()=>{
				if (this.block.querySelector('.inner-note-emotions-edit').classList.contains('hidden')) this.block.querySelector('.inner-note-emotions-edit').classList.remove('hidden');
				if (!this.block.querySelector('.inner-note-emotions-view').classList.contains('hidden')) this.block.querySelector('.inner-note-emotions-view').classList.add('hidden');
			},
			viewCondition = ()=>{
				if (this.block.querySelector('.inner-note-emotions-view').classList.contains('hidden')) this.block.querySelector('.inner-note-emotions-view').classList.remove('hidden');
				if (!this.block.querySelector('.inner-note-emotions-edit').classList.contains('hidden')) this.block.querySelector('.inner-note-emotions-edit').classList.add('hidden');
			}

		block.addEventListener('emotionChanged', setBlue);
		block.querySelectorAll('input').forEach((el)=>{el.oninput = setBlue});

		this.tpl.block.addEventListener('conditionChange', (event)=>{
		if (this.isOpen){
			if (event.detail.from == 'viewing' && event.detail.to == 'editing'){
				editCondition();
			}

			if (event.detail.from == 'editing' && event.detail.to == 'viewing'){
				viewCondition();
			}
			
		}});
    };

    isRCTplInner () {
		if (Object.keys(this.newNoteData).length > 0){
			if (this.startEditNote) 
				return 'change';
			else 
				if (
					(this.newNoteData.text !== '') &&
					(this.newNoteData.text !== undefined) &&
					(this.newNoteData.emotion !== '') &&
					(this.newNoteData.emotion !== undefined)
				)
					return 'ready';
				else
					if (
						((this.newNoteData.text === '') ||
						(this.newNoteData.text === undefined)) &&
						((this.newNoteData.emotion !== '') ||
						(this.newNoteData.emotion !== undefined))
					)
						return 'close';
					else
						return false;
		}
		else 
			return 'close';
	};

	add() {
        let block = this.block;
        block.querySelector('#emotionLock').style.display = 'none';
        block.querySelector('#innerNotesTitle').innerHTML = GlobalVars.clientLang['creating'];

        Fields.unlock(block.parentElement); //?????
        this.colorEmotions();
        this.startCreateNote = true;
        this.selectNote.emotion = this.selectNote.title = this.selectNote.text = '';
    };

    _readyDone() {
    	let success = (data) => {
    		notie.alert(1, GlobalVars.clientLang['ready'], 1);
            this.newNoteData.id = data.id;
            super.makeEvent('createReady',this.newNoteData);
            this.newNoteData = {};
            this.startCreateNote = false;
            this.close();
            Fields.lock(this.block.parentElement);
        }
        //поменять на текущего пользователя
        this.newNoteData.userId = 1;
        this.newNoteData.clientId = this.clientId;
        this.newNoteData.date = moment().format('YYYY-MM-DD HH:mm');
        console.log(this.newNoteData);
        backendApiRequest([
        	formAction(
        		'create',
                'ClientsNotes',
                this.newNoteData)
        	],
        	{
        		callbackAnswer: success
        	});
    };

    _changeDone() {
    	let suc = () => {
    		notie.alert(1, GlobalVars.clientLang['success'], 1);
			super.makeEvent('changeReady',this.newNoteData);
			this.selectNote = undefined;
			this.newNoteData = {};
			this.startEditNote = false;
			Fields.lock(this.block.parentElement);
			};

			let error = () => {
			notie.alert(2, GlobalVars.clientLang['error'], 2);
			super.makeEvent('changeReady',this.newNoteData);
			this.selectNote = undefined;
			this.newNoteData = {};
			this.startEditNote = false;
			Fields.lock(this.block.parentElement);
			super.makeEvent('closeInnerNote');
		};
		this.newNoteData.id = this.selectNote.id;
		backendApiRequest([
			formAction(
				'edit',
				'ClientsNotes',
				this.newNoteData)
			],
			{
				callbackSuccess: suc,
				callbackError: error
			});
	};

    _closeDone() {
    	if (this.startEditNote) {
    		this.startEditNote = false;
			this.selectNote = undefined;
			Fields.lock(this.block.parentElement);
			this.close();
		}
		if (this.startCreateNote) 
		notie.alert(2, GlobalVars.clientLang['no-ready'], 2);
	};

}