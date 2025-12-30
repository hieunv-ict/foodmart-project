import { renderAllProducts, renderProductByCategory } from "../item-manager/itemData";
let allCategoryIcon = require("../assets/resources/all.png");

function createAllCategoryDOM(onClickCategory){
    
    const categoryItem = document.createElement('div');
    categoryItem.className = 'category__item';
    categoryItem.classList.add("all-category-items");
    categoryItem.addEventListener("click", e => {onClickCategory(categoryItem); renderAllProducts();});
    // Create icon container
    const iconDiv = document.createElement('div');
    iconDiv.className = 'category__icon';
    
    // Create image
    const img = document.createElement('img');
    img.src = allCategoryIcon;
    img.alt = "All";
    img.style["max-width"] = "70%";
    iconDiv.appendChild(img);
    // Create name span
    const nameSpan = document.createElement('span');
    nameSpan.className = 'category__name';
    nameSpan.textContent = "All";
    
    // Append elements to category item
    categoryItem.appendChild(iconDiv);
    categoryItem.appendChild(nameSpan);
    onClickCategory(categoryItem);
    return categoryItem;
}
// create DOM element of category card
function createCategoryCardDOM(category, onClickCategory) {
    // Create main container
    const categoryItem = document.createElement('div');
    categoryItem.className = 'category__item';
    categoryItem.setAttribute('data-categoryid', category.id);
    
    categoryItem.addEventListener("click", e => {onClickCategory(categoryItem);
        renderProductByCategory(category);
    });
    // Create icon container
    const iconDiv = document.createElement('div');
    iconDiv.className = 'category__icon';
    
    // Create image
    const img = document.createElement('img');
    img.src = category.imgSrc;
    img.alt = category.name;
    
    iconDiv.appendChild(img);
    
    // Create name span
    const nameSpan = document.createElement('span');
    nameSpan.className = 'category__name';
    nameSpan.textContent = category.name;
    
    // Append elements to category item
    categoryItem.appendChild(iconDiv);
    categoryItem.appendChild(nameSpan);
    
    return categoryItem;
}

// render categories to grid container
export function renderCategories(categories, gridSelector) {
    const grid = document.querySelector(gridSelector);
    
    if (!grid) {
        console.error(`Grid container with selector "${gridSelector}" not found`);
        return;
    }
    
    // Clear existing content
    grid.innerHTML = '';
    let allCategoryDOM = createAllCategoryDOM(onClickCategory);
    grid.appendChild(allCategoryDOM);
    // Render each category
    categories.forEach(category => {
        const categoryCard = createCategoryCardDOM(category, onClickCategory);
        grid.appendChild(categoryCard);
    });
    renderAllProducts();
}
let previousCategory = null;
function onClickCategory(item){
    console.log(item);
    item.classList.add("category__item-clicked");
    if (previousCategory == null){
        previousCategory = item;
    }
    else{
        previousCategory.classList.remove("category__item-clicked");
        previousCategory = item;
    }
}

