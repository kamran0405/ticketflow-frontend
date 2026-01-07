import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function AppNavbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={NavLink} to="/bookings">
          TicketFlow
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {isAuthenticated && (
              <Nav.Link as={NavLink} to="/bookings">
                My Bookings
              </Nav.Link>
            )}
            {isAuthenticated && isAdmin && (
              <Nav.Link as={NavLink} to="/admin/bookings">
                Admin
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {!isAuthenticated && (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Navbar.Text className="me-2">{user?.email}</Navbar.Text>
                <Button
                  size="sm"
                  variant="outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;