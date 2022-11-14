import Router from 'koa-router'
import AdminCtrl from '../controller/AdminCtrl'

const route = new Router({ prefix: '/v1/admin' })

/**
 * @swagger
 * definitions:
 *   Success:
 *     properties:
 *       code:
 *         type: integer
 *         title: 成功的状态码
 *       msg:
 *         type: string
 *         title: 提示语
 */

/**
 * @swagger
 * /v1/admin/register:
 *   post:
 *     description: 注册
 *     tags: [授权模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "username"
 *         in: "body"
 *         description: "用户名"
 *         type: "string"
 *         required: true
 *       - name: "password"
 *         in: "body"
 *         description: "密码"
 *         type: "string"
 *         required: true
 *       - name: "password2"
 *         in: "body"
 *         description: "确认密码"
 *         type: "string"
 *         required: true
 *       - name: "email"
 *         in: "body"
 *         description: "昵称"
 *         type: "string"
 *         required: true
 *     responses:
 *       200:
 *         description: 注册成功
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Success'
 *
 */
route.post('/register', AdminCtrl.register)

export default route
