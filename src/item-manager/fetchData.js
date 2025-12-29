import { ProductItem } from "../models/ProductItem";
import { Category } from "../models/Category";

// API base URL
const BASE_URL = "https://6951f51c3b3c518fca110fca.mockapi.io/foodmart/api/v1";

// AWS S3 base URL for product images
const AWS_PRODUCT_IMAGE_BASE_URL = "https://foodmart-mpfe.s3.ap-southeast-2.amazonaws.com/product-thumbnails/";
const AWS_CATEGORY_IMAGE_BASE_URL = "https://foodmart-mpfe.s3.ap-southeast-2.amazonaws.com/product-categories/";

export async function fetchProductData(){
    var response = await fetch(`${BASE_URL}/products`);
        
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
                AWS_PRODUCT_IMAGE_BASE_URL + item.imgSrc,
                item.category,
                item.description,
                item.soldThisMonth,
                item.soldThisYear
            );
        });
    return products;
}

export async function fetchCategoryData(){
    var response = await fetch(`${BASE_URL}/categories`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch categories: ' + response.status);
        }
        
        var data = await response.json();
        return data;
}

export async function getCategoryList(){
    let items = await fetchCategoryData();
    var categories = items.map(item => {
            return new Category(
                item.id,
                item.name,
                AWS_CATEGORY_IMAGE_BASE_URL + item.imgSrc
            );
        });
    return categories;
}