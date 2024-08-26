import React from "react";
import { Link } from "react-router-dom";
const NavBar=()=>{
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
        <Link to={'/'}>Home</Link> &nbsp;
      </li>
      <li class="nav-item active">
        <Link to={'/addemp'}>Add Employee</Link> &nbsp;
      </li>
      <li class="nav-item active">
        <Link to="/emplist">Employee List</Link>
      </li>
    </ul>
  </div>
</nav>
    );
}
export default NavBar;