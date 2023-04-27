import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/NavbarComp";
import "./App.css";
import { store } from "./actions/store";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import './volt.css';
import { useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import useFetchNotifications from "./hooks/useFetchNotification";
import useFetchCart from "./hooks/useFetchCart";
import TopBanner from "./pages/TopBanner"; 


import 'semantic-ui-css/semantic.min.css'

function App() {
  //let navigate = useNavigate();
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
    <div>
      <nav className="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none"><a className="navbar-brand me-lg-5" href="https://demo.themesberg.com/volt-pro/index.html"><img src="http://manthrasoaps.co.in/image/catalog/logo.png" height="50" width="150" alt="Manthra Soaps"></img></a>
        <div className="d-flex align-items-center"><button className="navbar-toggler d-lg-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button></div>
      </nav>
      <main className="content">
        <div className="container-fluid px-3">
          <Provider store={store}>
            <ToastProvider autoDismiss={true}>
              <NavbarComp />
            </ToastProvider>
          </Provider>

        </div>
        <footer className="ftr bg-white rounded shadow p-5 mb-4 mt-4">
          <div className="row">
            <div className="col-12 col-md-6 col-xl-6 mb-md-0">
              <p className="mb-0 text-center text-lg-start">© 2022-<span className="current-year" /> <a className="text-primary fw-normal" href="https://jarksit.com/" target="_blank">JARKS IT PRIVATE LIMITED</a></p>
            </div>
            <div className="col-12 col-md-8 col-xl-6 text-center text-lg-start">
              <ul className="list-inline list-group-flush list-group-borderless text-md-end mb-0">
              </ul>
            </div>
          </div>
        </footer>
      </main>

    </div>

  );
}

export default App;
