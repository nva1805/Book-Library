import React from 'react'
import ModalDeleteUser from './ModalDeleteUser'
import ModalUpdateUser from './ModalUpdateUser'


const TableUser = (props) => {
    const { listUser, fetchListUser } = props
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" className='col-md-1'>No</th>
                        <th scope="col" className='col-md-2'>ID</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col" className='col-md-1'>Image Url</th>
                        <th scope="col" className='col-md-2 text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((item, index) => (
                            <tr key={`table-user-${index}`} >
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.userName}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>{item && item.userImageURL ? 'Have' : 'Don\'t have'}</td>
                                <td className='text-center'>
                                    {/* <button className='btn btn-'>View</button> */}
                                    <ModalUpdateUser 
                                        userInfo = {item}
                                        fetchListUser={fetchListUser}
                                    />
                                    <ModalDeleteUser
                                        userInfo = {item}
                                        fetchListUser={fetchListUser}
                                    />
                                </td>
                            </tr>
                        ))
                        }
                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan={4} className='text-center text-danger' >Not found data!</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableUser