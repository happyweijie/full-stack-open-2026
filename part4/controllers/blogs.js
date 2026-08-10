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

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  // For now, use the first user as the author
  const user = await User.findOne({})

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
  await Blog.findByIdAndDelete(request.params.id)

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
