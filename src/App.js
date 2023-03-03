import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/NavbarComp";
import "./App.css";
import { store } from "./actions/store";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import './volt.css';
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
//import 'semantic-ui-css/semantic.min.css'

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
  
  return (
    <div>
      <nav className="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none"><a className="navbar-brand me-lg-5" href="https://demo.themesberg.com/volt-pro/index.html"><img src="http://manthrasoaps.co.in/image/catalog/logo.png" height="50" width="150" alt="Manthra Soaps"></img></a>
        <div className="d-flex align-items-center"><button className="navbar-toggler d-lg-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button></div>
      </nav>
      <main className="content">
        <nav className="navbar navbar-top navbar-expand navbar-dashboard navbar-dark ps-0 pe-2 pb-0">
          <div className="container-fluid px-0">
            <div className="d-flex justify-content-between w-100" id="navbarSupportedContent">
              <div className="d-flex align-items-center"><button id="sidebar-toggle" className="sidebar-toggle me-3 btn btn-icon-only d-none d-lg-inline-block align-items-center justify-content-center"></button>
              </div>
              <ul className="navbar-nav align-items-center">
                <li className="nav-item dropdown"><a href="notifications" className="nav-link text-dark notification-bell unread dropdown-toggle" data-unread-notifications="true" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">Notifications</a>
                  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                    <div className="list-group list-group-flush"><a href="notifications" className="text-center text-primary fw-bold border-bottom border-light py-3">Notifications</a> <a href="calendar.html" className="list-group-item list-group-item-action border-bottom">
                    </a></div>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Button variant="secondary"
                    onClick={Signout}>
                    Signout
                  </Button>

                </li>
                <li className="nav-item dropdown"><a href="signin" className="nav-link text-dark signin-bell unread dropdown-toggle" data-unread-signin="true" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">Signin</a>
                  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                    <div className="list-group list-group-flush"><a href="signin" className="text-center text-primary fw-bold border-bottom border-light py-3">Signin</a> <a href="calendar.html" className="list-group-item list-group-item-action border-bottom">
                    </a></div>
                  </div>
                </li>
                <li className="nav-item dropdown"><a href="myProfile" className="nav-link text-dark myProfile-bell unread dropdown-toggle" data-unread-myProfile="true" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">MyProfile</a>
                  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                    <div className="list-group list-group-flush"><a href="myProfile" className="text-center text-primary fw-bold border-bottom border-light py-3">MyProfile</a> <a href="calendar.html" className="list-group-item list-group-item-action border-bottom">
                    </a></div>
                  </div>
                </li>


                <ul className="navbar-nav align-items-center">
                  <li className="nav-item dropdown"><a href="resetPassword" className="nav-link text-dark resetPassword-bell unread dropdown-toggle" data-unread-resetPassword="true" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">ResetPassword</a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                      <div className="list-group list-group-flush"><a href="resetPassword" className="text-center text-primary fw-bold border-bottom border-light py-3">ResetPassword</a> <a href="calendar.html" className="list-group-item list-group-item-action border-bottom">
                      </a></div>
                    </div>
                  </li>
                </ul>
                <ul className="navbar-nav align-items-center">
                  <li className="nav-item dropdown"><a href="cart" className="https://th.bing.com/th/id/OIP.M31hF2VEksZBMHT1DCpkmgHaHa?w=176&h=180&c=7&r=0&o=5&pid=1.7" data-unread-cart="true" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">Cart</a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                      <div className="list-group list-group-flush"><a href="cart" className="text-center text-primary fw-bold border-bottom border-light py-3">Cart</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <li className="nav-item dropdown ms-lg-3"><a className="nav-link dropdown-toggle pt-1 px-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <div className="media d-flex align-items-center">
                    <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block"><span className="mb-0 font-small fw-bold text-gray-900">Bonnie Green</span></div>
                  </div>
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
