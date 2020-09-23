const blogRouter = require("express").Router();
const { request, response } = require("../app");
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  let blog = {
    ...request.body,
    likes: request.body.likes | 0
  }
  blog = new Blog(blog);
  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  let blog = request.body
  blog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(blog)
})

module.exports = blogRouter;
