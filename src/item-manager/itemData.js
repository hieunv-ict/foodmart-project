import { ProductItem } from "../models/ProductItem";
import { renderProductItems } from "../cart-feature/productItemDOM";
import { addToCart } from "../cart-feature/cartManager";

// Import images
let bananaImg = require("../assets/product-thumbnails/bananas.png");
let milkImg = require("../assets/product-thumbnails/milk.png");
let tomatoImg = require("../assets/product-thumbnails/tomatoes.png");
let ketchupImg = require("../assets/product-thumbnails/tomatoketchup.png");

// Mock data object
const mockProductData = [
  { id: "1", name: "Fresh Organic Bananas", price: 5, imgSrc: bananaImg, category:"Fruits", description:"",soldThisMonth: 10, soldthisYear: 100 },
  // { id: "2", name: "Whole Milk 1 Gallon", price: 10, imgSrc: milkImg },
  // { id: "3", name: "Organic Red Tomatoes", price: 8, imgSrc: tomatoImg },
  // { id: "4", name: "Premium Tomato Ketchup", price: 6, imgSrc: ketchupImg },
  // { id: "5", name: "Fresh Green Bananas", price: 4.5, imgSrc: bananaImg },
  // { id: "6", name: "Low Fat Milk", price: 9, imgSrc: milkImg },
  // { id: "7", name: "Cherry Tomatoes Pack", price: 7, imgSrc: tomatoImg },
  // { id: "8", name: "Organic Ketchup", price: 7.5, imgSrc: ketchupImg },
];

// Map mock data to ProductItem instances
export let itemList = {};
export let trendingProducts = [];
export let bestSellingProducts = [];

// Map trending products
mockProductData.forEach((data) => {
  const product = new ProductItem(data.id, data.name, data.price, data.imgSrc, data.category, data.description, data.soldThisMonth, data.soldthisYear);
  itemList[data.id] = product;
  trendingProducts.push(product);
});

// Map best selling products
mockProductData.forEach((data) => {
  const product = new ProductItem(data.id, data.name, data.price, data.imgSrc, data.category, data.description, data.soldThisMonth, data.soldthisYear);
  itemList[data.id] = product;
  bestSellingProducts.push(product);
});

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
  // Render trending products
  renderProductItems(trendingProducts, "#trendingProductsGrid", addToCart);

  // Render best selling products with badges
  renderProductItems(
    bestSellingProducts,
    "#bestSellingProductsGrid",
    addToCart,
    true,
    "25%"
  );
}
// Cập nhật sản phẩm hiển thị khi nhấn nút
function updateProductDisplay(products) {
  const grid = document.getElementById("bestSellingProductsGrid");
  grid.innerHTML = ""; 
  renderProductItems(products, "#bestSellingProductsGrid", addToCart);
}
