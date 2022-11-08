import React from 'react';
import ModalCreateUser from './ModalCreateUser';


const ManageUser = () => {
  return (
    <div className='manage-user-container'>
      <hr className='vw-100' />
      <div className="title">ManageUser</div>
      <div className="user-content my-4">
        {/* <button>Add New User</button> */}
        <ModalCreateUser />
      </div>
      <div className="">Table-user</div>
    </div>
  )
}

export default ManageUser;


