import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../middlewares/validator';

export default {
  aggregateOrderId: Joi.object().keys({
      id: JoiObjectId().required()
  }),
  pagination: Joi.object().keys({
    pageNumber: Joi.number().required().integer().min(1),
    pageItemCount: Joi.number().required().integer().min(1)
  })
};
