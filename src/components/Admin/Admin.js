import React from 'react'
import SideBar from './SideBar'
import { ProSidebarProvider } from 'react-pro-sidebar';

export default function Admin() {
  return (
    <div className='admin-container'>
      <div className='admin-title'>
        <div>
          <h4 className='text-center display-4 bg-danger'>Welcome to Administration</h4>
        </div>
      </div>
      <div className="admin-dashboard d-flex">
        <div className='admin-sidebar'>
          <ProSidebarProvider>
            <SideBar />
          </ProSidebarProvider>
        </div>
        <div className='admin-content'>
          asadda
        </div>
      </div>
    </div>
  )
}
