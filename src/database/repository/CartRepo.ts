import { Types } from "mongoose";
import { InternalError } from "../..//core/ApiError";
import Cart, { CartModel } from "../model/Cart";
import Product, { ProductModel } from "../model/Product";
import ProductRepo from "./ProductRepo";


export default class CartRepo{

    public static async create(cart: Cart): Promise<Cart> {
        
        return await CartModel.create(cart);      
    }

    public static async get(cartId: Types.ObjectId): Promise<Cart> {
        const cart = await  CartModel.findById(cartId)
                                     .populate({
                                        path: 'products'
                                      })
                                     .lean<Cart>()
                                     .exec();

        if(cart === null || cart._id === undefined)
            throw new InternalError("Invalid cart");

        return cart;
    }

    public static async getByUserId(userId: Types.ObjectId): Promise<Cart | null> {
        const cart =  await CartModel.findOne({ user: userId}).lean<Cart>()
                                     .populate({
                                        path: 'products'
                                     })
                                     .exec();
                                     
        return cart;
    }

    public static update(cart: Cart){
        CartModel.updateOne({ _id: cart._id}, {$set: { ...cart}})
                 .exec();
    }
}