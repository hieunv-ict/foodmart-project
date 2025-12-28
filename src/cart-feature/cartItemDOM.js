import { changeItemQty, removeItem, getNumberOfItems, getTotalPrice } from "./cartManager";

let totalPriceElem = document.querySelector("#totalAmount");
let numberOfItem = document.querySelector("#cart-total-quantity");

function updateCartInfo(){
    totalPriceElem.textContent = getTotalPrice();
    numberOfItem.textContent = getNumberOfItems();
}
export function removeCartItemDOM(item){
    let itemToRemove = document.querySelector(`[data-item_id="${item.id}"]`);
    itemToRemove.remove();
    updateCartInfo();
    
}

export function updateCartItemQuantityDOM(item, totalQuantity){
    // update single item
    let itemToUpdate = document.querySelector(`[data-item_id="${item.id}"]`);
    if (itemToUpdate != null){
        //update quantity
        let qtyElem = itemToUpdate.querySelector(".quantity");
        qtyElem.textContent = totalQuantity;
        //update price
        let priceElem = itemToUpdate.querySelector(".item-price");
        priceElem.textContent = "$" + totalQuantity * item.price;
    }

    //update cart info
    updateCartInfo();
    
}


// add cart item to container
export function addNewItemToCartDOM(productItem, quantity){
    let itemDOM = createCartItemDOM(productItem, quantity);
    let cart = document.querySelector(".cart-item-container");
    cart.append(itemDOM);
    updateCartInfo();
}
// create DOM element of cart item inside cart
function createCartItemDOM(productItem, quantity) {
    // Tạo container chính
    var cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.dataset.item_id = productItem.id;
    // Tạo product image
    var itemImage = document.createElement('div');
    itemImage.className = 'item-image';
    var img = document.createElement('img');
    img.src = productItem.imgSrc;
    img.alt = productItem.name;
    itemImage.appendChild(img);
    
    // Tạo item details container
    var itemDetails = document.createElement('div');
    itemDetails.className = 'item-details';
    
    // Tạo item info
    var itemInfo = document.createElement('div');
    itemInfo.className = 'item-info';
    
    var itemName = document.createElement('div');
    itemName.className = 'item-name';
    itemName.textContent = productItem.name;
    
    var itemDescription = document.createElement('div');
    itemDescription.className = 'item-description';
    itemDescription.textContent = 'Brief description';
    
    itemInfo.appendChild(itemName);
    itemInfo.appendChild(itemDescription);
    
    // Tạo item controls (quantity buttons)
    var itemControls = document.createElement('div');
    itemControls.className = 'item-controls';
    
    var quantityControls = document.createElement('div');
    quantityControls.className = 'quantity-controls';
    
    // Nút trừ
    var minusBtn = document.createElement('button');
    minusBtn.addEventListener("click", e => changeItemQty(productItem, -1));
    minusBtn.className = 'quantity-btn';
    minusBtn.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>';
    
    // Hiển thị số lượng
    var quantitySpan = document.createElement('span');
    quantitySpan.className = 'quantity';
    quantitySpan.textContent = quantity;
    
    // Nút cộng
    var plusBtn = document.createElement('button');
    plusBtn.className = 'quantity-btn';
    plusBtn.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>';
    plusBtn.addEventListener("click", e => changeItemQty(productItem, 1));
    quantityControls.appendChild(minusBtn);
    quantityControls.appendChild(quantitySpan);
    quantityControls.appendChild(plusBtn);
    itemControls.appendChild(quantityControls);
    
    // Tạo item price
    var itemPrice = document.createElement('span');
    itemPrice.className = 'item-price';
    itemPrice.textContent = '$' + productItem.price;
    
    // Ghép item details
    itemDetails.appendChild(itemInfo);
    itemDetails.appendChild(itemControls);
    itemDetails.appendChild(itemPrice);
    
    // Tạo delete button
    var deleteBtn = document.createElement('button');
    deleteBtn.addEventListener("click", e => removeItem(productItem));
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<svg class="icon" style="color: #ef4444;" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M10 11v6M14 11v6M5 6l1 14h12l1-14"/></svg>';
    
    // event tăng giảm số lượng

    // Ghép tất cả vào cart item
    cartItem.appendChild(itemImage);
    cartItem.appendChild(itemDetails);
    cartItem.appendChild(deleteBtn);
    
    return cartItem;
}

function updateItemQuantity(item, addedQt){

}

function removeItemFromCart(item){

}

function updateCheckoutInfo(){

}

