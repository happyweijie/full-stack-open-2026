const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  const blog = new Blog(request.body)
  const resultBlog = await blog.save()

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
