import { Types } from "mongoose";
import Address from "../model/Address";
import User, { UserModel } from "../model/User";

export default class UserRepo{

  public static async getById(id: Types.ObjectId): Promise<User> {

      return await UserModel.findOne({ _id: id, status: true})
                      .populate({
                          path: 'roles'
                      })
                      .populate(
                        {
                            path: 'address'
                        }
                      )
                      .lean<User>()
                      .exec();
  }
  public static getByEmail(email: string): Promise<User | null> {

      return UserModel.findOne({ email: email, status: true })
                      .select('+email +password +roles')
                      .populate({
                          path: 'roles',
                          select: '+code +status -_id'
                      })
                      .populate(
                        {
                            path: 'address'
                        }
                      )
                      .lean<User>()
                      .exec();
    }

    public static async create(user: User): Promise<User> {
      const now = new Date();
      user.createdAt = user.updatedAt = user.dateOfJoining = now;
      return await UserModel.create(user);
    }

    public static update(user: User) {
      user.updatedAt = new Date();
      UserModel.updateOne({ _id: user._id}, {$set: { ...user}})
               .lean().exec();
    }
}

