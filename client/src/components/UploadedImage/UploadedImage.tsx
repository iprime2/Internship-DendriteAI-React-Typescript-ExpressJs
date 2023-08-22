import { FC, useState } from 'react'

import './UploadedImage'

interface UploadedImageProps {
  uploadedImage?: string
}

const UploadedImage: FC<UploadedImageProps> = ({ uploadedImage }) => {
  const [hideUploadedImage, setHideUploadedImage] = useState<boolean>(false)

  if (hideUploadedImage) {
    return (
      <button
        type='button'
        className='btn btn-primary mt-1'
        onClick={() => setHideUploadedImage(false)}
      >
        Show
      </button>
    )
  }

  return (
    <div className='w-100 mt-3'>
      <h4 className='fw-bold'>Uploaded Image:</h4>
      <img
        className='w-100'
        src={uploadedImage}
        alt='Selected'
        crossOrigin='anonymous'
      />
      <div>
        <button
          type='button'
          className='btn btn-primary mt-1'
          onClick={() => setHideUploadedImage(true)}
        >
          Hide
        </button>
      </div>
    </div>
  )
}

export default UploadedImage
