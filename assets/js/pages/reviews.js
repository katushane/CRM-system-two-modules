class Reviews {
	constructor (
		block = document.querySelector('.reviews'),
		reviews = GlobalVars.reviews,
		tpl = new Tpl(document.querySelector('#visits-tpl'), GlobalVars.tplConfs)) {
		
		this.block = block;
		this.tpl = tpl;
		this.reviews = reviews;
		console.log(this.tpl);
		this.filtersBlock = this.block.querySelector('.reviews-filter');
		
		this._initReviewTpl();
		this.loadCurrentReviews(this.reviews);
		this._initAllFilters();

		this.tpl.block.addEventListener('pageChange', (ev) => {

			if (ev.detail.to === 'review-all') {

				let clientData = { 
					"firstName": this.currentReview.firstName, 
					"lastName": this.currentReview.lastName,
					"avatar":"", 
					"clientId":this.currentReview.clientId};
					this.reviewAll = new ReviewAll(this.tpl.block.querySelector('[page=review-all]'),
						this.tpl,clientData);
					this.reviewAll.block.addEventListener('updateReview', (event) => {
						if (event.detail.id == this.currentReview.id)
						this.updateReview(GlobalVars.reviews, event.detail,true);
					});
			};

			if (ev.detail.to === 'review-info') {
				let ans = (answer) => {
					this.reviewInfo.loadReview(this.currentReview);
					this.tpl.block.querySelector('.tpl-header-right').classList.remove('hidden');
				}
				backendApiRequest([
					formAction(
						'getAll',
						'Reviews',
						{}
					)],
					{callbackAnswer: ans});
			};


			if (ev.detail.to === 'client-info') {
				let ans = (answer) => {
					console.log(answer);
					Fields.push(
						this.tpl.block.querySelector('[page="client-info"] form'), 
						answer[0]);
					this.tpl.block.querySelector('.tpl-header-right').classList.add('hidden');
				},
					err = (error) => {
						if (Object.keys(error).length !== 0)
						console.log(error);
					};
				backendApiRequest([
					formAction(
						'getClientInfo',
						'Reviews',
						{clientId: this.currentReview.clientId}
					)],
					{	
						callbackError: err,
					    callbackAnswer: ans
					});
			};
			
		});
	}

	
	_initReviewTpl () {
		let revInf = this.tpl.block.querySelector('#reviewInfo');
		this.reviewInfo = new ReviewInfo(revInf,this.tpl);

		this.reviewInfo.block.addEventListener('updateReview', (event) => {
			this.updateReview(GlobalVars.reviews, event.detail,true);
		})
	};

	_initHandlers (dataset) {
		
		let review = this.selectReview;
			review.addEventListener('click', (ev) => {
				this.tpl.open();
				this.tpl.changePage('review-info');
				this.currentReview = dataset;
				this.updateReview(GlobalVars.reviews, dataset,false);
				this.reviewInfo.loadReview(this.currentReview);
			} );

			this.tpl.block.addEventListener('exit', () =>{
				this.selectReview = {};
				this.tpl.close();
			});
	};

	/**
	 * [_initAllFilters Инициализация фильтров]
	 * @return {[type]} [description]
 	*/
	_initAllFilters () {
		this.filters = new Filter(this.filtersBlock, undefined, this.reviews, undefined, undefined, GlobalVars.filtersLang);
		this.filtersBlock.addEventListener('createAnswer', (event) => {

			let err = (error) => {
					if (Object.keys(error).length !== 0)
						console.log(error);
				},
				ans = (answer) => {
					console.log(answer);
					this.loadCurrentReviews(answer);
					delete this.filters.selectFilter[this.filters.filterOrder];
				}
			backendApiRequest([
                        formAction(
                            'getAllFilters',
                            'Reviews',
                           event.detail)
                        ],
                        {
                            callbackError: err,
			    			callbackAnswer: ans
                        });
			
		});

		let openFilter = this.block.querySelector('.reviews-bar__filter');
		openFilter.addEventListener('click', () => {
			this.block.querySelector('#reviews').style.display='none';
			this.filtersBlock.style.display='flex';
		});

			
		this.filtersBlock.addEventListener('cancelAllFilters', () => {
			let ans = (answer) => {
				this.filtersBlock.elementsList = answer;
				this.loadCurrentReviews(answer);
				}
			backendApiRequest([
						formAction(
							'getAll',
							'Reviews',
							{}
							)],
					    	{callbackAnswer: ans});
		});
	};

	updateReview(array, value, needUpdate) {
		let index = -1;
	  array.forEach((elem)=>{
	  	if (elem.id == value.id) {
	  		index = array.indexOf(elem);
	  	};
	  });
	  if (needUpdate) {
	  	array[index]["display"] = value.display;
		this.currentReview.display = array[index]["display"];
	  }
	  else
	  	this.currentReview.display = array[index]["display"];	
	}

	loadCurrentReviews (reviews) {
		let blockCards = this.block.querySelector('ul.reviews__item');
		blockCards.innerHTML = "";
		GlobalVars.reviews = reviews;
		this.create(reviews);
		let typicalCard = blockCards.querySelector('.review-block');
		if (reviews.length == 2) {
			blockCards.style.justifyContent = "flex-start";
			typicalCard.style.marginRight = "35px";
		}
		else
			blockCards.style.justifyContent = "space-between";
	};
	
	createStars(count, rating = 0){
	    var s = '';
	    for (var i = 0; i < count; i++){
	        if (rating > 0){
	            rating--;
	            s = s + '<i class="font-icon font-icon-star active"></i>';
	        }
	        else s = s + '<i class="font-icon font-icon-star no-active" ></i>';;
	    }
	    return s;
	};

	create (reviews, countRowsOnPage=15) {

		let optionsSearch = {
  			valueNames: [ 'review-block-text' ]  
		},
		searchList = new List('reviews', optionsSearch);


		let optionsAdd = {
    	valueNames: [ 'review-block_client-title','review-block_date', 'review-block-title', 
    	'review-block-text', 'review-block-likes_count', 'review-block-stars', { data: ['id'] }],
    	item: `<li class="review-block">
              <div class="review-block__head">
                <div class="review-block__head-left-side">
                  <img class="review-block_client-photo" src="${GlobalVars.baseUrl}assets/img/users/photo-92-3.jpg" alt="">
                  <div class="review-block_title-and-date">
                    <span class="review-block_client-title">Юлия Барабулько</span>
                    <span class="review-block_date">10:15 15.05.19</span>
                  </div>
                </div>
                <div class="review-block__head-right-side">
                  <div class="checkbox-toggle" title="Отображение в виджете">
                    <input type="checkbox" readonly="true">
                    <label></label>
                  </div>
                </div>
              </div>
              <div class="review-block__body">
              	<span class="review-block-title" id="title">Заголовок</span>
                <span class="review-block-text">Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта.</span>
              </div>
              <div class="review-block__footer">
                <div class="review-block-stars">

                </div>
                <div class="review-block-likes">
                  <span class="review-block-likes_count">117</span>
                  <i class="fa fa-heart"></i>
                </div>
              </div>
            </li>`,
                page: countRowsOnPage,
  				pagination: true
  		},
  		addList = new List('reviews', optionsAdd);
  		reviews.forEach((review) => {
  			addList.add( { 'review-block_client-title': review.firstName + ' ' + review.lastName, 
  				'review-block_date': review.dateComment, 'review-block-title' : review.titleComment, 'review-block-text': review.textComment, 
  				'review-block-likes_count': review.likes, id:review.id, 
  				'review-block-stars' : this.createStars(5, review.countStars)});
  			// this.selectReview = review;
  			// this._initHandlers();
  			this.selectReview = addList.visibleItems[addList.visibleItems.length-1].elm;
  			this._initHandlers(review);
		});



		if (reviews.length < countRowsOnPage) this.block.querySelector('.pagination').classList.add('hidden');
	}
}

let reviews;
document.addEventListener('DOMContentLoaded', () => {
	reviews = new Reviews();
});