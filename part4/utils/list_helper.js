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

module.exports = { 
  dummy,
  totalLikes,
  favouriteBlog
}
