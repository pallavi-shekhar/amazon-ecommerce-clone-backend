import { InternalError } from '../../core/ApiError';
import Role, { RoleModel } from '../model/Role';

export default class RoleRepo {
  public static async findByCode(code: string): Promise<Role> {
    const role = await RoleModel.findOne({ code: code })
      .lean<Role>()
      .exec();

    if (role === null || role._id === undefined)
      throw new InternalError('Role must be defined');

    return role;
  }  
}