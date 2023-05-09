import React from "react";
import "./BooksLayout.scss";
import BookCategories from "./BookCategories";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCurrentApiUrl } from "../../../redux/action/Action";
import BooksList from "../../book-product/books-list/BooksList";

const BooksLayout = () => {
  const [apiUrl, setApiUrl] = useState(BookCategories[0].apiUrl);
  const [currentId, setCurrentId] = useState(BookCategories[0].id);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setCurrentApiUrl(BookCategories[0].apiUrl));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChooseBookType = (category) => {
    setApiUrl(category.apiUrl);
    dispatch(setCurrentApiUrl(category.apiUrl));
    setCurrentId(category.id);
  };
  return (
    <div style={{ backgroundColor: "#f3e3d6" }}>
      <div className="container">
        <div className="product">
          <div className="row">
            <div className="col col-3 product__left">
              <h3 className="mt-5">Categories:</h3>
              {BookCategories.map((category) => (
                <div
                  className={`${
                    currentId === category.id ? "active" : ""
                  } product__feature`}
                  key={category.id}
                  onClick={() => handleChooseBookType(category)}
                >
                  {category.name}
                </div>
              ))}
            </div>
            <div className="col col-9 p-0">
              <div className="product__show">
                <BooksList apiUrl={apiUrl} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksLayout;
