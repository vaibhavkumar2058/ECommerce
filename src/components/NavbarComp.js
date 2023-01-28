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
import Notification from "../pages/Notification";
import Order from "../pages/Order";



const NavbarComp = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/enquiry" element={<Enquiry />} />   
          <Route exact path="/notification" element={<Notification/>}/> 
          <Route exact path="/order" element={<Order/>}/>       
       </Routes>
      </div>
    </Router>
  );
};

export default NavbarComp;