import jsonwebtoken from 'jsonwebtoken'
import logger from '../../utils/logger'
import { ERROR, JWT_SECRET } from '../../config/constant'
import { Context, Next } from 'koa'
import TokenService from '../../service/TokenService'
import ReqError from '../../utils/ReqError'

export interface UserParams {
  username: string
  name?: string
}

export interface VerifyOption {
  unless: Array<string>
}

export function signUserToken(
  userData: UserParams,
  options?: jsonwebtoken.SignOptions
): string {
  try {
    return jsonwebtoken.sign(userData, JWT_SECRET, options)
  } catch (error) {
    logger.error(error)
  }
}

/**
 * 验证用户token值
 * @static
 * @param {string} token
 * @return {*}  {Object}
 * @memberof JwtAuth
 */
export function verifyUserToken(token: string): unknown {
  try {
    const authorization = token && token.split(' ')[1]
    return jsonwebtoken.verify(authorization, JWT_SECRET)
  } catch (error) {
    logger.error(error)
    throw new ReqError(ERROR.PERMISSION_DENIED)
  }
}

// 验证jwt的中间件
export function jwtVerify(option: VerifyOption) {
  const { unless } = option
  return async (ctx: Context, next: Next) => {
    const url = ctx.url
    if (!unless.includes(url)) {
      const { authorization = '' } = ctx.request.header

      const isWhitelisted = await TokenService.findToken(authorization)

      if (!isWhitelisted) {
        throw new ReqError(ERROR.PERMISSION_DENIED)
      }

      const adminInfo = verifyUserToken(authorization)

      ctx.state.admin = adminInfo
    }

    await next()
  }
}
