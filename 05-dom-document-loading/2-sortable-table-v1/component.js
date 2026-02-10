export class Component {
  #element = null;
  #tagName = 'div'

  constructor(tagName = 'div') {
    this.#tagName = tagName ?? this.#tagName;
    if (!this.#element) {
      this.#element = document.createElement(this.#tagName);
    }
  }

  set html(content) {
    const tmp = this.#element;
    tmp.innerHTML = content;
    this.#element = tmp.firstElementChild;
    //this.#element.innerHTML = content;

  }

  get element() {
    return this.#element;
  }

  remove() {
    if (this.#element) {
      this.#element.remove();
    }
  }

  destroy() {
    this.remove();
    this.#element = null;
  }
}