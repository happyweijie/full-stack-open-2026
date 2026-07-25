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

module.exports = {
  initialBlogs, blogsInDb
}