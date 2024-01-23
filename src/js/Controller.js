import Image from "./Images";
import Render from "./Render";

export default class AppController {
	constructor(container, state) {
		this.container = document.querySelector(container);
		this.state = state;
		this.render = new Render(this.container);

		this.init();
	}

	init() {
		this.addListeners();
		if (this.state.loadImgs()) {
			this.render.renderListImgs(this.state.images);
		}
	}

	addListeners() {
		this.render.addSubmitFormListener(this.onSubmitForm.bind(this));

		this.render.addImgsListener(this.onRemoveImg.bind(this));
	}

	onSubmitForm() {
		const titleImg = this.render.titleNewImg.value.trim();
		const urlImg = this.render.urlNewImg.value.trim();

		if (titleImg.length === 0 || urlImg.length === 0) {
			this.render.showError("Нужно заполнить оба поля!");

			return;
		}

		const img = new Image(urlImg, titleImg);
		img.checkUrl(this.onLoadImg.bind(this), this.onErrorLoadImg.bind(this));
	}

	onRemoveImg(event) {
		if (!event.target.classList.contains("img-close")) {
			return;
		}

		const containerImg = event.target.closest(".img-item");
		const id = Number(containerImg.dataset.id);

		this.state.removeImg(id);
		this.render.removeImg(id);
	}

	onLoadImg(img) {
		const newImg = {
			id: this.state.nextId,
			image: img,
		};
		this.state.addImg(newImg);
		this.render.renderImg(newImg);
		this.render.clearForm();
	}

	onErrorLoadImg() {
		this.render.showError(`Неверный URL изображения!`);
	}
}
