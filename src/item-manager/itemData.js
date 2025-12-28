import { ProductItem } from "./productItem";
import { addToCart } from "../cart-feature/cartManager";
let bananaImg = require("../assets/resources/thumb-bananas.png");
let milkImg = require("../assets/resources/thumb-milk.png")
//test data for adding item to cart
export let itemList = {}
let product1 = new ProductItem("1", "Banana", 5, bananaImg);
let product2 = new ProductItem("2", "Milk", 10, milkImg);

itemList["1"] = product1;
itemList["2"] = product2;
let products = document.querySelectorAll(".product-card");

//add addToCart event to products DOM element
export function setProductCards(){
    for (let p of products){
        let itemId = p.dataset.itemid; // use data attributes (added manually) to 2 product card
        let itemData = itemList[itemId];
        let addBtn = p.querySelector(".product-card__add-btn");
        if (itemId !== undefined){
            addBtn.addEventListener("click", e => addToCart(itemData, 1));
        }
        
    }
}
