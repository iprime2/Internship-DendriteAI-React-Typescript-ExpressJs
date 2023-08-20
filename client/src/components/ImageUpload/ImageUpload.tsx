import React, { ChangeEvent, FC, useState } from 'react'
import UploadedImage from '../UploadedImage/UploadedImage'

interface ImageUploadProps {}

const ImageUpload: FC<ImageUploadProps> = ({}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

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

  return (
    <>
      <div className='input-group'>
        <input
          type='file'
          className='form-control'
          id='inputGroupFile04'
          aria-describedby='inputGroupFileAddon04'
          aria-label='Upload'
          onChange={handleImageUpload}
        />
        <button
          className='btn btn-outline-secondary'
          type='button'
          id='inputGroupFileAddon04'
        >
          Button
        </button>
      </div>

      {uploadedImage && (
        <>
          <UploadedImage uploadedImage={uploadedImage} />
        </>
      )}
    </>
  )
}

export default ImageUpload
