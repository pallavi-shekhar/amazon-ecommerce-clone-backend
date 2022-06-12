import Address, { AddressModel } from "../model/Address";

export default class AddressRepo{

    public static addAddress(address: Address): Promise<Address> {
        const now = new Date();
        address.createdAt = address.updatedAt = now;

        return AddressModel.create(address);
    }
}