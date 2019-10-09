class CommentsInner extends TplInner {
	constructor({block = document.querySelector('#review-all-inner'), tpl}) {
		super(block);
		super.initActions();

		this.tpl = tpl;
		this.selectComment;
		this._initHandlers();

	}

	_initHandlers () {
        let block = this.block;

		//выход из tplInner
		block.addEventListener('back', () => {
			let constructor = this;					
			constructor.selectComment = undefined; 
			constructor.close();
		});

		this.tpl.block.addEventListener('exit',()=>{
			this.close();
		})
	}

	showComment (comment, clientData) {
		console.log(comment)
		this.selectComment = comment;
		this.block.querySelector('.fio').innerHTML = clientData;


		this.block.querySelector('.date').innerHTML = comment.dateComment;
		this.block.querySelector('.likes-count').innerHTML = comment.likes;
		this.block.querySelector('.stars').innerHTML = this.createStars(5, comment.countStars)

		Fields.push(this.block, {
			'title': comment.titleComment,
			'textComment': comment.textComment
		});
	}

	createStars(count, rating = 0){
	    var s = '';
	    for (var i = 0; i < count; i++){
	        if (rating > 0){
	            rating--;
	            s = s + '<i class="font-icon font-icon-star active"></i>';
	        }
	        else s = s + '<i class="font-icon font-icon-star no-active"></i>';;
	    }
	    return s;
	}
}