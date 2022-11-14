import Koa from 'koa'
import KoaBody from 'koa-body'
import Path from 'path'
import logger from './utils/logger'
import { PORT, JWT_WHITE_LIST } from './config/constant'
import loggerMiddleware from './middlewares/logger'
import Cors from 'koa2-cors'
import corsHandler from './middlewares/cors'
import Static from 'koa-static'
import { errorHandler, responseHandler } from './middlewares/response'
import { koaSwagger } from 'koa2-swagger-ui'
import { jwtVerify } from './middlewares/jwt'
import Swagger from './routes/swagger'
import Admin from './routes/admin'

const app = new Koa()
const source = Static(Path.join(__dirname, 'public'))

// Logger
app.use(loggerMiddleware)

// Error Handler
app.use(errorHandler)

// cors
app.use(Cors(corsHandler))

// ctx.body
app.use(
  KoaBody({
    // 支持文件格式
    multipart: true,
    formidable: {
      // 上传目录
      uploadDir: Path.join(__dirname, 'public/uploads'),
      // 保留文件扩展名
      keepExtensions: false,
    },
  })
)

// static source
app.use(source)

// swagger
app.use(
  koaSwagger({
    routePrefix: '/swagger', // 接口文档访问地址
    swaggerOptions: {
      url: '/docs',
    },
  })
)

// jwt verify
app.use(jwtVerify({ unless: JWT_WHITE_LIST }))

// response Handler
app.use(responseHandler)

// routes
app.use(Swagger.routes()).use(Swagger.allowedMethods())
app.use(Admin.routes()).use(Admin.allowedMethods())

app.listen(PORT, () => {
  logger.info(`server listen on ${PORT}`)
})
