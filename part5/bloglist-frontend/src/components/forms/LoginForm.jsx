import { useState } from "react"
import loginService from "../../services/login"
import blogService from "../../services/blogs"

export const LOCAL_STORAGE_KEY = 'blogAppUser'

const LoginForm = ({ setUser, showNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    console.log('clicked login')

    try {
      const user = await loginService.login({ username, password })

      // set user
      setUser(user)
      blogService.setToken(user.token)
      // Note: no need to unset username and password fields
      // the component will be unmounted on login
      // on logout, a new instance will be created

      // save user to local storage
      window.localStorage.setItem(
        'blogAppUser', JSON.stringify(user)
      )
    } catch { // exception triggered by axios
      showNotification('Incorrect username or password', 'error')
    }
    
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to blogs app</h2>

      <div>
        <label>
          username
          <input
            required={true}
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          password
          <input
            required={true}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>

      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm