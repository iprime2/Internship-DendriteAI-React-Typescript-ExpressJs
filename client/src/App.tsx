import React, { useEffect, useState } from 'react'
import Keycloak, { KeycloakInstance } from 'keycloak-js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { keycloakConfig } from './utils'
import AppContent from './components/AppContent'
import Logout from './components/Logout'
import Loading from './components/Loading'

const App: React.FC = () => {
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const initKeycloak = async () => {
      const keycloak: KeycloakInstance = new Keycloak(keycloakConfig)

      try {
        await keycloak.init({ onLoad: 'login-required' })
      } catch (error) {
        console.error('Keycloak initialization error:', error)
        setError(error as Error)
      }
    }

    initKeycloak()
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Loading />} /> */}
          <Route index path='/' element={<AppContent />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
