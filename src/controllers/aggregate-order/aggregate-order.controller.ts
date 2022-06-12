import { ProtectedRequest } from 'app-request';
import { Types } from 'mongoose';
import { InternalError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import AggregateOrder from '../../database/model/AggregateOrder';
import Order from '../../database/model/Order';
import AggregateOrderRepo from '../../database/repository/AgrregateOrderRepo';
import CartRepo from '../../database/repository/CartRepo';
import OrderRepo from '../../database/repository/OrderRepo';
import asyncHandler from '../../middlewares/asyncHandler';

const create = asyncHandler(async (req: ProtectedRequest, res) => {
    const cart = await CartRepo.getByUserId(req.user._id);   
    if(!cart)
        throw new InternalError('No cart for user');

    if(cart.products.length === 0)
        throw new InternalError("No products in cart");

    let orders: Order[] = [];      
    for(const orderedProduct of cart.products){
        let order = {
            user: req.user._id,
            orderedPrice: orderedProduct.price-(orderedProduct.price*(orderedProduct.discountPercentage/100)),
            productPrice: orderedProduct.price,
            product: orderedProduct
        } as Order;
        orders.push(order);
    }

    const createdOrders = await OrderRepo.create(orders);
    const aggregateOrder  = {
      user: req.user._id, 
      orders: createdOrders
    } as AggregateOrder;

    const order = await AggregateOrderRepo.create(aggregateOrder);    
    cart.products = [];
    CartRepo.update(cart);

    return new SuccessResponse("Order placed successfully", order).send(res);
  });

const getOrderById = asyncHandler(async (req: ProtectedRequest, res) => {
  const order = await AggregateOrderRepo.getById(new Types.ObjectId(req.params.id));
  
  return new SuccessResponse("Order retrieved successfully", order).send(res);
});

const getOrderByUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const order = await AggregateOrderRepo.getByUser(req.user._id,
                                                  parseInt(req.query.pageNumber as string),
                                                  parseInt(req.query.pageItemCount as string));

  return new SuccessResponse("Order for a user retrieved successfully",order).send(res);
});

const getPriceOfOrder = asyncHandler(async (req: ProtectedRequest, res) => {
  const aggregateOrder = await AggregateOrderRepo.getById(new Types.ObjectId(req.params.id));
  
  let totalPrice: number = 0;
      for(const order of aggregateOrder.orders) {
          totalPrice=totalPrice+order.orderedPrice;
      }

  return new SuccessResponse("Total order price", totalPrice).send(res);
});

const AggregateOrderController = { create, getOrderById, getOrderByUser, getPriceOfOrder };
export default AggregateOrderController;