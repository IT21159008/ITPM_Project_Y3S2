import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useQuery } from "react-query";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "../Header/Header";
import Footer from "../Footer/Footer";
import Modal from "react-bootstrap/Modal";
// import { useParams } from "react-router-dom";
import "./style.css";
import { Button } from "react-bootstrap";

const CustomerAdvertise = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [memberData, setMemberData] = useState([]);
  //   const params = useParams();
  //   const memberId = params.id;

  const handleNameClick = (member) => {
    setMemberData(member);
    setShowModal(true);
  };

  // use react query and fetch member data
  const { data, isLoading, isError } = useQuery(
    "acceptedMemberData",
    async () => {
      const response = await axios.get("http://localhost:3001/advertising");
      return response.data;
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  // Apply filters to the data
  const filteredData = data.filter(
    (member) =>
      Object.values(member).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      (categoryFilter
        ? member.category.toLowerCase() === categoryFilter.toLowerCase()
        : true)
  );

  return (
    <>
      <br />
      <NavBar />
      <br />
      <div>
        <br />
        <center>
          <h2>Addvertise</h2>
          <div>
            <div style={{ margin: "20px", padding: "20px" }}>
              <Row xs={1} md={3} className="g-4" style={{ padding: "20px" }}>
                {filteredData.map((member) => (
                  <Col key={member.cusMemberID}>
                    <Card
                      style={{
                        marginBottom: "20px",
                        padding: "15px",
                        borderRadius: "10px",
                        borderWidth: "2px",
                        borderColor: "black",
                      }}
                    >
                      <Card.Body>
                        <Card.Title>{member.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {member.category}
                        </Card.Subtitle>
                        <Card.Img
                          variant="top"
                          src={member.image}
                          style={{
                            width: "300px",
                            height: "230px",
                            borderRadius: "10px",
                          }}
                        />
                        <br />
                        <br />
                        <Button
                          onClick={() => handleNameClick(member)}
                          style={{
                            backgroundColor: "black",
                            borderColor: "black",
                          }}
                        >
                          See More
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Advertise Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="text-center">
                  <Card.Img
                    variant="top"
                    src={memberData.image}
                    style={{
                      width: "300px",
                      height: "230px",
                      borderRadius: "10px",
                    }}
                  />
                  <h4>{memberData.title}</h4>
                  <p className="text-muted">{memberData.description}</p>
                </div>
                <hr />
                <div>
                  <p>
                    <strong>Advertise Description: </strong> {memberData.description}
                  </p>
                  <p>
                    <strong>Added Date: </strong>{" "}
                    {new Date(memberData.expire_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Add Category: </strong> {memberData.category}
                  </p>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </center>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default CustomerAdvertise;
