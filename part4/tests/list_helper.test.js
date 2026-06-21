const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const LIST_WITH_ONE_BLOG = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]

// likes: 7, 5, 12
// 1 blog by Michael Chan, 2 blogs by Edsger W. Dijkstra
const BLOGS = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('of list with 1 blog equals likes of that blog', () => {
    assert.strictEqual(listHelper.totalLikes(LIST_WITH_ONE_BLOG), 5)
  })

  test('of larger list is calculated correctly', () => {
    let total = 0
    for (const b of BLOGS) {
      total += b.likes
    }

    assert.strictEqual(listHelper.totalLikes(BLOGS), total)
  })
})

describe('favourite blog of ', () => {
  test('empty blogs list is undefined', () => {
    assert.strictEqual(listHelper.favouriteBlog([]), undefined)
  })

  test('blog list with one blog is that blog', () => {
    assert.deepStrictEqual(
      listHelper.favouriteBlog(LIST_WITH_ONE_BLOG), 
      LIST_WITH_ONE_BLOG.at(0)
    )
  })

  test('blog list with multiple blogs is correct', () => {
    // Blog at index 2 has 12 likes
    assert.deepStrictEqual(
      listHelper.favouriteBlog(BLOGS),
      BLOGS[2]
    )
  })
})


describe('most blogs ', () => { 
  test('of list with one blog is the author and 1', () => {
    const expectedRes = {
      author: LIST_WITH_ONE_BLOG.at(0).author,
      blogs: 1
    }

    assert.deepStrictEqual(
      listHelper.mostBlogs(LIST_WITH_ONE_BLOG), expectedRes
    )
  })

  test('of list with multiple blogs is correct', () => {
    const expectedRes = {
      author: "Edsger W. Dijkstra",
      blogs: 2
    }

    assert.deepStrictEqual(
      listHelper.mostBlogs(BLOGS), expectedRes
    )
  })
})