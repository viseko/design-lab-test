export default class InputSelect {
  constructor(selector) {
    this.elem = document.querySelector(selector);

    this.opened = false;
    this.field = this.elem.querySelector(".input-select__field");
    this.options = this.elem.querySelectorAll(".input-select__option-item");

    // Adding handlers
    this.field.addEventListener("click", this.handleOpening.bind(this));

    document.addEventListener("click", () => {
      if (this.opened) {
        this.close();
      }
    });

    this.options.forEach((option) => {
      option.addEventListener("click", () => {
        this.handleCheck(option);
      });
    });

    // Init
    this.init();

    return this;
  }

  init() {
    const checked = this.elem.querySelector("[checked]");
    if (checked) {
      const option = checked.parentElement;
      option.classList.add("input-select__option-item--selected");
    }
    this.showValue();
  }

  handleOpening(e) {
    e.stopPropagation();

    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  handleCheck(option) {
    const oldSelected = this.elem.querySelector(
      ".input-select__option-item--selected"
    );

    if (oldSelected) {
      const radio = oldSelected.querySelector("[type=radio]");
      radio.removeAttribute("checked");
      oldSelected.classList.remove("input-select__option-item--selected");
    }

    option.classList.add("input-select__option-item--selected");
    const radio = option.querySelector("[type=radio]");
    radio.setAttribute("checked", true);

    this.showValue();
  }

  showValue() {
    const checkedRadio = this.elem.querySelector("[checked]");
    if (checkedRadio) {
      const value = checkedRadio.nextElementSibling.innerHTML;
      this.field.innerHTML = value;
    }
  }

  open() {
    this.elem.classList.add("_open");
    this.opened = true;
  }

  close() {
    this.elem.classList.remove("_open");
    this.opened = false;
  }
}
