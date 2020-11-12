/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { ME, RECOMMEND } from "../queries/library";
import { useQuery } from "@apollo/client";

const Recommend = (props) => {
  const { data } = useQuery(ME)
  const result = useQuery(RECOMMEND);
  const [books, setBooks] = useState([]);
  const [genre, setGenres] = useState(null);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.recommend);
      setGenres(data.me ? data.me.favoriteGenre: null)
    }
  }, [result.data]);

  if (!props.show) return null;
  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre <strong>{genre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
