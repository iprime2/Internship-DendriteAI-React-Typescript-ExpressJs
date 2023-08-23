import mongoose from 'mongoose'

mongoose.set('strictQuery', true)
mongoose.Promise = Promise

const connectDB = (url: string) => {
  try {
    return mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions)
  } catch (error) {
    mongoose.connection.on('error', (error: Error) => console.log(error))
  }
}

export = connectDB
