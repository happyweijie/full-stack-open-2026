import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/forms/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App