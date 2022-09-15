/* eslint-disable no-alert */

function validateField(field) {
  if (field.validate && typeof field.validate === "function") {
    return field.validate();
  }
  return true;
}

export default class Form {
  constructor(options) {
    this.selector = options.selector;
    this.fields = options.fields;

    this.form = document.querySelector(this.selector);

    this.form.addEventListener("submit", this.send.bind(this));
    this.form.addEventListener("reset", this.reset.bind(this));
  }

  send(e) {
    e.preventDefault();

    // 0. Validate fields
    const isFormValid = this.fields.reduce((result, field) => {
      return result && validateField(field);
    }, true);

    // Prevent next actions if some field is invalid
    if (!isFormValid) {
      return;
    }

    // 1. Preparing form data

    // 2. Fetching data to server and response await

    // 3. Show result
    alert("Данные успешно отправлены");
    this.form.reset();
  }

  reset() {}
}
