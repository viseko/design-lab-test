import InputText from "./input-text.js";

export default class InputNumber extends InputText {
  constructor(options) {
    super(options);

    this.unit = options.unit;
    this.min = options.min;
    this.max = options.max;

    this.inputElem.addEventListener("input", this.handleInput.bind(this));

    this.inputElem.addEventListener("focus", this.handleFocus.bind(this));

    this.inputElem.addEventListener("blur", this.handleBlur.bind(this));

    this.handleBlur();
    return this;
  }

  handleInput() {
    // Allow input only numbers
    this.inputElem.value = this.inputElem.value.replace(/\D/g, "");
  }

  handleFocus() {
    // Remove spaces when focus
    this.inputElem.value = this.inputElem.value.replace(/\s/g, "");

    if (this.unit) {
      const regexp = new RegExp(`${this.unit}$`);
      this.inputElem.value = this.inputElem.value.replace(regexp, "");
    }
  }

  handleBlur() {
    const value = Number(this.inputElem.value);

    // Bring value to acceptable range
    if (this.min && value < this.min) {
      this.inputElem.value = this.min;
    } else if (this.max && value < this.max) {
      this.inputElem.value = this.max;
    }

    // Format number
    this.inputElem.value = this.inputElem.value.replace(
      /(\d)(?=(\d{3})+$)/g,
      "$1 "
    );

    if (this.unit) {
      this.inputElem.value = this.inputElem.value.replace(/$/, ` ${this.unit}`);
    }
  }
}
