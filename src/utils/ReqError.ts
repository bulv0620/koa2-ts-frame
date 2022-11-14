import { ERROR } from '../config/constant'

export default class ReqError extends Error {
  code: number
  data: unknown
  constructor(code = ERROR.UNEXPECTED_ERROR, msg?: string, data?: unknown) {
    super(msg)
    this.code = code
    this.data = data
  }
}
