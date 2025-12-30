import { ProductItem } from "../models/ProductItem";
import { renderProductItems } from "../cart-feature/productItemDOM";
import { renderCategories } from "../cart-feature/categoryDOM";
import { addToCart } from "../cart-feature/cartManager";
import { getProductList, getCategoryList } from "./fetchData";

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
const categoryData = await getCategoryList();

// Map mock data to ProductItem instances
export let itemList = {};
export let trendingProducts = [];
export let bestSellingProducts = [];
export let categories = categoryData;

console.log(mockProductData);
console.log('Categories:', categoryData);

// Build itemList
mockProductData.forEach((product) => {
  itemList[product.id] = product;
});

// Get top 10 trending products by soldThisYear (descending)
trendingProducts = [...mockProductData]
  .sort((a, b) => b.soldThisYear - a.soldThisYear)
  .slice(0, 10);

  console.log('Trending Products:', trendingProducts);
// Get top 10 best selling products by soldThisMonth (descending)
bestSellingProducts = [...mockProductData]
  .sort((a, b) => b.soldThisMonth - a.soldThisMonth)
  .slice(0, 10);

console.log('Best Selling Products:', bestSellingProducts);
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

  renderCategories(categories, "#categoryGrid");
  // Render trending products (top 10 by soldThisYear)
  renderProductItems(trendingProducts, "#trendingProductsGrid", true, addToCart);

  // Render best selling products (top 10 by soldThisMonth) with badges
  renderProductItems(
    bestSellingProducts,
    "#bestSellingProductsGrid",
    false,
    addToCart,

  // Render categories
  true,
  "Hot"
);
}

/**
 * Filter and re-render trending products
 * @param {'all' | 'fruit' | 'juice'} type
 */
export function updateTrendingProducts(type) {
  let filteredList = [];

  if (type === 'fruit') {
    // Category 1: Fruits & Vegetables
    filteredList = [...mockProductData]
      .filter(p => p.category === "1")
      .sort((a, b) => b.soldThisYear - a.soldThisYear)
      .slice(0, 10);
  } else if (type === 'juice') {
    // Category 4: Beverages (mapping for "Juices")
    filteredList = [...mockProductData]
      .filter(p => p.category === "4")
      .sort((a, b) => b.soldThisYear - a.soldThisYear)
      .slice(0, 10);
  } else {
    // Default: All trending
    filteredList = trendingProducts;
  }

  // Clear existing grid content
  const grid = document.querySelector("#trendingProductsGrid");
  if (grid) grid.innerHTML = "";

  // Re-render
  renderProductItems(filteredList, "#trendingProductsGrid", true, addToCart);
}