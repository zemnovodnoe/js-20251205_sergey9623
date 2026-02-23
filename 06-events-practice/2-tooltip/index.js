class Tooltip {
  static obj = null;
  element = null;
  constructor() {
    if (!Tooltip.obj) {
      Tooltip.obj = this;
    }
    return Tooltip.obj;
  }

  initialize() {
    if (!this.element) {
      this.element = document.createElement('div');
      this.element.className = "tooltip";
      document.body.append(this.element);
      document.addEventListener('pointerover', (event) => { this.onMouseIn(event); });
    }
  }

  onMouseIn(event) {
    if (event.target.dataset.tooltip) {
      this.render(event.target.dataset.tooltip);
      document.addEventListener('mousemove', (event) => { this.onMouseMove(event); });
      document.addEventListener('pointerout', (event) => { this.onMouseOut(event); });
    }
  }

  onMouseMove(event) {
    if (this.element) {
      this.element.style.left = event.clientX + "px";
      this.element.style.top = event.clientY + "px";
    }
  }

  onMouseOut(_) {
    if (this.element) {
      removeEventListener('pointerout', this.onMouseOut);
      removeEventListener('mousemove', this.onMouseMove);
      this.destroy();
    }
  }

  render(text) {
    if (!this.element) {
      this.element = document.createElement('div');
      this.element.className = "tooltip";
      document.body.append(this.element);
    }
    this.element.innerHTML = text;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}

export default Tooltip;
