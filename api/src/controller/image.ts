import express from 'express'

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
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
