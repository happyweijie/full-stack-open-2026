import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm, { LOCAL_STORAGE_KEY } from './components/forms/LoginForm'
import LogoutForm from './components/forms/LogoutForm'
import BlogForm from './components/forms/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

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
        <LoginForm setUser={setUser} />
      </div>
    )
  }

  return (
    <div>
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