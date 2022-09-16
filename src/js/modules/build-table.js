// jQuery
import $ from "jquery";

// Data
import goodsData from "../data/goods.js";

const $table = $(".table");

const $tableRows = goodsData.map((data) => {
  // Cloning HTML-template
  const $rowBlock = $($("#js-table-row-block").html().trim());
  $rowBlock.find("[data-field=name]").html(data.name);
  $rowBlock.find("[data-field=material]").html(data.material);
  $rowBlock
    .find("[data-field=sizes]")
    .html(`${data.sizes.join(" × ")}&nbsp;мм`);
  $rowBlock.find("[data-field=price]").html(`${data.price}&nbsp;₽`);

  return $rowBlock;
});

$table.append($tableRows);
