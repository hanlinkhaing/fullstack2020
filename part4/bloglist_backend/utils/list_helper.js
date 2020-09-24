const User = require('../models/user')
const lodash = require('lodash')

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

const mostBlogs = (blogs) => {
    const counted = lodash.countBy(blogs, 'author')
    const arrayed = Object.entries(counted)
    let mostBlogs = {
        author: arrayed[0][0],
        blogs: arrayed[0][1]
    }
    arrayed.forEach(count => {
        if (count[1] > mostBlogs.blogs) {
            mostBlogs = {
                author: count[0],
                blogs: count[1]
            }
        }
    })
    return mostBlogs
}

const mostLikes = (blogs) => {
    const arrayed = Object.entries(lodash.groupBy(blogs, 'author'))
    const flatted = lodash.flatMap(arrayed, (temp) => {
        const author = temp[0]
        const array = temp[1]
        let returnedObj = {
            author: author,
            likes: 0
        }
        array.forEach(obj => returnedObj.likes += obj.likes)
        return returnedObj
    })
    const result = lodash.sortBy(flatted, 'likes').pop()
    return result
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, usersInDb }