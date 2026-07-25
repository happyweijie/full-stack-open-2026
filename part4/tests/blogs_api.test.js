const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('all blogs have id as unique identifier', async () => {
  const blogs = await helper.blogsInDb()

  // assert that _id is deleted
  assert(blogs.every(blog => !('_id' in blog)))
  
  // assert that id exists for all blogs
  assert(blogs.every(blog => 'id' in blog))

  // assert id is unique
  assert.strictEqual(new Set(blogs.map(blog => blog.id)).size, blogs.length)

})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test Blog 3',
    author: 'ronald',
    url: 'www.google.com',
    likes: 0,
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  assert(blogsAtEnd.some(blog => blog.title === newBlog.title))
})

test.only('a blog has likes default to 0 if unspecified', async () => {
  const newBlog = {
    title: 'Test Blog 3',
    author: 'ronald',
    url: 'www.google.com',
  }

  const response = await api.post('/api/blogs')
    .send(newBlog)

  const resultBlog = response.body
  assert.strictEqual(resultBlog.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})