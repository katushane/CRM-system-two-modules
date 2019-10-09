class Notices extends BlockControl{
	constructor ({
		blockNotices = document.querySelector('#client_notices'), 
		tpl,
		clientData}) {
		super(blockNotices, 'notices');

		this.tpl = tpl;
		this.data = {};
		if (clientData) {
			this.getDataByClient(clientData['clientId']);
			this.clientData=clientData;
		};

		this.countRowsOnPage = 3;
		this.innerNotice = new NoticesInner({	block: document.querySelector('#client_notices_inner'), 
												tpl: this.tpl});
		this.__handleActions();

	}

	getDataByClient(clientId){

		let err = (error) => {
					if (Object.keys(error).length !== 0)
						console.log(error);
				},
				ans = (answer) => {
					
					this.create(answer);
					this.handlerEventsTpl();
				} 

				backendApiRequest([
			    	formAction(
			    	    'getAll',
			    	    'ClientsNotices',
			    	    {clientId: clientId}
			    	)],
			    	{
			    		callbackError: err,
			    		callbackAnswer: ans
			    	});		
	}

	create(notices){

		this.data = notices;

		this.block.querySelector('#notification-list>.list').innerHTML='';

		let optionsAdd = {
		      valueNames: [ 'notification-block__date', 
		      				'notification-block__title', 
		      				'notification-block-text', 
		      				'notification-block__id', 
		      				{data: ['id'] },
		      				{name: 'icon-fb', attr: 'style'},
		      				{name: 'icon-email', attr: 'style'},
		      				{name: 'icon-inst', attr: 'style'}],
		      item: `<article action = "openNotice">
		                  <div class="notification-block">
							<div class="notification-block__head">
								<div class="notification-block__head-left-side">
									<span class="notification-block__title">Высокий уровень вовлечения</span>
									<span class="notification-block__date">10:15 15.05.19</span>
								</div>
								<div class="notification-block__head-right-side">
									<span class="notification-block__id">#1547</span>
									
								</div>
							</div>
							<div class="notification-block__body">
								<span class="notification-block-text">Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта.</span>
							</div>
							<div class="notification-block__footer">
								<div class="notification-block__footer-left-side">
									Каналы связи
								</div>
								<div class="notification-block__footer-right-side">
								 <i class = "icon-fb" style=""></i>
								 <i class = "icon-email" style=""></i>
								 <i class = "icon-inst" style=""></i>
								</div>
							</div>
						</div>
		            </article>`,
		        pagination: {
		        	left:0
		        },   
		    },
		    values = [];

		    for (var key in notices){
		    	let notice = notices[key];
		    	values.push({
		    		'notification-block__date': notice.date, 
			        'notification-block__title': notice.title ? notice.title : '(без заголовка)', 
			        'notification-block-text': notice.text, 
			        'notification-block__id': '#'+key,
			        'icon-fb': notice.fb ? "display : block" : "display : none",
			        'icon-email': notice.vk ? "display : block" : "display : none",
			        'icon-inst': notice.inst ? "display : block" : "display : none",
			        id:key 
		    	})
		    };
		    this.noticesList = new List('notification-list', optionsAdd, values);

		    this._initSorting();	

			this.noticesList.items.forEach((el)=>{this.handleNoticeActions(el.elm);})
			this.noticesList.page = this.countRowsOnPage;
			this.noticesList.update();

			if (this.noticesList.items.length <= this.countRowsOnPage) this.block.querySelector('.pagination').classList.add('hidden');
  
	}
	
	handleNoticeActions(notice){
		notice.addEventListener('click', (event) => {			
			if ((event.target.tagName === 'IMG') || 
				(event.target.className === 'activity-line-item-user-name')) {
				//открыть юзера
			}
			else {

					let el = event.target,
							noticeId,
							noticeData;
							console.log(event.target)
						while(!el.hasAttribute('data-id')) el = el.parentNode;
						noticeId = el.getAttribute('data-id');
						console.log(this.data)
						noticeData = this.data[noticeId];
						noticeData['id'] = parseInt(noticeId); 
							
						this.innerNotice.open();
						this.tpl.changeCondition('viewing');
						this.innerNotice.showNotice(noticeData, this.clientData);						
				
				
			}
		});
 
	}

	__pageFirst(){
		if (this.noticesList.size()>this.countRowsOnPage){
			this.noticesList.pagination.left = 1;
			this.block.querySelectorAll('.services-list__pagination a')[0].click();
			this.noticesList.pagination.left = 0;
		}
	}

	_initSorting(){
		this.noticesList.sort('notification-block__date', {order: "desc"});

		let sortBlock = this.block.querySelector('.services-bar__sort-dropdown'),
			cond = 'z-a',
			upArrow = sortBlock.querySelector('.icon-arrow-up'),
			downArrow = sortBlock.querySelector('.icon-arrow-down');

		sortBlock.addEventListener('click', (ev)=>{
			switch (cond){
				case 'a-z':
					this.noticesList.sort('notification-block__date', {order: "desc"});
					if (downArrow.classList.contains('hidden')) downArrow.classList.remove('hidden');
					if (!upArrow.classList.contains('hidden')) upArrow.classList.add('hidden');
					cond = 'z-a';
				break;
				case 'z-a':
					this.noticesList.sort('notification-block__date', {order: "asc"});
					if (upArrow.classList.contains('hidden')) upArrow.classList.remove('hidden');
					if (!downArrow.classList.contains('hidden')) downArrow.classList.add('hidden');
					cond = 'a-z';
				break;
			}
		})
	}

	__handleActions () {

        this.block.querySelector('#create').addEventListener('click', (ev)=>{

            this.innerNotice.selectNotice = {}; 

            this.innerNotice.open();
            this.tpl.changeCondition('creating');
            this.innerNotice.clientId = this.clientData.clientId;

            
            this.innerNotice.preparetionForAdd(this.clientData);
    
        });

        this.tpl.block.addEventListener('pageChange', (ev)=>{
        	if (event.detail.to == 'client-notices' && event.detail.from != 'client-notices')
        		this.tpl.block.querySelector('[action=edit]').classList.add('hidden');
        	else if (event.detail.from = 'client-notices' && event.detail.to != 'client-notices')
        		this.tpl.block.querySelector('[action=edit]').classList.remove('hidden');
        })

        this.tpl.block.addEventListener('conditionChange', (ev)=>{
        	if (this.tpl.currentPage == 'client-notices') {
	        	this.tpl.block.querySelectorAll('.tpl-header-right button').forEach((el)=>{
	        		if (!el.classList.contains('hidden')) el.classList.add('hidden')
	        	})
	        }	
        })

        this.tpl.block.addEventListener('createReady', (ev)=>{
        	this.addNotification(ev.detail);
        })
	} 

	addNotification(data){

		let newNotice={},
			newItem;

		newItem = this.noticesList.add({
			'notification-block__date': data.date ? data.date: '', 
			'notification-block__title': data.title ? data.title : '(без заголовка)', 
			'notification-block-text': data.text ? data.text : '', 
			'notification-block__id': '#'+data.id,
			'icon-fb': data.fb ? "display : block" : "display : none",
			'icon-email': data.vk ? "display : block" : "display : none",
			'icon-inst': data.inst ? "display : block" : "display : none",
			id:data.id
		})			

		if (this.noticesList.size()==this.countRowsOnPage+1) this.block.querySelector('.pagination').classList.remove('hidden');
			console.log(data)
		this.data[data.id] = Object.assign({}, data);
		delete this.data[data.id]['id'];	

		this._initSorting();
		this.__pageFirst();
		
		this.handleNoticeActions(newItem[0]['elm']);
	}
}
