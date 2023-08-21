import React, { ChangeEvent, FC, useState } from 'react'
import axios from 'axios'

import UploadedImage from '../UploadedImage/UploadedImage'

interface ImageUploadProps {}

interface Prediction {
  className: string
  probability: number
}

const ImageUpload: FC<ImageUploadProps> = ({}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onGenerate = async () => {
    setLoading(true)
    const formData = new FormData()
    if (uploadedImage) {
      const convertedImage = await fetch(uploadedImage)
      const blobImage = await convertedImage.blob()
      formData.append('image', blobImage, 'image.png')
    }
    try {
      const response = await axios.post(
        'http://localhost:7070/api/classify',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      console.log(response)

      if (response.data && response.data.path) {
        const imagePath = response.data.path
        // Continue with the rest of your code that uses the imagePath
        setPredictions(response.data)
      } else {
        // Handle the case where the path property is not available
        console.log('No path found!')
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
          disabled={loading}
        >
          Generate
        </button>
      </div>

      {uploadedImage && (
        <>
          <UploadedImage uploadedImage={uploadedImage} />
        </>
      )}
      {predictions.length > 0 && (
        <ul>
          {predictions.map((prediction, index) => (
            <li key={index}>{`${prediction?.className} (${Math.round(
              prediction.probability * 100
            )}%)`}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ImageUpload
