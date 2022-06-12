import { ProtectedRequest } from 'app-request';
import { Types } from 'mongoose';
import { SuccessResponse } from '../../core/ApiResponse';
import OrderRepo from '../../database/repository/OrderRepo';
import asyncHandler from '../../middlewares/asyncHandler';

const getOrderById = asyncHandler(async (req: ProtectedRequest, res) => {
    const order = await OrderRepo.get(new Types.ObjectId(req.params.id));

    return new SuccessResponse("Order Retrieved Successfully", order).send(res);
});

const OrderController = { getOrderById };
export default OrderController;