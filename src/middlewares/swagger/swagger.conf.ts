import path from 'path'
import swaggerJSDoc from 'swagger-jsdoc'
import { PORT } from '../../config/constant'

const swaggerDefinition = {
  info: {
    // API informations (required)
    title: 'imblogs', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'Lightweight, efficient and fast blogging system', // Description (optional)
  },
  host: `http://localhost:${PORT}`, // Host (optional)
  basePath: '/', // Base path (optional)
}

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../../routes/*.ts')], // all api
}

const jsonSpc = swaggerJSDoc(options)
export default jsonSpc
