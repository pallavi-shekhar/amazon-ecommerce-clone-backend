import express from "express";
import validator, { ValidationSource } from "../../../middlewares/validator";
import authentication from "../../../middlewares/authentication";
import schema from "./schema";
import role from "../../../middlewares/role";
import { RoleCode } from "../../../database/model/Role";
import authorization from "../../../middlewares/authorization";
import RoleRequestController from '../../../controllers/role-request/role-request.controller';

const router = express.Router();

router.post("/", authentication, validator(schema.roleRequest), RoleRequestController.create);
router.get("/", authentication, RoleRequestController.getAll);
router.put("/id/:id", authentication, validator(schema.rolerequestId, ValidationSource.PARAM), role(RoleCode.ADMIN), authorization, RoleRequestController.update);

export default router;
