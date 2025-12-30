import "../node_modules/normalize.css/normalize.css";
import "./style.css";
import "./cart.css";

import { addCartFeature } from "./cart-feature/cartDOM.js";
import { setProductCards} from "./item-manager/itemData.js";
import { setupSlider } from "./interaction-animations/slider.js";
addCartFeature();
setProductCards();
setupSlider("prevBtn", "nextBtn", "bestSellingProductsGrid", 24);
setupSlider("prevCatBtn", "nextCatBtn", "categoryGrid", 24);
