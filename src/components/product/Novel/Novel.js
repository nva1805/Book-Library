import React from "react";
import { useState } from "react";
import "../../../asset/css/components/product/novels.scss";
import NProgress from "nprogress";
import { useNavigate } from "react-router-dom";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AddToMyBookAction } from "../../../redux/action/Action";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "react-toastify";
import { useFetchBooks } from "../../../common/hook/Hook";
NProgress.configure({ showSpinner: false });

export const Novel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkUserAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );
  const novelBooks = useFetchBooks("Book/Novel.json");
  const listMyBook = useSelector((state) => state.myBook.myBook);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddToMB = (item) => {
    if (checkUserAuthenticated) {
      dispatch(AddToMyBookAction(item));
      // console.log("check props:", item);
      console.log(listMyBook.length);
    } else {
      toast.warning("You must be logged in to use this function!", {
        position: "top-center",
      });
    }
  };

  console.log(novelBooks);

  // search
  const filteredList = novelBooks.filter((item) => {
    const title = item.title && item.title.toLowerCase(); // kiểm tra xem title có tồn tại không
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
                {filteredList &&
                  filteredList.length > 0 &&
                  filteredList.map((item, index) => (
                    <div key={index} className="col col-md-3 p-0 product__item">
                      <img
                        onClick={() => navigate(`/ReadNovelByID/${item.id}`)}
                        className="w-100 product__image"
                        src={item.productImageURL}
                        alt=""
                      />
                      <p
                        onClick={() => navigate(`/ReadNovelByID/${item.id}`)}
                        className="text-left mt-2 product__title"
                      >
                        {item.title}
                      </p>
                      <div
                        title="Add to my book"
                        className="product__myBook position-absolute"
                        onClick={() => handleAddToMB(item)}
                      >
                        {listMyBook && listMyBook.length > 0 && (
                          <div>
                            {listMyBook.find((p) => p.id === item.id) ? (
                              <BsFillHeartFill style={{ color: "red" }} />
                            ) : (
                              <BsHeart />
                            )}
                          </div>
                        )}
                        {listMyBook && listMyBook.length === 0 && (
                          <div>
                            <BsHeart />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                {filteredList &&
                  filteredList.length === 0 &&
                  novelBooks &&
                  novelBooks.length > 0 &&
                  novelBooks.map((item, index) => (
                    <div key={index} className="col col-md-3 p-0 product__item">
                      <img
                        onClick={() => navigate(`/ReadBookByID/${item.id}`)}
                        className="w-100 product__image"
                        src={item.productImageURL}
                        alt=""
                      />
                      <p
                        onClick={() => navigate(`/ReadBookByID/${item.id}`)}
                        className="text-left mt-2 product__title"
                      >
                        {item.title}
                      </p>
                      <div
                        title="Add to my book"
                        className="product__myBook position-absolute"
                        onClick={() => handleAddToMB(item)}
                      >
                        {listMyBook && listMyBook.length > 0 && (
                          <div>
                            {listMyBook.find((p) => p.id === item.id) ? (
                              <BsFillHeartFill style={{ color: "red" }} />
                            ) : (
                              <BsHeart />
                            )}
                          </div>
                        )}
                        {listMyBook && listMyBook.length === 0 && (
                          <div>
                            <BsHeart />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                {novelBooks && novelBooks.length === 0 && (
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
