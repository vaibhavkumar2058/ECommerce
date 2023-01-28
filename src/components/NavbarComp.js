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
import Address from "../pages/Address";
import AddressType from "../pages/AddressType";
import Cart from "../pages/Cart";



const NavbarComp = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/enquiry" element={<Enquiry />} />
          <Route exact path="/address" element={<Address/>} /> 
          <Route exact path="/addressType" element={<AddressType/>} /> 
          <Route exact path="/cart" element={<Cart/>} />            
       </Routes>
      </div>
    </Router>
  );
};

export default NavbarComp;