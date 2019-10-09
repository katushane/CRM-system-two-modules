// class ReviewInfo extends BlockControl {
// 	constructor (
// 		blockInfo, 
// 		tpl) {
// 		super(blockInfo, 'reviewInfo');

// 		this.tpl = tpl;
// 	};

// 	bindNeedsEventsOnReview() {
// 		this.block.addEventListener('click', (event) => {
// 			if (event.target.tagName === 'INPUT') {
// 				let disableComment = {};
// 				disableComment.id = this.selectedReview.id;
// 				disableComment.display = Number(event.target.checked);
// 				let suc = () => {
// 						notie.alert(1, GlobalVars.reviewLang['success'], 1);
// 						super.makeEvent('updateReview',disableComment);
// 					};

// 					let error = () => {
// 						notie.alert(2, GlobalVars.reviewLang['error'], 2);
// 					};

// 					backendApiRequest([
// 						formAction(
// 							'edit',
// 							'Reviews',
// 					  		disableComment)
// 						],
// 						{
// 							callbackSuccess: suc,
// 							callbackError: error
// 						});
// 			}
// 		});
// 	};

// 	loadReview (review) {
// 		this.selectedReview = review;
// 		this.block.querySelector('.stars').innerHTML = this.createStars(5, review.countstars);
// 		this.block.querySelector('#client-name').innerHTML = review.first_name + " " + review.last_name;
// 		this.block.querySelector('.likes-count').innerHTML = review.likes;
// 		this.block.querySelector('#title').innerHTML = review.titlecomment;
// 		this.block.querySelector('#text').innerHTML = review.textcomment;
// 		this.block.querySelector('#reviewTime').innerHTML = review.datecomment;
// 		this.block.querySelector("input[type=checkbox]").checked = Number(review.display);

// 		this.bindNeedsEventsOnReview();
// 	};

// 	createStars(count, rating = 0){
// 	    var s = '';
// 	    for (var i = 0; i < count; i++){
// 	        if (rating > 0){
// 	            rating--;
// 	            s = s + '<i class="font-icon font-icon-star active"></i>';
// 	        }
// 	        else s = s + '<i class="font-icon font-icon-star no-active" ></i>';;
// 	    }
// 	    return s;
// 	};

// }
// 
class ReviewInfo extends BlockControl {
	constructor (
		blockInfo, 
		tpl) {
		super(blockInfo, 'reviewInfo');

		this.tpl = tpl;
	};

	bindNeedsEventsOnReview() {

		this.block.querySelector('[data-id=reviewStatus]').addEventListener('click', (ev) => {
			let currentStatus = ev.currentTarget.classList.contains('is-pressed') ? 1 : 0,
				actions = [],
				comparedData = {id: this.selectedReview.id, display: currentStatus};
				console.log(comparedData)
            actions.push(formAction('edit', 'Reviews', comparedData));
            let suc = () => {
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
		});

		// this.block.addEventListener('click', (event) => {
		// 	console.log(event.target.tagName);
		// 	if (event.target.tagName === 'LABEL') {
		// 		let disableComment = {};
		// 		disableComment.id = this.selectedReview.id;
		// 		console.log(event.target);
		// 		disableComment.display = Number(event.target.checked);
		// 		let suc = () => {
		// 				notie.alert(1, GlobalVars.reviewLang['success'], 1);
		// 				super.makeEvent('updateReview',disableComment);
		// 			};

		// 			let error = () => {
		// 				notie.alert(2, GlobalVars.reviewLang['error'], 2);
		// 			};

		// 			backendApiRequest([
		// 				formAction(
		// 					'edit',
		// 					'Reviews',
		// 			  		disableComment)
		// 				],
		// 				{
		// 					callbackSuccess: suc,
		// 					callbackError: error
		// 				});
		// 	}
		// });
	};

	loadReview (review) {
		console.log(review);
		this.selectedReview = review;
		this.block.querySelector('.stars').innerHTML = this.createStars(5, review.countStars);
		this.block.querySelector('#client-name').innerHTML = review.firstName + ' ' + review.lastName;
		this.block.querySelector('.likes-count').innerHTML = review.likes;
		this.block.querySelector('#title').innerHTML = review.titleComment;
		this.block.querySelector('#text').innerHTML = review.textComment;
		this.block.querySelector('#reviewTime').innerHTML = review.dateComment;
		(Number(review.display)==1) ? this.block.querySelector('[data-id=reviewStatus]').classList.add('is-pressed') 
		: this.block.querySelector('[data-id=reviewStatus]').classList.remove('is-pressed');
		this.bindNeedsEventsOnReview();
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

}