import { Context, Next } from 'koa'
import logger from '../../utils/logger'

// logger中间件
const loggerMiddleware = async (ctx: Context, next: Next) => {
  // 请求开始时间
  const start = +new Date()
  await next()
  // 结束时间
  const ms = +new Date() - start
  // 打印出请求相关参数
  const remoteAddress = ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips
  const logText = `${ctx.method} ${ctx.status} ${
    ctx.url
  } request params: ${JSON.stringify(
    ctx.request.body
  )}  response params: ${JSON.stringify(ctx.body)} - ${remoteAddress} - ${ms}ms`
  logger.info(logText)
}

export default loggerMiddleware
