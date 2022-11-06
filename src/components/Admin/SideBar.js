import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar'; //import pro-side-bar to use
// import { FaRegChartBar } from "react-icons/fa"; //import icon from react-icons lib
import { BsFillBarChartFill } from "react-icons/bs";


const SideBar = () => {
    const { collapseSidebar } = useProSidebar();
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <Sidebar>
                <Menu>
                    <SubMenu icon={<BsFillBarChartFill />} label="Charts">
                        <MenuItem> Pie charts </MenuItem>
                        <MenuItem> Line charts </MenuItem>
                    </SubMenu>
                    <MenuItem> Documentation </MenuItem>
                    <MenuItem> Calendar </MenuItem>
                </Menu>
            </Sidebar>
            <main>
                <button className='btn btn-primary' onClick={() => collapseSidebar()}>Collapse</button>
            </main>
        </div>
    )
}
export default SideBar