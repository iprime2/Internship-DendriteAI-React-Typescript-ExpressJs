import React from 'react'
import Navbar from './Navbar'

const AppContent = () => {
  return (
    <div>
      <Navbar />
      <h2>Welcome to AppContent!</h2>
      {/* Render your app's protected content here */}
    </div>
  )
}

export default AppContent
