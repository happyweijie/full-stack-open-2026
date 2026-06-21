const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs
    .map(b => b.likes)
    .reduce((x, y) => x + y, 0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  // Max likes
  const mostLikes = Math.max(...blogs
    .map(b => b.likes))

  return blogs
    .filter(b => b.likes === mostLikes)
    .at(0);
}

const mostBlogs = (blogs) => {
  // list of objects with key being author
  // value is number of blogs written by that author
  const authors = Object.entries(_.groupBy(blogs, b => b.author))
    .map(([author, writtenBlogs]) => {
      return {
        author: author,
        blogs: writtenBlogs.length
      }
    })

  return _.maxBy(
    authors,
    author => author.blogs
  )
}

module.exports = { 
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}
