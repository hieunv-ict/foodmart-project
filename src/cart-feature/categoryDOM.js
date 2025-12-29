// create DOM element of category card
function createCategoryCardDOM(category) {
    // Create main container
    const categoryItem = document.createElement('div');
    categoryItem.className = 'category__item';
    categoryItem.setAttribute('data-categoryid', category.id);
    
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
    
    // Render each category
    categories.forEach(category => {
        const categoryCard = createCategoryCardDOM(category);
        grid.appendChild(categoryCard);
    });
}
