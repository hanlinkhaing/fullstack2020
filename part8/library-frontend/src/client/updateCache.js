import { ALL_BOOKS, ALL_AUTHORS, RECOMMEND, ME } from '../queries/library'

export const updateAllBooksCache = (addedBook, client) => {
  const includedIn = (set, obj) => set.map((s) => s.id).includes(obj.id);

  const dataInCache = client.readQuery({ query: ALL_BOOKS });
  if (!includedIn(dataInCache.allBooks, addedBook)) {
    client.writeQuery({
      query: ALL_BOOKS,
      data: { allBooks: dataInCache.allBooks.concat(addedBook) },
    });
  }
};

export const updateAllAuthorsCache = (author, client) => {
  const includedIn = (set, obj) => set.map((s) => s.id).includes(obj.id);

  const dataInCache = client.readQuery({ query: ALL_AUTHORS });
  if (!includedIn(dataInCache.allAuthors, author)) {
    client.writeQuery({
      query: ALL_AUTHORS,
      data: { allAuthors: dataInCache.allAuthors.concat(author) },
    });
  } else {
    client.writeQuery({
      query: ALL_AUTHORS,
      data: {
        allAuthors: dataInCache.allAuthors.map((a) =>
          a.id === author.id ? author : a
        ),
      },
    });
  }
};

export const updateRecommendCache = (addedBook, client) => {
  const { me } = client.readQuery({ query: ME });
  const includedIn = (book, obj) => book.genres.includes(obj.favoriteGenre);

  if (includedIn(addedBook, me)) {
    const dataInCache = client.readQuery({ query: RECOMMEND });
    client.writeQuery({
      query: RECOMMEND,
      data: { recommend: dataInCache.recommend.concat(addedBook) },
    });
  }
};
