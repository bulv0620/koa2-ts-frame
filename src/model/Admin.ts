import { AdminInfo } from '../@types/admin'
import mongoose from '../config/mongoose'
const Schema = mongoose.Schema

const AdminSchema = new Schema<AdminInfo>({
  username: String,
  password: String,
  email: String,
  nickname: String,
  birthday: Date,
  address: String,
  github: String,
  wechat: String,
  job: String,
})
const Admin = mongoose.model('Admin', AdminSchema)
export default Admin
