import InputNumber from "./input-number.js";

export default class InputNumberRange extends InputNumber {
  constructor(options) {
    super(options);

    this.scaleProportion = options.scaleProportion || 1;
    this.scaleStep = options.scaleStep;
    this.scaleMin = options.scaleMin;
    this.scaleMax = options.scaleMax;

    this.rangeElem = this.elem.querySelector(".input-range__slider");
    this.rangeElem.step = this.scaleStep;
    this.rangeElem.min = this.scaleMin;
    this.rangeElem.max = this.scaleMax;

    // Build scale
    const divisionsListElem = this.elem.querySelector(
      ".input-range__scale-divisions"
    );

    const divisionsList = [
      this.scaleMin,
      Math.floor(this.scaleMax / 4 + this.scaleMin),
      Math.floor(this.scaleMax / 2 + this.scaleMin),
      this.max ? this.scaleMax : `${this.scaleMax}+`,
    ];

    divisionsList.forEach((num) => {
      const li = document.createElement("li");
      li.innerHTML = num;
      divisionsListElem.append(li);
    });

    // Set handlers
    this.rangeElem.addEventListener("change", this.renderScaleFill.bind(this));

    this.rangeElem.addEventListener("input", this.handleRangeInput.bind(this));

    this.handeInputChange();
    this.renderScaleFill();
    return this;
  }

  handleInput() {
    super.handleInput();
    this.handeInputChange();
  }

  handleBlur() {
    super.handleBlur();
    this.handeInputChange();
  }

  handeInputChange() {
    const val =
      Number(this.inputElem.value.replace(/\D/g, "")) / this.scaleProportion;

    if (this.rangeElem) {
      this.rangeElem.value = val;
      this.renderScaleFill();
    }
  }

  handleRangeInput() {
    this.inputElem.value = Number(this.rangeElem.value) * this.scaleProportion;
    this.handleBlur();
    this.renderScaleFill();
  }

  renderScaleFill() {
    const max = this.scaleMax - this.scaleMin;
    const value = this.rangeElem.value - this.scaleMin;
    const percentage = (100 / max) * value;

    this.rangeElem.style.backgroundSize = `${percentage}% 100%`;
  }
}
