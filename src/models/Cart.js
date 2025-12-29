export class CartItem{
    quantity;
    price;
    name;

    constructor(name, price, qty){
        this.name = name;
        this.price = price;
        this.quantity = qty;
    }
}

export class Cart{
    cartItems;

    constructor(){
        this.cartItems = {};
    }
    
    addItem(item, qty, onAdd){
        let cartItem = new CartItem(item.name, item.price, qty);
        this.cartItems[item.id] = cartItem;
        if (onAdd) {
            onAdd(item, cartItem.quantity);
        }
    }
    
    removeItem(item, onRemove){
        if (item.id in this.cartItems){
            delete this.cartItems[item.id];
            if (onRemove) {
                onRemove(item);
            }
        }
    }
    
    changeQty(item, qtyToChange, onUpdate, onRemove){
        let tmp = this.cartItems[item.id].quantity + qtyToChange;
        // decrease quantity to 0 -> remove item
        if (tmp === 0){
            this.removeItem(item, onRemove);
        }
        else{
            this.cartItems[item.id].quantity = tmp;
            if (onUpdate) {
                onUpdate(item, tmp);
            }
        }
    }
    
    getTotalPrice(){
        let total = 0;
        for (let cartItem of Object.values(this.cartItems)){
            total += cartItem.quantity * cartItem.price;
        }
        return total;
    }
    
    getNumberOfItems(){
        return Object.keys(this.cartItems).length;
    }
}
