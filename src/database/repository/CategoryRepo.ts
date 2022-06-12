import { Types } from "mongoose";
import { InternalError } from "../../core/ApiError";
import Category, { CategoryModel } from "../model/Category";


export default class CategoryRepo{
    public static async getAll(): Promise<Category> {

        return await CategoryModel.find()
                                  .lean<Category>()
                                  .exec();
    }

    public static create(category: Category): Promise<Category> {
        category.createdAt = category.updatedAt = new Date();

        return CategoryModel.create(category);
    }

    public static async getById(categoryId: Types.ObjectId): Promise<Category> {
        const category =  await CategoryModel.findById(categoryId)
                                             .lean<Category>()
                                             .exec();

        if(category === null || category._id === undefined)
            throw new InternalError('Invalid Category'); 

        return category;
    }
}