import Admin from '../model/Admin'
import { AdminInfo } from '../@types/admin'
import AdminValidator from '../validators/AdminValidator'
import ReqError from '../utils/ReqError'
import { ERROR } from '../config/constant'
import sha256 from 'sha256'

export default class AdminService {
  public static async insertAdmin(admin: AdminInfo) {
    // 验证输入合法性
    const { errors, isValid } = AdminValidator.registerValidator(admin)
    if (!isValid) throw new ReqError(ERROR.INVALID_INPUT, '非法的输入', errors)

    // 验证是否已存在管理员
    const isExist = await this.isAdminExists()
    if (isExist) throw new ReqError(ERROR.ADMIN_EXSIST, '管理员用户已存在')

    // 加密密码
    admin.password = sha256(admin.password)

    // 创建实例保存
    const adminInstance = new Admin(admin)
    const res = await adminInstance.save()

    return res
  }

  public static async isAdminExists() {
    const count = await Admin.find().count()
    return count > 0
  }
}
