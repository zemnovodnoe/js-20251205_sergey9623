class Component {
  #element = null;
  #tagName = 'div'

  constructor (tagName = 'div') {
    this.#tagName = tagName ?? this.#tagName;
    if (!this.#element) {
      this.#element = document.createElement(this.#tagName);
    }
  }

  set html(content) {
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

export default class NotificationMessage extends Component {
  #title = "";
  duration = 1000;
  #type = 'success';  
  #timerID = null;
  static objectNotification = null;

  constructor(title, {duration = 1000, type = 'success'} = {}) {
    super();
    this.#title = title;
    this.duration = duration;
    this.#type = type;

    this.element.className = "notification " + this.#type;
    this.element.style.setProperty('--value', Math.floor(this.duration / 1000) + 's');
    this.render();
  }
 
  show(parent = document.body) {
    if (NotificationMessage.objectNotification) {
      clearTimeout(NotificationMessage.objectNotification.timerID);
      NotificationMessage.objectNotification.remove();
    }
    
    NotificationMessage.objectNotification = this;
    parent.appendChild(this.element);
    
    this.#timerID = setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  hide() {
    console.log('hide');
    clearTimeout(NotificationMessage.objectNotification.timerID);
    NotificationMessage.objectNotification.remove();
    NotificationMessage.objectNotification = null;
  }

  render() {
    this.html = `
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.#title}</div>
        <div class="notification-body">
          ${this.#type}
        </div>
      </div>
    `;
  }
}
