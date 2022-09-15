import InputNumber from "./input-number.js";

export default class InputNumberControls extends InputNumber {
  constructor(options) {
    super(options);

    this.step = options.step;

    const btnPlus = this.elem.querySelector(".input-number__btn--more");
    const btnMinus = this.elem.querySelector(".input-number__btn--less");

    btnPlus.addEventListener("click", this.plus.bind(this));
    btnMinus.addEventListener("click", this.minus.bind(this));
  }

  plus() {
    const value = Number(this.inputElem.value.replace(/\D/g, ""));
    const step = this.step;

    if (!this.max || value <= this.max + step) {
      this.inputElem.value = value + step;
      this.handleBlur();
    }
  }

  minus() {
    const value = Number(this.inputElem.value.replace(/\D/g, ""));
    const step = this.step;

    if (!this.min || value >= this.min + step) {
      this.inputElem.value = value - step;
      this.handleBlur();
    }
  }
}
