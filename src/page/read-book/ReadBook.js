import nprogress from "nprogress";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBooks } from "../../services/apiService";
import "./ReadBook.scss";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ReadBook = () => {
  const param = useParams();
  console.log(param);
  const { currentApiUrl } = useSelector((state) => state.bookReducer);
  const [bookDetail, setBookDetail] = useState(null);

  useEffect(() => {
    const fetchbooksList = async () => {
      nprogress.start();
      try {
        let res = await getBooks(`${currentApiUrl}/${param.id}.json`);
        console.log(res);
        setBookDetail(res.data);
        nprogress.done();
      } catch (error) {
        nprogress.done();
        const errMsg = error?.message  ?? 'Can\'t get book info, try latter';
        toast.error(errMsg)
      }
    };
    fetchbooksList();
  }, [currentApiUrl, param.id]);

  return (
    <div>
      <div className="container">
        <div className="row">
          {bookDetail !== null && (
            <div className="read__tb d-flex flex-column mt-5">
              <div className="read__tb__info">
                <img src={bookDetail.productImageURL} alt="" />
                <div className="read__tb__info__left">
                  <h4>
                    <b>Name: {bookDetail.title}</b>
                  </h4>
                  <h4>
                    <b>Author:</b> {bookDetail.auth ? bookDetail.auth : "Updating"}
                  </h4>
                </div>
              </div>
              <span>
                Let's start with <b>{bookDetail.title}:</b>
              </span>
              <p>{bookDetail.content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ReadBook;
