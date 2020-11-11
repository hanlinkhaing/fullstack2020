require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const MONGO_DB_URL = process.env.MONGO_DB_URL
const JWT_SECRET = 'fullstackopen2020'

mongoose.connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('Connected to Mongo DB'))
  .catch(error => console.log('Error Connecting to Mongo DB', error.message))

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]!
    id: ID!
  }
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }
  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook (
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor (
      name: String!
      setBornTo: Int!
    ): Author
    createUser (
      username: String!
      favoriteGenre: String!
    ): User
    login (
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (!args.author && !args.genre) 
        return Book.find({}).populate('author')
      else if (args.author && !args.genre) 
        return Book.find({name: args.author.name}).populate('author')
      else if (!args.author && args.genre) 
        return Book.find({genres: [args.genre]}).populate('author')
      else 
        return Book.find({name: args.author.name, genres: [args.genre]}).populate('author')
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({name: root.name})
      return (await Book.find({ author: { $in: author } })).length
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("Not Authenticated!")

      let author = await Author.findOne({ name: args.author })
      
      if (!author) {
        author = new Author({ name: args.author })
        try {
          author = await author.save()
        } catch(error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }

      let book = new Book({ ...args, author: author })
      try {
        book = await book.save()
      } catch(error) {
        throw new UserInputError(error.message, { invalidArgs: book })
      }
      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("Not Authenticated!")

      let author = await Author.findOne({ name: args.name })
      if (!author) throw new UserInputError('Author not found', { invalidArgs: args.name })

      author.born = args.setBornTo

      try {
        author = await author.save()
      } catch(error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      
      return author
    },
    createUser: (root, args) => {
      const user = new User({ ...args })
      return user.save().catch(error => new UserInputError(error.message, {invalidArgs: user}))
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'password')
        throw new UserInputError('Wrong credentials!')
      
      const userForToken = { username: user.username, id: user._id }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
    const currentUser = await User.findById(decodedToken.id)
    return { currentUser }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
