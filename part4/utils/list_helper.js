const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs
    .map(b => b.likes)
    .reduce((x, y) => x + y, 0)
}

module.exports = { 
  dummy,
  totalLikes
}
