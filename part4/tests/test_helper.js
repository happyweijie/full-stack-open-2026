const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersInDb = async () => {
  const users = await User.find({})
  
  return users.map(user => user.toJSON())
}

const invalidId = '5a3d5da59070081a82a3445'

const nonExistingBlogId = async () => {
  const blog = new Blog({
      title: 'Will delete this',
      author: 'john',
      url: 'www.example.com',
      likes: 0,
    })

  await blog.save()
  await blog.deleteOne()

  return blog.toJSON().id
}

const createDummyUser = async () => {
  const user = new User({
    username: 'dummyuser',
    name: 'Dummy User',
    passwordHash: 'hashedpassword'
  })

  const savedUser = await user.save()
  return savedUser
}

const getDummyUser = async () => {
  const users = await usersInDb()
  return users[0]
}

module.exports = {
  initialBlogs, 
  createDummyUser, 
  getDummyUser, 
  blogsInDb, 
  usersInDb, 
  nonExistingBlogId,
}