import { updateTrendingProducts } from "../item-manager/itemData";

export function setupTrendingFilter() {
  const trendingAllBtn = document.getElementById("trending-all-btn");
  const trendingFruitBtn = document.getElementById("trending-fruit-btn");
  const trendingJuiceBtn = document.getElementById("trending-juice-btn");

  function setActiveTrendingTab(activeBtn) {
    [trendingAllBtn, trendingFruitBtn, trendingJuiceBtn].forEach(btn => {
      if (btn) btn.classList.remove("products__tab--active");
    });
    if (activeBtn) activeBtn.classList.add("products__tab--active");
  }

  if (trendingAllBtn) {
    trendingAllBtn.addEventListener("click", () => {
      setActiveTrendingTab(trendingAllBtn);
      updateTrendingProducts("all");
    });
  }

  if (trendingFruitBtn) {
    trendingFruitBtn.addEventListener("click", () => {
      setActiveTrendingTab(trendingFruitBtn);
      updateTrendingProducts("fruit");
    });
  }

  if (trendingJuiceBtn) {
    trendingJuiceBtn.addEventListener("click", () => {
      setActiveTrendingTab(trendingJuiceBtn);
      updateTrendingProducts("juice");
    });
  }
}
