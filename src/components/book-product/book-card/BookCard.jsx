import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddToMyBookAction } from "../../../redux/action/Action";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";

const BookCard = ({ item, myBookItemID }) => {
  console.log(myBookItemID);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkUserAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  const handleAddToMB = (item) => {
    if (checkUserAuthenticated) {
      dispatch(AddToMyBookAction(item));
    } else {
      toast.warning("You must be logged in to use this function!", {
        position: "top-center",
      });
    }
  };
  return (
      <div className="col col-md-3 p-0 product__item">
        <img
          onClick={() => navigate(`/read-book/${item.id}`)}
          className="w-100 product__image"
          src={item.productImageURL}
          alt=""
        />
        <p
          onClick={() => navigate(`/read-book/${item.id}`)}
          className="text-left mt-2 product__title"
        >
          {item.title}
        </p>
        <div
          title="Add to my book"
          className="product__myBook position-absolute"
          onClick={() => handleAddToMB(item)}
        >
          {myBookItemID != null ? (
            <BsFillHeartFill style={{ color: "red" }} />
          ) : (
            <BsHeart />
          )}
        </div>
      </div>
  );
};

export default BookCard;
