import { Types } from "mongoose";
import { InternalError } from "../../core/ApiError";
import Product, { ProductModel } from "../model/Product";
import { ProductMediaModel } from "../model/ProductMedia";
import CategoryRepo from "./CategoryRepo";


export default class ProductRepo{
    public static async getAll(pageNumber: number, limit: number) : Promise<Product[]>{

        return await ProductModel.find()
                                 .skip(limit * (pageNumber - 1))
                                 .limit(limit)
                                 .populate({
                                    path: 'category',
                                    select: '+name'
                                  })
                                 .sort({ updatedAt: -1})
                                 .lean<Product[]>()
                                 .exec();
    }

    public static async create(product: Product): Promise<Product>{
        product.createdAt = product.updatedAt = new Date();
        
        return ProductModel.create(product);
    }

    public static async getById(productId: Types.ObjectId): Promise<Product>{
        const product =  await ProductModel.findById(productId)
                                           .populate({
                                                path: 'category'
                                            })
                                           .lean<Product>()
                                           .exec();
        
        if(product === null || product._id === undefined)
            throw new InternalError('Invalid Product');

               
        return product;
    }

    public static async getByCategory(categoryId: Types.ObjectId, pageNumber: number, limit: number): Promise<Product[]> {

        return await ProductModel.find({ category:categoryId })
                    .skip(limit * (pageNumber - 1))
                    .limit(limit)
                    .populate({
                        path: 'category'
                    })
                    .sort({ updatedAt: -1})
                    .lean<Product[]>()
                    .exec();
    }

    public static async getBySeller(sellerId: Types.ObjectId, pageNumber: number, limit: number): Promise<Product[]> {

        return await ProductModel.find({ seller:sellerId })
                    .skip(limit * (pageNumber - 1))
                    .limit(limit)
                    .populate({
                        path: 'category'
                    })
                    .sort({ updatedAt: -1})
                    .lean<Product[]>()
                    .exec();
    }
}