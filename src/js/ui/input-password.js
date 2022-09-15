import InputText from "./input-text.js";

export default class InputPassword extends InputText {
  constructor(options) {
    super(options);

    this.hidden = true;

    const btn = this.elem.querySelector("button");
    btn.addEventListener("click", this.showHide.bind(this));
  }

  showHide() {
    if (this.hidden) {
      this.hidden = false;
      this.elem.classList.add("_show");
      this.inputElem.type = "text";
    } else {
      this.hidden = true;
      this.elem.classList.remove("_show");
      this.inputElem.type = "password";
    }
  }
}
