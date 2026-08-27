import { useState } from "react"
import blogService from "../../services/blogs"

const BlogForm = ({ setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    const returnedBlog = await blogService.createBlog(newBlog)
    setBlogs(prev => prev.concat(returnedBlog))

    // clear form fields
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new blog</h2>

      <div>
        <label>
          title
          <input 
            type="text"
            required={true}
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          author
          <input 
            type="text"
            required={true}
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          url
          <input 
            type="text"
            required={true}
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>

      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm