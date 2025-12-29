import "../node_modules/normalize.css/normalize.css";
import "./style.css";
import "./cart.css";

import { addCartFeature } from "./cart-feature/cartDOM.js";
import { setProductCards } from "./item-manager/itemData.js";
addCartFeature();
setProductCards();
// Slider next and previous
/**
 * @param {string} prevBtnId
 * @param {string} nextBtnId
 * @param {string} gridId
 * @param {number} gapSize
 */
function setupSlider(prevBtnId, nextBtnId, gridId, gapSize) {
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  const grid = document.getElementById(gridId);

  if (!prevBtn || !nextBtn || !grid) return;

  let currentPosition = 0;

  // Cập nhật trạng thái nút
  function updateButtonState(pos, maxScroll) {
    // Nút Prev
    if (pos < -1) {
      // Cho phép sai số nhỏ 1px
      prevBtn.classList.add("products__tab--active");
      prevBtn.style.opacity = "1";
    } else {
      prevBtn.classList.remove("products__tab--active");
      prevBtn.style.opacity = "0.5";
    }
    // Nút Next
    if (Math.abs(pos) < maxScroll - 1) {
      nextBtn.classList.add("products__tab--active");
      nextBtn.style.opacity = "1";
    } else {
      nextBtn.classList.remove("products__tab--active");
      nextBtn.style.opacity = "0.5";
    }
  }

  function move(direction) {
    const firstItem = grid.children[0];
    if (!firstItem) return;
    const containerWidth = grid.parentElement.clientWidth;
    const itemExactWidth = firstItem.getBoundingClientRect().width;
    const itemsVisible = Math.round(
      (containerWidth + gapSize) / (itemExactWidth + gapSize)
    );

    const moveStep = (containerWidth + gapSize) / itemsVisible;

    const totalScrollWidth = grid.children.length * moveStep - gapSize;
    const maxScroll = totalScrollWidth - containerWidth;

    if (direction === "next") {
      if (Math.abs(currentPosition) < maxScroll - 2) {
        currentPosition -= moveStep;
      }
    } else {
      if (currentPosition < -2) {
        currentPosition += moveStep;
      } else {
        currentPosition = 0;
      }
    }

    if (Math.abs(currentPosition) > maxScroll) {
      currentPosition = -maxScroll;
    }

    grid.style.transform = `translateX(${currentPosition}px)`;

    updateButtonState(currentPosition, maxScroll);
  }

  prevBtn.addEventListener("click", () => move("prev"));
  nextBtn.addEventListener("click", () => move("next"));

  // Reset khi resize màn hình
  window.addEventListener("resize", () => {
    currentPosition = 0;
    grid.style.transform = `translateX(0px)`;
    prevBtn.classList.remove("products__tab--active");
    prevBtn.style.opacity = "0.5";
    nextBtn.classList.add("products__tab--active");
    nextBtn.style.opacity = "1";
  });

  setTimeout(() => {
    const containerWidth = grid.parentElement.clientWidth;
    const firstItem = grid.children[0];
    if (firstItem) {
      const itemExactWidth = firstItem.getBoundingClientRect().width;
      const itemsVisible = Math.round(
        (containerWidth + gapSize) / (itemExactWidth + gapSize)
      );
      const moveStep = (containerWidth + gapSize) / itemsVisible;
      const totalScrollWidth = grid.children.length * moveStep - gapSize;
      updateButtonState(0, totalScrollWidth - containerWidth);
    }
  }, 100);
}

setupSlider("prevBtn", "nextBtn", "bestSellingProductsGrid", 24);
setupSlider("prevCatBtn", "nextCatBtn", "categoryGrid", 24);
