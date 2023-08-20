import express from 'express'

import { image } from '../controller/image'

export default (router: express.Router) => {
  console.log('Routes image')
  router.get('/image', image)
}
