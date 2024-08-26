import React from "react";
import { Link } from "react-router-dom";
import './sideBar.css';

const SideBar = () => {
    return (
        <div className="sidenav">
            <Link to={"/"}>Home</Link>
            <Link to={"/addemp"}>Add Employee</Link>
            <Link to={"/emplist"}>Employee List</Link>
            {/* <Link to={"/quickadd"}>Quick Add</Link> */}
        </div>
    );
}

export default SideBar;