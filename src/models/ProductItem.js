export class ProductItem{
    id;
    name;
    price;
    imgSrc;
    category;
    soldThisMonth;
    soldThisYear;
    description;
    constructor(id, name, price, imgSrc, category, description, soldThisMonth, soldThisYear){
        this.id = id;
        this.name = name;
        this.price = price;
        this.imgSrc = imgSrc;
        this.category = category;
        this.description = description;
        this.soldThisMonth = soldThisMonth;
        this.soldThisYear = soldThisYear;
    }
}
