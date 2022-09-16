export default class InputTags {
  constructor(options) {
    this.selector = options.selector;
    this.divider = options.divider;
    this.placeholder = options.placeholder;
    this.fieldName = options.fieldName;

    this.elem = document.querySelector(this.selector);
    this.field = this.elem.querySelector(".input__field");
    this.taglistElem = this.elem.querySelector(".input-tags__list");
    this.tags = [];

    this.field.placeholder = this.placeholder;

    // Adding handlers
    this.field.addEventListener("input", this.handleInput.bind(this));
    this.taglistElem.addEventListener("click", this.handleClick.bind(this));

    return this;
  }

  handleInput(e) {
    const input = e.target;
    const value = e.target.value;

    const dividorIndex = value.indexOf(this.divider);
    if (dividorIndex !== -1) {
      const tagValue = value.slice(0, dividorIndex).trim();
      if (tagValue.length) {
        this.insertTag(tagValue);
      }

      input.value = value.slice(-1, dividorIndex);
    }
  }

  handleClick(e) {
    const btn = e.target.closest("[data-tagid]");
    if (btn) {
      this.removeTag(btn.dataset.tagid);
    }
  }

  insertTag(str) {
    const id = Number(Date.now()).toString(32);
    const name = this.fieldName;

    const elem = document.createElement("li");
    elem.className = "input-tags__item";
    elem.innerHTML = `
      <input type="checkbox" name="${name}" value="${str}">
      <span>${str}</span>
      <button data-tagid="${id}" type="button" class="input-tags__btn-remove">
        <span class="visually-hidden">Удалить</span>
        <svg width="8" height="8">
          <use xlink:href="./icons/icons.svg#close" />
        </svg>
      </button>
    `.trim();

    const tag = {
      id,
      elem,
    };

    this.taglistElem.append(elem);

    this.tags = [...this.tags, tag];

    if (this.tags.length) {
      this.elem.classList.add("_show-list");
    }
  }

  removeTag(id) {
    const tag = this.tags.find((el) => el.id === id);
    if (!tag) {
      return;
    }

    tag.elem.remove();
    this.tags = this.tags.filter((el) => el !== tag);

    if (this.tags.length === 0) {
      this.elem.classList.remove("_show-list");
    }
  }
}
