import Router from 'koa-router'
import { Context } from 'koa'
import swaggerSpec from '../middlewares/swagger/swagger.conf'
const route = new Router()

route.get('/docs', (ctx: Context) => {
  ctx.body = swaggerSpec
})

export default route
