const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        url:
          "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
      }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogs = initialBlogs.map(blog => new Blog(blog))
    const promises = blogs.map(blog => blog.save())
    await Promise.all(promises)
})

test('blogs are returned as JSON', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body.length).toBe(initialBlogs.length)
})

test('blogs have id property', async () => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
      }
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.body.id).toBeDefined()
})

test('length of returned blogs is correct with new one and correct title', async() => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
    await api.post('/api/blogs').send(newBlog)
    const blogs = await api.get('/api/blogs').then(res => res.body)
    const titles = blogs.map(blog => blog.title)
    expect(blogs.length).toBe(initialBlogs.length + 1)
    expect(titles).toContain(newBlog.title)
})

test('default value of likes property is 0', async () => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    }
    const blog = await api.post('/api/blogs').send(newBlog).then(res => res.body)
    expect(blog.likes).toBe(0)
})

test('missing title and url made response to 400 Bad Request', async () => {
    const newBlog = {
        author: "Robert C. Martin",
        likes: 9
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})