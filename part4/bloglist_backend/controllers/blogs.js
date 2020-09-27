const blogRouter = require("express").Router();
const { request, response } = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user")
const tokenValidator = require("../utils/tokenValidator")

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{blogs: 0})
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const decodedToken = await tokenValidator(request.token)
  if (!decodedToken.isValid) return response.status(401).send({error: 'invalid token'});

  let blog = {
    ...request.body,
    likes: request.body.likes | 0
  }
  blog = new Blog(blog);
  const user = decodedToken.user;
  blog.user = user._id;
  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = await tokenValidator(request.token)
  if (!decodedToken.isValid) 
    response.status(401).send({error: 'invalid token'})
    
  const blogIds = decodedToken.user.blogs.map(blog => blog._id.toString())
  const id = request.params.id
  if (!blogIds.includes(id)) 
    response.status(401).send({error: 'unauthorized request'})

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  let blog = request.body
  blog.user && delete blog.user
  blog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user',{blogs: 0})
  response.json(blog)
})

module.exports = blogRouter;
