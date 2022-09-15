export default class Checkbox {
  constructor(options) {
    this.selector = options.selector;
    this.value = options.value;
    this.checked = options.checked || false;
    this.offValue = options.offValue;

    this.elem = document.querySelector(this.selector);
    this.checkbox = this.elem.querySelector("[type=checkbox]");
    this.label = this.elem.querySelector(".checkbox__label");

    this.checkbox.checked = this.checked;

    this.checkbox.addEventListener("change", this.changeHandler.bind(this));

    this.changeHandler();
    return this;
  }

  changeHandler() {
    this.label.innerHTML = this.checkbox.checked ? this.value : this.offValue;
  }
}
