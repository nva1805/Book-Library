import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Book Library</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to='/mybooks' className='nav-link'>My Books</Link>
                    </Nav>
                    <Nav className="me-auto">
                        <Link to="/" className='nav-link'>Home</Link>
                        <Link to="/novels" className='nav-link'>Novel</Link>
                        <Link to="/sciences" className='nav-link'>Science</Link>
                    </Nav>

                    <Nav>
                        <NavDropdown title="Người Dùng" id="basic-nav-dropdown">
                            <Link to='/logins' className='dropdown-item'>Đăng Nhập</Link>
                            <Link to='/logout' className='dropdown-item'>Đăng Xuất</Link>
                            <Link to='/profile' className='dropdown-item'>Profile</Link>

                            <Link to='/users' className='dropdown-divider'>
                                <div className=' dropdown-item'>User</div>
                            </Link>
                            <Link to='/admins' className='dropdown-divider'>Admin</Link>
                            
                            {/* <NavDropdown.Item href="#action/3.1">Đăng Nhập</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Đăng Xuất</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>
                            <NavDropdown.Divider /><NavDropdown.Item href="/users">User</NavDropdown.Item>
                            <NavDropdown.Divider /><NavDropdown.Item href="/admins">Admin</NavDropdown.Item> */}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;