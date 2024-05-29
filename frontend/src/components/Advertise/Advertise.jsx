import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQuery } from "react-query";
import EditLineIcon from "remixicon-react/EditLineIcon";
import DeleteBinLineIcon from "remixicon-react/DeleteBinLineIcon";
import Swal from "sweetalert2";
import "primereact/resources/themes/saga-blue/theme.css";
import "react-phone-number-input/style.css";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AdminNavbar from "../AdminNavbar/SideNavbar";

function Advertise() {
  const [show, setShow] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [selectedAddedDate, setSelectedAddedDate] = useState();
  const [selectedExpireDate, setSelectedExpireDate] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm({
    validateInputChanges: true,
    initialValues: {
      title: "",
      description: "",
      category: "",
      added_date: "",
      expire_date: "",
      image: "",
    },
  });

  const editProductForm = useForm({
    validateInputChanges: true,
    initialValues: {
      _id: "",
      title: "",
      description: "",
      category: "",
      image: "",
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //use react query and fetch member data
  const { data, isLoading, isError, refetch } = useQuery(
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

  const editProduct = async () => {
    try {
      const editProductDetails = editProductForm.getValues();
      await axios.put(
        `http://localhost:3001/advertising/updateAdvertising/${editProductDetails._id}`,
        editProductDetails
      );
      editProductForm.reset();
      setShowEdit(false);
      Swal.fire({
        icon: "success",
        title: "Advertise Update Successfully",
        text: "You have successfully update a Advertise",
      });
      refetch();
    } catch (err) {
      console.log("edit form error", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const addProduct = async (formData) => {
    try {
      console.log(formData);
      await axios.post(
        "http://localhost:3001/advertising/addAdvertising",
        formData
      );

      reset();
      Swal.fire({
        icon: "success",
        title: "Advertise Added Successfully",
        text: "You have successfully added a Advertise",
      });
      refetch();
    } catch (err) {
      console.log("Add form error:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const deleteMember = async (_id) => {
    try {
      await axios.delete(`http://localhost:3001/advertising/delete/${_id}`, {
        withCredentials: true,
      });
      Swal.fire({
        title: "Deleted!",
        text: "Advertise has been deleted.",
        icon: "success",
      });
      refetch();

      setShowDelete(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  const handleDelete = (_id) => {
    setShowDelete(true);
    setDeleteID(_id);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleCloseEdit = () => {
    setShowEdit(false);
    editProductForm.reset(); // Reset the form
  };

  const handleShowEdit = () => setShowEdit(true);

  const filteredData = data.filter((member) =>
    Object.values(member).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // `reader.result` contains the base64 encoded image data
      setValue("image", reader.result); // Store base64 data in form state
      editProductForm.setValue("image", reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl); // Convert image to base64 string
    }
  };

  // Generate report
  const downloadPdfReport = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      theme: "striped",
      head: [
        [
          "Advertise ID",
          "Advertise Title",
          "Advertise Description",
          "Category",
          "Added Date",
          "Expire Date",
        ],
      ],
      body: data.map((item) => [
        item.cusProductID,
        item.title,
        item.description,
        item.category,
        new Date(item.added_date).toLocaleDateString(),
        new Date(item.expire_date).toLocaleDateString(),
      ]),
      columnStyles: { 0: { cellWidth: "auto" } },
    });
    doc.save("Advertise Report.pdf");
  };

  return (
    <>
      <center>
        <div>
          <AdminNavbar />
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Advertise</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => handleImageUpload(e)}
                    accept="image/*"
                  />
                  {imagePreviewUrl && (
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      style={{
                        width: "150px",
                        height: "100px",
                        marginTop: "10px",
                      }}
                    />
                  )}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Advertise Title <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="name"
                    {...register("title", {
                      required: true,
                    })}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Advertise Description
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    {...register("description", {
                      required: true,
                    })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Advertise Category <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    {...register("category", { required: true })}
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Property">Property</option>
                    <option value="Vehicals">Vehicals</option>
                    <option value="Services">Services</option>
                    <option value="Jobs">Jobs</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                  <br />
                </Form.Group>
              </Form>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                  >
                    <Form.Label>
                      Added Date <span className="text-danger">*</span>
                    </Form.Label>
                    <br />
                    <DatePicker
                      placeholderText="Select Added Date"
                      selected={selectedAddedDate}
                      onChange={(date) => setValue("added_date", date)} // Use 'date' directly
                      onSelect={(date) => setSelectedAddedDate(date)}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                      name="selectedAddedDate"
                      value={watch("selectedAddedDate")}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                  >
                    <Form.Label>
                      Expire Date <span className="text-danger">*</span>
                    </Form.Label>
                    <br />
                    <DatePicker
                      placeholderText="Select Expire Date"
                      selected={selectedExpireDate}
                      onChange={(date) => setValue("expire_date", date)} // Use 'date' directly
                      onSelect={(date) => setSelectedExpireDate(date)}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                      name="selectedExpireDate"
                      value={watch("setSelectedExpireDate")}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit((data) => {
                  console.log(data);
                  addProduct(data);
                  handleClose(); // Move handleClose to onSubmit handler
                })}
              >
                Add Advertise
              </Button>
            </Modal.Footer>
          </Modal>
          <div style={{ padding: "30px" }}>
            <h2>Advertises</h2>
            <center>
              <Row style={{ padding: "20px" }}>
                <Col>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search by Course ID"
                      className="me-2"
                      aria-label="Search"
                      style={{ width: "400px", marginLeft: "400px" }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Form>
                </Col>
                <Col>
                  <Button
                    style={{
                      backgroundColor: "black",
                      borderBlockColor: "black",
                    }}
                    onClick={handleShow}
                  >
                    Add Advertise
                  </Button>
                </Col>
                <Col>
                  <Button
                    onClick={downloadPdfReport}
                    style={{
                      backgroundColor: "black",
                      borderBlockColor: "black",
                    }}
                  >
                    Download Report
                  </Button>
                </Col>
              </Row>
            </center>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Advertise ID</th>
                  <th>Advertise Title</th>
                  <th>Image</th>
                  <th>Advertise Description</th>
                  <th>Category</th>
                  <th>Added Date</th>
                  <th>Expire Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((member) =>
                    Object.values(member).some((value) =>
                      value
                        .toString()
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                  )
                  .map((member) => (
                    <tr key={member.cusMemberID}>
                      <td onClick={() => handleRowClick(member)}>
                        {member.cusProductID}
                      </td>
                      <td onClick={() => handleRowClick(member)}>
                        {member.title}
                      </td>
                      <div
                        onClick={() => handleRowClick(member)}
                        style={{
                          width: "100px",
                          height: "50px",
                          alignItems: "center",
                          backgroundSize: "cover",
                          backgroundImage: `url(${member.image})`,
                        }}
                      />
                      <td>{member.description}</td>
                      <td>{member.category}</td>
                      <td>
                        {new Date(member.added_date).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(member.expire_date).toLocaleDateString()}
                      </td>
                      <td>
                        <EditLineIcon
                          onClick={() => {
                            editProductForm.reset({
                              _id: member._id,
                              name: member.name,
                              description: member.description,
                              institute: member.institute,
                              category: member.category,
                              price: member.price,
                              duration: member.duration,
                            });
                            setShowEdit(true);
                          }}
                        />
                        <DeleteBinLineIcon
                          onClick={() => {
                            handleDelete(member._id);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            {selectedProduct && (
              <Modal
                size="lg"
                show={showDetail}
                onHide={() => setShowDetail(false)}
                centered
              >
                <center>
                  <Modal.Header closeButton>
                    <Modal.Title>Advertise Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Card.Img
                      variant="top"
                      src={selectedProduct.image}
                      style={{
                        width: "80%",
                        height: "280px",
                        borderRadius: "10px",
                      }}
                    />
                    <br />
                    <br />
                    <p>
                      <strong>Advertise ID: </strong>{" "}
                      {selectedProduct.cusProductID}
                    </p>
                    <p>
                      <strong>Advertise Title: </strong> {selectedProduct.title}
                    </p>
                    <p>
                      <strong>Added Date: </strong>
                      {new Date(
                        selectedProduct.added_date
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Exipre Date: </strong>
                      {new Date(
                        selectedProduct.expire_date
                      ).toLocaleDateString()}
                    </p>
                  </Modal.Body>
                </center>
              </Modal>
            )}
          </div>
          <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Advertise</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDelete}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  deleteMember(deleteID);
                }}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Advertise</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => handleImageUpload(e)}
                    accept="image/*"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Advertise Title</Form.Label>
                  <Form.Control
                    type="text"
                    {...editProductForm.register("title")}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Advertise Description</Form.Label>
                  <Form.Control
                    type="text"
                    {...editProductForm.register("description")}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Advertise Category</Form.Label>
                  <Form.Control
                    as="select"
                    {...editProductForm.register("category", {
                      required: true,
                    })}
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Property">Property</option>
                    <option value="Vehicals">Vehicals</option>
                    <option value="Services">Services</option>
                    <option value="Jobs">Jobs</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                  <br />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Close
              </Button>
              <Button variant="primary" onClick={() => editProduct()}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </center>
    </>
  );
}

export default Advertise;
