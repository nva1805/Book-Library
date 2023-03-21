import { useEffect, useState } from "react";
import axios from "../../utils/axiosCustomize";

const useFetchBooks = (apiUrl) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get(apiUrl);
        console.log(res);
        const booksResult = [];
        for (let key in res.data) {
          booksResult.unshift({
            ...res.data[key],
            id: key,
          });
        }
        console.log(booksResult);
        setBooks(booksResult);
      } catch (err) {
        console.error(err);
      }
    };

    getBooks();
  }, [apiUrl]);

  return books;
};

export { useFetchBooks };
