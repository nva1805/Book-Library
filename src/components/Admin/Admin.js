import React from 'react'
import SideBar from './SideBar'
import { ProSidebarProvider } from 'react-pro-sidebar';
import '../../asset/css/components/admin/admin.scss'
import { Outlet } from 'react-router-dom';

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
        <div className='admin-content'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
