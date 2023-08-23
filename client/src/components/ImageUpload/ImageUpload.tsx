import React, { ChangeEvent, FC, useRef, useState } from 'react'
import axios from 'axios'

interface ImageUploadProps {}

interface Prediction {
  className: string
  probability: number
}

const ImageUpload: FC<ImageUploadProps> = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const imageRef = useRef<HTMLImageElement>(null)

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setUploadedImage(url)
      setSelectedImage(file)
    } else {
      console.log('No image selected')
    }
  }

  const getCookie = (name: string) => {
    const cookieValue = document.cookie.match(
      '(^|;)\\s*' + name + '\\s*=\\s*([^;]+)'
    )
    return cookieValue ? cookieValue.pop() : ''
  }

  const onGenerate = async () => {
    setLoading(true)
    console.log(selectedImage)

    try {
      const formData = new FormData()
      formData.append('image', selectedImage!)

      const csrftoken = getCookie('csrftoken')
      axios.defaults.headers.post['X-CSRFToken'] = csrftoken

      const response = await axios.post(
        'http://127.0.0.1:8000/classifier/',
        formData
      )

      const { categories, confidences } = response.data

      const newPredictions: Prediction[] = categories.map(
        (category: string, index: number) => ({
          className: category,
          probability: confidences[index],
        })
      )
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
          name='image'
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
