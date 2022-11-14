import path from 'path'

const development =
  'mongodb+srv://root:root@cluster0.g0duf0o.mongodb.net/imblogs?retryWrites=true&w=majority'
const production = 'mongodb://localhost/imblogs'

export const DB_URL = {
  development: development,
  production: production,
}[process.env.NODE_ENV || 'production']

export const PORT = 8080
export const JWT_SECRET = 'im_blogs_bulv'
export const LOG_PATH = path.resolve(__dirname, '../../logs/server.log')
export const JWT_WHITE_LIST = ['/v1/admin/login', '/v1/admin/register', '/docs']
export const ERROR = {
  UNEXPECTED_ERROR: -99,
  PERMISSION_DENIED: -401,

  INVALID_INPUT: -10,
  ADMIN_EXSIST: -20,
}
