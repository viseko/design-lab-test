import addMask from "../modules/mask.js";

export default class InputText {
  constructor(options) {
    // Get options
    this.selector = options.selector;
    this.required = false;
    this.mask = options.mask;
    this.minLength = options.minLength || 0;
    this.placeholder = options.placeholder;
    this.value = options.value || "";
    this.mask = options.mask;
    this.blurValidate = options.blurValidate;
    this.pattern = options.pattern;

    // Init other fields
    this.elem = document.querySelector(this.selector);
    this.inputElem = this.elem.querySelector(".input__field");

    // Adding handlers
    this.inputElem.addEventListener("input", () => {
      if (!this.valid) {
        this.valid = true;
        this.elem.classList.remove("input--invalid");
      }
    });

    // Adding mask
    if (this.mask) {
      addMask(this.inputElem, this.mask);
    }

    if (this.blurValidate) {
      this.inputElem.addEventListener("blur", this.validate.bind(this));
    }

    this.reset();

    return this;
  }

  validate() {
    const setValid = () => {
      this.elem.classList.add("input--invalid");
      this.elem.classList.remove("input--valid");
      this.valid = false;
    };

    const setInvalid = () => {
      this.elem.classList.add("input--valid");
      this.elem.classList.remove("input--invalid");
      this.valid = true;
    };

    // Validate by value length
    if (this.minLength > 0) {
      if (this.inputElem.value.length < this.minLength) {
        setValid();
      } else {
        setInvalid();
      }
    }

    // Validate by pattern
    if (this.pattern) {
      if (this.pattern.test(this.inputElem.value)) {
        setInvalid();
      } else {
        setValid();
      }
    }

    return this.valid;
  }

  reset() {
    this.valid = true;
    this.elem.classList.remove("input--invalid");
    this.elem.classList.remove("input--valid");
    this.inputElem.value = this.value;
  }
}
