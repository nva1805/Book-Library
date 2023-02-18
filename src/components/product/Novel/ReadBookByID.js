import nprogress from 'nprogress';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getNovel } from '../../../services/apiService';
import '../../../asset/css/components/product/readbookbyid.scss'

const ReadBookByID = (props) => {
    const param = useParams()
    console.log(param);
    const [listNovel, setListNovel] = useState([])

    useEffect(() => {
        fetchListNovel()
    }, []);
    const fetchListNovel = async () => {
        nprogress.start()
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
        nprogress.done()

    }
    const book = listNovel.find((book) => book.id === param.id)
    return (
        <div>
            <div className="container">
                <div className="row">
                    {listNovel && listNovel.length > 0 &&
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
export default ReadBookByID
