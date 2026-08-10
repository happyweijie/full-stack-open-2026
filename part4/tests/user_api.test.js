const app = require('../app')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ 
      username: 'root', 
      name: 'Superuser', 
      passwordHash 
    })

    await user.save()
  })

  test.only('creation succeeds with fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      username: 'johnjimjam',
      name: 'John Jimjam',
      password: 'strongpassword'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})

after(async () => {
  await mongoose.connection.close()
})
