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
import CategoryTypes from "../pages/CategoryType";
import Products from "../pages/Product";
import Files from "../pages/File";


const NavbarComp = () => {
  return (
    <Router>              
      <div>
        <Routes>
          <Route exact path="/enquiry" element={<Enquiry />} /> 
          <Route exact path="/categoryTypes" element={<CategoryTypes/>} />
          <Route exact path="/products" element={<Products/>} /> 
          <Route exact path="/files" element={<Files/>} />          
       </Routes>
      </div>
    </Router>
  );
};

export default NavbarComp;