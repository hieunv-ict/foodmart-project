import { ProductItem } from "../models/ProductItem";

// AWS S3 base URL for product images
const AWS_IMAGE_BASE_URL = "https://foodmart-mpfe.s3.ap-southeast-2.amazonaws.com/product-thumbnails/";

export async function fetchProductData(){
    var response = await fetch('https://695231aa3b3c518fca11c5e8.mockapi.io/foodmart/api/v1/products');
        
        if (!response.ok) {
            throw new Error('Failed to fetch products: ' + response.status);
        }
        
        var data = await response.json();
        return data;
}

export async function getProductList(){
    let items = await fetchProductData();
    var products = items.map(item => {
            return new ProductItem(
                item.id,
                item.name,
                item.price,
                AWS_IMAGE_BASE_URL + item.imgSrc,
                item.category,
                item.description,
                item.soldThisMonth,
                item.soldThisYear
            );
        });
    return products;
}