import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'
import axios from 'axios'

import UploadedImage from '../UploadedImage/UploadedImage'

interface ImageUploadProps {}

interface Prediction {
  className: string
  probability: number
}

const ImageUpload: FC<ImageUploadProps> = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null)

  const imageRef = useRef<HTMLImageElement>(null)

  // useEffect(() => {
  //   const loadModel = async () => {
  //     try {
  //       await tf.setBackend('webgl') // Set the backend to WebGL
  //       await tf.ready() // Wait for TensorFlow.js to be ready
  //       const mobilenetModel = await mobilenet.load()
  //       setModel(mobilenetModel)
  //       console.log('Model Loaded')
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   loadModel()
  // }, [])

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (files && files.length > 0) {
      const url = URL.createObjectURL(files[0])
      setUploadedImage(url)
    }
  }

  const onGenerate = async () => {
    setLoading(true)

    try {
      // if (model && imageRef.current) {
      //   const predictions = await model.classify(imageRef.current)
      //   setPredictions(predictions)
      //   console.log(predictions)
      // }

      //@ts-ignore
      if (imageRef.current && imageRef.current.src) {
        const response = await fetch(imageRef.current.src)
        const blob = await response.blob()

        const formData = new FormData()
        formData.append('image', blob, 'image.jpg')

        //@ts-ignore
        console.log(formData.image)

        const res = await axios.post<Prediction[]>(
          'http://localhost:7070/api/classify',
          formData
        )

        setPredictions(res.data)
      } else {
        console.log('File not uploaded on backend')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-75'>
      <div className='input-group'>
        <input
          type='file'
          className='form-control'
          id='inputGroupFile04'
          aria-describedby='inputGroupFileAddon04'
          aria-label='Upload'
          disabled={loading}
          onChange={handleImageUpload}
        />
        <button
          className='btn btn-primary'
          type='button'
          id='inputGroupFileAddon04'
          onClick={onGenerate}
          disabled={loading || !uploadedImage}
        >
          Generate
        </button>
      </div>

      {uploadedImage && (
        <div className='w-100 mt-3'>
          <h4 className='fw-bold'>Uploaded Image:</h4>
          <img
            className='w-100'
            src={uploadedImage}
            alt='Selected'
            crossOrigin='anonymous'
            ref={imageRef}
          />
        </div>
      )}

      {predictions.length > 0 && (
        <ul>
          {predictions.map(({ className, probability }, index) => (
            <li key={index}>{`${className} (${Math.round(
              probability * 100
            )}%)`}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ImageUpload
