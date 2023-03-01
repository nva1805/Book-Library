import nprogress from 'nprogress';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../../asset/css/components/product/readbookbyid.scss'
import axios from '../../../utils/axiosCustomize';

const ReadScienceById = (props) => {
  const param = useParams()
  console.log(param);
  const [listSciences, setListSciences] = useState([])


  useEffect(() => {
    nprogress.start()
    axios.get('Book/Sciences.json')
      .then(response => {
        const listSciencesResult = [];
        for (const id in response.data) {
          listSciencesResult.push({ id, ...response.data[id] });
        }
        setListSciences(listSciencesResult);
        nprogress.done()
        console.log(listSciences);
      })
      .catch(error => console.error(error));
  }, []);
  console.log(listSciences);


  const book = listSciences.find((book) => book.id === param.id)
  return (
    <div>
      <div className="container">
        <div className="row">
          {listSciences && listSciences.length > 0 &&
            <div className='read__tb d-flex flex-column mt-5'>
              <div className='read__tb__info'>
                <img src={book.productImageURL} alt="" />
                <div className='read__tb__info__left'>
                  <h4><b>Name: {book.title}</b></h4>
                  <h4><b>Author:</b> {book.auth ? book.auth : 'Updating'}</h4>
                </div>
              </div>
              <span>Let's start with <b>{book.title}:</b></span>
              <p>{book.content}</p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
export default ReadScienceById