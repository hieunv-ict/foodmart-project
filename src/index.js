import "../node_modules/normalize.css/normalize.css";
import "./style.css";
import "./cart.css";
let cartBtn = document.querySelector(".cart-btn")
let cartSidebar = document.querySelector("#cartSidebar")
let overlay = document.querySelector("#overlay");
let cartCloseBtn = document.querySelector("#cartCloseBtn");


cartCloseBtn.addEventListener("click", e => toggleCart());
cartBtn.addEventListener("click", e => toggleCart())

function toggleCart(){
    cartSidebar.classList.toggle('active');  /* Add/remove active class */
    overlay.classList.toggle('active');
}