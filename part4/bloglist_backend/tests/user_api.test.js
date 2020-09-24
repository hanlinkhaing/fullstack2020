const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const helper = require('../utils/list_helper')

const api = supertest(app);

describe("Testing for user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const password = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", password });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api.post("/api/users").send(newUser).expect(200).expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  });

  test("creation fail without username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      //username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api.post("/api/users").send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  });

  test("creation fail without password", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      //password: "salainen",
    };

    await api.post("/api/users").send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  });

  test("creation fail with username length < 3", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "ml",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api.post("/api/users").send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  });

  test("creation fail with password length < 3", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "sa",
    };

    await api.post("/api/users").send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  });
});

afterAll(() => {
  mongoose.connection.close();
});
