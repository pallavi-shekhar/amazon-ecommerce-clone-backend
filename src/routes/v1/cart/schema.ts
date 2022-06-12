import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../middlewares/validator';

export default {
  cartProduct: Joi.object().keys({
    product: JoiObjectId().required()
  }),
  cartId: Joi.object().keys({
      id: JoiObjectId().required()
  })
};
