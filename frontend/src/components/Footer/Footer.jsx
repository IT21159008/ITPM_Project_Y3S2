import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaWhatsappSquare,
} from "react-icons/fa";

function Footer() {
  const socialMediaColors = {
    facebook: "black",
    instagram: "black",
    twitter: "black",
  };

  return (
    <footer style={{ backgroundColor: "#F0F0F0", padding: "30px 0" }}>
      <Container>
        <Row>
          <Col xs={12} md={6} lg={3}>
            <h4>YoungNetwork</h4>
            <h6>Sell Fast</h6>
            <h6>Membership</h6>
            <h6>Ad Promotions</h6>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <h4>Help & Support</h4>
            <h6>FAQ</h6>
            <h6>Stay safe</h6>
            <h6>Contact Us</h6>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <h4>More</h4>
            <h6>Privacy</h6>
            <h6>Articals</h6>
            <h6>Terms</h6>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <h4>Follow Us On</h4>
            <div>
              {/* facebook */}
              <a
                style={{
                  marginRight: "10px",
                  color: socialMediaColors.facebook,
                }}
              >
                <FaFacebookSquare style={{ height: "30px", width: "30px" }} />
              </a>
              {/* twitter */}
              <a
                style={{
                  marginRight: "10px",
                  color: socialMediaColors.twitter,
                }}
              >
                <FaTwitterSquare style={{ height: "30px", width: "30px" }} />
              </a>
              <a style={{ color: socialMediaColors.twitter }}>
                <FaWhatsappSquare style={{ height: "30px", width: "30px" }} />
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-4">
            <p>
              &copy; {new Date().getFullYear()} All rights reserved YoungMetwork
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
