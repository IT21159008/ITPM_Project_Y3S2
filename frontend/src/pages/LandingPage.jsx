// eslint-disable-next-line no-unused-vars
import React from "react";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import img01 from "../assets/img01.png";
import { useHotkeys } from "react-hotkeys-hook";

function LandingPage() {
  const [customers, setCustomers] = useState(0);
  const [products, setProducts] = useState(0);
  const [sellers, setSellers] = useState(0);

  useEffect(() => {
    const incrementValues = () => {
      if (customers < 4000) {
        setCustomers((prevCustomers) => prevCustomers + 100);
      }
      if (products < 400) {
        setProducts((prevProducts) => prevProducts + 10);
      }
      if (sellers < 40) {
        setSellers((prevSellers) => prevSellers + 1);
      }
    };

    const interval = setInterval(incrementValues, 30);

    return () => clearInterval(interval);
  }, [customers, products, sellers]);

  useHotkeys("ctrl+enter", () => {
    window.location.href = "/admin/login";
  });

  return (
    <>
      <br />
      <Header />
      <br />
      <br />
      <br />
      <div className="d-flex justify-content-center align-items-center">
        <Container>
          <Row>
            <Col>
              <h3>
                Transform Your Brand's Reach: Welcome to Our Online Platform
              </h3>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <Row>
                <Col>
                  <h3>{customers.toLocaleString()} +</h3>
                  <h5>Prosucts</h5>
                </Col>
                <Col>
                  <h3>{products.toLocaleString()} +</h3>
                  <h5>Customers</h5>
                </Col>
                <Col>
                  <h3>{sellers.toLocaleString()} +</h3>
                  <h5>Sellers</h5>
                </Col>
              </Row>
            </Col>
            <Col style={{ marginTop: "-60px" }}>
              <img src={img01} />
            </Col>
          </Row>
        </Container>
      </div>
      <br />
      <br />
      <br />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#271066", height: "200px" }}
      >
        <Container>
          <div>
            <center>
              <h1 style={{ color: "white" }}>YoungNetwork</h1>
              <br />
              <h5 style={{ color: "white" }}>
                <marquee>
                  Elevate Your Brand with YoungNetwork - your one-stop digital
                  advertising platform! At YoungNetwork, we harness the power of
                  advanced targeting technology and rich media advertising to
                  connect your brand with your ideal audience. Discover
                  innovative solutions that include interactive ads, real-time
                  analytics, and customizable campaign options designed to
                  maximize your visibility and ROI. Join top advertisers and
                  brands that trust us to make their advertising efforts
                  straightforward and effective. Start transforming your
                  advertising strategy today at YoungNetwork!
                </marquee>
              </h5>
            </center>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
