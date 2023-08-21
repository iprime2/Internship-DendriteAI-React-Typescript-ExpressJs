import express from 'express'

import { imageGenerate, classify } from '../controller/image'

export default (router: express.Router) => {
  // Set up multer for handling file uploads
  router.post('/image', imageGenerate)
  router.post('/classify', classify)
}
