import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'

export const loadModel = async () => {
  try {
    // await tf.setPlatform('webgl') // Set the platform to 'webgl'
    await tf.ready() // Wait for TensorFlow.js to be ready
    const model = await mobilenet.load()

    console.log('Model Loaded')

    return model
  } catch (error) {
    console.log(error)
  }
}
