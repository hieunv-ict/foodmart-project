// create DOM element of product card
function createProductCardDOM(productItem, onAddToCart, hasBadge = false, badgeText = "") {
    // Tạo container chính
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.setAttribute('data-itemid', productItem.id);
    
    // Thêm badge nếu có
    if (hasBadge && badgeText) {
        const badge = document.createElement('span');
        badge.className = 'product-card__badge';
        badge.textContent = badgeText;
        productCard.appendChild(badge);
    }
    
    // Tạo nút wishlist
    const wishlistBtn = document.createElement('button');
    wishlistBtn.className = 'product-card__wishlist';
    wishlistBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M17.37 3.38a5 5 0 0 0-7.07 0L10 3.67l-.3-.29a5 5 0 1 0-7.07 7.07l.3.3L10 17.82l7.07-7.07.3-.3a5 5 0 0 0 0-7.07z" stroke="currentColor" stroke-width="1.5"/>
        </svg>
    `;
    productCard.appendChild(wishlistBtn);
    
    // Tạo product image
    const imageDiv = document.createElement('div');
    imageDiv.className = 'product-card__image';
    const img = document.createElement('img');
    img.src = productItem.imgSrc;
    img.alt = productItem.name;
    imageDiv.appendChild(img);
    productCard.appendChild(imageDiv);
    
    // Tạo product content container
    const content = document.createElement('div');
    content.className = 'product-card__content';
    
    // Tạo title
    const title = document.createElement('h3');
    title.className = 'product-card__title';
    title.textContent = productItem.name;
    content.appendChild(title);
    
    // Tạo rating
    const rating = document.createElement('div');
    rating.className = 'product-card__rating';
    const stars = document.createElement('span');
    stars.className = 'product-card__stars';
    stars.textContent = '★★★★★';
    const reviews = document.createElement('span');
    reviews.className = 'product-card__reviews';
    reviews.textContent = '4.5';
    rating.appendChild(stars);
    rating.appendChild(reviews);
    content.appendChild(rating);
    
    // Tạo footer
    const footer = document.createElement('div');
    footer.className = 'product-card__footer';
    
    // Tạo price
    const price = document.createElement('span');
    price.className = 'product-card__price';
    price.textContent = '$' + productItem.price;
    footer.appendChild(price);
    
    // Tạo actions container
    const actions = document.createElement('div');
    actions.className = 'product-card__actions';
    
    // Tạo quantity controls
    const minusBtn = document.createElement('button');
    minusBtn.className = 'product-card__qty-btn';
    minusBtn.textContent = '-';
    
    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.className = 'product-card__qty';
    qtyInput.value = '1';
    qtyInput.min = '1';
    
    const plusBtn = document.createElement('button');
    plusBtn.className = 'product-card__qty-btn';
    plusBtn.textContent = '+';
    
    // Tạo add to cart button
    const addBtn = document.createElement('button');
    addBtn.className = 'product-card__add-btn';
    addBtn.textContent = 'Add to Cart';
    
    // Event listeners cho quantity controls
    minusBtn.addEventListener('click', () => {
        const currentQty = parseInt(qtyInput.value);
        if (currentQty > 1) {
            qtyInput.value = currentQty - 1;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        const currentQty = parseInt(qtyInput.value);
        qtyInput.value = currentQty + 1;
    });
    
    // Event listener cho add to cart
    addBtn.addEventListener('click', () => {
        const qty = parseInt(qtyInput.value);
        if (onAddToCart) {
            onAddToCart(productItem, qty);
        }
    });
    
    // Ghép các phần tử vào actions
    actions.appendChild(minusBtn);
    actions.appendChild(qtyInput);
    actions.appendChild(plusBtn);
    actions.appendChild(addBtn);
    footer.appendChild(actions);
    content.appendChild(footer);
    productCard.appendChild(content);
    
    return productCard;
}

// render products to grid container
export function renderProductItems(products, gridSelector, onAddToCart, hasBadge = false, badgeText = "") {
    const grid = document.querySelector(gridSelector);
    if (!grid) {
        console.error(`Grid container not found: ${gridSelector}`);
        return;
    }
    
    // Xóa nội dung cũ
    grid.innerHTML = '';
    
    // Thêm từng product vào grid
    products.forEach(product => {
        const productCard = createProductCardDOM(product, onAddToCart, hasBadge, badgeText);
        grid.appendChild(productCard);
    });
}