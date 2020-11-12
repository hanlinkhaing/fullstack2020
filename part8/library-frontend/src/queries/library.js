import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    id
    name
    born
    bookCount
  }
}`

export const ALL_BOOKS = gql`
query {
  allBooks {
    id
    title
    author {
      id
      name
      born
      bookCount
    }
    published
    genres
  }
}`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    id
    title
    author {
      id
      name
      born
      bookCount
    }
    published
    genres
  }
}`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!){
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}`

export const LOGIN = gql`
mutation login($username: String!, $password: String!){
  login(username: $username, password: $password){
    value
  }
}
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

export const RECOMMEND = gql`
query{
  recommend{
    id
    title
    published
    genres
    author {
      id
      name
      born
      bookCount
    }
  }
}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    id
    title
    author{
      id
      name
      born
      bookCount
    }
    published
    genres
  }
}
`