import { addNewItemToCartDOM } from "./cartItemDOM";

class Cart{
    cartItems;

    constructor(){
        this.cartItems = {};
    }
}

Cart.prototype.addItem = function(item, qty){
    this.cartItems[item.id] = qty;
}
Cart.prototype.removeItem = function(item){
    if (item in this.cartItems){
        delete cartItems[item];
    }
}

let shoppingCart = new Cart();

// add to cart feature of each product
// if product is in cart already -> update quantity
// else add item to cart item list.
export function addToCart(item, qty){
    console.log(item);
    //item chưa có trong cart
    if (!(item in shoppingCart.cartItems)){
        shoppingCart.addItem(item, qty)
        //update UI của cart theo data mới
        addNewItemToCartDOM(item, qty);
    }
    else{
        shoppingCart.cartItems[item] += qty;
        console.log("Already in cart");
    }
    
}