import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };
  return (
    <Navbar expand="lg">
      <br />
      <br />
      <br />
      <Container>
        <h3
          style={{
            fontSize: "35px",
          }}
        >
          YoungNetwork
          <br />
        </h3>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/advertise">Advertise</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Button
              href="#"
              onClick={handleLogout}
              style={{ backgroundColor: "black", borderColor: "black" }}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
