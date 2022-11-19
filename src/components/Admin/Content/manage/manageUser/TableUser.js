import React from 'react'
import { useState, useEffect } from 'react'
import { getAllUser } from '../../../../../services/apiService'

const TableUser = (props) => {
    const [listUser, setListUser] = useState([])
    useEffect(() => {
      fetchListUser()
    }, []);
    
    const fetchListUser = async() => {
        let res = await getAllUser()
        console.log(res);
        if (res.status === 200) {
            setListUser(res.data)
        }
    }
    
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col"  className='col-md-3'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((item, index) => (
                            <tr key={`table-user-${index}`} >
                                <td>{index + 1}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td className='text-center'>
                                    <button className='btn btn-secondary'>View</button>
                                    <button className='btn btn-warning mx-3'>Update</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))}
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