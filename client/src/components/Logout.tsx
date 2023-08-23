import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Keycloak, { KeycloakInstance } from 'keycloak-js'
import Loading from './Loading'

const Logout: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const logout = async () => {
      const keycloak: KeycloakInstance = new Keycloak() // Create a new Keycloak instance

      try {
        console.log('hello')
        await keycloak.init({
          onLoad: 'check-sso',
        }) // Initialize Keycloak

        if (keycloak.authenticated) {
          await keycloak.logout() // Logout the user
        }
      } catch (error: any) {
        console.error('Keycloak logout error:', error)
      }

      navigate('/') // Redirect to the login page
    }

    logout()
  }, [navigate])

  return (
    <div>
      <h1 className='ml-10'>Logging Out...</h1>
      <Loading />
    </div>
  )
}

export default Logout
