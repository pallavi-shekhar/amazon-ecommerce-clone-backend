import CategoryRepo from '../../database/repository/CategoryRepo';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from '../../middlewares/asyncHandler';
import { Types } from 'mongoose';
import Category from '../../database/model/Category';

const getAll = asyncHandler(async (req, res) => {
    const categories = await CategoryRepo.getAll();
    
    return new SuccessResponse("Categories retrieved successfully",categories).send(res);
});

const getCategoryById = asyncHandler(async (req, res) => {
    const categories = await CategoryRepo.getById(new Types.ObjectId(req.params.id));
 
    return new SuccessResponse("Category retrieved successfully", categories).send(res);
});

const create = asyncHandler(async (req, res, next) => {
    const category = await CategoryRepo.create({
        name: req.body.name
    } as Category);

    return new SuccessResponse("Category created successfully", category).send(res);
});

const CategoryController = { getAll, getCategoryById, create };
export default CategoryController;

