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
import State from "../pages/State";
import VehicleType from "../pages/VehicleType";

const NavbarComp = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/enquiry" element={<Enquiry />} />   
          <Route exact path="/state" element={<State />} />    
          <Route exact path="vehicleType" element={<VehicleType />} />         
       </Routes>
      </div>
    </Router>
  );
};

export default NavbarComp;