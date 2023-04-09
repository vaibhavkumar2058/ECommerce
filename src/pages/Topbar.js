
import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { CSSTransition } from 'react-transition-group';
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from 'react-bootstrap';
import useFetchNotifications from "../hooks/useFetchNotification";
import useFetchCart from "../hooks/useFetchCart";
import { Routes } from "./routes";

export default (props = {}) => {
  const location = "";
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const Signout = () => {
    const resource = {
      role: null,
      loggedIn: false,
    };
    localStorage.setItem("loggedIn", JSON.stringify(resource))
    window.location.href = "/signin";
  };
  const MyProfile = () => {
    window.location.href = "/myProfile";
  };
  const [notifications, setNotifications] = useState([]);
  const [cart, setCart] = useState([]);
  const {
    getNotificationListByResourcesId,
  } = useFetchNotifications();

  // useEffect(() => {
  //   if (notifications.length == 0) {
  //     getNotificationsByResourcesId(6);

  //   }
  // }, [notifications]);

  const getNotificationsByResourcesId = async (id) => {
    const response = await getNotificationListByResourcesId(id);
    if (response.payload.title == "Success") {
      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(response.payload[key]);
      }
      setNotifications(arr);
    }
    else {

    }
  };

  const {
    getCartListByResourcesId,
  } = useFetchCart();

  // useEffect(() => {
  //   if (cart.length == 0) {
  //     getCartByResourcesId(6);
  //   }
  // }, [cart]);

  const getCartByResourcesId = async (id) => {
    const response = await getCartListByResourcesId(id);
    if (response.payload.title == "Success") {
      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(response.payload[key]);
      }
      setCart(arr);
    }
    else {

    }
  };

    return (
      <nav className="navbar navbar-top navbar-expand navbar-dashboard navbar-dark ps-0 pe-2 pb-0">
      <div className="container-fluid px-0">
        <div className="d-flex justify-content-between w-100" id="navbarSupportedContent">
          <div className="d-flex align-items-center"><button id="sidebar-toggle" className="sidebar-toggle me-3 btn btn-icon-only d-none d-lg-inline-block align-items-center justify-content-center"></button>
          </div>
          <ul className="navbar-nav align-items-center">
          <li className="nav-item dropdown"><a href="notifications" >
          <div id="_desktop_contact_link" class="header-cms-block">
							<div class="wdicon"></div>
							<span class="content">
								<span class="service-title">Reach us:</span>
								<a href="tel:%phone%" class="contact-info">+91 70138 35158 / 9440514453</a><br></br>
								<a href="tel:%phone%" class="contact-info">nataraj@manthrasoaps.co.in</a>
							</span>
						</div>
            </a>
            </li>
            <li className="nav-item dropdown"><a href="notifications" >
              <Badge className="notification" bg="secondary">{notifications?.length}</Badge><img src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-vvector-notification-icon-png-image_4232478.jpg" width="35" height="35"></img>
            </a>
            </li>
            <li className="nav-item dropdown"><a href="Shoppinglist" >
              <Badge className="notification cart" bg="secondary">{cart?.length}</Badge><img src="https://cdn-icons-png.flaticon.com/512/1413/1413908.png" width="35" height="35"></img>
            </a> 
            </li>

            <li className="nav-item dropdown ms-lg-3"><a className="nav-link dropdown-toggle pt-1 px-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="profile-img" >
                 <img className="profile-img" src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" width="30" height="30"></img>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="myProfile">MyProfile</Dropdown.Item>
                  <Dropdown.Item href="changePassword">ChangePassword</Dropdown.Item>
                  <Dropdown.Item href="signin"><Button variant="secondary"
                    onClick={Signout}>
                    Signout
                  </Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </a>
              <div className="dropdown-menu dashboard-dropdown dropdown-menu-end mt-2 py-1">
                <a className="dropdown-item d-flex align-items-center" href="#"> My Profile </a>
                <a className="dropdown-item d-flex align-items-center" href="#"> Settings </a>
                <a className="dropdown-item d-flex align-items-center" href="#"> Messages </a>
                <a className="dropdown-item d-flex align-items-center" href="#"> Support</a>
                <div role="separator" className="dropdown-divider my-1" />
                <a className="dropdown-item d-flex align-items-center" href="#">
                  Logout</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );

};
