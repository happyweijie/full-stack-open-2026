const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

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
  const user = await User.findOne({ username: 'dummyuser' })
  if (!user) {
    return await createDummyUser()
  }

  return user
}

const getDummyUserToken = async () => {
  const dummyUser = await getDummyUser()

  return jwt.sign(
    { username: dummyUser.username, id: dummyUser._id },
    process.env.SECRET,
    { expiresIn: 60 * 60 }
  )
}

module.exports = {
  initialBlogs, 
  createDummyUser, 
  getDummyUser, 
  getDummyUserToken,
  blogsInDb, 
  usersInDb, 
  nonExistingBlogId,
}