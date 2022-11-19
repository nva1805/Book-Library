import React from 'react';
import ModalCreateUser from './ModalCreateUser';
import '../../../../../asset/css/components/admin/content/ManageUser.scss'
import TableUser from './TableUser';


const ManageUser = () => {
  return (
    <div className='manage-user-container'>
      <hr className='mw-100' />
      <div className="title h4">ManageUser</div>
      <div className="user-content my-4">
        {/* <button>Add New User</button> */}
        <ModalCreateUser />
      </div>
      <div className="">
        <TableUser />
      </div>
    </div>
  )
}

export default ManageUser;


