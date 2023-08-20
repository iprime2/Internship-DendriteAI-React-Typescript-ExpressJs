import React, { useState } from 'react'
import './userAvatar.scss'
import { Link } from 'react-router-dom'

const UserAvatar = () => {
  const [pop, setPop] = useState<boolean>(false)
  return (
    <div
      className='pop-main d-flex flex-row-reverse w-25 h-25'
      onClick={() => setPop(!pop)}
    >
      <img
        src='./avatar.png'
        className='rounded-circle img-avatar'
        alt='logo'
      />
      {pop && (
        <div className='p-2 d-flex flex-column border pop-menu container-fluid font-sm rounded'>
          <Link className='link-btn  p-2 text-decoration-none' to='/profile'>
            Profile
          </Link>
          <Link className='link-btn p-2 text-decoration-none' to='/logout'>
            <span>Logout</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default UserAvatar
