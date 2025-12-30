import { ProductItem } from "../models/ProductItem";
import { renderProductItems } from "../cart-feature/productItemDOM";
import { renderCategories } from "../cart-feature/categoryDOM";
import { addToCart } from "../cart-feature/cartManager";
import { getProductList, getCategoryList } from "./fetchData";


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

  
  console.log(categories);
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

export function renderAllProducts(){
  renderProductItems(mockProductData, "#all-products-container", true, addToCart);
}

export function renderProductByCategory(category){
    //console.log(category);
    let categoryId = category.id;
    let productListByCategory = mockProductData.filter(item => {
      return item.category === categoryId});
    console.log(productListByCategory);
    renderProductItems(productListByCategory, "#all-products-container", true, addToCart);
    
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