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
import Invoice from "../pages/InVoice";
import Country from "../pages/country";
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
import ChangePassword from "../pages/PublicPages/ChangePassword";
import MyProfile from "../pages/MyProfile";
import Sidebar from "../pages/Sidebar";
import Signup from "../pages/PublicPages/Signup";
import OrderReports from "../pages/OrderReports";
import NotificationType from "../pages/NotificationType";


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
          {(admin && <Route exact path="/role" element={<ProtectedRoute><Sidebar/> <Role /></ProtectedRoute>} />)}
          {(admin && <Route exact path="/state" element={<ProtectedRoute><Sidebar/> <State /></ProtectedRoute>} />)}
          {(admin && <Route exact path="/vehicleType" element={<ProtectedRoute><Sidebar/> <VehicleType /></ProtectedRoute>} />)}
          {(admin && <Route exact path="/resources" element={<ProtectedRoute><Sidebar/> <Resources/></ProtectedRoute>}/>)}
          {((admin||agent||dealer||customer) && <Route exact path="/order" element={<ProtectedRoute><Sidebar/><Order/></ProtectedRoute>}/>)}
          {((admin||agent||dealer||customer) &&<Route exact path="/shoppinglist" element={<ProtectedRoute><Sidebar/> <ShoppingList /></ProtectedRoute>} />)}
          {(admin && <Route exact path="/itemCost" element={<ProtectedRoute><Sidebar/> <ItemCost/></ProtectedRoute>}/>)}
          {((admin||agent||dealer||customer)  && <Route exact path="/cart" element={<ProtectedRoute><Sidebar/> <Cart/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/GMT" element={<ProtectedRoute><Sidebar/> <GMT/></ProtectedRoute>}/>)}
          {((admin||agent||dealer) && <Route exact path="/invoice" element={<ProtectedRoute><Sidebar/> <Invoice/></ProtectedRoute>}/>)}
          {((admin||agent||dealer||customer) && <Route exact path="/orderTracking" element={<ProtectedRoute><Sidebar/> <OrderTracking/></ProtectedRoute>}/>)}
          {((admin||agent||dealer) && <Route exact path="/recordStatus" element={<ProtectedRoute><Sidebar/> <RecordStatus/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/tax" element={<ProtectedRoute><Sidebar/> <Tax /></ProtectedRoute>}/>)}
          {((admin||agent||dealer) && <Route exact path="/product" element={<ProtectedRoute><Sidebar/> <Product/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/country" element={<ProtectedRoute><Sidebar/> <Country/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/addressType" element={<ProtectedRoute><Sidebar/> <AddressType/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/address" element={<ProtectedRoute><Sidebar/> <Address/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/categoryType" element={<ProtectedRoute><Sidebar/><CategoryType/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/measurementType" element={<ProtectedRoute><Sidebar/><MeasurementType/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/measurementValue" element={<ProtectedRoute><Sidebar/><MeasurementValue/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/orderStatus" element={<ProtectedRoute><Sidebar/><OrderStatus/></ProtectedRoute>}/>)}
          {(admin && <Route exact path="/productAttachments" element={<ProtectedRoute><Sidebar/><ProductAttachments/></ProtectedRoute>}/>)}
          {((admin||agent||dealer||customer) && <Route exact path="/orderPlacedList" element={<ProtectedRoute><Sidebar/><OrderPlacedList/></ProtectedRoute>}/>)}
         {((admin||agent||dealer||customer) && <Route exact path="/itemList" element={<ProtectedRoute><Sidebar/><ItemList/></ProtectedRoute>}/>)}

          {(admin && <Route exact path="/role" element={<ProtectedRoute><Sidebar/> <Role /></ProtectedRoute>} />)}
          {(admin && <Route exact path="/file" element={<ProtectedRoute><Sidebar/><File /></ProtectedRoute>} />)}
          {(admin && <Route exact path="/security" element={<ProtectedRoute><Sidebar/><Security /></ProtectedRoute>} />)}
          {(admin &&<Route exact path="/gender" element={<ProtectedRoute><Sidebar/><Gender /></ProtectedRoute>} />)}
          {(admin &&<Route exact path="/notifications" element={<ProtectedRoute><Sidebar/><Notification /></ProtectedRoute>} />)}
          {(admin && <Route exact path="/resourceAttachmentType" element={<ProtectedRoute><Sidebar/><ResourceAttachmentType /></ProtectedRoute>} />)}
          {(admin &&<Route exact path="/resourceAttachments" element={<ProtectedRoute><Sidebar/><ResourceAttachments /></ProtectedRoute>} />)}
          {(admin &&<Route exact path="/folder" element={<ProtectedRoute><Sidebar/><Folder /></ProtectedRoute>} />)}
          {((admin||agent||dealer||customer) &&<Route exact path="/orderSummaryList" element={<ProtectedRoute><Sidebar/><OrderSummaryList /></ProtectedRoute>} />)}
          {((admin||agent||dealer||customer) &&<Route exact path="/orderPlacedList" element={<ProtectedRoute><Sidebar/><OrderPlacedList /></ProtectedRoute>} />)}
          {(admin &&<Route exact path="/map" element={<ProtectedRoute><Sidebar/><ZMap /></ProtectedRoute>} />)}
          <Route exact path="/dashboard" element={<ProtectedRoute><Sidebar/><Dashboard /></ProtectedRoute>}/>
          <Route exact path="/signin" element={<Signin />}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route path="/" element={<Navigate replace to="/signin" />} />
          {((admin||agent||dealer||customer) &&<Route exact path="/changepassword" element={<ProtectedRoute><Sidebar/><ChangePassword/></ProtectedRoute>}/>)}
          <Route exact path="/forgotpassword" element={<ForgotPassword/>}/>
          {((admin||agent||dealer||customer) &&<Route exact path="/myProfile" element={<ProtectedRoute><Sidebar/><MyProfile /></ProtectedRoute>}/>)}
          <Route exact path="/*" element={<NotFound />} />
          {(admin &&<Route exact path="/notificationType" element={<ProtectedRoute><Sidebar/><NotificationType /></ProtectedRoute>} />)}
          {((admin||agent||dealer||customer) &&<Route exact path="/orderReports" element={<ProtectedRoute><Sidebar/><OrderReports /></ProtectedRoute>} />)}
        </Routes>
      </div>
    </Router>
  );
};
export default NavbarComp;