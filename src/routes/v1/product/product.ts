import express from 'express';
import validator, { ValidationSource } from '../../../middlewares/validator';
import authentication from '../../../middlewares/authentication';
import schema from './schema';
import role from '../../../middlewares/role';
import { RoleCode } from '../../../database/model/Role';
import authorization from '../../../middlewares/authorization';
import ProductController from '../../../controllers/product/product.controller';

const router = express.Router();

router.get('/', authentication, validator(schema.pagination, ValidationSource.QUERY), ProductController.getAll);
router.get('/id/:id', authentication, validator(schema.productId, ValidationSource.PARAM), ProductController.getById);
router.get('/category/id/:id', authentication, validator(schema.categoryId, ValidationSource.PARAM), validator(schema.pagination, ValidationSource.QUERY), ProductController.getByCategory);
router.get('/seller/id/:id', authentication, validator(schema.sellerId, ValidationSource.PARAM), validator(schema.pagination, ValidationSource.QUERY), ProductController.getBySeller);
router.post('/', authentication, role(RoleCode.SELLER), authorization, validator(schema.product), ProductController.create);

export default router;