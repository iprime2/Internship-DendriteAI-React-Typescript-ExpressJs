import express from 'express'
import * as tf from '@tensorflow/tfjs-node'
import * as mobilenet from '@tensorflow-models/mobilenet'
import { UploadedFile } from 'express-fileupload'

import { loadModel } from '../loadModel'

export const imageGenerate = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log('hello')
    return res.status(200).json({ message: 'hello' }).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

export const classify = async (req: express.Request, res: express.Response) => {
  //@ts-ignore
  // const { image } = req
  const model = await loadModel()

  try {
    //@ts-ignore
    const imageObject = req.files?.image as UploadedFile
    console.log(imageObject)
    // const tfimage = tf.node.decodeImage(imageObject.data) as tf.Tensor3D
    // const result = model.classify(tfimage)
    // old
    // const predictions = await model.classify(image)
    // res.json(predictions)
  } catch (error) {
    res.status(500).send('An error occurred during image classification.')
  }
}
