import React, { Fragment, useEffect, useState, useRef } from "react";
import Table from "react-bootstrap/Table";
import "./modal.css";
import './sideBar.css'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faEnvelope,
  faUser,
  faPhone,
  faBuilding,
  faAddressBook,
  faMars,
  faVenus,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import "./loader.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const defimage = "./images/profile.png";
const CRUD = () => {
  const [id, setId] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState();
  const [position, setPosition] = useState();
  const [IsActive, setIsActive] = useState(0);
  const [imageFile, setImageFile] = useState("");
  const [PreviousimageName, setPreviousImageName] = useState("");
  const [imageSrc, setImageSrc] = useState(defimage);
  const [editid, setEditId] = useState("");
  const [editfirstName, setEditFirstname] = useState("");
  const [editlastName, setEditLastname] = useState("");
  const [editemail, setEditEmail] = useState("");
  const [editcontactNumber, setEditContact] = useState("");
  const [editaddress, setEditAddress] = useState("");
  const [editdepartment, setEditDepartment] = useState("");
  const [editgender, setEditGender] = useState();
  const [editposition, setEditPosition] = useState();
  const [editIsActive, setEditIsActive] = useState(0);
  const [editimageFile, setEditImageFile] = useState("");
  const [editimageName, setEditImageName] = useState("");
  const [editimageSrc, setEditImageSrc] = useState(defimage);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const contactNumberRef = useRef();
  const addressRef = useRef();
  const departmentRef = useRef();
  useEffect(() => {
    getData();
  }, []);
  //clear
  const clear = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setContact("");
    setAddress("");
    setDepartment("");
    setGender();
    setPosition();
    setIsActive(0);
    setImageFile("");
    setImageSrc(defimage);
    setEditFirstname("");
    setEditLastname("");
    setEditEmail("");
    setEditContact("");
    setEditAddress("");
    setEditDepartment("");
    setEditId("");
    setEditGender();
    setEditPosition();
    setEditIsActive(0);
    setEditImageFile("");
    setEditImageName("");
    setEditImageSrc(defimage);
  };
  const Validation = () => {
    let isproceed = true;
    if (editfirstName == null || editfirstName == "") {
      isproceed = false;
      firstNameRef.current.focus();
      toast.warning("Enter valid first name");
    }
    if (editlastName === null || editlastName === "") {
      isproceed = false;
      lastNameRef.current.focus();
      toast.warning("Please enter the valid Last Name");
      return;
    }
    if (editemail === null || editemail === "") {
      isproceed = false;
      emailRef.current.focus();
      toast.warning("Please enter the valid Email");
      return;
    }
    if (editemail.length > 0) {
      const isValidEmail = emailRegex.test(editemail);
      if (!isValidEmail) {
        emailRef.current.focus();
        toast.warning("Please enter the valid Email format");
        return;
      }
    }
    if (
      editcontactNumber === null ||
      editcontactNumber === "" ||
      editcontactNumber.length < 9
    ) {
      isproceed = false;
      contactNumberRef.current.focus();
      toast.warning("Please enter the valid Contact Number");
      return;
    }
    if (editaddress === null || editaddress === "") {
      isproceed = false;
      addressRef.current.focus();
      toast.warning("Please enter the valid Address");
      return;
    }
    if (editdepartment === null || editdepartment === "") {
      isproceed = false;
      departmentRef.current.focus();
      toast.warning("Please enter the valid Department");
      return;
    }
    if (editgender == "" || editgender == null) {
      isproceed = false;
      toast.warning("Please choose gender");
    }
    if (!editposition) {
      isproceed = false;
      toast.warning("Please select Position");
    }
    if (editimageSrc == defimage) {
      isproceed = false;
      toast.warning("Please select a photo");
    }
    return isproceed;
  };
  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      const editimageFile = e.target.files[0];
      console.log(">>>>>>>>>>edit image file>> " + editimageFile.name);
      setEditImageFile(editimageFile);
      const reader = new FileReader();
      reader.onload = () => {
        setEditImageSrc(reader.result);
      };
      reader.readAsDataURL(editimageFile);
    }
  };
  //get all data
  const getData = () => {
    axios
      .get("https://localhost:7106/api/Employee/all")
      .then((result) => {
        const empdata = result.data.map((employee) => ({
          ...employee,
          imageName: `https://localhost:7106/wwwroot/Profile_Images/${employee.imageName}`,
        }));
        setData(empdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //edit employee info by id
  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`https://localhost:7106/api/Employee/GetEmp/${id}`)
      .then((result) => {
        setEditFirstname(result.data.firstName);
        setEditLastname(result.data.lastName);
        setEditEmail(result.data.email);
        setEditContact(result.data.contactNumber);
        setEditAddress(result.data.address);
        setEditDepartment(result.data.department);
        setEditGender(result.data.gender);
        setEditPosition(result.data.position);
        setEditIsActive(result.data.isActive);
        setEditImageName(result.data.imageName);        
        setEditImageSrc(
          `https://localhost:7106/wwwroot/Profile_Images/${result.data.imageName}`
        );
        console.log(">>>>>result data imagename>> "+result.data.imageName) 
        setEditId(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdate = () => {
    if (Validation()) {
      const empDetails = {
        Id: editid,
        FirstName: editfirstName,
        LastName: editlastName,
        Email: editemail,
        Address: editaddress,
        ContactNumber: editcontactNumber,
        Department: editdepartment,
        Gender: editgender,
        Position: editposition,
        IsActive: editIsActive,
        ImageName:editimageName
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(empDetails));
      if (editimageFile) {
        formData.append("image", editimageFile);
      }
      axios
        .put(
          `https://localhost:7106/api/Employee/UpdateEmp/${editid}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((result) => {
          getData();
          clear();
          toast.success("Employee info updated Successfully!");
          handleClose();
        })
        .catch((err) => {
          console.error("Update Error:", err.response || err);
          toast.error("Failed to update employee info");
        });
    }
  };
  //delte employee
  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to Delete this Employee?") == true
    ) {
      axios
        .delete(`https://localhost:7106/api/Employee/Delete/${id}`)
        .then((result) => {
          if (result.status == 200) {
            toast.success("Employee deleted Successfully!");
            getData();
          }
        })
        .catch((err) => {
          toast.error(err);
        });
      alert("Delete :" + id);
    }
  };
  const handleEditIsActive = (e) => {
    const newValue = e.target.checked ? 1 : 0;
    setEditIsActive(newValue);
  };
  return (
    <Fragment>
      <ToastContainer />
      <br/>
      <div className="">
      <form class="form-group col-md-2" style={{ display: "inline-flex" }}>
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
      </div>
      <br/>
      <Table striped bordered hover className="main" style={{ width: "auto" }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Prifile Photo</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Address</th>
            <th>Department</th>
            <th>Gender</th>
            <th>Position</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    <img style={{ width: "85%" }} Src={item.imageName} />
                  </td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.contactNumber}</td>
                  <td>{item.address}</td>
                  <td>{item.department}</td>
                  <td>{item.gender}</td>
                  <td>{item.position}</td>
                  <td>{item.isActive === 1 ? "Active" : "Inactive"}</td>
                  <td colSpan={2}>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <br/>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <div className="loader"></div>
          )}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose} dialogClassName="modal-xl">
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Table>
              <tbody>
                <td className="col-4">
                  <tr>
                    <td>
                      <FontAwesomeIcon icon={faUser} /> &nbsp;
                    </td>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter First Name"
                      value={editfirstName}
                      ref={firstNameRef}
                      onChange={(e) => {
                        setEditFirstname(e.target.value);
                      }}
                    />
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <FontAwesomeIcon icon={faUser} /> &nbsp;
                    </td>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Last Name"
                      value={editlastName}
                      ref={lastNameRef}
                      onChange={(e) => {
                        setEditLastname(e.target.value);
                      }}
                    />
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <FontAwesomeIcon icon={faEnvelope} /> &nbsp;
                    </td>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Email"
                      value={editemail}
                      ref={emailRef}
                      onChange={(e) => {
                        setEditEmail(e.target.value);
                      }}
                    />
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <FontAwesomeIcon icon={faPhone} /> &nbsp;
                    </td>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Contact Number"
                      value={editcontactNumber}
                      ref={contactNumberRef}
                      onChange={(e) => {
                        setEditContact(e.target.value);
                      }}
                    />
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <FontAwesomeIcon icon={faAddressBook} /> &nbsp;
                    </td>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Address"
                      value={editaddress}
                      ref={addressRef}
                      onChange={(e) => {
                        setEditAddress(e.target.value);
                      }}
                    />
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <FontAwesomeIcon icon={faBuilding} /> &nbsp;
                    </td>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Department"
                      value={editdepartment}
                      ref={departmentRef}
                      onChange={(e) => {
                        setEditDepartment(e.target.value);
                      }}
                    />
                  </tr>
                  <br />
                  <tr align="center">
                    <div align="center">
                      <h5>Gender</h5>
                      <FontAwesomeIcon icon={faMars} /> &nbsp;
                      <label>Male</label> &nbsp;
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={editgender === "male"}
                        onChange={(e) => {
                          setEditGender(e.target.value);
                        }}
                      />
                      <br />
                      <FontAwesomeIcon icon={faVenus} /> &nbsp;
                      <label>Female</label> &nbsp;
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={editgender === "female"}
                        onChange={(e) => {
                          setEditGender(e.target.value);
                        }}
                      />
                    </div>
                  </tr>
                </td>
                <td align="center">
                  <tr>
                    <input
                      className="form-control"
                      type="file"
                      accept="image/*"
                      onChange={showPreview}
                    />
                  </tr>
                  <br />
                  <tr>
                    <div align="right">
                      <img
                        src={editimageSrc}
                        name={editimageName}
                        width={200}
                        height={200}
                      />
                    </div>
                  </tr>
                  <br />
                  <tr>
                    <div align="left">
                      <FontAwesomeIcon icon={faBriefcase} /> &nbsp;
                      <label>Position</label>&nbsp;
                      <select
                        name="position"
                        onChange={(e) => {
                          setEditPosition(e.target.value);
                        }}
                        value={editposition}
                      >
                        <option>Select Position</option>
                        <option value="intern">Intern</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                      </select>
                    </div>
                    <br />
                  </tr>
                  <tr>
                    <div align="left">
                      <FontAwesomeIcon icon={faCircleInfo} /> &nbsp;
                      <label>Is Employee Active?</label> &nbsp;
                      <input
                        type="checkbox"
                        value={editIsActive}
                        checked={editIsActive === 1}
                        onChange={(e) => handleEditIsActive(e)}
                      />
                    </div>
                  </tr>
                </td>
              </tbody>
            </Table>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleUpdate();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
export default CRUD;
