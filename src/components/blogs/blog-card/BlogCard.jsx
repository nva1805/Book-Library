import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blogInfo }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card h-100 text-capitalize item"
        onClick={() => navigate(`/blogDetail/${blogInfo.id}`)}
      >
        <img src={blogInfo.image} className="card-img-top" alt={blogInfo.title} />
        <div className="card-body card-info">
          <h5 className="card-title">{blogInfo.title}</h5>
          <p className="card-text">{blogInfo.author}</p>
          <p className="card-text">
            {blogInfo.date instanceof Date && blogInfo.date.toLocaleDateString()}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/blogDetail/${blogInfo.id}`)}
          >
            Show more
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
