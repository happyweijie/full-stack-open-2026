const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  //=============== Fetching all blogs ===========
  describe('when viewing all blogs ', () => {
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
  })
  
  //============= Adding a new blog ================
  describe('when adding a new blog', () => {
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

    test('a blog has likes default to 0 if unspecified', async () => {
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

    test('a blog with no title is not added', async () => {
      const newBlog = {
        author: 'ronald',
        url: 'www.google.com',
      }

      await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })

    test('a blog with no url is not added', async () => {
      const newBlog = {
        title: 'Test Blog 3',
        author: 'ronald',
      }

      await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })

  describe('when deleting a blog', () => {
    test('a valid blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
      assert(!blogsAtEnd.some(blog => blog.id === blogToDelete.id))
    })

    test('succeeds with status code 204 even if id does not exist', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const validNonexistingId = helper.nonExistingId()

      await api.delete(`/api/blogs/${validNonexistingId}`)
        .expect(204)

      // Make sure no blogs deleted
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api.delete(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})