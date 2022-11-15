import path from 'path'
import fs from 'fs'
import log4js from 'log4js'
import { LOG_PATH } from '../config/constant'

// logs目录创建
const logsDir = path.parse(LOG_PATH).dir
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

// 配置log4.js
log4js.configure({
  pm2: true,
  disableClustering: true,
  appenders: {
    console: { type: 'console' },
    dateFile: {
      type: 'dateFile',
      filename: LOG_PATH,
      pattern: '-yyyy-MM-dd',
    },
  },
  categories: {
    default: {
      appenders: ['console', 'dateFile'],
      level: 'error',
    },
  },
})

const logger = log4js.getLogger()
logger.level = 'all'

export default logger
