import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../middlewares/validator';

export default {
  roleRequest:Joi.object().keys({
    requestedRole: JoiObjectId().required()
  }),
  rolerequestId: Joi.object().keys({
      id: JoiObjectId().required()
  })
};
