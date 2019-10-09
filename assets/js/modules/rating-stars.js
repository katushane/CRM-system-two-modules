class RaitingStars extends BlockControl {
	constructor (blockStars) {

		super(blockStars, 'blockStars');
		this.currentNumberOfStars = 0;
	}

	// _initHandlers () {
	// 	this.block.addEventListener('click', (ev) => {

	// 	});
	// };

	createStars (countStars) {

		this.block.addEventListener('click', (ev) => {
			let element = ev.target;
			block.querySelectorAll('i').forEach((el) =>{
				el.classList.remove('active');
			});
			this.prevAll(element).forEach((el,countStars) =>{
				el.classList.add('active');
				this.selectFilter['rating']=element.getAttribute('number');
			});
		});
	};

	clearBlockStars () {

	};

	prevAll (element) {
		var result = [];
		result.push(element);
		while (element = element.previousElementSibling)
			result.push(element);
		return result;
	};

}