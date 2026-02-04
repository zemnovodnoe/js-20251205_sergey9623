//import { createElement } from "react";

class Component {
  #element = null;
  #tagName = 'div'

  constructor (tagName = 'div') {
    this.#tagName = tagName ?? this.#tagName;
  }

  set html(content) {
    if (!this.#element) {
      this.#element = document.createElement(this.#tagName);
    }
    this.#element.innerHTML = content;
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
    this.#element = null;
  }
}

export default class ColumnChart extends Component {
  #data = [];
  #label = '';
  #value = 0;
  #link = '#';
  chartHeight = 50;

  constructor (options = {}) {
    super();

    const opt = Object.assign({data: [], label: '', value: 0, link: '#', formatHeading: data => data}, options);
    this.#data = opt.data;
    this.#label = opt.label;
    this.#value = opt.value;
    this.#link = opt.link;
    this.formatValue = opt.formatHeading;
    
    this.render();
    
    
  }

  noDataPresent() {
    return this.#data.length === 0;
  }

  getLink() {
    return this.noDataPresent() ? `<a class = "column-chart__link" href = ${this.#link}>View all</a>` : "";
  }

  update(data) {
    this.#data = data;
    this.render();
  }

  renderData() {
    if (this.noDataPresent()) {return "";}
    const maxValue = Math.max(...this.#data);
    const k = this.chartHeight / maxValue;
    return this.#data.map(value => {
      const val = Math.floor(value * k);
      const percent = (value / maxValue * 100).toFixed(0);
      return `<div style="--value: ${val}" data-tooltip="${percent}%"></div>`;}
    ).join("\n");
  }

  render() {
    this.html = `
        <div class="column-chart" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.#label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.formatValue(this.#value)}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this.renderData()}
          </div>
        </div>
      </div>      
    `;
    if (this.noDataPresent()) {this.element.classList.add('column-chart_loading');}
  }  
}


