import { ProtectedRequest } from "app-request";
import { SuccessResponse } from "../../core/ApiResponse";
import Address from "../../database/model/Address";
import AddressRepo from "../../database/repository/AddressRepo";
import UserRepo from "../../database/repository/UserRepo";
import asyncHandler from "../../middlewares/asyncHandler";

const address = asyncHandler(async (req: ProtectedRequest, res) => {
    const address = await AddressRepo.addAddress({
        fullname: req.body.fullname,
        mobile: req.body.mobile,
        pincode: req.body.pincode,
        line1: req.body.line1,
        line2: req.body.line2,
        landmark: req.body?.landmark,
        city: req.body.city,
        state: req.body.state,
    } as Address);

    req.user.address.push(address._id);
    UserRepo.update(req.user);

    return new SuccessResponse("Address added", address).send(res);
});

const AddressController = { address };
export default AddressController;