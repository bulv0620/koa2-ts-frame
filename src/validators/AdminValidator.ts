import isEmpty from './isEmpty'
import Validator from 'validator'
import { AdminInfo } from '../@types/admin'

interface AdminValidatorError {
  username?: string
  password?: string
  password2?: string
  email?: string
  nickname?: string
  address?: string
  github?: string
  wechat?: string
  job?: string
  birthday?: string
}

interface AdminValidatorRes {
  errors: AdminValidatorError
  isValid: boolean
}

export default class AdminValidator {
  // 验证密码
  public static passwordValidator(password: string): AdminValidatorRes {
    const errors: AdminValidatorError = {}

    password = !isEmpty(password) ? password : ''

    if (Validator.isEmpty(password)) {
      errors.password = '密码不能为空'
    }

    if (!Validator.isLength(password, { min: 6, max: 16 })) {
      errors.password = '密码长度需要在6-16之间'
    }

    return {
      errors,
      isValid: isEmpty(errors),
    }
  }

  // 验证登录信息
  public static loginValidator(
    username: string,
    password: string
  ): AdminValidatorRes {
    const errors: AdminValidatorError = Object.assign(
      {},
      this.passwordValidator(password).errors
    )

    username = !isEmpty(username) ? username : ''

    if (Validator.isEmpty(username)) {
      errors.username = '用户名不能为空'
    }

    if (!Validator.isLength(username, { min: 6, max: 16 })) {
      errors.username = '用户名长度需要在6-16之间'
    }

    return {
      errors,
      isValid: isEmpty(errors),
    }
  }

  // 验证注册信息
  public static registerValidator(admin: AdminInfo): AdminValidatorRes {
    const errors: AdminValidatorError = Object.assign(
      {},
      this.loginValidator(admin.username, admin.password).errors
    )

    const password2 = !isEmpty(admin.password2) ? admin.password2 : ''
    const nickname = !isEmpty(admin.nickname) ? admin.nickname : ''
    const email = !isEmpty(admin.email) ? admin.email : ''
    const address = !isEmpty(admin.address) ? admin.address : ''
    const github = !isEmpty(admin.email) ? admin.email : ''
    const wechat = !isEmpty(admin.email) ? admin.email : ''
    const job = !isEmpty(admin.email) ? admin.email : ''
    const birthday = !isEmpty(admin.birthday) ? admin.birthday : ''

    if (Validator.isEmpty(password2)) {
      errors.password2 = '确认密码不能为空'
    }

    if (!Validator.equals(admin.password, password2)) {
      errors.password2 = '两次输入不一致'
    }

    if (Validator.isEmpty(email)) {
      errors.email = '邮箱不能为空'
    }

    if (!Validator.isEmail(email)) {
      errors.email = '非法的邮箱地址'
    }

    if (Validator.isEmpty(nickname)) {
      errors.password2 = '昵称不能为空'
    }
    if (Validator.isEmpty(address)) {
      errors.password2 = '地址不能为空'
    }
    if (Validator.isEmpty(github)) {
      errors.password2 = 'github不能为空'
    }
    if (Validator.isEmpty(wechat)) {
      errors.password2 = '微信号不能为空'
    }
    if (Validator.isEmpty(job)) {
      errors.password2 = '工作不能为空'
    }
    if (Validator.isEmpty(birthday.toString())) {
      errors.password2 = '生日不能为空'
    }

    return {
      errors,
      isValid: isEmpty(errors),
    }
  }
}
