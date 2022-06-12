import { Types } from "mongoose";
import { InternalError } from "../../core/ApiError";
import AggregateOrder, { AggregateOrderModel } from "../model/AggregateOrder";


export default class AggregateOrderRepo{

    public static async create(aggregateOrder: AggregateOrder): Promise<AggregateOrder> {
        aggregateOrder.createdAt = aggregateOrder.updatedAt = new Date();
        
        return  await AggregateOrderModel.create(aggregateOrder);
    }

    public static async getById(aggregateOrderId: Types.ObjectId) : Promise<AggregateOrder> {
        const order = await AggregateOrderModel.findById(aggregateOrderId)
                                               .populate({
                                                    path: 'orders'
                                                })
                                                .lean<AggregateOrder>()
                                                .exec();

        if(order === null || order._id === undefined)
            throw new InternalError('No order found');     

        return order;
    }

    public static async getByUser(userId: Types.ObjectId, pageNumber: number, limit: number): Promise<AggregateOrder | null> {
        const order = await AggregateOrderModel.find({ user: userId })
                                               .skip(limit * (pageNumber - 1))
                                               .limit(limit)
                                               .populate({
                                                    path: 'orders'
                                                })
                                               .sort({ updatedAt: -1})
                                               .lean<AggregateOrder>()
                                               .exec();  

        return order;
    }
}