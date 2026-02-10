import { Component } from "./component.js";

export default class SortableTable extends Component {
  #data;
  #header;
  constructor(header = [], data = []) {
    super();
    this.#header = header;
    this.#data = data;
    this.render();
  }

  render() {
    this.html = this.#template();
  }

  #template() {
    return `
    <div class="sortable-table">
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.#headerTemplate()}
      </div>

      <div data-element="body" class="sortable-table__body">
        ${this.#dataTemplate()}
      </div>      
    </div>`;
  }

  #headerTemplate() {
    return this.#header.map(({ id, title, sortable }) => `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
          <span>${title}</span>
        </div>`
    ).join('\n');
  }

  #dataTemplate() {
    const headerIDs = [];
    this.#header.forEach(item => headerIDs.push(item.id));

    return this.#data.map((item) => `
        <div class="sortable-table__row">
          ${headerIDs.map(id => `
            <div class="sortable-table__cell">${item[id]}</div>`
          ).join('\n')}
        </div>`
    ).join('\n');
  }

  sort(fieldValue, orderValue) {
    const directions = { 'asc': 1, 'desc': -1 };
    const direction = directions[orderValue] ?? 1;

    let { title, sortable, sortType } = this.#header.find(item => item.id === fieldValue);
    if (sortable === false) {return;}

    if (sortType === 'number') {
      this.#data.sort((a, b) => (a[fieldValue] - b[fieldValue]) * direction);
    } else if (sortType === 'string') {
      this.#data.sort((a, b) => (a[fieldValue].localeCompare(b[fieldValue], ['ru', 'en'], { caseFirst: 'upper' })) * direction);
    }
    this.render();
  }

  get subElements() {
    return {
      header: this.element.querySelector('.sortable-table__header'),
      body: this.element.querySelector('.sortable-table__body')
    };
  }
}
