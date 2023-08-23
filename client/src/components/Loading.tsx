import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const Loading = () => {
  return (
    <div className='loader-div'>
      <ClipLoader size={150} />
    </div>
  )
}

export default Loading
