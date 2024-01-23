export default class Image {
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
