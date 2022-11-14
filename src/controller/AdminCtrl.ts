import { Context } from 'koa'
import AdminService from '../service/AdminService'
import { AdminInfo } from '../@types/admin'
// import logger from '../utils/logger'

export default class AdminCtrl {
  // 注册
  public static async register(ctx: Context) {
    const adminInfo: AdminInfo = ctx.request.body

    ctx.result = await AdminService.insertAdmin(adminInfo)
    ctx.msg = '注册成功'
  }
}
