import React from 'react'
import SideBar from './SideBar'
import { ProSidebarProvider } from 'react-pro-sidebar';
import '../../asset/css/components/admin/admin.scss'
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Admin() {
  return (
    <div className='admin-container'>

      <div className='admin-title'>
        <div>
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
