import React from 'react'
import { getNovel } from '../../../services/apiService'
import { useEffect, useState } from 'react';
import '../../../asset/css/components/product/novels.scss'
import NProgress from 'nprogress'
import { useNavigate } from 'react-router-dom'
import { BsHeart, BsFillHeartFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { AddToMyBookAction } from '../../../redux/action/Action';
import { ImSpinner3 } from 'react-icons/im';
import { toast } from 'react-toastify';
NProgress.configure({ showSpinner: false });



export const Science = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const checkUserAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)
  const [listNovel, setListNovel] = useState([])
  const listMyBook = useSelector((state) => state.myBook.myBook)
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetchListNovel()
  }, []);
  const fetchListNovel = async () => {
    NProgress.start()
    let res = await getNovel()
    console.log(res);
    const listNovelResult = [];
    for (let key in res.data) {
      listNovelResult.unshift(
        {
          ...res.data[key],
          id: key
        }
      )
    }
    setListNovel(listNovelResult)
    console.log(listNovel);
    NProgress.done()
    console.log(listNovelResult);
  }

  const handleAddToMB = (item) => {
    if (checkUserAuthenticated) {
      dispatch(AddToMyBookAction(item))
      // console.log("check props:", item);
      console.log(listMyBook.length);
    }
    else {
      toast.info('You must be logged in to use this function!')
    }
  }

  // search
  const filteredList = listNovel.filter((item) => {
    const title = item.title && item.title.toLowerCase(); // kiểm tra xem title có tồn tại không
    return title && title.includes(searchTerm.toLowerCase());
  });


  return (
    <div >
      <div className='container'>
        <div className='row'>
          <div className='col col-12 nav__search'>
            <input type="search" placeholder='Search...' className='d-block mx-auto w-50'
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='container my-5'>
          <div className="row">
            <div className="col col-12 product">
              <div className="row ">
                {filteredList && filteredList.length > 0 &&
                  filteredList.map((item, index) => (
                    <div
                      key={index}
                      className="col col-md-3 p-0 product__item"
                    >
                      <img onClick={() => navigate(`/ReadBookByID/${item.id}`)} className='w-100 product__image' src={item.productImageURL} alt="" />
                      <p onClick={() => navigate(`/ReadBookByID/${item.id}`)} className='text-left mt-2 product__title'>{item.title}</p>
                      <div
                        title='Add to my book'
                        className='product__myBook position-absolute'
                        onClick={() => handleAddToMB(item)}
                      >
                        {listMyBook && listMyBook.length > 0 && (
                          <div
                          >
                            {listMyBook.find((p) => p.id === item.id) ? (
                              <BsFillHeartFill style={{ color: "red" }} />
                            ) : (
                              <BsHeart />
                            )}
                          </div>
                        )}
                        {listMyBook && listMyBook.length === 0 &&
                          <div>
                            <BsHeart />
                          </div>
                        }
                      </div>
                    </div>
                  ))
                }
                {filteredList && filteredList.length === 0 && listNovel && listNovel.length > 0 &&
                  listNovel.map((item, index) => (
                    <div
                      key={index}
                      className="col col-md-3 product__item"
                    >
                      <img onClick={() => navigate(`/ReadBookByID/${item.id}`)} className='w-100 product__image' src={item.productImageURL} alt="" />
                      <p onClick={() => navigate(`/ReadBookByID/${item.id}`)} className='text-left mt-2 product__title'>{item.title}</p>
                      <div
                        title='Add to my book'
                        className='product__myBook position-absolute'
                        onClick={() => handleAddToMB(item)}
                      >
                        {listMyBook && listMyBook.length > 0 && (
                          <div
                          >
                            {listMyBook.find((p) => p.id === item.id) ? (
                              <BsFillHeartFill style={{ color: "red" }} />
                            ) : (
                              <BsHeart />
                            )}
                          </div>
                        )}
                        {listMyBook && listMyBook.length === 0 &&
                          <div>
                            <BsHeart />
                          </div>
                        }
                      </div>
                    </div>
                  ))
                }
                {listNovel && listNovel.length === 0 &&
                  <div className='product__loading'>
                    <ImSpinner3 />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
