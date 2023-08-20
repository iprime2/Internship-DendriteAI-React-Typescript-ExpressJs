import React, { useEffect, useState } from 'react'
import Keycloak, { KeycloakInstance } from 'keycloak-js'

import { keycloakConfig } from './utils'
import AppContent from './components/AppContent'
import Login from './components/Login'
import Navbar from './components/Navbar'

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const initKeycloak = async () => {
      const keycloak: KeycloakInstance = new Keycloak(keycloakConfig)

      try {
        await keycloak.init({ onLoad: 'login-required' })
        setAuthenticated(true)
      } catch (error) {
        console.error('Keycloak initialization error:', error)
        setError(error as Error)
        setAuthenticated(false)
      }
    }

    initKeycloak()
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <Navbar />
    </div>
  )
}

export default App
