import React from 'react'
import { Link } from 'react-router-dom'
import UserAvatar from './UserAvatar/UserAvatar'

const Navbar = () => {
  return (
    <nav className='navbar navbar-custom bg-body-tertiary px-3'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='/'>
          <img
            src='https://media.licdn.com/dms/image/C4E0BAQG35mUdzc_Obw/company-logo_200_200/0/1656091639593?e=1700697600&v=beta&t=-5X2HJ456XuNKVkcwaIdboq-GX2o1hCBuM8sN71X_1A'
            alt='Logo'
            width='30'
            height='24'
            className='d-inline-block align-text-top'
          />
          Dendrite.ai
        </a>
        {/* <Link to='/logout'>
          <button type='button' className='btn btn-primary'>
            <i className='bi bi-box-arrow-right'></i>
            Log out
          </button>
        </Link> */}
        <UserAvatar />
      </div>
    </nav>
  )
}

export default Navbar
