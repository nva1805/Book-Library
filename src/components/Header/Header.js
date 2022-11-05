import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Book Library</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">My Books</Nav.Link>
                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Novel</Nav.Link>
                        <Nav.Link href="#link">Science</Nav.Link>
                    </Nav>

                    <Nav>
                        <NavDropdown title="Người Dùng" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Đăng Nhập</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Đăng Xuất</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>
                            <NavDropdown.Divider /><NavDropdown.Item href="#action/3.4">User</NavDropdown.Item>
                            <NavDropdown.Divider /><NavDropdown.Item href="#action/3.4">Admin</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;