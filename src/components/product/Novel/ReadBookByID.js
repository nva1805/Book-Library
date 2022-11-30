import React from 'react'
import { useParams } from 'react-router-dom'

const ReadBookByID = (props) => {
    const param = useParams()
    console.log(param);
  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="read__tb">
                    Reading book
                </div>
            </div>
        </div>
    </div>
  )
}
export default ReadBookByID
