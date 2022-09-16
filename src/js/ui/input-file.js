export default class InputFile {
  constructor(options) {
    this.selector = options.selector;
    this.accept = options.accept;

    this.elem = document.querySelector(this.selector);
    this.field = this.elem.querySelector(".input-file__field");
    this.input = this.elem.querySelector("[type=file]");
    this.listElem = this.elem.querySelector(".input-file__list");

    this.input.accept = this.accept;

    this.input.addEventListener("input", this.handleInput.bind(this));
    this.listElem.addEventListener("click", this.handleClick.bind(this));

    this.filesList = [];
  }

  handleInput() {
    const files = [...this.input.files];
    files.forEach(this.addFile.bind(this));
  }

  handleClick(e) {
    const btn = e.target.closest("[data-fileid]");
    if (btn) {
      this.removeFile(btn.dataset.fileid);
    }
  }

  addFile(file) {
    const id = Number(Date.now()).toString(32);
    const fileName = file.name;

    const elem = document.createElement("div");
    elem.className = "input-file__file-item";
    elem.innerHTML = `
      <button data-fileid="${id}" class="input-file__btn-cancel" type="button">
        <span class="visually-hidden">Отмена</span>
        <svg width="8" height="8">
          <use xlink:href="./icons/icons.svg#close" />
        </svg>
      </button>
      <span data-field="filename">${fileName}</span>
      <div class="input-file__loader">
        <div class="input-file__loader-fill"></div>
      </div>
    `.trim();

    const fileData = {
      id,
      fileName,
      file,
      elem,
    };

    this.listElem.append(elem);

    this.filesList = [...this.filesList, fileData];

    if (this.filesList.length > 0) {
      this.elem.classList.add("_show-list");
    }

    this.preloadFile(fileData);
  }

  removeFile(id) {
    const file = this.filesList.find((el) => el.id === id);
    if (!file) {
      return;
    }

    file.elem.remove();
    this.filesList = this.filesList.filter((el) => el !== file);

    if (this.filesList.length === 0) {
      this.elem.classList.remove("_show-list");
    }
  }

  reset() {
    this.filesList = [];
  }

  // File preload emulation :)
  preloadFile(file) {
    const loadingScale = file.elem.querySelector(".input-file__loader-fill");
    const delay = Math.random() * 2;
    const loadSpeed = 1 + Math.random() * 5;

    loadingScale.style.animation = `load-file ${loadSpeed}s linear ${delay}s`;
    loadingScale.addEventListener("animationend", () => {
      loadingScale.parentElement.remove();
    });
  }
}
