import { ProtectedRequest } from 'app-request';
import { Types } from 'mongoose';
import { InternalError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import Cart from '../../database/model/Cart';
import Product from '../../database/model/Product';
import CartRepo from '../../database/repository/CartRepo';
import ProductRepo from '../../database/repository/ProductRepo';
import asyncHandler from '../../middlewares/asyncHandler';

const create = asyncHandler(async (req: ProtectedRequest, res) => {
    let productId = req.body.product;
    let userId = req.user._id;

    const productToAdd = await ProductRepo.getById(productId);
    if(productToAdd._id === undefined || productToAdd === null)     
          throw new InternalError('Invalid Product');
        
    const product = {
        _id: productId
    } as Product;

    const cart = await CartRepo.getByUserId(userId);
    if(!cart){
        let cart = {
            user: userId,
            products: [product]
        } as Cart;
        const createdCart = await CartRepo.create(cart);

        return new SuccessResponse("Product added to cart", createdCart._id).send(res);
    }

    if(cart.products.includes(product))
        throw new InternalError("Product already added");
    
    cart.products.push(product);
    CartRepo.update(cart);
      
    return new SuccessResponse("Product added to cart", cart._id).send(res);
  });

const getById = asyncHandler(async (req: ProtectedRequest, res) => {
    const cart = await CartRepo.get(new Types.ObjectId(req.params.id));// Check this method by removing products from cart
    
    return new SuccessResponse("Cart data retrieved successfully", cart.products).send(res);
  });

const getCartPrice = asyncHandler(async (req: ProtectedRequest, res) => {
    let totalPrice: number = 0;

    const cart = await CartRepo.get(new Types.ObjectId(req.params.id));
    if(cart.products.length === 0)
        throw new InternalError("No products in cart");

    cart.products.forEach(product => {
        totalPrice = totalPrice +  product.price-(product.price*(product.discountPercentage/100));
    });
    
    return new SuccessResponse("Total cart price", totalPrice).send(res);
  });

const CartController = { create, getById, getCartPrice };
export default CartController;