import express from "express";
import validator, { ValidationSource } from "../../../middlewares/validator";
import authentication from "../../../middlewares/authentication";
import schema from "./schema";
import CartController from "../../../controllers/cart/cart.controller";

const router = express.Router();

router.post("/", authentication, validator(schema.cartProduct), CartController.create);
router.get("/id/:id", authentication, validator(schema.cartId, ValidationSource.PARAM), CartController.getById);
router.get("/price/:id", authentication, validator(schema.cartId, ValidationSource.PARAM), CartController.getCartPrice);

export default router;
