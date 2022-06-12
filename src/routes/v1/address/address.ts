import express from "express";
import validator from "../../../middlewares/validator";
import schema from "./schema";
import authentication from "../../../middlewares/authentication";
import AddressController from "../../../controllers/address/address.controller";
const router = express.Router();

router.use("/", authentication);

router.post("/", validator(schema.address), AddressController.address);

export default router;
