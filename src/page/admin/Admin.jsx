import React from 'react'
import SideBar from '../../components/Admin/SideBar'
import { ProSidebarProvider } from 'react-pro-sidebar';
import './admin.scss'
import { Outlet, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { TbArrowBackUp } from 'react-icons/tb'

export default function Admin() {
  const navigate = useNavigate()
  const handelBackToHome = () => {
    navigate('/')
  }
  return (
    <div className="admin-container">
      <div className="admin-title">
        <div>
          <div
            className="btn btn-light position-absolute top-0 left-0 mt-3 px-5"
            onClick={handelBackToHome}
          >
            <TbArrowBackUp />
          </div>
          <h4 className="text-center display-4 bg-dark text-light pe-none pb-1">
            Welcome to Administration
          </h4>
        </div>
      </div>

      <div className="admin-dashboard d-flex">
        <div className="admin-sidebar">
          <ProSidebarProvider>
            <SideBar />
          </ProSidebarProvider>
        </div>
        <div className="admin-content w-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
