export default class Render {
	constructor(container) {
		this.container = container;
		this.submitFormListener;
		this.addedImgsListener;
		this.form;
		this.addedImgs;
		this.errorMess;
		this.titleNewImg;
		this.urlNewImg;

		this.renderPage();
	}

	renderPage() {
		const form = this.renderForm();
		this.form = form;
		this.container.append(form);

		const addedImgs = this.renderMainBodyPage();
		this.addedImgs = addedImgs;
		this.container.append(addedImgs);

		this.registerEvent();
	}

	registerEvent() {
		this.errorMess = this.form.querySelector(".add-img__error");
		this.titleNewImg = this.form.querySelector("#add-img__title");
		this.urlNewImg = this.form.querySelector("#add-img__link");

		this.form.addEventListener("submit", () => {
			event.preventDefault();
			this.submitFormListener();
		});

		this.addedImgs.addEventListener("click", (event) => {
			event.preventDefault();
			this.addedImgsListener(event);
		});
	}

	addSubmitFormListener(callback) {
		this.submitFormListener = callback;
	}
	addImgsListener(callback) {
		this.addedImgsListener = callback;
	}

	renderForm() {
		const form = document.createElement("form");
		form.classList.add("form-add-img");
		const formHTML = `
			<div class="add-img__main-block">
				<label for="add-img__title" class="add-img__label">
					<p class="label-img__text">
						Название: 
					</p>
					<input type="text" class="label-img__input" id="add-img__title" placeholder="Добавьте название">
				</label>
					
				<label for="add-img__link" class="add-img__label">
					<p class="label-img__text">
						Ссылка: 
					</p>
					<input type="text" class="label-img__input" id="add-img__link" placeholder="Добавьте ссылку">
				</label>
					
				<p class="add-img__error hidden-item">
				</p>
			</div>
				
			<button class="add-img__button" type="submit">
				Добавить
			</button>
		`;

		form.innerHTML = formHTML;
		return form;
	}

	renderMainBodyPage() {
		const addedImgs = document.createElement("aside");
		addedImgs.classList.add("img-list");

		return addedImgs;
	}

	renderListImgs(imgs) {
		for (let img of imgs) {
			this.renderImg(img);
		}
	}

	renderImg(img) {
		const newImg = document.createElement("div");
		const imgHtml = `
			<div class="img-container">
				<img class="img-container__img" src="${img.image.url}" alt="${img.image.title}">
				</div>
				<p class="img-name">
					${img.image.title}
				</p>
				<div class="img-close">
					&times;
				</div>
		`;
		newImg.dataset.id = img.id;
		newImg.classList.add("img-item");
		newImg.innerHTML = imgHtml;

		this.addedImgs.prepend(newImg);
	}

	showError(message) {
		this.errorMess;
		this.errorMess.textContent = message;
		this.errorMess.classList.remove("hidden-item");

		setTimeout(() => {
			this.closeError();
		}, 1000);
	}

	closeError() {
		this.errorMess.textContent = "";
		this.errorMess.classList.add("hidden-item");
	}

	clearForm() {
		this.titleNewImg.value = "";
		this.urlNewImg.value = "";
	}

	removeImg(id) {
		const img = this.addedImgs.querySelector(`[data-id="${id}"]`);
		img.remove();
	}
}
