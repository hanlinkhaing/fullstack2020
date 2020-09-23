const dummy = (blogs) => {
    console.log('blogs list in dummy',blogs)
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((total, blog) => total += blog.likes, 0)
    return total
}

const favoriteBlog = (blogs) => {
    const sorted = blogs.sort((a, b) => a.likes - b.likes)
    return sorted[sorted.length - 1]
}

module.exports = { dummy, totalLikes, favoriteBlog }