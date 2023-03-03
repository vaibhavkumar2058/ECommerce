import React from "react";
import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
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
import Invoice from "../pages/Invoice";
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
import ProductAttachments from "../pages/ProductAttachments";
import Resources from "../pages/Resources"
import OrderStatus from "../pages/OrderStatus"
import ShoppingList from "../pages/ShoppingList"
import ItemList from "../pages/ItemList"
import ZMap from "../pages/ZMap"
import Dashboard from "../pages/DashBoard"
import OrderSummaryList from "../pages/OrderSummaryList";
import OrderPlacedList from "../pages/OrderPlacedList";
import Tax from "../pages/Tax";
import ProtectedRoute from "../pages/ProtectedRoute";
import Signin from "../pages/PublicPages/Signin";
import NotFound from "../pages/PublicPages/NotFound";
import ForgotPassword from "../pages/PublicPages/ForgotPassword";
import ResetPassword from "../pages/PublicPages/ResetPassword";
const NavbarComp = () => {
  const userInfo = JSON.parse(localStorage.getItem('loggedIn'));
  const admin=userInfo?.role?.admin;
  const agent=userInfo?.role?.agent;
  const dealer=userInfo?.role?.dealer;
  const customer=userInfo?.role?.customer;


  return (
    <Router>
      <div>
        <Routes>
          {(admin && <Route exact path="/role" element={<ProtectedRoute><Role /></ProtectedRoute>} />)}
          {(admin && <Route exact path="/state" element={<ProtectedRoute><State /></ProtectedRoute>} />)}
          {(admin && <Route exact path="/vehicleType" element={<ProtectedRoute><VehicleType /></ProtectedRoute>} />)}
          {(admin && <Route exact path="/resources" element={<ProtectedRoute><Resources/></ProtectedRoute>}/>)}
          {((admin||agent||dealer||customer) && <Route exact path="/order" element={<ProtectedRoute><Order/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/itemCost" element={<ProtectedRoute><ItemCost/></ProtectedRoute>}/>)}
          {((admin||agent||dealer)  && <Route exact path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/GMT" element={<ProtectedRoute><GMT/></ProtectedRoute>}/>)}
          {((admin||agent) && <Route exact path="/invoice" element={<ProtectedRoute><Invoice/></ProtectedRoute>}/>)}
          {/* {(agent||admin  && <Route exact path="/orderItem" element={<ProtectedRoute><OrderItem/></ProtectedRoute>}/>)} */}
          {((admin||agent||dealer||customer) && <Route exact path="/orderTracking" element={<ProtectedRoute><OrderTracking/></ProtectedRoute>}/>)}
          {((admin||agent||dealer) && <Route exact path="/recordStatus" element={<ProtectedRoute><RecordStatus/></ProtectedRoute>}/>)}
          {/* {(admin && <Route exact path="/tax" element={<ProtectedRoute><Tax/></ProtectedRoute>}/>)} */}
          {(admin && <Route exact path="/tax" element={<ProtectedRoute><Tax /></ProtectedRoute>}/>)}
          {((admin||agent) && <Route exact path="/product" element={<ProtectedRoute><Product/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/country" element={<ProtectedRoute><Country/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/addressType" element={<ProtectedRoute><AddressType/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/address" element={<ProtectedRoute><Address/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/categoryType" element={<ProtectedRoute><CategoryType/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/measurementType" element={<ProtectedRoute><MeasurementType/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/measurementValue" element={<ProtectedRoute><MeasurementValue/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/orderStatus" element={<ProtectedRoute><OrderStatus/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/productAttachments" element={<ProtectedRoute><ProductAttachments/></ProtectedRoute>}/>)}
          <Route exact path="/file" element={<File />} />
          <Route exact path="/security" element={<Security />} />
          <Route exact path="/gender" element={<Gender />} />
          <Route exact path="/notifications" element={<Notification />} />
          <Route exact path="/resourceAttachmentType" element={<ResourceAttachmentType />} />
          <Route exact path="/resourceAttachments" element={<ResourceAttachments />} />
          <Route exact path="/folder" element={<Folder />} />
          <Route exact path="/shoppingList" element={<ShoppingList />} />
          <Route exact path="/itemList" element={<ItemList />} />
          <Route exact path="/orderSummaryList" element={<OrderSummaryList />} />
          <Route exact path="/orderPlacedList" element={<OrderPlacedList />} />
          <Route exact path="/map" element={<ZMap />} />
          {(admin && <Route exact path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>)}
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route exact path="/resetpassword" element={<ResetPassword/>} />
          <Route exact path="/forgotpassword" element={<ForgotPassword/>} />
          <Route exact path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default NavbarComp;