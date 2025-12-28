import { ProductItem } from "./productItem";
import { renderProductItems } from "../cart-feature/productItemDOM";
import { addToCart } from "../cart-feature/cartManager";

// Import images
let bananaImg = require("../assets/resources/thumb-bananas.png");
let milkImg = require("../assets/resources/thumb-milk.png");
let tomatoImg = require("../assets/resources/thumb-tomatoes.png");
let ketchupImg = require("../assets/resources/thumb-tomatoketchup.png");

// Mock data object
const mockProductData = [
    { id: "1", name: "Fresh Organic Bananas", price: 5, imgSrc: bananaImg },
    { id: "2", name: "Whole Milk 1 Gallon", price: 10, imgSrc: milkImg },
    { id: "3", name: "Organic Red Tomatoes", price: 8, imgSrc: tomatoImg },
    { id: "4", name: "Premium Tomato Ketchup", price: 6, imgSrc: ketchupImg },
    { id: "5", name: "Fresh Green Bananas", price: 4.5, imgSrc: bananaImg },
    { id: "6", name: "Low Fat Milk", price: 9, imgSrc: milkImg },
    { id: "7", name: "Cherry Tomatoes Pack", price: 7, imgSrc: tomatoImg },
    { id: "8", name: "Organic Ketchup", price: 7.5, imgSrc: ketchupImg }
];

// Map mock data to ProductItem instances
export let itemList = {};
export let trendingProducts = [];
export let bestSellingProducts = [];

// Map trending products
mockProductData.forEach(data => {
    const product = new ProductItem(data.id, data.name, data.price, data.imgSrc);
    itemList[data.id] = product;
    trendingProducts.push(product);
});

// Map best selling products
mockProductData.forEach(data => {
    const product = new ProductItem(data.id, data.name, data.price, data.imgSrc);
    itemList[data.id] = product;
    bestSellingProducts.push(product);
});

// Render products to DOM
export function setProductCards(){
    // Render trending products
    renderProductItems(trendingProducts, '#trendingProductsGrid', addToCart);
    
    // Render best selling products with badges
    renderProductItems(bestSellingProducts, '#bestSellingProductsGrid', addToCart, true, '25%');
}
