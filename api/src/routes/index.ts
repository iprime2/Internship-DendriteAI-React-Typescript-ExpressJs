import express from 'express'

import image from './image'

const router = express.Router()

export default (): express.Router => {
  image(router)
  console.log('routes index')
  return router
}
