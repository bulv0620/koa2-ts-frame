import Token from '../model/Token'

export default class TokenService {
  public static async insertToken(token: string) {
    const tokenInstance = new Token({ token, expireAt: Date.now() })
    const insertedToken = await tokenInstance.save()

    return insertedToken
  }

  public static async findToken(token: string): Promise<boolean> {
    const res = await Token.findOne({ token })
    if (!res) {
      return false
    }
    return true
  }

  public static async removeToken(token: string) {
    const res = await Token.remove({ token })
    console.log(res)
    return res
  }
}
