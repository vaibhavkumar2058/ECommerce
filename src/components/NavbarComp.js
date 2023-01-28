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
import RecordStatus from "../pages/RecordStatus";



const NavbarComp = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/enquiry" element={<Enquiry />} />   
          <Route exact path="/recordStatus" element={<RecordStatus />} />          
       </Routes>
      </div>
    </Router>
  );
};

export default NavbarComp;