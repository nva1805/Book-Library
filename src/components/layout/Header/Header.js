import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Link } from 'react-router-dom'

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
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

                    <Link to='register' className='btn btn-light margin-right-15'>Register</Link>
                    {/* <button className='btn btn-light margin-right-15'>Register</button> */}
                    <button className='btn btn-dark'>Log in</button>

                    {/* <Nav>
                        <NavDropdown title="Người Dùng" id="basic-nav-dropdown">
                            <NavLink to='/logins' className='dropdown-item'>Đăng Nhập</NavLink>
                            <NavLink to='/logout' className='dropdown-item'>Đăng Xuất</NavLink>
                            <NavLink to='/profile' className='dropdown-item'>Profile</NavLink>

                            <div role="separator" className='dropdown-divider'></div>
                            <Link to='/users' className='dropdown-item'>User</Link>
                            <div role="separator" className='dropdown-divider'></div>
                            <Link to='/admins' data-rr-ui-dropdown-item className='dropdown-item'>Admin</Link>
                        </NavDropdown>
                    </Nav> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;