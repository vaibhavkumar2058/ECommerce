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
import ItemCost from "../pages/ItemCost";



const NavbarComp = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/enquiry" element={<Enquiry />} /> 
          <Route exact path="/itemcost" element={<ItemCost />} />          
       </Routes>
      </div>
    </Router>
  );
};

export default NavbarComp;