class ReviewAll extends BlockControl {
	constructor (blockComments = document.querySelector('#review-all'),
	 	tpl,
		clientData = undefined) {

		super(blockComments, 'comments');

		this.tpl = tpl;
		this.data = {};
		this.countRowsOnPage = 3;
		if (clientData) {
			this.getDataByClient(clientData['clientId']);
			this.clientData = clientData;
		}

		this.selectComment = undefined;
		this.innerComment = new CommentsInner({tpl: this.tpl});
		
		this.__handleActions();
		console.log(this.tpl)
		
	}

	getDataByClient(clientId) {

		let ans = (answer) => {
			
			this.create(answer);
			
		};
		
		backendApiRequest([formAction('getAllReviews', 'Reviews', {clientId: clientId})], {callbackAnswer: ans});
	}	


	create (comments) {		
		this.data = comments;

		this.block.querySelector('#f_mainComments>.list').innerHTML='';

		let optionsAdd = {
		      valueNames: [ 'review-block_client-title', 
		      				'review-block_date', 
		      				'review-block-title', 
		      				'review-block-text', 
		      				'review-block-likes_count',
		      				{data: ['id','stars'] },
		      				{name: 'review-block_client-photo', attr: 'src'},
		      				{name: 'star1', attr: 'style'},
		      				{name: 'star2', attr: 'style'},
		      				{name: 'star3', attr: 'style'},
		      				{name: 'star4', attr: 'style'},
		      				{name: 'star5', attr: 'style'}],
		      item: `<div class="review-block">
							<div class="review-block__head">
								<div class="review-block__head-left-side">
									<img class="review-block_client-photo" src="" alt="">
									<div class="review-block_title-and-date">
										<span class="review-block_client-title"></span>
										<span class="review-block_date">10:15 15.05.19</span>
									</div>
								</div>
								<div class="review-block__head-right-side" style="float: right;">
									<button type="button" class="for-service example-switchbox" data-toggle-class="is-pressed" id="reviewStatus" data-id="reviewStatus"> 
									<i class="review-block__delete red-trash hidden" action="delete"></i>
								</div>
							</div>
							<div class="review-block__body">
								<span class="review-block-title"> Название отзыва </span>
								<span class="review-block-text"></span>
							</div>
							<div class="review-block__footer">
								<div class="review-block-stars">
									<i class="font-icon font-icon-star star1" style=""></i>
									<i class="font-icon font-icon-star star2" style=""></i>
									<i class="font-icon font-icon-star star3" style=""></i>
									<i class="font-icon font-icon-star star4" style=""></i>
									<i class="font-icon font-icon-star star5" style=""></i>
								</div>
								<div class="review-block-likes">
									<span class="review-block-likes_count"></span>
									<i class="fa fa-heart"></i>
								</div>
							</div>
						</div>`,
		        pagination: {
		        	left:0
		        }   
		    };

		    this.reviewsList = new List('f_mainComments', optionsAdd);


		    for (var key in comments){
		    	let comment = comments[key],
		    	item = this.reviewsList.add({
		    		'review-block_client-photo': this.clientData.avatar ? GlobalVars.baseUrl+this.clientData.avatar : GlobalVars.baseUrl+GlobalVars.noAvatar, 
			        'review-block_client-title': this.clientData.lastName ? this.clientData.firstName
			         + ' ' + this.clientData.lastName : this.clientData.firstName, 
			        'review-block_date': comment.dateComment, 
			        'review-block-title': comment.titleComment ? comment.titleComment : '(без заголовка)',
			        'review-block-text': comment.textComment ? comment.textComment : '',
			        'review-block-likes_count': comment.likes ? comment.likes : '0',
			        'star1': comment.countStars >= 1 ? 'color: #DCC157;' : '',
			        'star2': comment.countStars >= 2 ? 'color: #DCC157;' : '',
			        'star3': comment.countStars >= 3 ? 'color: #DCC157;' : '',
			        'star4': comment.countStars >= 4 ? 'color: #DCC157;' : '',
			        'star5': comment.countStars == 5 ? 'color: #DCC157;' : '',
			        id:key,
			        stars: comment.countStars 
		    	})

		    	comment.display ?  item[0].elm.querySelector('[data-id=reviewStatus]').classList.add('is-pressed') 
				:  item[0].elm.querySelector('[data-id=reviewStatus]').classList.remove('is-pressed');

		    	this.handleCommentsActions(item[0].elm);
		    };
		    

		    this._initSorting(this.block.querySelector('.services-bar__sort-dropdown'), this.block.querySelector('.services-bar__sort-dropdown__content'));	

			this.reviewsList.page = this.countRowsOnPage;
			this.reviewsList.update();

			if (this.reviewsList.items.length <= this.countRowsOnPage) this.block.querySelector('.pagination').classList.add('hidden');
	}

	_initSorting (block, blockListSort) {

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
	        selectedOption = optionSort;
	        block.querySelector('.services-bar__input').innerHTML = optionSort.text;
	      });
	    });

	    arrowUp.addEventListener('click', () => {
	      arrowDown.classList.remove('hidden');
	      arrowUp.classList.add('hidden');      
	      this.reviewsList.sort(selectedOption.getAttribute('data-sort'), { order: "desc" });
	    });

	    arrowDown.addEventListener('click', () => {     
	      arrowDown.classList.add('hidden');
	      arrowUp.classList.remove('hidden');     
	      this.reviewsList.sort(selectedOption.getAttribute('data-sort'), { order: "asc" });
	    });
  	}

	createStars(count, rating = 0) {
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

	handleCommentsActions(comment) {

		comment.addEventListener('click', (event) => {
			let comId = comment.getAttribute('data-id'),
				comData = this.data[comId];
			if ((event.target.tagName === 'I') && 
				(event.target.classList.contains('review-block__delete'))) {
				notie.confirm('Вы хотите удалить эту заметку?', /*GlobalVars.reviewLang['yes']*/'Да', /*GlobalVars.reviewLang['no']*/'Нет', () => {
					let suc = () => {
							notie.alert(1, GlobalVars.clientLang['success'], 1);
							this.reviewsList.remove('id', comId);
						},
							error = (error) => {
								notie.alert(2, GlobalVars.clientLang['error'], 2);
								console.log(error);
							}
						backendApiRequest([
							formAction(
									'edit',
									'Reviews',
									{id: comment.dataset.id, deleted: 1}
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

				if (event.target.dataset.id === 'reviewStatus')
				{
					let currentStatus = event.target.classList.contains('is-pressed') ? 0 : 1,
					actions = [],
					comparedData = {id: Number(comId), display: currentStatus};
            		actions.push(formAction('edit', 'Reviews', comparedData));
            		let suc = () => {
            			(currentStatus==1) ? event.target.classList.add('is-pressed') 
						: event.target.classList.remove('is-pressed');
            		notie.alert(1, GlobalVars.reviewLang['success'], 1);
					super.makeEvent('updateReview', comparedData);
            		},
                	err = (error) => {
                	console.log(error);
                	};
            		backendApiRequest(actions, {
		            	callbackSuccess : suc, 
		            	callbackError : err
            		});
				// {	
				// 	let cb = event.target.previousSibling.previousSibling,
				// 		disableComment = {};
				// 	disableComment.id = comId;	

				// 	console.log(cb);
				// 	if (cb.hasAttribute('checked')) {
				// 		cb.removeAttribute('checked');
				// 		disableComment.display = '0';
				// 	} else {
				// 		cb.setAttribute('checked', 'checked');
				// 		disableComment.display = '1';
				// 	}

				// 	let suc = () => {
				// 		notie.alert(1, GlobalVars.clientLang['success'], 1);
				// 	};

				// 	let error = () => {
				// 		notie.alert(2, GlobalVars.clientLang['error'], 2);
				// 	};

				// 	backendApiRequest([
				// 		formAction(
				// 			'edit',
				// 			'Reviews',
				// 	  		disableComment)
				// 		],
				// 		{
				// 			callbackSuccess: suc,
				// 			callbackError: error
				// 		});
				}
				else {
					
					let el = event.target;
					while(!el.hasAttribute('data-id')) el = el.parentNode;
					this.innerComment.open();
					this.tpl.changeCondition('viewing');
					this.innerComment.showComment(comData, this.clientData.firstName + ' ' 
						+ this.clientData.lastName);
									}				
			}

		});
	}

	__handleActions(){
		this.tpl.block.addEventListener('edit', ()=>{
			if (this.tpl.currentPage == 'review-all'){
				this.tpl.changeCondition('editing');
			}			
		})

		this.tpl.block.addEventListener('done', ()=>{
			if (this.tpl.currentPage == 'review-all'){
				this.tpl.changeCondition('viewing');
			}
		})

		this.tpl.block.addEventListener('exit', ()=>{		
			if (this.tpl.currentPage == 'review-all' && !this.innerComment.isOpen){
				this.tpl.close();
			}
		})

		this.tpl.block.addEventListener('close', ()=>{
			if (this.innerComment.isOpen) this.innerComment.close();
		})

		this.tpl.block.addEventListener('conditionChange', (event)=>{
		if (this.tpl.currentPage == 'review-all'){
			if (event.detail.from == 'viewing' && event.detail.to == 'editing'){
				this.block.querySelectorAll('.review-block__delete').forEach((trash)=>{
					trash.classList.remove("hidden");
					trash.parentElement.querySelector('.checkbox-toggle').classList.add("hidden");
				});
			}

			if (event.detail.from == 'editing' && event.detail.to == 'viewing'){
				this.block.querySelectorAll('.review-block__delete').forEach((trash)=>{
					trash.classList.add("hidden");
					trash.parentElement.querySelector('.checkbox-toggle').classList.remove("hidden");
				});
			}
			
		}})


	}
}