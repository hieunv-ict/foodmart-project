import { ProductItem } from "../models/ProductItem";
// Import images
let bananaImg = require("../assets/product-thumbnails/bananas.png");
let milkImg = require("../assets/product-thumbnails/milk.png");
let tomatoImg = require("../assets/product-thumbnails/tomatoes.png");
let ketchupImg = require("../assets/product-thumbnails/tomatoketchup.png");
const images = {
  "1": bananaImg,
  "2": milkImg,
  "3": tomatoImg,
  "4": ketchupImg,
}
export async function fetchProductData(){
    var response = await fetch('https://6952316c3b3c518fca11c538.mockapi.io/foodmart/api/v1/products');
        
        if (!response.ok) {
            throw new Error('Failed to fetch products: ' + response.status);
        }
        
        var data = await response.json();
        return data;
}

export async function getProductList(){
    let items = await fetchProductData();
    var products = items.map(item => {
            return new ProductItem(
                item.id,
                item.name,
                item.price,
                images[item.id],
                item.category,
                item.description,
                item.soldThisMonth,
                item.soldThisYear
            );
        });
    return products;
}