import React from "react";
import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Enquiry from "../pages/Enquiry";
import Country from "../pages/country";
import GMT from "../pages/GMT";



const NavbarComp = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/enquiry" element={<Enquiry />} />  

          <Route exact path="/country" element={<Country/>}/>  

          <Route exact path="/GMT" element = {<GMT/>}/>     
       </Routes>
      </div>
    </Router>
  );
};

export default NavbarComp;