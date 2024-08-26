import React from "react";
import "./modal.css";
import './sideBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const QuickAdd = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContact] = useState("");
  const nameRegex = /^[a-zA-Z]/;
  const numberRegex = /^[0-9]/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const contactNumberRef = useRef();
  const clear = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setContact("");
  };
  const Validation = () => {
    let isproceed = true;
    if (firstName.length > 0 || firstName.length == 0) {
      const isValidName = nameRegex.test(firstName);
      if (!isValidName) {
        isproceed = false;
        firstNameRef.current.focus();
        toast.warning("Please enter the valid First Name");
        return;
      }
    }
    if (lastName.length > 0 || lastName.length == 0) {
      const isValidName = nameRegex.test(lastName);
      if (!isValidName) {
        isproceed = false;
        lastNameRef.current.focus();
        toast.warning("Please enter the valid Last Name");
        return;
      }
    }
    if (email.length > 0 || email.length == 0) {
      const isValidEmail = emailRegex.test(email);
      if (!isValidEmail) {
        emailRef.current.focus();
        toast.warning("Please enter the valid Email format");
        return;
      }
    }
    if (contactNumber.length == 0 || contactNumber.length < 9) {
      const isValidNumber = numberRegex.test(contactNumber);
      if (!isValidNumber) {
        isproceed = false;
        contactNumberRef.current.focus();
        toast.warning("Please enter the valid Contact Number");
        return;
      }
    }
    return isproceed;
  };
  const handleQuickaddemp = (e) => {
    e.preventDefault();
    if (Validation()) {
      const empDetails = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        ContactNumber: contactNumber
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(empDetails));
      //formData.append("image", imageFile);
      //console.log(">>>>imagr file>> "+imageFile)
      axios
        .post(`https://localhost:7106/api/QuickAddEmp/CreateQuickAddEmp`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          //console.log(response.data);
          toast.success("Employee added successfully!");
          clear();
        })
        .catch((error) => {
          console.error("Error adding employee: ", error);
          toast.error("Failed to add employee. Please try again.");
        });
    }
  };
    return (
      <>
        <ToastContainer />
        <Container>
          <br />
          <form>
            <br />
            <div>
              <Table className="main">
                <tr>
                  <td style={{ display: "flex", align: "flex-start" }}>
                    <div
                      class="form-group col-md-7"
                      style={{
                        display: "inline-flex",
                        marginRight: "500px",
                      }}
                    >
                      <label
                        for="firstName"
                        style={{ width: "270px", display: "flex" }}
                      >
                        <FontAwesomeIcon icon={faUser} /> &nbsp;First Name&nbsp;
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="First Name"
                        value={firstName}
                        ref={firstNameRef}
                        onChange={(e) => {
                          setFirstname(e.target.value);
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ display: "flex", align: "flex-start" }}>
                    <div
                      class="form-group col-md-7"
                      style={{
                        display: "inline-flex",
                        marginRight: "500px",
                      }}
                    >
                      <label
                        for="lastName"
                        style={{ width: "270px", display: "flex" }}
                      >
                        <FontAwesomeIcon icon={faUser} /> &nbsp;Last Name&nbsp;
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Last Name"
                        value={lastName}
                        ref={lastNameRef}
                        onChange={(e) => {
                          setLastname(e.target.value);
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ display: "flex", align: "flex-start" }}>
                    <div
                      class="form-group col-md-7"
                      style={{
                        display: "inline-flex",
                        marginRight: "500px",
                      }}
                    >
                      <label
                        for="email"
                        style={{ width: "270px", display: "flex" }}
                      >
                        <FontAwesomeIcon icon={faEnvelope} /> &nbsp;Email&nbsp;
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Email"
                        value={email}
                        ref={emailRef}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ display: "flex", align: "flex-start" }}>
                    <div
                      class="form-group col-md-7"
                      style={{
                        display: "inline-flex",
                        marginRight: "500px",
                      }}
                    >
                      <label
                        for="contactNumber"
                        style={{ width: "270px", display: "flex" }}
                      >
                        <FontAwesomeIcon icon={faPhone} /> &nbsp;Contact
                        Number&nbsp;
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Contact Number"
                        value={contactNumber}
                        ref={contactNumberRef}
                        onChange={(e) => {
                          setContact(e.target.value);
                        }}
                      />
                    </div>
                  </td>
                  <tr>
                    <td>
                      <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={handleQuickaddemp}
                      >
                        Add Details
                      </button>
                    </td>
                  </tr>
                </tr>
              </Table>
            </div>
          </form>
        </Container>
      </>
    );
}
export default QuickAdd;