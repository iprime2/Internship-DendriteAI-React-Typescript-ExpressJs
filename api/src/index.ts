import bodyParser from 'body-parser'
import express from 'express'
import http from 'http'
import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/dbConnect'
import router from './routes'

dotenv.config()

const app = express()
const PORT: number = parseInt(process.env.PORT || '1010')

app.use(
  cors({
    credentials: true,
  })
)

app.use(compression)
app.use(bodyParser)

app.use('/', router)

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
