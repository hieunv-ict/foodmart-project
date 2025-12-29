import { ProductItem } from "../models/ProductItem";
import { renderProductItems } from "../cart-feature/productItemDOM";
import { addToCart } from "../cart-feature/cartManager";
import { getProductList, fetchProductData } from "./fetchData";

// Mock data object
// const mockProductData = [
//   // { id: "1", name: "Fresh Organic Bananas", price: 5, imgSrc: bananaImg, category:"Fruits", description:"",soldThisMonth: 10, soldthisYear: 100 },
//   // { id: "2", name: "Whole Milk 1 Gallon", price: 10, imgSrc: milkImg },
//   // { id: "3", name: "Organic Red Tomatoes", price: 8, imgSrc: tomatoImg },
//   // { id: "4", name: "Premium Tomato Ketchup", price: 6, imgSrc: ketchupImg },
//   // { id: "5", name: "Fresh Green Bananas", price: 4.5, imgSrc: bananaImg },
//   // { id: "6", name: "Low Fat Milk", price: 9, imgSrc: milkImg },
//   // { id: "7", name: "Cherry Tomatoes Pack", price: 7, imgSrc: tomatoImg },
//   // { id: "8", name: "Organic Ketchup", price: 7.5, imgSrc: ketchupImg },
// ];

const mockProductData = await getProductList();
// Map mock data to ProductItem instances
export let itemList = {};
export let trendingProducts = [];
export let bestSellingProducts = [];
export let categories = [];

console.log(mockProductData);

// Build itemList
mockProductData.forEach((product) => {
  itemList[product.id] = product;
});

// Get top 10 trending products by soldThisYear (descending)
trendingProducts = [...mockProductData]
  .sort((a, b) => b.soldThisYear - a.soldThisYear)
  .slice(0, 10);

// Get top 10 best selling products by soldThisMonth (descending)
bestSellingProducts = [...mockProductData]
  .sort((a, b) => b.soldThisMonth - a.soldThisMonth)
  .slice(0, 10);

// Render products to DOM
export function setProductCards() {
  let products = document.querySelectorAll(".product-card");
  for (let p of products) {
    let itemId = p.dataset.itemid; // use data attributes (added manually) to 2 product card
    let itemData = itemList[itemId];
    let addBtn = p.querySelector(".product-card__add-btn");
    if (itemId !== undefined) {
      addBtn.addEventListener("click", (e) => addToCart(itemData, 1));
    }
  }

  // Render trending products (top 10 by soldThisYear)
  renderProductItems(trendingProducts, "#trendingProductsGrid", addToCart);

  // Render best selling products (top 10 by soldThisMonth) with badges
  renderProductItems(
    bestSellingProducts,
    "#bestSellingProductsGrid",
    addToCart,
    true,
    "Hot"
  );
}

// Update product display when button is clicked
function updateProductDisplay(products) {
  const grid = document.getElementById("bestSellingProductsGrid");
  grid.innerHTML = "";
  renderProductItems(products, "#bestSellingProductsGrid", addToCart);
}
