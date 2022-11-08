import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar'; //import pro-side-bar to use
import { FaUsers, FaBook, FaSwatchbook } from "react-icons/fa"; //import icon from react-icons lib
import { FcManager } from "react-icons/fc";
import { BsFillBarChartFill, BsFillCalendar2MonthFill } from "react-icons/bs";
import { Link } from 'react-router-dom'


import '../../asset/css/components/admin/sidebar.scss'


const SideBar = () => {
    const { collapseSidebar } = useProSidebar();
    return (
        <div className='position-relative' style={{ height: '100%' }}>
            <Sidebar className='vh-100'>
                <Menu>
                    <MenuItem routerLink={<Link to="/admins" />} icon={<BsFillBarChartFill size={'1.5em'} />}> Dashboard </MenuItem>
                    <SubMenu icon={<FcManager size={'2em'} />} label="Manager">
                        <MenuItem routerLink={<Link to="/admins/manageUser" />} icon={<FaUsers size={'1.5em'} />}> Manage Users </MenuItem>
                        <MenuItem icon={< FaBook size={'1.5em'} />}> Manage Books </MenuItem>
                        <MenuItem icon={< FaSwatchbook size={'1.5em'} />}> Manage Book Types </MenuItem>
                    </SubMenu>
                    <MenuItem icon={< BsFillCalendar2MonthFill size={'1.5em'} />}> Calendar </MenuItem>
                </Menu>
            </Sidebar>

            <main>
                <button className='btn btn-primary position-absolute' onClick={() => collapseSidebar()}>Collapse</button>
            </main>
        </div>
    )
}
export default SideBar