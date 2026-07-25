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

after(async () => {
  await mongoose.connection.close()
})