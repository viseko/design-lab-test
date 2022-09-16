// Data
import goodsData from "../data/goods.js";

const table = document.querySelector(".table");

const tableRows = goodsData.map((data) => {
  // Cloning HTML-template
  const rowBlockFragment = document
    .querySelector("#js-table-row-block")
    .content.cloneNode(true);

  const rowBlock = rowBlockFragment.firstElementChild;
  rowBlock.querySelector("[data-field=name]").innerHTML = data.name;
  rowBlock.querySelector("[data-field=material]").innerHTML = data.material;
  rowBlock.querySelector("[data-field=sizes]").innerHTML = `${data.sizes.join(
    " × "
  )}&nbsp;мм`;
  rowBlock.querySelector(
    "[data-field=price]"
  ).innerHTML = `${data.price}&nbsp;₽`;

  return rowBlock;
});

tableRows.forEach((row) => {
  table.append(row);
});
