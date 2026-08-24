import { useState } from "react"

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    console.log('clicked login')
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