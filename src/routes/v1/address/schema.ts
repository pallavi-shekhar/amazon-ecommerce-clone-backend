import Joi from '@hapi/joi';

export default {
  address: Joi.object().keys({
    fullname: Joi.string().required(),
    mobile: Joi.number().required(),
    pincode: Joi.number().required(),
    line1: Joi.string().required(),
    line2: Joi.string().required(),
    landmark: Joi.string().optional(),
    city: Joi.string().required(),
    state: Joi.string().required(),
  }),
};
