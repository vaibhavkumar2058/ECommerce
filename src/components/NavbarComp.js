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
import MeasurementType from "../pages/MeasurementType";
import MeasurementValue from "../pages/MeasurementValue";



const NavbarComp = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/enquiry" element={<Enquiry />} /> 
          <Route exact path="/measurementType" element={<MeasurementType />} />        
          <Route exact path="/measurementvalue" element={<MeasurementValue />} />   
       </Routes>
      </div>
    </Router>
  );
};

export default NavbarComp;