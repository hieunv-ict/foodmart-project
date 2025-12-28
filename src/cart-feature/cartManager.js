import { addNewItemToCartDOM, updateCartItemQuantityDOM, removeCartItemDOM } from "./cartItemDOM";

class CartItem{
    quantity;
    price;
    name;

    constructor(name, price, qty){
        this.name = name;
        this.price = price;
        this.quantity = qty;
    }
}

class Cart{
    cartItems;

    constructor(){
        this.cartItems = {};
    }
}

Cart.prototype.addItem = function(item, qty){
    let cartItem = new CartItem(item.name, item.price, qty);
    this.cartItems[item.id] = cartItem;
    addNewItemToCartDOM(item, cartItem.quantity);
}
Cart.prototype.removeItem = function(item){
    if (item.id in this.cartItems){
        delete this.cartItems[item.id];
        removeCartItemDOM(item);
    }
}
Cart.prototype.changeQty = function(item, qtyToChange){
    let tmp = this.cartItems[item.id].quantity + qtyToChange;
    // decrease quantity to 0 -> remove item
    if (tmp === 0){
        this.removeItem(item);
        
    }
    else{
        //update UI
        this.cartItems[item.id].quantity = tmp;
        updateCartItemQuantityDOM(item, tmp);
    }
}
Cart.prototype.getTotalPrice = function(){
    let total = 0;
    for (let cartItem of Object.values(this.cartItems)){
        total += cartItem.quantity * cartItem.price;
    }
    return total;
}
Cart.prototype.getNumberOfItems = function(){
    return Object.keys(this.cartItems).length;
}

let shoppingCart = new Cart();

// add to cart feature of each product
// if product is in cart already -> update quantity
// else add item to cart item list.
export function addToCart(item, qty){
    //item chưa có trong cart
    if (!(item.id in shoppingCart.cartItems)){
        shoppingCart.addItem(item, qty)
        //update UI của cart theo data mới
    }
    else{
        console.log("Already in cart");
        shoppingCart.changeQty(item, qty);
    }
    
}

export function changeItemQty(item, qty){
    shoppingCart.changeQty(item, qty);
}

export function removeItem(item){
    shoppingCart.removeItem(item);
}

export function getTotalPrice(){
    return shoppingCart.getTotalPrice();
}
export function getNumberOfItems(){
    return shoppingCart.getNumberOfItems();
}
