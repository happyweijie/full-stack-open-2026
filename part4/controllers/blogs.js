const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }
  response.json(blog)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user  

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

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  // get blog
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(204).end()
  }

  // get user making the request
  const user = request.user
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
    return response.status(404).end()
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $set: { title, author, url, likes } },
    { returnDocument: 'after', runValidators: true }
  )

  response.json(updatedBlog)
})

module.exports = blogsRouter
