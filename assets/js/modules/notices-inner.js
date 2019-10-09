class NoticesInner extends TplInner { 
	constructor({block,tpl}) {
		super(block, 'notices-inner');
		this.tpl = tpl;
		this.clientId;
		super.initActions();
		this._initHandlers ();
		this.newNoticeData = {};
		this.startCreateNotice = false;
		this.selectNotice;
	};

	colorBlueMass () {
		let communication = ['fb','vk','inst'];
		let notice = this.selectNotice;
		let block = this.block;
		communication.forEach( function (key) {
			if(notice[key] == 1)
					block.querySelector('#' + key).style = 'color:#00a8ff;';
				else {
					block.querySelector('#' + key).setAttribute('state','unselected');
					block.querySelector('#' + key).style = 'color:#d6dbdf;';
				}
		});
	};

	colorblueBlinks(elem){
		let colors = {
			blink: 'rgb(0, 168, 255)',
			default: 'rgb(214, 219, 223)'
		}
		if (elem.style.color == colors.blink) {
			elem.style.color = colors.default;
			elem.setAttribute('state','unselected');
		}
		else {
			elem.style.color = colors.blink;
			elem.setAttribute('state','selected');
		};
	}

	showNotice (notice, client) {
		console.log(client)
		this.client = client;

		this.selectNotice = notice;
		this.block.querySelector('[data-id=inner-tpl-header-title]').innerHTML = GlobalVars.clientLang['viewingNotice'];
		if (!this.block.querySelector('[action=innerDone]').classList.contains('hidden')) this.block.querySelector('[action=innerDone]').classList.add('hidden')

		this.newNoticeData = {};
		this.colorBlueMass();
		this.block.querySelector('.fio').innerHTML =  client.clientName;
		this.block.querySelector('.data').style.display = 'block';
		this.block.querySelector('.date').innerHTML = this.selectNotice.date;
		Fields.push(this.block, {
			'title': notice.title,
			'textNotice': notice.text
		});

		this.block.querySelectorAll('.notices-blueBlink-icons i').forEach((el)=>{
			el.style.cursor = 'default';
		})
	};

	_initHandlers () {
        let block = this.block;
        console.log(block)
     //   let constructor = this;

		block.addEventListener('innerDone', () => {
			switch (this.isRCTplInner()) {
				case 'ready':
					this._readyDone();
                    break;
				case 'close':
					this._closeDone();
					break;
				default:
					notie.alert(2, GlobalVars.clientLang['no-ready'], 2);
					break;
			}
		});

		block.addEventListener('back', () => {
			switch (this.isRCTplInner()) {
				case 'close':
					if (this.startCreateNotice) {
						this.startCreateNotice = false;
						super.makeEvent('removeClone');
					}
					this.selectNotice = undefined;
					Fields.lock(this.block.parentElement);
					super.makeEvent('closeinnerNotice');
					this.close();
					break;
				default: 
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
					break;
			}
		});

		block.addEventListener('close',()=>{
			if (!this.tpl.block.querySelector('[action=innerDone]').classList.contains('hidden')) this.tpl.block.querySelector('[action=innerDone]').classList.add('hidden');
			if (this.tpl.currentCond!='viewing') this.tpl.changeCondition('viewing');
		})


		/*block.addEventListener('blinkDone', () => {
			if(this.isRCTplInner()=="ready")
				block.querySelector("#plane").style = 'color:#00a8ff;';
			else
				block.querySelector("#plane").style = 'color:#d6dbdf;';
		});*/

		//Изменения в текстовом поле
		block.querySelector('#textNotice').addEventListener('change', (ev) => {
			if (this.selectNotice) {
				if (ev.target.value !== this.selectNotice.text) {
					this.newNoticeData.text = ev.target.value;
					this.makeEvent('blinkDone');
				}
				else
					delete this.newNoticeData.text;
			}
		});

		//Изменения в поле заголовка
		block.querySelector('#title').addEventListener('change', (ev) => {
			if (this.selectNotice) {
				if (ev.target.value !== this.selectNotice.title) {
					this.newNoticeData.title = ev.target.value;
				//	this.makeEvent('blinkDone');
				}
				else
					delete this.newNoticeData.title;
			}
		});

		//Изменение каналов связи
		block.querySelectorAll('#noticesblueBlink i').forEach((blinks) => {
			if (this.tpl.currentCond == 'viewing'){
				blinks.addEventListener('click', (blink) => {
					if (this.tpl.currentCond == 'creating'){
					let selectElem = blink.target;
					selectElem.setAttribute('state', 'selected');
					this.colorblueBlinks(selectElem);
					//this.makeEvent('blinkDone');
				}
				});
			}
		});

		

		
    };

    isRCTplInner () {
		if (Object.keys(this.newNoticeData).length > 0){
				if (
					(this.newNoticeData.text !== '') &&
					(this.block.querySelectorAll("[state=selected]").length != 0) 
				)
					return 'ready';
				else {
					if (
						(this.newNoticeData.text === '') &&
						(this.block.querySelectorAll("[state=selected]").length == 0)
					)
						return 'close';
					else
						return false;
				}		
		}
		else 
			return 'close';
	};

	preparetionForAdd (client) {
        let block = this.block;
        this.client = client;
        this.block.querySelector('[data-id=inner-tpl-header-title]').innerHTML = GlobalVars.clientLang['creatingNotice'];
        block.querySelector('[action=innerDone]').classList.remove('hidden');
        block.querySelector('#blueBlinkLock').style.display = 'none';
        block.querySelector('.fio').innerHTML =  client.clientName;
		block.querySelector('.data').style.display = 'none';
		

        //Fields.unlock(block.parentElement); //?????
        this.startCreateNotice = true;
        this.selectNotice.fb = this.selectNotice.vk = this.selectNotice.inst = this.selectNotice.title = this.selectNotice.text = '';
        this.colorBlueMass();

        this.block.querySelectorAll('.notices-blueBlink-icons i').forEach((el)=>{
			el.style.cursor = 'pointer';
		})
    };

    _readyDone () {
    	let success = (data) => {
    		notie.alert(1, GlobalVars.clientLang['ready'], 1);
            this.newNoticeData.id = data.id;
            this.tpl.makeEvent('createReady',this.newNoticeData);
            this.newNoticeData = {};
            this.startCreateNotice = false;
            this.close();
            Fields.lock(this.block.parentElement);
        }

        this.newNoticeData.clientId = this.clientId;
        this.newNoticeData.type = 1;
        this.newNoticeData.date = moment().format('YYYY-MM-DD HH:mm');
        this.block.querySelectorAll("[state=selected]").forEach( (el) => {
        	let channel = el.id;
        	this.newNoticeData[channel] = 1;
        });
        console.log(this.newNoticeData);
        backendApiRequest([
        	formAction(
        		'create',
                'ClientsNotices',
                this.newNoticeData)
        	],
        	{
        		callbackAnswer: success
        	});
    };

    _closeDone() {
		if (this.startCreateNotice) 
		notie.alert(2, GlobalVars.clientLang['no-ready'], 2);
	};
}