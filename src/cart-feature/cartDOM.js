let cartBtn = document.querySelector(".cart-btn")
let cartSidebar = document.querySelector("#cartSidebar")
let overlay = document.querySelector("#overlay");
let cartCloseBtn = document.querySelector("#cartCloseBtn");

//add event listener to cart icon and close event to cart close button
export function addCartFeature(){
    cartCloseBtn.addEventListener("click", e => toggleCart());
    cartBtn.addEventListener("click", e => toggleCart());
}

//toggle cart to display/not display
function toggleCart(){
    cartSidebar.classList.toggle('active');  /* Add/remove active class */
    overlay.classList.toggle('active');
}

