const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const api = supertest(app);

let initialUser = {
  username: 'root',
  name: 'Han Lin Khaing',
  password: 'root'
}

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
  },
];

const loginHelper = async () => {
  const loginResult = await api.post("/api/login").send(initialUser);
  return `bearer ${loginResult.body.token}`
}

describe("Testing for blog", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    const password = await bcrypt.hash(initialUser.password, 11);
    await new User({...initialUser, password: password}).save();
    const blogs = initialBlogs.map((blog) => new Blog(blog));
    const promises = blogs.map((blog) => blog.save());
    await Promise.all(promises);
  });

  test("blogs are returned as JSON", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.length).toBe(initialBlogs.length);
  });

  test("blogs have id property", async () => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    };
    const token = await loginHelper();
    const response = await api.post("/api/blogs").send(newBlog)
      .set({Authorization: token});
    expect(response.body.id).toBeDefined();
  });

  test("length of returned blogs is correct with new one and correct title", async () => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    };
    const token = await loginHelper();
    await api.post("/api/blogs").send(newBlog).set({Authorization: token});
    const response = await api.get("/api/blogs");
    const blogs = response.body;
    const titles = blogs.map((blog) => blog.title);
    expect(blogs.length).toBe(initialBlogs.length + 1);
    expect(titles).toContain(newBlog.title);
  });

  test("default value of likes property is 0", async () => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    };
    const token = await loginHelper();
    const response = await api.post("/api/blogs").send(newBlog).set({Authorization: token});
    const blog = response.body;
    expect(blog.likes).toBe(0);
  });

  test("missing title and url made response to 400 Bad Request", async () => {
    const newBlog = {
      author: "Robert C. Martin",
      likes: 9,
    };
    const token = await loginHelper();
    await api.post("/api/blogs").send(newBlog).set({Authorization: token}).expect(400);
  });

  test("blog adding fails without token", async () => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 9
    };
    await api.post("/api/blogs").send(newBlog).expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
