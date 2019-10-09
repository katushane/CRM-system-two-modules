class Clients {

	constructor (
		block = document.querySelector('.clients'),
		clients = GlobalVars.clients,
		users = GlobalVars.usersList,
		loyalty = GlobalVars.loyalty,
		tpl = new Tpl(document.querySelector('#visits-tpl'), GlobalVars.tplConfs)) 
		{
 		this.tpl = tpl;
		this.block = block;
		this.clients = clients;
		this.filtersBlock = this.block.querySelector('.services-filter-analyst');
		this.users = users;
		this.loyalty = loyalty;
		this.countRowsOnPage = 10;

		this._initAllFilters();
		this.create(this.clients);

		this.clientData = undefined;
		this.newClientData = {};
		this.notes = new Notes({block: document.querySelector('#client_notes'), tpl: this.tpl});
		this.notices = new Notices({block: this.tpl.block.querySelector('[page=client-notices]'), tpl: this.tpl});
		this.reviews = new ReviewAll ({tpl: this.tpl});
		this.editCategories = new EditCategories ({tpl: this.tpl});

		createOptions('loyaltyId', this.loyalty, 'Не выбрано');

		this.__handleActions();
	}		

	__handleActions(){
		//события
		document.querySelector('.add-button').addEventListener('click', () => {			
			this.tpl.changeConf('client-conf1');
			this.tpl.open();
			this.tpl.startCreating();			
		});

		document.querySelector('.edit-category').addEventListener('click', () => {			
			this.tpl.changeConf('edit_category');
			this.tpl.open();
		});
		this.editCategories.block.addEventListener('startAddCategory', (event) => {
			this.tpl.startCreating();
		});

		this.tpl.block.addEventListener('configChange', (ev)=>{
			let block = this.tpl.block.querySelector('[page="client-info"] form');
			switch (ev.detail.to){
				case 'client-conf1':
					block.querySelector('[data-id=loyaltyId]').parentNode.parentNode.style.display = 'none';
				break;
				case 'client-conf':
					block.querySelector('[data-id=loyaltyId]').parentNode.parentNode.style.display = '';
				break;
				case 'edit_category':
					block.querySelector('[data-id=loyaltyId]').parentNode.parentNode.style.display = 'none';
				break;
			}
		})

		Fields.findFields(this.tpl.block.querySelector('[page="client-info"] form')).forEach((el) => {
			switch (el.tagName) {
				case 'IMG':
					//работа с картинкой
					break;
				default:
					el.addEventListener('change', (ev) => {
						switch (this.clientData) {
							// создание нового клиента
							case undefined:
								if (el.id == 'discountPriority') {
									this.newClientData[el.id] = Number(el.checked);
									if (el.checked) {
										Fields.lock(this.tpl.block.querySelector('[page="client-info"] form .discount-block'));
									}
									else {
										Fields.unlock(this.tpl.block.querySelector('[page="client-info"] form .discount-block'));
									}
									break;
								};
								if (el.value !== '' &&
									el.value !== undefined)
									this.newClientData[el.id] = el.value;
								else
									delete this.newClientData[el.id];
								break;
							// редактирование клиента
							default:
								if (el.value !==  String(this.clientData[el.id]))
									if (el.getAttribute('data-id') == 'loyaltyId') this.newClientData[el.id] = $(el).selectpicker('val');
									else this.newClientData[el.id] = el.value;
									
								else
									delete this.newClientData[el.id];
								break;
						}
					});
					break;
			}
		});

		this.tpl.block.addEventListener('pageChange', (ev) => {
			if (ev.detail.to === 'client-notes') {
				let err = (error) => {
					if (Object.keys(error).length !== 0)
						console.log(error);
				},
				ans = (answer) => {
					this.notes.create(answer);
				} 

				backendApiRequest([
			    	formAction(
			    	    'getAll',
			    	    'ClientsNotes',
			    	    {clientId: this.clientData.id}
			    	)],
			    	{
			    		callbackError: err,
			    		callbackAnswer: ans
			    	});
			}
			if (ev.detail.to === 'client-notices') {
				let err = (error) => {
					if (Object.keys(error).length !== 0)
						console.log(error);
				},
				ans = (answer) => {
					this.notices.create(answer);
					this.notices.__handleActions();
				}
				
				backendApiRequest([
			    	formAction(
			    	    'getAll',
			    	    'ClientsNotices',
			    	    {clientId: this.clientData.id}
			    	)],
			    	{
			    		callbackError: err,
			    		callbackAnswer: ans
			    	});
			}

			if (ev.detail.to === 'review-all') {
					let ans = (answer) => {
						this.reviews.create(answer);
						this.reviews.__handleActions();
					};
					backendApiRequest([
						formAction(
							'getAllReviews',
							'Reviews',
							{clientId: this.clientData.id}
							)],
					    	{callbackAnswer: ans});
						}
		});

		this.tpl.block.addEventListener('exit', () => {
			switch (this.tpl.currentCond) {
				case 'viewing':
					this.clientData = undefined;
					this.tpl.close();
					break;
				case 'creating':
					if (Object.keys(this.newClientData).length === 2 && 
						('sex' in this.newClientData) && 'loyaltyId' in this.newClientData) {
						this.newClientData = {};
						this.tpl.close();
						this.tpl.endCreating();
					}
					else 
						notie.confirm(
							GlobalVars.clientLang["no-save"],
							GlobalVars.clientLang["yes"],
							GlobalVars.clientLang["cancel"],
							() => {
								this.tpl.close();
								this.tpl.endCreating();
								this.newClientData = {};
								this.clientData = undefined;
							});
					break;
				case 'editing':
					if (Object.keys(this.newClientData).length !== 0) {
						notie.confirm(
							GlobalVars.clientLang["no-save"],
							GlobalVars.clientLang["yes"],
							GlobalVars.clientLang["cancel"],
							() => {
								this.tpl.close();
								this.tpl.endEditing();
								this.newClientData = {};
								this.clientData = undefined;
							});
					}
					else 
						{
							this.tpl.close();
							this.tpl.endEditing();
						}
					break;				
				default:
					
					break;
			}
		});

		this.tpl.block.addEventListener('edit', () => {
			if (this.tpl.currentPage=='client-info'){
			this.tpl.changeCondition('editing');
			}
		});

		this.tpl.block.addEventListener('done', (ev)=>{
			if (this.tpl.currentPage == 'client-info') {
			switch (this.tpl.currentCond) {
				case 'creating':
					let noSuccess = false;
					GlobalVars.clients.forEach((client) =>{
						if(this.newClientData.email == client.email)
							noSuccess=true;});
					if (!("firstName" in this.newClientData) ||
						!("email" in this.newClientData) || !("lastName" in this.newClientData))
						notie.alert(2, GlobalVars.clientLang['no-ready'], 2);
					else {
						if (noSuccess)
							notie.alert(2, GlobalVars.clientLang['email-exists'], 2);
						else{
							delete this.newClientData.loyaltyId;
							let ans = (data) => {
			                this.newClientData.id = data.id;

			                this.addClient();
			                this.newClientData = {};
			                notie.alert(1, GlobalVars.clientLang['success'], 1);
			            },
				            error = (err) => {
							notie.alert(2, GlobalVars.clientLang['error'], 2);
							console.log(err);
							}			
				            
				            backendApiRequest([
				            	formAction(
				                    'create',
				                    'Clients',
				                    this.newClientData
				                )],
				                {
				                	callbackAnswer: ans,
				                	callbackError: error
				                });
	              			this.tpl.close();
							}
					}
					break;
				case 'editing':
					if (Object.keys(this.newClientData).length !== 0) {
						let suc = () => {
							notie.alert(1, GlobalVars.clientLang['success'], 1);
							this.updateClient(this.newClientData);
							this.newClientData = {};
							this.tpl.block.querySelector('[action="edit"]').style.display = 'block';
							this.tpl.endEditing();
							Fields.lock(this.tpl.block.querySelector('[page="client-info"] form'));
							this.tpl.block.querySelector('[action="edit"]').style.display = 'block';
						},
							error = (error) => {
								notie.alert(2, GlobalVars.clientLang['error'], 2);
								console.log(error);
							}
						this.newClientData['id'] = this.clientData.id;
						backendApiRequest([
							formAction(
									'edit',
									'Clients',
									this.newClientData
								)
							],
							{
								callbackSuccess: suc,
								callbackError: error
							}
						);
					}
					break;
				default:
					this.clientData = undefined;
					this.tpl.close();
					break;
			}	
		}});
	}

	/**
	 * [_initAllFilters Инициализация фильтров]
	 * @return {[type]} [description]
 	*/
	_initAllFilters () {
    	let filtersBlockBasic = this.filtersBlock.querySelector('.services-filter-basic'),
    	    filtersBlockAnalytic = this.filtersBlock.querySelector('.services-filter-analytic');
	
		this.filtersAnalytic = new Filter(filtersBlockAnalytic, GlobalVars.loyalty, 
		    undefined, this.users, undefined, GlobalVars.filtersLang);
		this.filtersBasic = new Filter(filtersBlockBasic, GlobalVars.loyalty, 
		    undefined, this.users, undefined, GlobalVars.filtersLang);
	
		filtersBlockAnalytic.addEventListener('createAnswer', (event) => {
    	  	let err = (error) => {
    	      	if (Object.keys(error).length !== 0)
    	        	console.log(error);
    	    	},
		        ans = (answer) => {
		          console.log(answer);
		        }
    	    	console.log(event.detail);
	
    	  		backendApiRequest([
    	            formAction(
    	                'getAllFilters',
    	                'Clients',
    	                event.detail)
    	                ],
    	                {
    	                  callbackError: err,
    	                  callbackAnswer: ans
    	        });     
    	});
	
    	filtersBlockBasic.addEventListener('createAnswer', (event) => {
    		let err = (error) => {
    	    	if (Object.keys(error).length !== 0)
    	        console.log(error);
    	    },
    	    ans = (answer) => {
    	      	console.log(answer);
    	    }
    	  	
    	  	backendApiRequest([
    	            formAction(
    	                'getAllFilters',
    	                'Clients',
    	                event.detail)
    	                ],
    	                {
    	                  callbackError: err,
    	                  callbackAnswer: ans
    	                });     
    	});
	
    	let filterSwitchButtons = this.filtersBlock.querySelectorAll('.services-filter-analyst__buttons__elem'),
    	  	filterSwitchBlocks = this.filtersBlock.querySelectorAll('.services-filter__content');

    	filterSwitchButtons.forEach(function(elem, index) {
    	  	elem.addEventListener('click', () => {
    	    	if (!elem.classList.contains('active')) {
    	      		let currentElem, currentBlock, block;
    	      			if (index == 0) {
    	        			currentElem = filterSwitchButtons[1];
    	        			currentBlock = filterSwitchBlocks[1];
    	        			block = filterSwitchBlocks[0];
    	        			// this.filtersAnalytic.reset();
    	      			} else {
    	        			currentElem = filterSwitchButtons[0];
    	        			currentBlock = filterSwitchBlocks[0];
    	        			block = filterSwitchBlocks[1];
    	        			// this.filtersBasic.reset();
    	      			}
    	      		currentElem.classList.remove('active');
    	     		currentBlock.classList.remove('active');
    	      		elem.classList.add('active');
    	      		block.classList.add('active');
    	    	}
    	    });
    	});
	
    	let openFilter = this.block.querySelector('.services-bar__filter');
    	openFilter.addEventListener('click', () => {
    	  	this.block.querySelector('.services-content').style.display='none';
    	  	this.filtersBlock.style.display='flex';
    	});
	
    	var observer = new MutationObserver(function(mutations) {
    	  	var normalW = $('.services-filter-users')[1].offsetWidth;
    	  	$('[data-id=filter-users]').on('changed.bs.select', ()=> {
    	    	$('[data-id=filter-users]')[1].parentElement.querySelector('button').style.width=normalW+'px';
    	  	});
    	  	$('[data-id=filter-clients]').on('changed.bs.select', ()=> {
    	    	$('[data-id=filter-clients]')[1].parentElement.querySelector('button').style.width=normalW+'px';
    	  	});
    	});
    	
    	var target = this.filtersBlock;
    	observer.observe(target, {
    	    attributes: true
    	});
	}

	_initSorting (block, blockListSort) {
	    let  options = {
	        valueNames: [ 'services-list__title__span',
	        'services-list__cost__coin', 'services-list__discount__span', 
	        'services-list__visits-profit-count-visits', 'services-list__visits-profit-summ' ]
	      };

	    let list = new List('hacker-list', options);

	    let listSort = blockListSort.querySelectorAll('.sort');
	    let arrowDown = block.querySelector('.fa-long-arrow-alt-down'),
	      arrowUp = block.querySelector('.fa-long-arrow-alt-up');
	    let selectedOption;

	    listSort.forEach((optionSort, index) => {
	      optionSort.addEventListener('click', () => {
	        if (!selectedOption) {
	            block.querySelector('.fa-exchange-alt').classList.add('hidden');
	        }
	        arrowDown.classList.remove('hidden');
	        arrowUp.classList.add('hidden');          
	        this.initPagination();
	        selectedOption = optionSort;
	        block.querySelector('.services-bar__input').innerHTML = optionSort.text;
	      });
	    });

	    arrowUp.addEventListener('click', () => {
	      arrowDown.classList.remove('hidden');
	      arrowUp.classList.add('hidden');      
	      list.sort(selectedOption.getAttribute('data-sort'), { order: "desc" });
	      this.initPagination();
	    });

	    arrowDown.addEventListener('click', () => {     
	      arrowDown.classList.add('hidden');
	      arrowUp.classList.remove('hidden');     
	      list.sort(selectedOption.getAttribute('data-sort'), { order: "asc" });
	      this.initPagination();
	    });
  	}

	create (clients) {  
	    let optionsAdd = {
	      valueNames: [ 'services-list__title__span', 'services-list__category__span', 
	      'services-list__cost__coin', 'services-list__discount__span', 
	      'services-list__visits-profit-count-visits', 'services-list__visits-profit-summ', { data: ['id'] }],
	      item: `<li class="services-list__row">
	                  <div class="services-list__block-of-title-cost" style="flex-basis: 60%; align-items: center;">

	                    <div class="services-list__title services-list__row__column">
	                        <img class="services-list__title__img" src="${GlobalVars.baseUrl}assets/img/single-service-icon.svg">
	                        <div class="services-list__text services-list__title__span"></div>
	                    </div>

	                    <div class="service-full-title">
	                      <div class="services-list__category services-list__row__column">
	                      		<img class="icon-phone" src="${GlobalVars.baseUrl}assets/img/phone.svg" style="margin-right: 7px;">
	                            <div class="services-list__category__span services-list__text"></div>
	                      </div>
	                      <div class="service-full-cost services-list__row__column">
	                        <div class="services-list__cost">
	                        <i class="fas fa-circle" style="margin-right: 7px; color:#EE94B4;"></i>
	                        <div class="services-list__cost__coin"></div></div>
	                      </div>
	                      </div>
	                  </div>
	                  
	                  <div class="services-list__visits-profit services-list__row__column"> 
	                    <img class="services-list__cost__coin-img" style="margin-right: 7px;" src="${GlobalVars.baseUrl}assets/img/coin.svg">
	                  	<div class="services-list__visits-profit-summ" style="flex-basis: 24%"></div>р
	                  </div>
	                  <div class="services-list__discount services-list__row__column"
	                  style="flex-basis: 16%;">
	                  	<img class="services-list__cost__discount-img" style="margin-right: 7px;" src="${GlobalVars.baseUrl}assets/img/discount-service.svg">
	                  	<div class="services-list__discount__span"></div>%
	                  </div>		     
	                  </div>
	                </li>`,
	                pagination: true
	    };
	    this.clientsList = new List('hacker-list', optionsAdd);

	    clients.forEach((client) => {
	      let newFieldClient = this.clientsList.add( { 
	        'services-list__title__span': client.firstName + ' ' + client.lastName, 
	        'services-list__category__span': client.firstPhone, 
	        'services-list__cost__coin': client.loyalty, 
	        'services-list__discount__span': client.discount, 
	        'services-list__visits-profit-summ': client.total, 
	        id:client.id }); 
	      this.bindEventsOnField(newFieldClient[0].elm, client);
	    });

		this._initSorting(this.block.querySelector('.services-bar__sort-dropdown'), this.block.querySelector('.services-bar__sort-dropdown__content')); 

	    this.clientsList.page = this.countRowsOnPage;
	    this.clientsList.update();

	    if (clients.length <= this.countRowsOnPage) this.block.querySelector('.pagination').classList.add('hidden');
  	}

  	bindEventsOnField (field, data) { 

  		field.addEventListener('click', (ev) => {

  			if (this.tpl.currentConf != 'client-conf') this.tpl.changeConf('client-conf');
  			this.clientData = data;
  			this.clientData.avatar = this.clientData.avatar ? this.clientData.avatar : GlobalVars.noAvatar; 
  			this.reviews.clientData = {	clientName: this.clientData.firstName +' '+ this.clientData.lastName, 
												avatar: this.clientData.avatar};
			this.notices.clientData = {clientName: this.clientData.firstName +' '+ this.clientData.lastName,
										clientId: this.clientData.id};
			this.tpl.block.querySelector('[data-id=tpl-header-title]').innerText = this.clientData.firstName +' '+ this.clientData.lastName;
			this.notes.clientData = {	first_name: this.clientData.firstName,
										last_name: this.clientData.lastName, 
										avatar: this.clientData.avatar,
										clientId: this.clientData.id};
			if (this.tpl.currentPage != 'client-info')
				this.tpl.changePage('client-info');
			this.tpl.changeCondition('viewing'); 
			this.tpl.open();	
			if (!this.tpl.isMenuOpened) this.tpl.openMenu();		
			
			Fields.push(
				this.tpl.block.querySelector('[page="client-info"] form'), 
				this.clientData);
			$('[data-id=loyaltyId]').selectpicker('val', this.clientData.loyaltyId)
  		})
  	}
	
	updateClient (data) {

		console.log(data)
		
		let changedClient = this.clients.find((el)=>el.id == data.id),
			changedItem = {},
			currentItem = this.clientsList.get('id', data.id)[0];

		for (let key in data){
			switch (key){
				case 'firstName':
				case 'lastName':					
					if (!changedItem['services-list__title__span']) 
						changedItem['services-list__title__span'] = data.firstName ? (data.lastName ? data.firstName+' '+data.lastName : data.firstName+' '+changedClient.lastName) : changedClient.firstName+' '+data.lastName;
				break;
				case 'firstPhone':
					changedItem['services-list__category__span'] = data.firstPhone;
				break;
				case 'loyaltyId':
					let loyalty = this.loyalty.find((el)=>el.id == data[key]);
					changedItem['services-list__cost__coin'] = loyalty.title;
					changedItem['services-list__discount__span'] = loyalty.discount;
				break;
				default:
				break;
			}
			changedClient[key] = data[key];
		}

		currentItem.values(changedItem);
		currentItem.elm.click();
	}
 
	addClient (row = this.newClientData) {
		console.log(this.newClientData)
		let loyalty = this.loyalty.find((el)=>el.id == 4),
			newItem = {},
			item;
		row.loyaltyId = 4;
		row.discount = loyalty.discount;
		row.loyalty = loyalty.title;
			
		this.clients.push(row);
		
		for (let key in row){
			switch (key){
				case 'firstName':
				case 'lastName':					
					if (!newItem['services-list__title__span']) 
						newItem['services-list__title__span'] = row.firstName+' '+row.lastName;
				break;
				case 'firstPhone':
					newItem['services-list__category__span'] = row.firstPhone;
				break;
				case 'id':
					newItem['id'] = row.id;
				break;
				default:
				break;
			}
		}

		newItem['services-list__cost__coin'] = row.loyalty;
		newItem['services-list__discount__span'] = row.discount;
		newItem['services-list__visits-profit-summ'] = 0;

		item = this.clientsList.add(newItem);
        
        if (this.clientsList.size()==this.countRowsOnPage+1) this.block.querySelector('.pagination').classList.remove('hidden');

		item[0].show();
	    this.bindEventsOnField(item[0].elm, row);
	    item[0].hide();
	    item[0].elm.click();
	}

}

let clients;
document.addEventListener('DOMContentLoaded', () => {
	clients = new Clients();
});

