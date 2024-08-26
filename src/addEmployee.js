import React from "react";
import "./modal.css";
import './sideBar.css';
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
import Table from "react-bootstrap/Table";
import { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const defimage = "./images/profile.png";
const AddEmployee = () => {
  const [QuickfirstName, setQuickFirstname] = useState("");
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
  const [imageSrc, setImageSrc] = useState(defimage);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const nameRegex = /^[a-zA-Z]/;
  const numberRegex = /^[0-9]{11,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const contactNumberRef = useRef();
  const addressRef = useRef();
  const departmentRef = useRef();
  const clear = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setContact("");
    setAddress("");
    setDepartment("");
    setGender();
    setPosition("");
    setIsActive(0);
    setImageFile("");
    setImageSrc(defimage);
  };
  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      setImageFile(imageFile);
      // {console.log(">>>>>imagefile>> "+imageFile)}
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
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
    if (address === null || address === "") {
      isproceed = false;
      addressRef.current.focus();
      toast.warning("Please enter the valid Address");
      return;
    }
    if (department === null || department === "") {
      isproceed = false;
      departmentRef.current.focus();
      toast.warning("Please enter the valid Department");
      return;
    }
    if (!gender) {
      isproceed = false;
      toast.warning("Please choose gender");
      return;
    }
    if (position == "Select Position" || position == null) {
      isproceed = false;
      toast.warning("Please select Position");
      return;
    }
    if (imageSrc === defimage) {
      isproceed = false;
      toast.warning("Please select a photo");
      return;
    }
    return isproceed;
  };
  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (Validation()) {
      const empDetails = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Address: address,
        ContactNumber: contactNumber,
        Department: department,
        Gender: gender,
        Position: position,
        IsActive: IsActive,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(empDetails));
      formData.append("image", imageFile);
      //console.log(">>>>imagr file>> "+imageFile)
      axios
        .post("https://localhost:7106/api/Employee/CreateEmp", formData, {
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
  const handleActiveChange = (e) => {
    const newValue = e.target.checked ? 1 : 0;
    setIsActive(newValue);
  };
  const searchEmployee = (QuickfirstName) => {
    axios
      .get(`https://localhost:7106/api/QuickAddEmp/Search/${QuickfirstName}`)
      .then((result) => {
        if(result.data.firstName.length>0)
        {
          setFirstname(result.data.firstName);
          setLastname(result.data.lastName);
          setEmail(result.data.email);
          setContact(result.data.contactNumber);
        }
        if(result.data.firstName.length=0)
        {
          setFirstname("");
          setLastname("");
          setEmail("");
          setContact("");
        }
        else{
          setFirstname("");
          setLastname("");
          setEmail("");
          setContact("");
        }     
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <ToastContainer />
      <Container>
        <br />
        <form>
          <br />
          <div className="main">
            <div style={{ width: "30%" }}>
              <button onClick={searchEmployee(QuickfirstName)} hidden>
                {" "}
                Search
              </button>
            </div>
            <Table>
              <tr>
                <td style={{ width: "400px" }}>
                  <div className="form-group" style={{ width: "330px" }}>
                    <div align="left">
                      <img src={imageSrc} width={200} height={200} />
                    </div>
                    <br />
                    <input
                      style={{ width: "85%" }}
                      className="form-control"
                      type="file"
                      accept="image/*"
                      onChange={showPreview}
                    />
                  </div>
                </td>
                <td style={{ display: "flex", align: "flex-start" }}>
                  <div
                    class="form-group col-md-7"
                    style={{ display: "inline-flex", marginRight: "500px" }}
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
                        setQuickFirstname(e.target.value);
                      }}
                    />
                  </div>
                </td>
                <td style={{ display: "flex", align: "flex-start" }}>
                  <div
                    class="form-group col-md-7"
                    style={{ display: "inline-flex", marginRight: "500px" }}
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
                    style={{ display: "inline-flex", marginRight: "500px" }}
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
                    style={{ display: "inline-flex", marginRight: "500px" }}
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
                <td style={{ display: "inline-flex", marginRight: "500px" }}>
                  <div
                    className="form-group col-md-11"
                    style={{ display: "inline-flex", marginRight: "500px" }}
                  >
                    <label
                      for="address"
                      style={{ width: "270px", display: "flex" }}
                    >
                      <FontAwesomeIcon icon={faAddressBook} /> &nbsp;Address
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Address"
                      value={address}
                      ref={addressRef}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>
                </td>
                <td style={{ display: "flex", align: "flex-start" }}>
                  <div
                    className="form-group col-md-7"
                    style={{ display: "inline-flex", marginRight: "500px" }}
                  >
                    <label
                      for="department"
                      style={{ width: "270px", display: "flex" }}
                    >
                      <FontAwesomeIcon icon={faBuilding} /> &nbsp;Department
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Department"
                      value={department}
                      ref={departmentRef}
                      onChange={(e) => {
                        setDepartment(e.target.value);
                      }}
                    />
                  </div>
                </td>
                <td style={{ display: "flex", align: "flex-start" }}>
                  <div
                    className="form-group col-md-7"
                    style={{ display: "inline-flex", marginRight: "500px" }}
                  >
                    <label for="gender">Gender : &nbsp;</label>
                    <label for="male">
                      <FontAwesomeIcon icon={faMars} />
                      &nbsp; Male &nbsp;
                    </label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    &nbsp; &nbsp; &nbsp;
                    <label for="female">
                      <FontAwesomeIcon icon={faVenus} />
                      &nbsp; Female &nbsp;
                    </label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    &nbsp; &nbsp; &nbsp;
                  </div>
                </td>
                <td style={{ display: "flex", align: "flex-start" }}>
                  <div
                    className="form-group col-md-7"
                    style={{ display: "inline-flex", marginRight: "500px" }}
                  >
                    <label
                      for="position"
                      style={{ width: "170px", display: "flex" }}
                    >
                      <FontAwesomeIcon icon={faBriefcase} /> &nbsp;Position
                    </label>
                    <div align="left">
                      <select
                        name="position"
                        onChange={(e) => {
                          setPosition(e.target.value);
                        }}
                        value={position}
                      >
                        <option>Select Position</option>
                        <option value="intern">Intern</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                      </select>
                    </div>
                  </div>
                </td>
                <td style={{ display: "flex", align: "flex-start" }}>
                  <div
                    className="form-group col-md-3"
                    style={{ display: "inline-flex", marginRight: "500px" }}
                  >
                    <FontAwesomeIcon icon={faCircleInfo} /> &nbsp;
                    <label style={{ width: "270px", display: "flex" }}>
                      Is Employee Active?
                    </label>{" "}
                    &nbsp;
                    <input
                      type="checkbox"
                      value={IsActive}
                      checked={IsActive === 1}
                      onChange={(e) => handleActiveChange(e)}
                    />
                  </div>
                </td>
                <tr>
                  <br />
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleAddEmployee}
                  >
                    Add Employee
                  </button>
                </tr>
              </tr>
            </Table>
            <br />
          </div>
        </form>
      </Container>
    </>
  );
};
export default AddEmployee;

// import React, { useState } from "react";

// const AddEmployee = () => {
//   const [searchResults, setSearchResults] = useState([]);
//   const [showResults, setShowResults] = useState(false); // State to control visibility of search results

//   // Your other code...

//   return (
//     <>
//       {/* JSX for search input and results */}
//       <input
//         className="form-control"
//         type="search"
//         placeholder="Search employee by first name"
//         onChange={async (e) => {
//           const firstName = e.target.value;
//           if (firstName.trim() !== "") {
//             setShowResults(true); // Show results when firstName is not empty
//             const results = await searchEmployees(firstName);
//             setSearchResults(results);
//           } else {
//             setShowResults(false); // Hide results when firstName is empty
//             setSearchResults([]); // Clear search results
//           }
//         }}
//       />
//       {/* Display search results as a selection list */}
//       {showResults && (
//         <ul>
//           {searchResults.map((employee) => (
//             <li
//               key={employee.id}
//               onClick={() => handleEmployeeSelection(employee)}
//             >
//               {employee.firstName} {employee.lastName}
//             </li>
//           ))}
//         </ul>
//       )}
//       {/* Your other JSX */}
//     </>
//   );
// };

// export default AddEmployee;
