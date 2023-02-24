import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../asset/css/components/blog/Blog.scss'
import axios from '../../utils/axiosCustomize';
import ModalAddBlog from './ModalAddBlog';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('Blogs.json')
      .then(response => {
        const blogList = [];
        for (const id in response.data) {
          blogList.push({ id, ...response.data[id] });
        }
        setBlogs(blogList);
        console.log(blogs);
      })
      .catch(error => console.error(error));
  }, []);
  console.log(blogs);


  const handleAddBlog = (newBlog) => {
    setBlogs([...blogs, newBlog]);
  };

  return (
    <div className="container">

      <div className="addBlog">
        <ModalAddBlog
          onAdd={handleAddBlog}
        />
      </div>

      <h3 className='col-sm-6 col-md-4 col-lg-3 mb-4 offset-md-1'>Latest news!</h3>
      <div className="row">
        {blogs && blogs.map(blog => (
          <div key={blog.id} className="col-sm-6 col-md-4 col-lg-3 mb-4 offset-md-1">
            <div className="card h-100 text-capitalize item" onClick={() => navigate(`/blogDetail/${blog.id}`)}>
              <img src={blog.image} className="card-img-top" alt={blog.title} />
              <div className="card-body card-info">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.author}</p>
                <p className="card-text">{blog.date instanceof Date && blog.date.toLocaleDateString()}</p>
                <button className="btn btn-primary" onClick={() => navigate(`/blogDetail/${blog.id}`)}>Show more</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog