import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../middlewares/validator';

export default {
  product: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: JoiObjectId().required(),
    price: Joi.number().required(),
    discountPercentage: Joi.number().optional(),
    productMedias: Joi.array().items(Joi.object().keys({
        productUrl: Joi.string().required().uri(),
        mediaType: Joi.string().required()
    }))
  }),
  categoryId: Joi.object().keys({
    id: JoiObjectId().required()
  }),
  productId: Joi.object().keys({
    id: JoiObjectId().required()
  }),
  pagination: Joi.object().keys({
    pageNumber: Joi.number().required().integer().min(1),
    pageItemCount: Joi.number().required().integer().min(1)
  }),
  sellerId: Joi.object().keys({
    id: JoiObjectId().required()
  }),
};
