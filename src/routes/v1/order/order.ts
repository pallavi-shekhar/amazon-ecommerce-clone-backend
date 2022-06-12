import express from "express";
import validator, { ValidationSource } from "../../../middlewares/validator";
import authentication from "../../../middlewares/authentication";
import schema from "./schema";
import OrderController from '../../../controllers/order/order.controller';

const router = express.Router();

router.get("/id/:id", authentication, validator(schema.orderId, ValidationSource.PARAM), OrderController.getOrderById);

export default router;
