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
import Role from "../pages/Role";
import Security from "../pages/Security";
import ResourceAttachmentTypes from "../pages/ResouceAttachmentType";



import CategoryTypes from "../pages/CategoryType";
import Products from "../pages/Product";
import Files from "../pages/File";


const NavbarComp = () => {
  return (
    <Router>              
      <div>
        <Routes>
          <Route exact path="/enquiry" element={<Enquiry />} /> 
          <Route exact path="/role" element={<Role />} />
          <Route exact path="/security" element={<Security />} />   
          <Route exact path="/ResourceAttachmentType" element={<ResourceAttachmentTypes />} />          
          <Route exact path="/categoryTypes" element={<CategoryTypes/>} />
          <Route exact path="/products" element={<Products/>} /> 
          <Route exact path="/files" element={<Files/>} />          
       </Routes>
      </div>
    </Router>
  );
};

export default NavbarComp;