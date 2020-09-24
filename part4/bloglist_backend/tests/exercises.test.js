const listHelper = require("../utils/list_helper");

const blogList = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

describe("total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const blog = blogList[0];
    const result = listHelper.totalLikes([blog]);
    expect(result).toBe(blogList[0].likes);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(blogList);
    expect(result).toBe(36);
  });
});

describe("most favorite blog", () => {
  test("of empty list is undefined", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual(undefined);
  });

  test("when list has only one blog is just itself", () => {
    const result = listHelper.favoriteBlog([blogList[0]]);
    expect(result).toEqual(blogList[0]);
  });

  test("of full list is successfully tested", () => {
    const ans = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    };
    const result = listHelper.favoriteBlog(blogList);
    expect(result).toEqual(ans);
  });
});

describe("most blogs", () => {
  test("check author with most blogs", () => {
    const ans = {
      author: "Robert C. Martin",
      blogs: 3
    }
    const result = listHelper.mostBlogs(blogList)
    expect(result).toEqual(ans)
  })
});

describe("most likes", () => {
  test("check author with most likes", () => {
    const ans = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    const result = listHelper.mostLikes(blogList)
    expect(result).toEqual(ans)
  })
});