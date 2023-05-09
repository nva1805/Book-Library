import React, { useEffect } from "react";
import { useState } from "react";
import "./BooksList.scss";
import { getBooks } from "../../../services/apiService"
import NProgress from "nprogress";
import { useSelector } from "react-redux";
import { ImSpinner3 } from "react-icons/im";
import BookCard from "../book-card/BookCard";
NProgress.configure({ showSpinner: false });

const BooksList = ({ apiUrl }) => {
  const [books, setBooks] = useState([]);

  const listMyBook = useSelector((state) => state.myBook.myBook);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const res = await getBooks(apiUrl);
        console.log(res)
        const booksResult = [];
        for (let key in res.data) {
          booksResult.unshift({
            ...res.data[key],
            id: key,
          });
        }
        setBooks(booksResult);
        console.log(booksResult);
      } catch (err) {
        console.error(err);
      }
    };

    getAllBooks();
  }, [apiUrl]);

  const isAddedToMB = listMyBook && listMyBook.length > 0 ? true : false;
  const getMyBookItemId = (item) => {
    if (isAddedToMB) {
      const myBookItem = listMyBook.find((p) => p.id === item.id);
      return myBookItem ? myBookItem.id : null;
    } else {
      return null;
    }
  };

  // search
  const searchList = books.filter((item) => {
    const title = item.title && item.title.toLowerCase();
    return title && title.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-12 nav__search">
            <input
              type="search"
              placeholder="Search..."
              className="d-block mx-auto w-50"
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="container my-5">
          <div className="row">
            <div className="col col-12 product">
              <div className="row">
                {searchList && searchList.length > 0
                  ? searchList.map((item) => {
                    const id = getMyBookItemId(item);
                      return (
                        <BookCard key={item.id} item={item} myBookItemID={id} />
                      );
                    })
                  : books &&
                    books.length > 0 &&
                    books.map((item) => {
                      const id = getMyBookItemId(item);
                      return (
                        <BookCard key={item.id} item={item} myBookItemID={id} />
                      );
                    })}
                {books && books.length === 0 && (
                  <div className="product__loading">
                    <ImSpinner3 />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BooksList;
