import { useState } from "react"
import loginService from "../../services/login"

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    console.log('clicked login')

    try {
      const user = await loginService.login({ username, password })

      setUser(user)
      setUsername('')
      setPassword('')
      
    } catch {
      console.log('invalid credential')
    }
    
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to blogs app</h2>

      <div>
        <label>
          username
          <input 
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