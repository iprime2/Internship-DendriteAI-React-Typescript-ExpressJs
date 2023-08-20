import React from 'react'

const Navbar = () => {
  return (
    <nav className='navbar navbar-custom bg-body-tertiary'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          {/* <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"> */}
          Bootstrap
        </a>
        <a href='http://localhost:2020/realms/internship/account'>
          <button type='button' className='btn btn-primary'>
            Sign In
          </button>
        </a>
      </div>
    </nav>
  )
}

export default Navbar
