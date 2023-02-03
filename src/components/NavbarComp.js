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
import CategoryType from "../pages/CategoryType";
import Product from "../pages/Product";
import File from "../pages/File";
import Security from "../pages/Security";
import AddressType from "../pages/AddressType";
import Address from "../pages/Address";
import Cart from "../pages/Cart";
import Country from "../pages/Country";
import Gender from "../pages/Gender";
import GMT from "../pages/GMT";
import ItemCost from "../pages/ItemCost";
import MeasurementType from "../pages/MeasurementType";
import MeasurementValue from "../pages/MeasurementValue";
import Notification from "../pages/Notification";
import Order from "../pages/Order";
import OrderTracking from "../pages/OrderTracking";
import RecordStatus from "../pages/RecordStatus";
import ResourceAttachmentType from "../pages/ResouceAttachmentType";
import ResourceAttachments from "../pages/ResourceAttachments";
import Role from "../pages/Role";
import Folder from "../pages/Folder";


const NavbarComp = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/enquiry" element={<Enquiry />} />   
          <Route exact path="/state" element={<State />} />    
          <Route exact path="/vehicleType" element={<VehicleType />} />    
          <Route exact path="/categoryType" element={<CategoryType />} />        
          <Route exact path="/product" element={<Product />} />   
          <Route exact path="/file" element={<File />} />     
          <Route exact path="/security" element={<Security />} />  
          <Route exact path="/addressType" element={<AddressType />} />  
          <Route exact path="/address" element={<Address />} />   
          <Route exact path="/cart" element={<Cart />} />    
          <Route exact path="/gender" element={<Gender />} />    
          <Route exact path="/country" element={<Country />} />        
          <Route exact path="/gmt" element={<GMT />} />   
          <Route exact path="/itemCost" element={<ItemCost />} />     
          <Route exact path="/measurementType" element={<MeasurementType />} />  
          <Route exact path="/measurementValue" element={<MeasurementValue />} />  
          <Route exact path="/notifications" element={<Notification />} />   
          <Route exact path="/orders" element={<Order />} />    
          <Route exact path="/orderTracking" element={<OrderTracking />} />    
          <Route exact path="/recordStatus" element={<RecordStatus />} />        
          <Route exact path="/resourceAttachmentType" element={<ResourceAttachmentType />} />   
          <Route exact path="/resourceAttachments" element={<ResourceAttachments />} />     
          <Route exact path="/role" element={<Role />} />   
          <Route exact path="/folder" element={<Folder />} />   

       </Routes>
      </div>
    </Router>
  );
};

export default NavbarComp;