import React from 'react'
import SideBar from './SideBar'
import { ProSidebarProvider } from 'react-pro-sidebar';
import '../../asset/css/components/admin/admin.scss'
import { Outlet, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function Admin() {
  const navigate = useNavigate()
  const handelBackToHome = () => {
    navigate('/')
  }
  return (
    <div className='admin-container'>

      <div className='admin-title'>
        <div>
          <h4 onClick={handelBackToHome} className='btn btn-light position-absolute top-0 left-0 py-3 px-5'>Back</h4>
          <h4 className='text-center display-4 bg-dark text-light pe-none pb-1'>Welcome to Administration</h4>
        </div>
      </div>

      <div className="admin-dashboard d-flex">
        <div className='admin-sidebar'>
          <ProSidebarProvider>
            <SideBar />
          </ProSidebarProvider>
        </div>
        <div className='admin-content w-100'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
