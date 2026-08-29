import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm, { LOCAL_STORAGE_KEY } from './components/forms/LoginForm'
import LogoutForm from './components/forms/LogoutForm'
import BlogForm from './components/forms/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationVariant, setNotificationVariant] = useState(null)

  const showNotification = (message, variant) => {
    setNotificationMessage(message)
    setNotificationVariant(variant)

    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationVariant(null)
    }, 3000)
  }


  // load blogs on page load
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])
  
  // on page load, retrieve any user credentials stored in local storage
  useEffect(() => {
    const loggedInUserJson = window.localStorage.getItem(LOCAL_STORAGE_KEY)

    if (loggedInUserJson) {
      const userJson = JSON.parse(loggedInUserJson)

      setUser(userJson)
      blogService.setToken(userJson.token)
    }
  }, [])

  // Login page
  if (!user) {
    return (
      <div>
        <Notification message={notificationMessage} variant={notificationVariant} />
        <LoginForm setUser={setUser} showNotification={showNotification}/>
      </div>
    )
  }

  return (
    <div>
      <Notification message={notificationMessage} variant={notificationVariant} />

      <h2>blogs</h2>
      <p>
        <i>{user.name}</i> is logged in
      </p>

      <LogoutForm setUser={setUser} />

      <BlogForm setBlogs={setBlogs} />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App