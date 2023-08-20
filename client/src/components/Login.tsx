import React from 'react'
import { keycloakConfig } from '../utils'

const Login = () => {
  const handleLogin = () => {
    // Perform login action, such as redirecting to Keycloak login page
    const { url, realm, clientId } = keycloakConfig
    const loginUrl = `${url}/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&redirect_uri=${window.location.origin}`
    window.location.href = loginUrl
  }

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
