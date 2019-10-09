class ClientInfoInner extends TplInner{
	constructor ({
		block = document.querySelector('#client_info_inner'),
		clientId
	}) {
		super(block);
		super.initActions();
		this.clientId = clientId;
		this.data = {};

		this.getData(this.clientId);
		this._handleActions();	
	}

	getData(clientId){
		
		let answ = (data) => {
			this.data = data[0];
			this.block.querySelector('#innerClientTitle').innerText = this.data.firstName+' '+this.data.lastName;
		}
		backendApiRequest([formAction('getClientInfo', 'Clients', {id: clientId})],{callbackAnswer: answ});	
	}

	push(){
		let block = this.block, 
			data = this.data;
		for (let key in data) {
			let el = block.querySelector(`[data-id=${key}]`);
				if (el)
					switch (el.tagName) {
						case 'INPUT':
						case 'TEXTAREA':
								el.value = data[key];
							break;
						case 'IMG':
							el.setAttribute('src', GlobalVars.baseUrl+data[key]);
							break;
						case 'BUTTON':
							$(block.querySelector(`select[data-id=${key}]`)).selectpicker('val', data[key]);
							break;
						default:
							
						break;
					}
		};
	};

	_handleActions(){
		this.block.addEventListener('open', ()=>{
			this.block.querySelector('button[action=innerDone]').classList.add('hidden');
			this.tpl.block.querySelector('.tpl-header-right').classList.add('hidden');
			this.push();
		})

		this.block.addEventListener('close', ()=>{
			this.block.querySelector('button[action=innerDone]').classList.add('hidden');
			this.tpl.block.querySelector('.tpl-header-right').classList.remove('hidden');
		})

		this.block.addEventListener('back', ()=>{
			this.block.querySelector('button[action=innerDone]').classList.add('hidden');
			this.close();
		})
	}	
}
