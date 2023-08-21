import express from 'express'
import * as mobilenet from '@tensorflow-models/mobilenet'

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
  try {
    const model = await mobilenet.load()
    //@ts-ignore
    const { image } = req

    console.log(image)

    const result = await model.classify(image)

    console.log(result)
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
