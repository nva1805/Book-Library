import React from 'react';
import ModalCreateUser from './ModalCreateUser';
import TableUser from './TableUser';
import './ManageUser.scss'
import { useState, useEffect } from 'react'
import { getAllUser } from '../../../../../services/apiService'

const ManageUser = (props) => {

  // render table user
  const [listUser, setListUser] = useState([])
  useEffect(() => {
    fetchListUser()
  }, []);

  const fetchListUser = async () => {
    let res = await getAllUser()
    console.log(res);
    if (res.status === 200) {
      const fetchResults = [];
      for (let key in res.data) {
        fetchResults.unshift(
          {
            ...res.data[key],
            id: key
          }
        )
      }
      console.log(fetchResults);
      setListUser(fetchResults)
    }
  }
  return (
    <div className='manage-user-container'>
      <hr className='mw-100' />
      <div className="title h4">ManageUser</div>
      <div className="user-content my-4">
        {/* <button>Add New User</button>  */}
        <ModalCreateUser fetchListUser={fetchListUser} />
      </div>
      <div className="">
        <TableUser
          listUser={listUser}
          fetchListUser={fetchListUser} // cha cho con user table backend
        />
      </div>
    </div>
  )
}

export default ManageUser;


