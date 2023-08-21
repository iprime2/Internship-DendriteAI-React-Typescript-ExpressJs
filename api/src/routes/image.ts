import express from 'express'
import multer from 'multer'

import { imageGenerate, classify } from '../controller/image'

export default (router: express.Router) => {
  // Set up multer for handling file uploads
  const storage = multer.memoryStorage()
  const upload = multer({ storage })
  router.post('/image', imageGenerate)
  router.post('/classify', upload.single('image'), classify)
}
