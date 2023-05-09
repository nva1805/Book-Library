import React, { useState, useEffect } from "react";
import "./Blog.scss";
import ModalAddBlog from "../../../components/blogs/modal-add-blog/ModalAddBlog";
import BlogCard from "../../../components/blogs/blog-card/BlogCard";
import AxiosInstance from "../../../utils/axiosInstance";

const Blog = () => {
  const [blogsList, setBlogsList] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      AxiosInstance
        .get("Blogs.json")
        .then((response) => {
          const blogList = [];
          for (const id in response.data) {
            blogList.push({ id, ...response.data[id] });
          }
          setBlogsList(blogList);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);

  const handleAddBlog = (newBlog) => {
    setBlogsList([...blogsList, newBlog]);
  };

  return (
    <div className="container">
      <div className="addBlog">
        <ModalAddBlog onAdd={handleAddBlog} />
      </div>
      <h3 className="col-sm-6 col-md-4 col-lg-3 mb-4 offset-md-1">
        Latest news!
      </h3>
      <div className="row">
        {blogsList &&
          blogsList.map((blog) => (
            <div
              key={blog.id}
              className="col-sm-6 col-md-4 col-lg-3 mb-4 offset-md-1"
            >
              <BlogCard blogInfo={blog} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Blog;
