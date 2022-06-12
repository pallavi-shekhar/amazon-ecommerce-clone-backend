import express from "express";
import validator, { ValidationSource } from "../../../middlewares/validator";
import authentication from "../../../middlewares/authentication";
import schema from "./schema";
import role from "../../../middlewares/role";
import { RoleCode } from '../../../database/model/Role';
import authorization from "../../../middlewares/authorization";
import CategoryController from '../../../controllers/category/category.controller';

const router = express.Router();

router.get("/", authentication, CategoryController.getAll);
router.get("/id/:id", authentication, validator(schema.categoryId, ValidationSource.PARAM), CategoryController.getCategoryById);
router.post("/", authentication, role(RoleCode.ADMIN), authorization, validator(schema.category), CategoryController.create);

export default router;
