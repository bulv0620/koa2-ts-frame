import mongoose from 'mongoose'
import { DB_URL } from './constant'
import logger from '../utils/logger'

mongoose.connect(DB_URL)

mongoose.connection.on('connected', () => {
  logger.info('mongodb is connected')
})

mongoose.connection.on('disconnected', () => {
  logger.warn('mongodb connection disconnected')
})

mongoose.connection.on('error', () => {
  logger.error('mongodb connection exception')
})

export default mongoose
