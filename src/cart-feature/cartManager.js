import { Cart } from "../models/Cart";
import { addNewItemToCartDOM, updateCartItemQuantityDOM, removeCartItemDOM } from "./cartItemDOM";

let shoppingCart = new Cart();

// add to cart feature of each product
// if product is in cart already -> update quantity
// else add item to cart item list.
export function addToCart(item, qty){
    //item chưa có trong cart
    if (!(item.id in shoppingCart.cartItems)){
        shoppingCart.addItem(item, qty, addNewItemToCartDOM);
    }
    else{
        console.log("Already in cart");
        shoppingCart.changeQty(item, qty, updateCartItemQuantityDOM, removeCartItemDOM);
    }
    
}

export function changeItemQty(item, qty){
    shoppingCart.changeQty(item, qty, updateCartItemQuantityDOM, removeCartItemDOM);
}

export function removeItem(item){
    shoppingCart.removeItem(item, removeCartItemDOM);
}

export function getTotalPrice(){
    return shoppingCart.getTotalPrice();
}
export function getNumberOfItems(){
    return shoppingCart.getNumberOfItems();
}
