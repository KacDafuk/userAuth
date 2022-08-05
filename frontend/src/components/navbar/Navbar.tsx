import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import useNavbar from "./useNavbar";
function BasicExample() {
  const { handleLogout } = useNavbar();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {localStorage.getItem("token") ? (
              <Nav.Link href="/login" onClick={handleLogout}>
                logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link href="/login">login</Nav.Link>
                <Nav.Link href="/register">register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
