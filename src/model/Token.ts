import { TokenInfo } from '../@types/token'
import mongoose from '../config/mongoose'
const Schema = mongoose.Schema

const TokenSchema = new Schema<TokenInfo>({
  token: String,
  expireAt: {
    type: Date,
    expires: 3600,
  },
})
const Token = mongoose.model('Token', TokenSchema)
export default Token
