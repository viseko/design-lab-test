// UI components
import InputText from "../ui/input-text.js";
import InputNumberRange from "../ui/input-number-range.js";
import InputNumberControls from "../ui/input-number-controls.js";
import Checkbox from "../ui/checkbox.js";

import InputPassword from "../ui/input-password.js";
import InputSelect from "../ui/input-select.js";
import InputTags from "../ui/input-tags.js";
import InputFile from "../ui/input-file.js";
import Form from "../ui/form.js";

// Init form inputs
const formFields = [
  new InputText({
    selector: ".js-form-name",
    minLength: 1,
  }),
  new InputNumberRange({
    selector: ".js-input-range",
    unit: "₽",
    min: 10000000,
    scaleProportion: 1000000,
    scaleStep: 1,
    scaleMin: 10,
    scaleMax: 40,
    value: 10000000,
  }),
  new InputNumberControls({
    selector: ".js-input-number",
    unit: "м²",
    min: 10,
    step: 10,
    value: 10,
  }),
  new Checkbox({
    selector: ".js-checkbox",
    value: "Вайтбокс",
    offValue: "Нет",
    checked: true,
  }),
  new InputText({
    selector: ".js-input-phone",
    mask: "+7 ___ ___-__-__",
    minLength: "16",
    blurValidate: true,
  }),
  new InputText({
    selector: ".js-input-mail",
    pattern: /.+@.+\..+/,
    blurValidate: true,
  }),
  new InputSelect(".js-input-select"),
  new InputPassword({
    selector: ".js-input-password",
    minLength: 6,
  }),
  new InputTags({
    selector: ".js-input-tags",
    divider: ",",
    placeholder: "укажите через запятую",
    fieldName: "wishes",
  }),
  new InputFile({
    selector: ".js-input-file",
    accept: ".jpg",
  }),
];

// Init form
new Form({
  selector: ".js-form",
  fields: formFields,
});
