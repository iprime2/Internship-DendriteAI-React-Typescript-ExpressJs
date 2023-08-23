import express, { Request, Response } from 'express'
import { load } from '@tensorflow-models/mobilenet'
import tf from '@tensorflow/tfjs-node'
import { createCanvas, loadImage } from 'canvas'

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
  res.status(200).json('hello')
}
