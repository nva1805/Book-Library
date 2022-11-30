import React from 'react'
import { getNovel } from '../../../services/apiService'
import { useEffect, useState } from 'react';
import '../../../asset/css/components/product/product.scss'
import NProgress from 'nprogress'
import { useNavigate } from 'react-router-dom'
NProgress.configure({ showSpinner: false });



export const Novel = () => {
  const navigate = useNavigate()
  const [listNovel, setListNovel] = useState([])
  useEffect(() => {
    fetchListNovel()
  }, []);
  const fetchListNovel = async () => {
    NProgress.start()
    let res = await getNovel()
    console.log(res);
    console.log(typeof res.data);
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
    NProgress.done()
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
                {listNovel && listNovel &&
                  listNovel.map((item, index) => (
                    <div
                      key={index}
                      className="col col-md-3 product__item"
                      onClick={() => navigate(`/ReadBookByID/${item.id}`)}
                    >
                      <img className='w-100 product__image' src={item.productImageURL} alt="" />
                      <p className='text-left mt-2 product__title'>{item.title}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
