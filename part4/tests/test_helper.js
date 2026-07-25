const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Test Blog 1',
    author: 'john',
    url: 'www.example.com',
    likes: 0,
  }, 
  {
    title: 'Test Blog 2',
    author: 'jane',
    url: 'www.example.com',
    likes: 1,
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})

  return blogs.map(blog => blog.toJSON())
}

const invalidId = '5a3d5da59070081a82a3445'

const nonExistingId = () => {
  const blog = new Blog({
      title: 'Will delete this',
      author: 'john',
      url: 'www.example.com',
      likes: 0,
    })

  blog.save()
  blog.deleteOne()

  return blog.toJSON().id
}

module.exports = {
  initialBlogs, blogsInDb, invalidId, nonExistingId
}