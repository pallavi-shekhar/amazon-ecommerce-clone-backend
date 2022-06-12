import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../middlewares/validator';

export default {
  orderId: Joi.object().keys({
      id: JoiObjectId().required()
  })
};
