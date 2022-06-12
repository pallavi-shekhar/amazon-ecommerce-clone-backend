import { Types } from "mongoose";
import { InternalError } from "../..//core/ApiError";
import Cart, { CartModel } from "../model/Cart";
import Order, { OrderModel } from "../model/Order";
import Product, { ProductModel } from "../model/Product";
import ProductRepo from "./ProductRepo";


export default class OrderRepo{

    public static async create(orders: Order[]): Promise<Order[]>{
        for(const order of orders){
            order.createdAt = order.updatedAt = new Date();
        }

        return OrderModel.insertMany(orders);
    }

    public static async get(orderId: Types.ObjectId): Promise<Order>{
        const order =  await OrderModel.findById(orderId)
                               .populate({
                                    path: 'product'
                                })
                               .lean<Order>()
                               .exec();  
                               
        if(!order)
            throw new InternalError('Invalid orderId');

        return order;
    }
}