import "../node_modules/normalize.css/normalize.css";
import "./style.css";
import "./cart.css";

import { addCartFeature } from "./cart-feature/cartDOM.js";
import { setProductCards } from "./item-manager/itemData.js";
addCartFeature();
setProductCards();
