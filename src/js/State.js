export default class State {
	constructor() {
		this.images = [];
		this.nextId = 0;
	}

	loadImgs() {
		const savedStateJSON = localStorage.getItem("ImgManager");
		const savedState = JSON.parse(savedStateJSON);

		if (savedState) {
			this.images = savedState.images;
			this.nextId = savedState.nextId;
			return true;
		}
	}

	saveImgs() {
		const thisState = JSON.stringify(this);
		localStorage.setItem("ImgManager", thisState);
	}

	addImg(image) {
		this.images.push(image);
		this.nextId += 1;
		this.saveImgs();
	}

	removeImg(id) {
		const count = this.images.length;
		const newImgs = this.images.filter((item) => item.id !== id);

		this.images.splice(0, count, ...newImgs);
		this.saveImgs();
	}
}
