/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Images.js
class Image {
  constructor(url, title) {
    this.url = url;
    this.title = title;
  }
  checkUrl(onLoadImg, onErrorLoadImg) {
    const img = document.createElement("img");
    img.addEventListener("load", () => {
      onLoadImg(this);
    });
    img.addEventListener("error", () => {
      onErrorLoadImg(this);
    });
    img.setAttribute("src", `${this.url}`);
  }
}
;// CONCATENATED MODULE: ./src/js/Render.js
class Render {
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
    this.addedImgs.addEventListener("click", event => {
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
;// CONCATENATED MODULE: ./src/js/Controller.js


class AppController {
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
      image: img
    };
    this.state.addImg(newImg);
    this.render.renderImg(newImg);
    this.render.clearForm();
  }
  onErrorLoadImg() {
    this.render.showError(`Неверный URL изображения!`);
  }
}
;// CONCATENATED MODULE: ./src/js/State.js
class State {
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
    const newImgs = this.images.filter(item => item.id !== id);
    this.images.splice(0, count, ...newImgs);
    this.saveImgs();
  }
}
;// CONCATENATED MODULE: ./src/js/app.js


const state = new State();
new AppController("#app", state);
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;