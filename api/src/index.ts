import express, { Request, Response } from 'express'
import http from 'http'
import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'
// import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as tf from '@tensorflow/tfjs-node'
import multer from 'multer'

import fileUpload from 'express-fileupload'

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

const upload = multer({ dest: 'uploads/' })

interface Prediction {
  className: string
  probability: number
}

app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded')
  }

  const { path } = req.file

  console.log(path)

  try {
    // await tf.setBackend('tensorflow') // or 'tensorflow' for CPU, 'tensorflow-gpu' for GPU
    await tf.ready()
    const model = await mobilenet.load()
    console.log('Model loaded')
    //@ts-ignore
    const imageBuffer = await tf.node.readFile(path)
    const imageTensor = tf.node.decodeImage(imageBuffer)
    const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224])
    const expandedImage = resizedImage.expandDims(0)
    //@ts-ignore
    const preprocessedImage = mobilenet.preprocessInput(expandedImage)

    const predictions = (await model.classify(
      preprocessedImage
    )) as Prediction[]
    res.json(predictions)
  } catch (error) {
    res.status(500).send('An error occurred during image classification.')
  }
})

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
