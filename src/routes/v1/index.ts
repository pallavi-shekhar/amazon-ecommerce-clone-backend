import express from "express";
import apikey from "../../middlewares/apiKey";
import login from "../v1/access/login";
import signup from "../v1/access/signup";
import address from "../v1/address/address";
import category from "../v1/category/category";
import product from "../v1/product/product";
import cart from "../v1/cart/cart";
import aggregateOrder from "./aggregate-order/aggregate-order";
import order from "../v1/order/order";
import roleRequests from "./role-request/role-request";
import token from './access/token';

const router = express.Router();

router.use("/", apikey);

router.use("/signup", signup);
router.use("/login", login);
router.use("/address", address);
router.use("/category", category);
router.use("/product", product);
router.use("/cart", cart);
router.use("/aggregate-order", aggregateOrder);
router.use("/order", order);
router.use("/role-requests", roleRequests);
router.use('/token', token);

export default router;
