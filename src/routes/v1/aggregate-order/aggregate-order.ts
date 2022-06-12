import express from 'express';
import validator, { ValidationSource } from '../../../middlewares/validator';
import authentication from '../../../middlewares/authentication';
import schema from "./schema";
import AggregateOrderController from '../../../controllers/aggregate-order/aggregate-order.controller';

const router = express.Router();

router.post("/", authentication, AggregateOrderController.create);
router.get("/id/:id", authentication, validator(schema.aggregateOrderId, ValidationSource.PARAM), AggregateOrderController.getOrderById);      
router.get("/user", authentication, validator(schema.pagination, ValidationSource.QUERY), AggregateOrderController.getOrderByUser);
router.get("/price/:id", authentication, validator(schema.aggregateOrderId, ValidationSource.PARAM), AggregateOrderController.getPriceOfOrder);

export default router;
