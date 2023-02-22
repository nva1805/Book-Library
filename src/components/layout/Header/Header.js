import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux';


const Header = () => {
    // const handleCheckRole = () => {

    // }
    // const checkUserAccount = useSelector((state) => state.userReducer.account)
    const checkUserAuthenticated = useSelector((state) => state.userReducer.isAuthenticated)
    // console.log(checkUserAccount);
    // console.log(checkUserAuthenticated);
    return (
        <Navbar bg="light" expand="lg" style={{textShadow: "2px 0px 0px white"}}>
            <Container >
                <Navbar.Brand href="/">Book Library</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/mybooks' className='nav-link'>My Books</NavLink>
                    </Nav>
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/novels" className='nav-link'>Novel</NavLink>
                        <NavLink to="/sciences" className='nav-link'>Science</NavLink>
                    </Nav>


                    {checkUserAuthenticated === false ?
                        <>
                            <Link to='register' className='btn btn-light margin-right-15'>Register</Link>
                            <Link to='/logins' className='btn btn-dark margin-right-15'>Log in</Link>
                            {/* <button className='btn btn-light margin-right-15'>Register</button> */}
                            {/* <button className='btn btn-dark'>Log in</button> */}
                        </>
                        :
                        <Nav>
                            <NavDropdown title="Account Setting" id="basic-nav-dropdown" className='bg-light rounded'>
                                {/* <NavLink to='/logins' className='dropdown-item'>Đăng Nhập</NavLink> */}
                                <NavLink to='/profile' className='dropdown-item'>Profile</NavLink>
                                <NavLink to='/logout' className='dropdown-item'>Log Out</NavLink>

                                <div role="separator" className='dropdown-divider'></div>
                                {/* <Link to='/users' className='dropdown-item'>User</Link> */}
                                {/* <div role="separator" className='dropdown-divider'></div> */}
                                {/* <NavDropdown.Item onClick={handleCheckRole}>Admin</NavDropdown.Item> */}
                                <Link to='/admins' data-rr-ui-dropdown-item className='dropdown-item'>Admin</Link>
                            </NavDropdown>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;