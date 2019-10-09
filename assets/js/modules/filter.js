class Filter extends BlockControl {
	constructor (blockFilter, categoriesList=undefined, clientsList=undefined, usersList=undefined, servicesList=undefined, filtersLang) {

		super(blockFilter, 'filter');
		this.clientsList = clientsList;
		this.usersList = usersList;		
		this.servicesList = servicesList;

		this.filtersLang = filtersLang;
		this.categoriesList = categoriesList;
		this._initFilters();
		this.selectFilter = {};

		// this.block.addEventListener("click", (ev) =>{
		// 	if((ev.target.tagName === 'I')||(ev.target.tagName === 'SPAN')||(ev.target.tagName === 'INPUT'))
		// 		// активация кнопки
		// 		this.block.querySelector('.forshow button').classList.add('active');
		// });		
	};

	/**
	 * [_initFilters Инициализация блока фильтров]
	 * @return {[type]} [description]
	 */
	_initFilters () {
		let blockLikes = this.block.querySelector('.forlikes .filter-block'),
			blockCalendar = this.block.querySelector('.forcalendar .filter-block'),
			blockStars = this.block.querySelector('.forstars .filter-block'),
			blockShow = this.block.querySelector('.forshow button'),
			blockCancel = this.block.querySelector('.services-filter-cancel'),
			blockClient = this.block.querySelector('.forclient .filter-block'),
			blockCategories = this.block.querySelector('.forcategories'),
			blockSex = this.block.querySelector('.forSex'),
			blockAge = this.block.querySelector('.forAge'),
			blockDiscount = this.block.querySelector('.services-filter-discount'),
			// blockUser = this.block.querySelector('.forUser'),
			blockUser = this.block.querySelector('.services-filter-users'),
			blockService = this.block.querySelector('.forService'),
			blockVisits = this.block.querySelector('.forVisit'),
			blockTotal = this.block.querySelector('.forTotal'),
			blockDates = this.block.querySelector('.forDates');

		if (blockService) {			
			let buttonCansel = blockService.querySelector('.canselService');
			this.servicesList = this._initFiltersSelectList('filter-services',this.servicesList,'title','id');
			this._observeSelectLists(blockService, buttonCansel);
			buttonCansel.addEventListener('click', () => {
				this._resetSelect('filter-services', 'canselService');
			});
		}
			
		if (blockUser) {
			let buttonCansel = blockUser.querySelector('.canselUser');
			this.usersList = this._initFiltersSelectList('filter-users',this.usersList,'title','id');
			this._observeSelectLists(blockUser, buttonCansel);
			buttonCansel.addEventListener('click', () => {
				this._resetSelect('filter-users', 'canselUser');
			})
		}

		// Обработчик на календарик
		if(blockCalendar) 
			blockCalendar.addEventListener('click', (ev) =>	{
			if (!blockCalendar.classList.contains('active')) {
				blockLikes.classList.remove('active');
				blockCalendar.classList.add('active');
				 blockLikes.querySelector('.fa-arrow-down').classList.add('hidden');
				 blockLikes.querySelector('.fa-arrow-up').classList.add('hidden');
				blockCalendar.querySelector('.fa-arrow-down').classList.remove('hidden');
			}
			else {
				 blockCalendar.querySelector('.fa-arrow-down').classList.toggle('hidden');
				 blockCalendar.querySelector('.fa-arrow-up').classList.toggle('hidden');
			}	
			});

		// Обработчик нажатия на лайки
		if(blockLikes) 
			blockLikes.addEventListener('click', (ev) => {
			if (!blockLikes.classList.contains('active')) {
				blockCalendar.classList.remove('active');
				blockLikes.classList.add('active');
				blockCalendar.querySelector('.fa-arrow-down').classList.add('hidden');
				blockCalendar.querySelector('.fa-arrow-up').classList.add('hidden');
				blockLikes.querySelector('.fa-arrow-down').classList.remove('hidden');
			}
			else {
				blockLikes.querySelector('.fa-arrow-down').classList.toggle('hidden');
				blockLikes.querySelector('.fa-arrow-up').classList.toggle('hidden');
			}
			});

		// Обработчик нажатия на рейтинг (звезды)
		if(blockStars) {
			console.log(blockStars);
			this._initFiltersStars(blockStars);
		}

		if(blockClient)
			this.clientsList = this._initFiltersCLient(blockClient);

		if (blockVisits) 
			this._initFiltersInput(blockVisits, 'filter-range-visit-start', 'filter-range-visit-end');			

		if (blockTotal) 
			this._initFiltersInput(blockTotal, 'filter-range-total-start', 'filter-range-total-end');

		this._initFiltersDates();

		//Инициализация категорий
    	if(blockCategories)
      		this._initCategories(blockCategories);

      	//Сброс фильтров
		if(blockCancel) 
			blockCancel.addEventListener('click', ()=> {
				this.selectFilter = {};
				// Сброс скидки
		        if (blockDiscount)
		          this._resetSlider("[data-id = range-slider-discount]", 0, 100);
		        // Сброс возраста
		        if (blockAge)      
		          this._resetSlider("[data-id = range-slider-general]", 10, 100);
				//Сброс значения пола
				if (blockSex)
					this._resetSelect('filter-sex');
				//Сброс значения мастера
				if (blockUser)
					this._resetSelect('filter-users', 'canselUser');
				// Сброс значения сервисов
				if (blockService)
					this._resetSelect('filter-services', 'canselService');
				//Сброс упорядочивания
				if (blockLikes)
					this._resetFilterOrder(blockLikes,blockCalendar);
				//Сброс выбранного клиента
				if (blockClient)
					this._resetSelect('tClient_id');
				//Сброс звезд
				if (blockStars)
				blockStars.querySelectorAll('i').forEach((el) => {
					el.classList.remove('active');
				});
				//Сброс интервальных значений
				if (blockVisits)
				this._resetInterval('filter-range-visit-start','filter-range-visit-end');
				if (blockTotal)
				this._resetInterval('filter-range-total-start','filter-range-total-end');
				if (blockDates)
				this._resetInterval('filter-range-start','filter-range-end');
				//Сброс категорий
				if (blockCategories)
					this._resetCategories(blockCategories);
				//Деактивация кнопки
				this.block.querySelector('.forshow button').classList.remove('active');
				this._startEndDatesRefresh(true, 'filter-range-start','filter-range-end');

				super.makeEvent('cancelAllFilters');
			});

		// Обработчик нажатия на Показать
		if(blockShow)
			blockShow.addEventListener('click', (ev) => {
			 // this.selectFilter = {};
			// Сортировка
			if (blockLikes) {
				this.filterOrder = this.CalendarLikeStates(blockLikes, blockCalendar);
				this.selectFilter[this.filterOrder] = true;
			}
			// Клиент
			if (blockClient && this.createListInSelect(this.clientsList,blockClient)) {
				let filterClient = this.createListInSelect(this.clientsList,blockClient);
				this.selectFilter['clientId'] = filterClient;
			}

			if (blockCategories && (blockCategories.querySelectorAll('.selected').length!=0)) {
				let categoriesId = '';
				blockCategories.querySelectorAll('.selected').forEach((category) => {
					categoriesId += " " + category.querySelector('li').getAttribute('id-category');
					console.log(categoriesId);
				});
				this.selectFilter['categories'] = categoriesId;
			}

			if (blockSex && $('[data-id=filter-sex]').val()!="") {
				let filterSex = $('[data-id=filter-sex]').val();
				this.selectFilter['sex'] = filterSex;
			}

			if (blockDiscount && ($('[data-id = range-slider-discount]').data().from!=0 || $('[data-id = range-slider-discount]').data().to!=100)) {
				let startDiscount = $('[data-id = range-slider-discount]').data().from,
				endDiscount = $('[data-id = range-slider-discount]').data().to;
				this.selectFilter['discountStart'] = startDiscount;
				this.selectFilter['discountEnd'] = endDiscount;
			}

			if (blockAge && ($('[data-id = range-slider-general]').data().from!=10 || $('[data-id = range-slider-general]').data().to!=100))
            {
                let startAge = $('[data-id = range-slider-general]').data().from,
               endAge = $('[data-id = range-slider-general]').data().to;                

                this.selectFilter['ageStart'] = this.findDateByAge(startAge);
                this.selectFilter['ageEnd'] = this.findDateByAge(endAge);
            }

            if (blockVisits) {
            	this.DateState($('[data-id=filter-range-visit-start]').val(), $('[data-id=filter-range-visit-end]').val(), 'visitsStart', 'visitsEnd');
            }

            if (blockTotal) {
            	this.DateState($('[data-id=filter-range-total-start]').val(), $('[data-id=filter-range-total-end]').val(), 'totalStart', 'totalEnd');
            }

            //Мастер
		    if (blockUser) {
		        let filterUsers = this.createListInSelect(this.usersList,blockUser),
		        	usersId="";
		        if (filterUsers) {
		        	filterUsers.forEach((elem) => {usersId += " " + elem});
		       		this.selectFilter['users'] = usersId;
		        }
		       	
		     }

		     if (blockService) {
		     	let filterServices = this.createListInSelect(this.servicesList,blockService),
		        	servicesId="";
		        if (filterServices) {
		        	filterServices.forEach((elem) => {servicesId += " " + elem});
		       		this.selectFilter['services'] = servicesId;
		        }
		       	
		     }

		     if(blockStars)
		     	this._initFiltersStars(blockStars);

			//Начальная и конечная даты
			this.DateState($('[data-id=filter-range-start]').val(), $('[data-id=filter-range-end]').val(), 'startDate', 'endDate');

			console.log(this.selectFilter);
							
			super.makeEvent('createAnswer', this.selectFilter);
			this.selectFilter = {};			
			});
	};

	/**
	 * [_initFiltersDates Инициализация дата-пикера. js]
	 * @return {[type]} [description]
	 */
	_initFiltersDates () {
		let planting_date_start = $('[data-id=filter-range-start]');
		let planting_date_end = $('[data-id=filter-range-end]');
		let planting_date = planting_date_start.val() || '';
		if (planting_date) {
		  planting_date = moment(planting_date, 'YYYY-MMMM-DD').format('YYYY-MM-DD');
		}
		planting_date_start.val(planting_date);
		planting_date_end.val(planting_date);

		planting_date_start.daterangepicker({
		    "singleDatePicker": true,
		    "autoUpdateInput": false,
		    "locale": {
			     	"daysOfWeek": [
	            "Вс",
	            "Пн",
	            "Вт",
	            "Ср",
	            "Чт",
	            "Пт",
	            "Сб"
	        ],
	        "monthNames": [
	            "Январь",
	            "Февраль",
	            "Март",
	            "Апрель",
	            "Май",
	            "Июнь",
	            "Июль",
	            "Август",
	            "Сентябрь",
	            "Октябрь",
	            "Ноябрь",
	            "Декабрь"
	        ],
	        "firstDay": 1
		     }
		  },
		  function(start) {
		    planting_date_start.val(start.format('YYYY-MM-DD'));
		    highlight_changed_details(planting_date_start);
		  }
		);

		planting_date_end.daterangepicker({
		    "singleDatePicker": true,
		    "autoUpdateInput": false,
		    "locale": {
			     	"daysOfWeek": [
	            "Вс",
	            "Пн",
	            "Вт",
	            "Ср",
	            "Чт",
	            "Пт",
	            "Сб"
	        ],
	        "monthNames": [
	            "Январь",
	            "Февраль",
	            "Март",
	            "Апрель",
	            "Май",
	            "Июнь",
	            "Июль",
	            "Август",
	            "Сентябрь",
	            "Октябрь",
	            "Ноябрь",
	            "Декабрь"
	        ],
	        "firstDay": 1
		     }
		  },
		  function(end) {
		    planting_date_end.val(end.format('YYYY-MM-DD'));
		    highlight_changed_details(planting_date_end);
		  }
		);

		document.querySelectorAll('.daterangepicker').forEach((calendar) => {
			calendar.addEventListener('click', () => {
				if ((planting_date_end.val()<planting_date_start.val()) && (planting_date_end.val()!='')) {
				this._startEndDatesRefresh(false, 'filter-range-start','filter-range-end');
			}
			else
				this._startEndDatesRefresh(true, 'filter-range-start','filter-range-end');
			});
		});

		function highlight_changed_details(element) {
		  let id = element.attr('id');
		  let current_value = element.val();
		  let default_value = moment(document.getElementById(id).defaultValue, 'YYYY-MMMM-DD').format('YYYY-MM-DD');
		  if (!default_value) {
		    default_value = element.data("originalValue");
		  }
		}
	};

	/**
	 * [_observeSelectLists Проверка нажатия на отмену]
	 * @param  {[type]} block        [description]
	 * @param  {[type]} buttonCansel [description]
	 * @return {[type]}              [description]
	 */
	_observeSelectLists (block, buttonCansel) {
		let observeUsers = block.querySelector('button');
		let observer = new MutationObserver((mutations)=> {
			if (this.selectedId(block)) {
 				buttonCansel.classList.remove('hidden');
			}
			else {
				if (!buttonCansel.classList.contains('hidden'))
					buttonCansel.classList.add('hidden');
			}
		});
		observer.observe(observeUsers, { 
		  attributes: true, 
		  attributeFilter: ['aria-expanded'],
		   });
	}

	
	/**
	 * [_initFiltersSelectList Инициализация списков объектов в селекторах]
	 * @param  {[type]} nameOfblock [класс блока, в котором инициализируется список]
	 * @param  {[type]} list        [список объектов]
	 * @param  {[type]} title       [description]
	 * @param  {[type]} idElem      [description]
	 * @return {[type]}             [description]
	 */
	//this._initFiltersSelectList('filter-users',this.usersList,'title','id');
	_initFiltersSelectList (nameOfblock,list,title, idElem) {
		let selectBlock = [];
		list.forEach((elem, index) => {
			selectBlock.push({'id': elem[idElem], 'title': elem[title], 'dataIndex': index})
		});
		this.createOptions(nameOfblock, selectBlock); 
		return selectBlock;
	}

	/**
	 * [_initFiltersStars Инициализация фильтра по рейтингу]
	 * @param  {[type]} block [description]
	 * @return {[type]}       [description]
	 */
	_initFiltersStars(block) {
		block.addEventListener('click', (ev) => {
			let element = ev.target;
			block.querySelectorAll('i').forEach((el) =>{
				el.classList.remove('active');
			});
			this.prevAllElements(element).forEach((el) =>{
				el.classList.add('active');
				
				this.selectFilter['rating']=element.getAttribute('number');
				console.log(this.selectFilter['rating']);
			});
		});
	};

	/**
	 * [_initCategories Инициализация списка категорий]
	 * @param  {[type]} block [description]
	 * @return {[type]}       [description]
	 */
	_initCategories (block) {
		let category,
		categoriesTitles = this.categoriesList;
		// blocks.forEach(function(block) {
			categoriesTitles.forEach((elem,index) => {
			category = document.createElement('div');
			category.classList = 'selectable-item';
			category.innerHTML = `<div class="selectable-item__content">
                                            <li id-category='${elem.id}'>
                                              <i class="fas fa-circle" style="color:#EE94B4;"></i> 
                                              ${elem.title}
                                            </li>
                                        </div>
                                        <div class="selectable-item__rightbar">
                                            <i class="fas fa-check selectable-item__check"></i>
                                        </div>`
           
            block.appendChild(category);
		});
		// });
		
		// blocks.forEach(function(block) {
			block.querySelectorAll('.selectable-item').forEach((elem) => {
	      elem.addEventListener('click', () => {
	        if(elem.classList.contains('selected'))
	          elem.classList.remove('selected');
	        else
	          elem.classList.add('selected');
	      });
	    });
		// });
	    
  	};

  	/**
  	 * [prevAllElements description]
  	 * @param  {[type]} element [description]
  	 * @return {[type]}         [description]
  	 */
	prevAllElements (element) {
	    var result = [];
	    result.push(element);
	    while (element = element.previousElementSibling)
	        result.push(element);
	    return result;
	};

	/**
	 * [_initFiltersCLient Инициализация фильтра по клиенту]
	 * @param  {[type]} block [description]
	 * @return {[type]}       [description]
	 */
	_initFiltersCLient(block) {
		let selectBlock = [];
		let arrayClientsId =[]; 

		this.clientsList.forEach((elem) => { 
			arrayClientsId.push(elem.clientId);
		});

		arrayClientsId = arrayClientsId.filter(this.onlyUnique);

		let reviewsAll = this.clientsList.slice();

		let index = reviewsAll.length-1;
		while (index--) {
    		if (reviewsAll[index+1].clientId == reviewsAll[index].clientId) {
      			reviewsAll.splice(index, 1);
    		}
		}


		reviewsAll.forEach((elem, index) => {
			selectBlock.push({id: elem.clientId, title: elem.first_name + ' ' + elem.last_name, img: '#', dataIndex: index+1})
		});
		this.createOptions('tClient_id', selectBlock, 'Выберите клиента'); 
		return selectBlock;
	};

	/**
	 * [_initFiltersInput Инициализация инпутов фильтра]
	 * @param  {[type]} block [description]
	 * @param  {[type]} start [description]
	 * @param  {[type]} end   [description]
	 * @return {[type]}       [description]
	 */
	_initFiltersInput(block, start, end) {
		let visit_start = $('[data-id=' + start + ']'),
				visit_end = $('[data-id=' + end + ']');
			block.addEventListener('keyup', () => {
				if ((visit_start.val() > visit_end.val()) && (visit_end.val() != '')) {
				this._startEndDatesRefresh(false, start, end);
			}
			else
				this._startEndDatesRefresh(true, start, end);
			});
	}

	/**
	 * [createOptions Создание верстки селектора и его опций]
	 * @param  {[type]} id            [description]
	 * @param  {[type]} array         [description]
	 * @param  {[type]} defaultOption [description]
	 * @return {[type]}               [description]
	 */
	createOptions(id, array, defaultOption) {
   			var param = $(`select[data-id=${id}]`).val();

   			$(`select[data-id=${id}]`).html('');
   			if (defaultOption) {
     		$(`select[data-id=${id}]`).append(`<option  value=-1> ${defaultOption} </option>`);
   			}
     		for (var key in array) {
       			let title = array[key]['title'].replace(/"/g, "&#034");
       			let clientId = array[key]['id'];
       			if(array[key]['img']){
         			var img = array[key]['img'];
         			$(`select[data-id=${id}]`).append(`<option class="user-item" data-content="<span>${title}</span>" value="${title}" data-id="${clientId}"></option>`);
       			} 
       			else 
         			$(`select[data-id=${id}]`).append(`<option data-content="<span>${title}</span>" value="${array[key]['id']}"></option>`);
    			}

   			$(`select[data-id=${id}]`).selectpicker('refresh');
  	};

  	/**
  	 * [onlyUnique Возвращает уникальное значение]
  	 * @param  {[type]} value [description]
  	 * @param  {[type]} index [description]
  	 * @param  {[type]} self  [description]
  	 * @return {[type]}       [description]
  	 */
	onlyUnique(value, index, self) { 	
    	return self.indexOf(value) === index;
	};

	/**
	 * [findDateByAge description]
	 * @param  {[type]} age [description]
	 * @return {[type]}     [description]
	 */
	findDateByAge (age) {
        let currentYear = new Date().getFullYear();
        let dateBirthday = new Date();
        dateBirthday.setFullYear(currentYear-age);
        dateBirthday = dateBirthday.getFullYear() + '-' + ('0' + (dateBirthday.getMonth() + 1)).slice(-2) + '-' + ('0' + dateBirthday.getDate()).slice(-2);
        return dateBirthday;        
    };

    /**
     * [selectedId Возвращает выбранные компоненты в списках select2 (users, services)]
     * @param  {[type]} block [description]
     * @return {[type]}       [description]
     */
    selectedId (block) {
    	let selectDataId = [];
	    block.querySelectorAll(".selected").forEach((elem) => {
	    	console.log(elem);
	      selectDataId.push(elem.dataset.originalIndex);
	    });
	    if (selectDataId.length!=0)
	    	return selectDataId;
	    else return false;
    }

	/**
	 * [createListInSelect Состояние select клиента]
	 * @param  {[type]} selectList [description]
	 * @param  {[type]} block      [description]
	 * @return {[type]}            [description]
	 */
  	createListInSelect(selectList,block) {
	    let selectClientDataId = this.selectedId(block);
	    if (selectClientDataId) {
	      let selectIdList = [];
	      selectList.forEach((elemList) => {
	        selectClientDataId.forEach((selectElem) => {
	          if (selectElem == elemList.dataIndex) {
	          	selectIdList.push(elemList.id);
	          }
	            
	        });
	      });
	      if (selectIdList.length == 1)
	      	return selectIdList[0]
	      if (selectIdList.length == 0)
	      	return false;
	      else
	      	return selectIdList;
	    }
	    else return false;
  };

  	/**
  	 * [DateState description]
  	 * @param {[type]} start           [description]
  	 * @param {[type]} end             [description]
  	 * @param {[type]} filterNameStart [description]
  	 * @param {[type]} filterNameEnd   [description]
  	 */
	DateState(start, end, filterNameStart, filterNameEnd) {
		if(start == "" && end != "") {
				this.selectFilter[filterNameEnd] = end;
			};

			if(end==""&&start!="") {
				this.selectFilter[filterNameStart] = start;
			};

			if (start != "" && end != "") {
				if(start < end) {
					this.selectFilter[filterNameStart] = start;
					this.selectFilter[filterNameEnd] = end;
				}
				if (start > end) {
					//this._startEndDatesRefresh(false);
					notie.alert(3, this.filtersLang['dateError'], 3);
					return;
				}	
			};
	};

	/**
	 * [_resetSlider сброс значений слайдера]
	 * @param  {[type]} block    [description]
	 * @param  {[type]} minValue [минимальное значение для сброса]
	 * @param  {[type]} maxValue [максимальное значение для сброса]
	 * @return {[type]}          [description]
	 */
	_resetSlider (block, minValue, maxValue) {
	    let my_range = $(block).data("ionRangeSlider");
	    my_range.update({
	      from: minValue,
	      to: maxValue
	    });
	 }

	
	/**
	 * [CalendarLikeStates Состояние фильтров сортировки]
	 * @param {[type]} blockLikes    [description]
	 * @param {[type]} blockCalendar [description]
	 */
	CalendarLikeStates(blockLikes, blockCalendar) {
			if (blockLikes.classList.contains('active')) {
				if (blockLikes.querySelector('.fa-arrow-down').classList.contains('hidden'))
					return 'likesDown'
				else return 'likesUp';
			}

			if (blockCalendar.classList.contains('active')) {
				if (blockCalendar.querySelector('.fa-arrow-down').classList.contains('hidden'))
					return 'calendarDown'
				else return 'calendarUp';
			}
	};

	/**
	 * [_resetFilterOrder сброс взаимоисключающих фильтров сортировки]
	 * @param  {[type]} blockLikes    [description]
	 * @param  {[type]} blockCalendar [description]
	 * @return {[type]}               [description]
	 */
	_resetFilterOrder (blockLikes, blockCalendar) {
		blockCalendar.classList.add('active');
		blockCalendar.querySelector('.fa-arrow-down').classList.remove('hidden');
		blockCalendar.querySelector('.fa-arrow-up').classList.add('hidden');
		blockLikes.classList.remove('active');
		blockLikes.querySelector('.fa-arrow-down').classList.add('hidden');
		blockLikes.querySelector('.fa-arrow-up').classList.add('hidden');
	};


	/**
	 * [_resetSelect Сброс селектов]
	 * @param  {[type]} select       [description]
	 * @param  {[type]} buttonCansel [description]
	 * @return {[type]}              [description]
	 */
	_resetSelect (select, buttonCansel) {
		if (buttonCansel)
			$('[class=' + buttonCansel + ']').addClass('hidden');
		$('[data-id=' + select + ']').val('default');
		$('[data-id=' + select + ']').selectpicker("refresh");
	};

	/**
	 * [_resetInterval Сброс интервалов]
	 * @param  {[type]} start [минимальное значение интервала]
	 * @param  {[type]} end   [максимальное значение интервала]
	 * @return {[type]}       [description]
	 */
	_resetInterval (start,end) {
		$('[data-id=' + start + ']').val('');
		//$('[data-id=filter-range-end]').val('');
		$('[data-id=' + end + ']').val('');
		this._startEndDatesRefresh (true, start, end)
	};

	/**
	 * [_resetCategories Сброс списка с категориями]
	 * @param  {[type]} block [description]
	 * @return {[type]}       [description]
	 */
	_resetCategories (block) {
		block.querySelectorAll('.selectable-item').forEach((elem) => {
	          elem.classList.remove('selected');
	    });
	};

	/**
	 * [_startEndDatesRefresh Добавление полей для ошибок]
	 * @param  {[type]} reset [description]
	 * @param  {[type]} start [description]
	 * @param  {[type]} end   [description]
	 * @return {[type]}       [description]
	 */
	_startEndDatesRefresh (reset, start, end) {
		if (reset) {
			document.querySelector('[data-id=' + end + ']').classList.remove('form-control-error');
			document.querySelector('[data-id=' + start + ']').classList.remove('form-control-error');
		}
		 else {
		 	document.querySelector('[data-id=' + end + ']').classList.add('form-control-error');
			document.querySelector('[data-id=' + start + ']').classList.add('form-control-error');
		 }
	};

}