// Import Swiper
import Swiper, { Navigation, Pagination, Grid, Manipulation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";

// Import data
import photosData from "../data/photos.js";

// Gallery Elements
const galleryList = document.querySelector(".js-gallery-list");
const slideTemplate = document.querySelector("#js-gallery-slide").content;
const galleryFilterList = document.querySelector(".gallery__filter");

// Append slides
function appendSlides(type) {
  const selectedItems =
    type === "all"
      ? photosData
      : photosData.filter((item) => item.type === type);

  selectedItems.forEach((data) => {
    const slideFragment = slideTemplate.cloneNode(true);
    const slide = slideFragment.querySelector(".gallery__slide");
    const desktopImg = slide.querySelector("[data-source=desktop]");
    const desktopWebp = slide.querySelector("[data-source=desktop-webp]");
    const mobileImg = slide.querySelector("[data-source=mobile]");
    const mobileWebp = slide.querySelector("[data-source=mobile-webp]");

    slide.dataset.type = data.type;
    desktopImg.alt = data.type;
    desktopImg.src = `../img/gallery/${data.img}.jpg`;
    desktopImg.srcset = `../img/gallery/${data.img}@2x.jpg 2x`;
    desktopWebp.srcset = `../img/gallery/${data.img}.webp, ../img/gallery/${data.img}@2x.webp 2x`;
    mobileImg.srcset = `../img/gallery/${data.img}-mobile.jpg, ../img/gallery/${data.img}.jpg 2x`;
    mobileWebp.srcset = `../img/gallery/${data.img}-mobile.webp, ../img/gallery/${data.img}.webp 2x`;

    galleryList.append(slideFragment);
  });
}

appendSlides("all");

// Init swiper
const gallery = new Swiper(".js-gallery-slider", {
  // configure Swiper to use modules
  modules: [Navigation, Pagination, Grid, Manipulation],

  slidesPerView: 2,
  slidesPerGroup: 4,
  grid: {
    fill: "row",
    rows: 2,
  },
  spaceBetween: 9,

  pagination: {
    el: ".gallery__pagination",
    bulletClass: "gallery__pagination-bullet",
    bulletActiveClass: "gallery__pagination-bullet--active",
    bulletElement: "button",
    clickable: true,
  },

  navigation: {
    nextEl: ".js-gallery-next",
    prevEl: ".js-gallery-prev",
  },

  breakpoints: {
    1200: {
      slidesPerView: 4,
      slidesPErGroup: 8,
      spaceBetween: 25,
      grid: {
        fill: "row",
        rows: 2,
      },
    },
    800: {
      slidesPerView: 3,
      slidesPErGroup: 6,
      spaceBetween: 15,
      grid: {
        fill: "row",
        rows: 2,
      },
    },
  },
});

// Init filter
function filterSlides(type) {
  // Highlight filter button
  const activeButton = galleryFilterList.querySelector("._active");
  if (activeButton) {
    activeButton.classList.remove("_active");
  }

  const newActiveButton = galleryFilterList.querySelector(
    `[data-type=${type}]`
  );

  newActiveButton.classList.add("_active");

  // Slides maniipulation
  gallery.removeAllSlides();
  appendSlides(type);
  gallery.update();
}

function handleFilterClick(e) {
  const btn = e.target.closest(".gallery__filter-btn");
  if (btn) {
    const type = btn.dataset.type;
    filterSlides(type);
  }
}

filterSlides("all");

galleryFilterList.addEventListener("click", handleFilterClick);
