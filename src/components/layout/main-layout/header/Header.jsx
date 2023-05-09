import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import "./Header.scss"


const Header = () => {
    const location = useLocation()
    const checkUserAuthenticated = useSelector((state) => state.userReducer.isAuthenticated);
    return (
      <div className="header">
        <Navbar
          bg="light"
          expand="lg"
          className={location.pathname === "/" ? "" : "shadow"}
          // style={{ textShadow: "2px 0px 0px white" }}
        >
          <Container>
            <Navbar.Brand href="/">Book Library</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/mybooks" className="nav-link">
                  My Books
                </NavLink>
              </Nav>
              <Nav className="me-auto">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/books" className="nav-link">
                  All Book
                </NavLink>
                <NavLink to="/blogs" className="nav-link">
                  Blog
                </NavLink>
              </Nav>

              {checkUserAuthenticated === false ? (
                <>
                  <Link to="register" className="btn btn-light margin-right-15">
                    Register
                  </Link>
                  <Link to="/logins" className="btn btn-dark margin-right-15">
                    Log in
                  </Link>
                </>
              ) : (
                <Nav>
                  <NavDropdown
                    title="Account Setting"
                    id="basic-nav-dropdown"
                    className="bg-light rounded"
                  >
                    <NavLink to="/profile" className="dropdown-item">
                      Profile
                    </NavLink>
                    <NavLink to="/logout" className="dropdown-item">
                      Log Out
                    </NavLink>

                    <div role="separator" className="dropdown-divider"></div>
                    <Link
                      to="/admins"
                      data-rr-ui-dropdown-item
                      className="dropdown-item"
                    >
                      Admin
                    </Link>
                  </NavDropdown>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
}

export default Header;
