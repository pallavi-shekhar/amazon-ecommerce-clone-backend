import { Types } from 'mongoose';
import CategoryRepo from '../../database/repository/CategoryRepo';
import { SuccessResponse } from '../../core/ApiResponse';
import ProductRepo from '../../database/repository/ProductRepo';
import asyncHandler from '../../middlewares/asyncHandler';
import UserRepo from '../../database/repository/UserRepo';
import { BadRequestError, InternalError } from '../../core/ApiError';
import { ProtectedRequest } from 'app-request';
import ProductMedia, { ProductMediaModel, UrlType } from '../../database/model/ProductMedia';
import Product from '../../database/model/Product';

const getAll = asyncHandler(async (req, res)=>{
    const products  = await ProductRepo.getAll(parseInt(req.query.pageNumber as string),parseInt(req.query.pageItemCount as string));

    return new SuccessResponse('Products retrieved successfully', products).send(res);
});

const getById = asyncHandler(async (req, res)=>{
    const products  = await ProductRepo.getById(new Types.ObjectId(req.params.id));

    return new SuccessResponse('Product retrieved successfully', products).send(res);
});

const getByCategory  =  asyncHandler(async (req, res)=>{
    await CategoryRepo.getById(new Types.ObjectId(req.params.id));
    const products  = await ProductRepo.getByCategory(new Types.ObjectId(req.params.id),
                                                     parseInt(req.query.pageNumber as string),
                                                     parseInt(req.query.pageItemCount as string));

    return new SuccessResponse('Products retrieved successfully', products).send(res);
});

const getBySeller = asyncHandler(async (req, res)=>{
    const seller = await UserRepo.getById(new Types.ObjectId(req.params.id));
    if(!seller)
        throw new InternalError('Seller does not exist');
        
    const products  = await ProductRepo.getBySeller(new Types.ObjectId(req.params.id),
                                                     parseInt(req.query.pageNumber as string),
                                                     parseInt(req.query.pageItemCount as string));


    return new SuccessResponse('Products retrieved successfully', products).send(res);
});

const create = asyncHandler(async (req: ProtectedRequest, res, next) => {
    let mediaType: string = '';
    let productMedias: ProductMedia[] = [];

    for(const productMedia of req.body.productMedias) {
        if(productMedia.mediaType.toUpperCase() === UrlType.IMAGE){
            mediaType = UrlType.IMAGE
        }
        else if(productMedia.mediaType.toUpperCase() === UrlType.VIDEO){
            mediaType = UrlType.VIDEO
        }
        else{
            throw new BadRequestError('Invalid Media Type')
        }

        let media = {
            productUrl: productMedia.productUrl,
            mediaType: mediaType
        } as ProductMedia;
        productMedias.push(media);
    }

    const createdMedias = await ProductMediaModel.create(productMedias);
    const product = await ProductRepo.create({ 
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        discountPercentage: req.body.discountPercentage,
        seller: req.user._id,
        productMedias: createdMedias
    } as Product);

    return new SuccessResponse('Product created successfully', product).send(res);
});

const ProductController = { getAll, getById, getByCategory, getBySeller, create };
export default ProductController;