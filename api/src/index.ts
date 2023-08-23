import express, { Request, Response } from 'express'
import http from 'http'
import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import * as tf from '@tensorflow/tfjs-node'
import * as mobilenet from '@tensorflow-models/mobilenet'

import connectDB from './db/dbConnect'
import router from './routes'

dotenv.config()

const app: express.Application = express()
const PORT: number = parseInt(process.env.PORT || '1010')

app.use(
  cors({
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())

app.use('/api', router())

// Set up Multer for file uploads
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Load the MobileNet model
let model: mobilenet.MobileNet | null = null
;(async () => {
  try {
    await tf.ready() // Wait for TensorFlow.js to be ready
    model = await mobilenet.load()

    console.log('Model Loaded')
  } catch (error) {
    console.log(error)
  }
})()

// Route for image upload and prediction
app.post(
  '/classifyImage',
  upload.single('image'),
  async (req: Request, res: Response) => {
    try {
      if (!model) {
        return res.status(500).json({ error: 'Model not loaded' })
      }

      //@ts-ignore
      const buffer = req.file.buffer
      const img = tf.node.decodeImage(buffer)
      const batchedImg: tf.Tensor3D = tf.expandDims(img) as tf.Tensor3D

      const predictions = await model.classify(batchedImg)
      const result = predictions[0]

      res.json({ className: result.className, probability: result.probability })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
)

const server = http.createServer(app)

const startServer = async () => {
  try {
    const db = await connectDB(process.env.MONGO_URI)
    if (db) {
      console.log('DB Connected')
    }
    server.listen(PORT, () => {
      console.log('Server is running on http://localhost:' + PORT)
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()
