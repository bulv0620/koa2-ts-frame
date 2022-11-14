import logger from '../../utils/logger'
import { Context, Next } from 'koa'
import { ERROR } from '../../config/constant'

// 回传处理
// 回传格式：{ code: 0, msg: any data: any }
export const responseHandler = async (ctx: Context, next: Next) => {
  await next()
  if (ctx.msg) {
    ctx.type = 'json'
    ctx.body = {
      code: 0,
      msg: ctx.msg || '成功',
      data: ctx.result || {},
    }
  }
}

// 异常处理
// 异常消息：{ code: '错误代码', msg: '错误信息' }
export const errorHandler = async (ctx: Context, next: Next) => {
  try {
    return await next()
  } catch (err) {
    logger.error(err)
    if (err.code === -401) {
      ctx.status = 401
      ctx.body = '没有权限'
    } else {
      ctx.body = {
        code: err.code || ERROR.UNEXPECTED_ERROR,
        msg: err.message.trim() || '错误',
        data: err.data,
      }
      ctx.status = 200
    }
    return await Promise.resolve()
  }
}
