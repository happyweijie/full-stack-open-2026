const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedUserToken = jwt.verify(
    request.token, 
    process.env.SECRET)

  if (!decodedUserToken) {
    return response.status(401)
      .json({ error: 'invalid token' })
  }

  // Get author of post from decoded token
  const user = await User.findById(decodedUserToken.id)
  if (!user) {
    return response.status(400)
      .json({ error: 'UserId missing or not valid' })
  }

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  const blog = new Blog({
    ...body,
    likes: body.likes || 0,
    user: user._id
  })
  const resultBlog = await blog.save()

  // add the blog to the user's blogs array
  user.blogs = user.blogs.concat(resultBlog._id)
  await user.save()

  response.status(201)
    .json(resultBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  // get blog
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(204).end()
  }

  // get request of user making the request
  const decodedUserToken = jwt.verify(
    request.token, 
    process.env.SECRET)

  if (!decodedUserToken) {
    return response.status(401)
      .json({ error: 'invalid token' })
  }

  // Get author of request from decoded token
  const user = await User.findById(decodedUserToken.id)
  if (!user) {
    return response.status(400)
      .json({ error: 'UserId missing or not valid' })
  }

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401)
      .json({ error: 'only the creator can delete a blog' })
  }

  // Delete the blog from both Blog and User models
  await Blog.findByIdAndDelete(request.params.id)
  user.blogs = user.blogs
    .filter(blogId=> blogId.toString() !== request.params.id)
  await user.save()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).end()
  }

  if (title) {
    blog.title = title
  }

  if (author) {
    blog.author = author
  }

  if (url) {
    blog.url = url
  }

  if (likes) {
    blog.likes = likes
  }

  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})

module.exports = blogsRouter
