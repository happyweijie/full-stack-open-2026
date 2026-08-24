import { LOCAL_STORAGE_KEY } from "./LoginForm"

const LogoutForm = ({ setUser }) => {

  const handleLogout = (event) => {
    event.preventDefault()

    console.log('clicked logout')

    // logout user
    setUser(null)
    window.localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  return (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )
}

export default LogoutForm