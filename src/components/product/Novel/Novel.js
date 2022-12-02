import React from 'react'
import { getNovel } from '../../../services/apiService'
import { useEffect, useState } from 'react';
import '../../../asset/css/components/product/product.scss'
import NProgress from 'nprogress'
import { useNavigate } from 'react-router-dom'
import { BsHeart } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { AddToMyBookAction } from '../../../redux/action/Action';
import { ImSpinner3 } from 'react-icons/im';
import { toast } from 'react-toastify';
NProgress.configure({ showSpinner: false });



export const Novel = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const checkUserAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)
  const [listNovel, setListNovel] = useState([])

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
      console.log("check props:" ,item);
    }
    else {
      toast.info('You must be logged in to use this function!')
    }
  }

  return (
    <>
      <div className='container mt-4'>
        <div className='row'>
          <div className='col col-12 nav__search'>
            <input type="search" placeholder='Search...' className='d-block mx-auto w-75 py-2' />
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='container my-5 category'>
          <div className="row">
            <div className="col col-2 category">
              <p className="category__nav--title text-uppercase">Sort by</p>
              <ul className='text-capitalize category__nav--list'>
                <li className='category__nav--item'>latest update</li>
                <li className='category__nav--item'>Name</li>
                <li className='category__nav--item'>top month</li>
                <li className='category__nav--item'>top week</li>
                <li className='category__nav--item'>top day</li>
              </ul>
            </div>
            <div className="col col-10 product">
              <div className="row ">
                {listNovel && listNovel.length > 0 &&
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
                        <BsHeart />
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
    </>
  )
}
