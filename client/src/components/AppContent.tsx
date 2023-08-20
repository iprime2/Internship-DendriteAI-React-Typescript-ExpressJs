import React from 'react'
import Navbar from './Navbar'
import Main from './Main/Main'
import Sidebar from './Sidebar/Sidebar'

const AppContent = () => {
  return (
    <div className='h-100 w-100'>
      <Navbar />
      <div className='d-flex '>
        <Sidebar />
        <Main />
      </div>
    </div>
  )
}

export default AppContent
