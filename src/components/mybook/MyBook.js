import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../../asset/css/components/mybook/MyBook.scss'
import { RemoveFromMyBookAction } from '../../redux/action/Action'

const MyBook = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const listMyBook = useSelector((state) => state.myBook.myBook)
  console.log(listMyBook);
  return (
    <div className='container bg-light'>
      <p className="my-5 text-capitalize text-center pt-2">Enjoy your love with them right now!</p>
      <div className="myBook">
        {
          listMyBook && listMyBook.map((item, index) => (
            <div key={index} className="myBook__item mb-3 border position-relative">
              <img className='myBook__item--image col col-4' src={item.productImageURL} alt="Book Title" />
              <div className="myBook__item--title col col-5">{item.title}</div>
              <div onClick={() => navigate(`/ReadBookByID/${item.id}`)} className="myBook__item--read btn btn-warning col-col-1">Read Now</div>
              <div
                className="myBook__item--remove"
                onClick={() => dispatch(RemoveFromMyBookAction(item))}
              >
                <FaTimes />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyBook