import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/NavbarComp";
import "./App.css";
import { store } from "./actions/store";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import './volt.css';


function App() {
  // return (
  //   <Provider store={store}>
  //     <ToastProvider autoDismiss={true}>
  //       <NavbarComp />
  //     </ToastProvider>
  //   </Provider>
  // );
  return (
    <div>
       <nav className="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none"><a className="navbar-brand me-lg-5" href="https://demo.themesberg.com/volt-pro/index.html"><img className="navbar-brand-dark" src="https://demo.themesberg.com/volt-pro/assets/img/brand/light.svg" alt="Volt logo" /> <img className="navbar-brand-light" src="https://demo.themesberg.com/volt-pro/assets/img/brand/dark.svg" alt="Volt logo" /></a>
        <div className="d-flex align-items-center"><button className="navbar-toggler d-lg-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button></div>
      </nav>
      <nav id="sidebarMenu" className="sidebar d-lg-block bg-gray-800 text-white collapse" data-simplebar>
        <div className="sidebar-inner px-4 pt-3">
          <div className="user-card d-flex d-md-none justify-content-between justify-content-md-center pb-4">
            <div className="d-flex align-items-center">
              <div className="avatar-lg me-4"><img src="../assets/img/team/profile-picture-3.jpg" className="card-img-top rounded-circle border-white" alt="Bonnie Green" /></div>
              <div className="d-block">
                <h2 className="h5 mb-3">Hi, Jane</h2><a href="examples/sign-in.html" className="btn btn-secondary btn-sm d-inline-flex align-items-center"><svg className="icon icon-xxs me-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg> Sign Out</a>
              </div>
            </div>
            <div className="collapse-close d-md-none"><a href="#sidebarMenu" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="true" aria-label="Toggle navigation"><svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg></a></div>
          </div>
          <ul className="nav flex-column pt-3 pt-md-0">
            <li className="nav-item"><a href="https://demo.themesberg.com/volt-pro/index.html" className="nav-link d-flex align-items-center"><span className="sidebar-icon"><img src="https://demo.themesberg.com/volt-pro/assets/img/brand/light.svg" height={20} width={20} alt="Volt Logo" /> </span><span className="mt-1 sidebar-text">Manthra Soaps</span></a></li>
            <li className="nav-item"><span className="nav-link collapsed d-flex justify-content-between align-items-center" data-bs-toggle="collapse" data-bs-target="#submenu-dashboard"><span><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg> </span><span className="sidebar-text">Dashboard</span> </span><span className="link-arrow"><svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg></span></span>
              <div className="multi-level collapse" role="list" id="submenu-dashboard" aria-expanded="false">
                <ul className="flex-column nav">
                  <li className="nav-item"><a href="dashboard/dashboard.html" className="nav-link"><span className="sidebar-text-contracted">O</span> <span className="sidebar-text">Overview</span></a></li>
                  <li className="nav-item"><a href="dashboard/traffic-sources.html" className="nav-link"><span className="sidebar-text-contracted">T</span> <span className="sidebar-text">All Traffic</span></a></li>
                  <li className="nav-item"><a href="dashboard/app-analysis.html" className="nav-link"><span className="sidebar-text-contracted">P</span> <span className="sidebar-text">Product Analysis</span></a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item active"><a href="country" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
              </path>
            </svg> </span><span className="sidebar-text">Country </span></span></a></li>
            <li className="nav-item active"><a href="state" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
              </path>
            </svg> </span><span className="sidebar-text">State </span></span></a></li>
            <li className="nav-item active"><a href="categoryType" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
              </path>
            </svg> </span><span className="sidebar-text">Category Type </span></span></a></li>
            <li className="nav-item active"><a href="gender" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
              </path>
            </svg> </span><span className="sidebar-text">Gender </span></span></a></li>
            <li className="nav-item"><a href="addressType" className="nav-link"><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z">
              </path>
            </svg> </span><span className="sidebar-text">Address Type</span></a></li>
            <li className="nav-item active"><a href="measurementType" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
              </path>
            </svg> </span><span className="sidebar-text">Measurement Type </span></span></a></li>
            <li className="nav-item active"><a href="measurementValue" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
              </path>
            </svg> </span><span className="sidebar-text">Measurement Value </span></span></a></li>
            <li className="nav-item active"><a href="orders" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
              </path>
            </svg> </span><span className="sidebar-text">Orders </span></span></a></li>
            <li className="nav-item active"><a href="ordertracking" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
              </path>
            </svg> </span><span className="sidebar-text">Order Tracking</span></span></a></li>
            <li className="nav-item"><a href="product" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z">
              </path>
              <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z">
              </path>
            </svg> </span><span className="sidebar-text">Product</span> </span><span className="badge badge-sm bg-danger badge-pill notification-count">4</span></a></li>
            <li className="nav-item"><a href="file" className="nav-link"><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z">
              </path>
            </svg> </span><span className="sidebar-text">File</span></a></li>
            <li className="nav-item"><a href="security" className="nav-link"><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg> </span><span className="sidebar-text">Security</span></a></li>
            <li className="nav-item"><a href="enquiry" className="nav-link"><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg> </span><span className="sidebar-text">Enquiry</span></a></li>
            <li className="nav-item"><a href="resourceAttachments" className="nav-link"><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg> </span><span className="sidebar-text">ResourceAttachments</span></a></li>
            <li className="nav-item"><a href="resourceAttachmentType" className="nav-link"><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg> </span><span className="sidebar-text">Attachment Type</span></a></li>
            <li className="nav-item"><a href="GMT" className="nav-link"><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg> </span><span className="sidebar-text">GMT</span></a></li>
            <li className="nav-item"><a href="folder" className="nav-link"><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg> </span><span className="sidebar-text">Folder</span></a></li>
            <li className="nav-item"><span className="nav-link collapsed d-flex justify-content-between align-items-center" data-bs-toggle="collapse" data-bs-target="#submenu-app"><span><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
            </svg> </span><span className="sidebar-text">Tables</span> </span><span className="link-arrow"><svg className="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg></span></span>
              <div className="multi-level collapse" role="list" id="submenu-app" aria-expanded="false">
                <ul className="flex-column nav">
                  <li className="nav-item"><a className="nav-link" href="tables/datatables.html"><span className="sidebar-text-contracted">D</span> <span className="sidebar-text">DataTables</span></a></li>
                  <li className="nav-item"><a className="nav-link" href="tables/bootstrap-tables.html"><span className="sidebar-text-contracted">B</span> <span className="sidebar-text">Bootstrap Tables</span></a></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <main className="content">
        <nav className="navbar navbar-top navbar-expand navbar-dashboard navbar-dark ps-0 pe-2 pb-0">
          <div className="container-fluid px-0">
            <div className="d-flex justify-content-between w-100" id="navbarSupportedContent">
              <div className="d-flex align-items-center"><button id="sidebar-toggle" className="sidebar-toggle me-3 btn btn-icon-only d-none d-lg-inline-block align-items-center justify-content-center"><svg className="toggle-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg></button>
              </div>
              <ul className="navbar-nav align-items-center">
                <li className="nav-item dropdown"><a href="notifications" className="nav-link text-dark notification-bell unread dropdown-toggle" data-unread-notifications="true" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"><svg className="icon icon-sm text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z">
                  </path>
                </svg></a>
                  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                    <div className="list-group list-group-flush"><a href="notifications" className="text-center text-primary fw-bold border-bottom border-light py-3">Notifications</a> <a href="calendar.html" className="list-group-item list-group-item-action border-bottom">
                      <div className="row align-items-center">
                        <div className="col-auto"> 
                        <img alt="Image placeholder" src="https://unsplash.com/photos/mEZ3PoFGs_k" className="avatar-md rounded" /></div>
                        <div className="col ps-0 ms-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h4 className="h6 mb-0 text-small">Jose Leos</h4>
                            </div>
                            <div className="text-end"><small className="text-danger">a few moments ago</small></div>
                          </div>
                          <p className="font-small mt-1 mb-0">Added you to an event "Project stand-up" tomorrow at 12:30 AM.
                          </p>
                        </div>
                      </div>
                    </a><a href="tasks.html" className="list-group-item list-group-item-action border-bottom">
                        <div className="row align-items-center">
                          <div className="col-auto"> <img alt="Image placeholder" src="../assets/img/team/profile-picture-2.jpg" className="avatar-md rounded" /></div>
                          <div className="col ps-0 ms-2">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h4 className="h6 mb-0 text-small">Neil Sims</h4>
                              </div>
                              <div className="text-end"><small className="text-danger">2 hrs ago</small></div>
                            </div>
                            <p className="font-small mt-1 mb-0">You've been assigned a task for "Awesome new project".</p>
                          </div>
                        </div>
                      </a><a href="tasks.html" className="list-group-item list-group-item-action border-bottom">
                        <div className="row align-items-center">
                          <div className="col-auto"> <img alt="Image placeholder" src="../assets/img/team/profile-picture-3.jpg" className="avatar-md rounded" /></div>
                          <div className="col ps-0 m-2">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h4 className="h6 mb-0 text-small">Roberta Casas</h4>
                              </div>
                              <div className="text-end"><small>5 hrs ago</small></div>
                            </div>
                            <p className="font-small mt-1 mb-0">Tagged you in a document called "Financial plans",</p>
                          </div>
                        </div>
                      </a><a href="single-message.html" className="list-group-item list-group-item-action border-bottom">
                        <div className="row align-items-center">
                          <div className="col-auto"> <img alt="Image placeholder" src="../assets/img/team/profile-picture-4.jpg" className="avatar-md rounded" /></div>
                          <div className="col ps-0 ms-2">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h4 className="h6 mb-0 text-small">Joseph Garth</h4>
                              </div>
                              <div className="text-end"><small>1 d ago</small></div>
                            </div>
                            <p className="font-small mt-1 mb-0">New message: "Hey, what's up? All set for the presentation?"</p>
                          </div>
                        </div>
                      </a><a href="single-message.html" className="list-group-item list-group-item-action border-bottom">
                        <div className="row align-items-center">
                          <div className="col-auto"> <img alt="Image placeholder" src="../assets/img/team/profile-picture-5.jpg" className="avatar-md rounded" /></div>
                          <div className="col ps-0 ms-2">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h4 className="h6 mb-0 text-small">Bonnie Green</h4>
                              </div>
                              <div className="text-end"><small>2 hrs ago</small></div>
                            </div>
                            <p className="font-small mt-1 mb-0">New message: "We need to improve the UI/UX for the landing
                              page."</p>
                          </div>
                        </div>
                      </a><a href="#" className="dropdown-item text-center fw-bold rounded-bottom py-3"><svg className="icon icon-xxs text-gray-400 me-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg> View all</a></div>
                  </div>
                </li>
                <li className="nav-item dropdown ms-lg-3"><a className="nav-link dropdown-toggle pt-1 px-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <div className="media d-flex align-items-center"><img className="avatar rounded-circle" alt="Image placeholder" src="../assets/img/team/profile-picture-3.jpg" />
                    <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block"><span className="mb-0 font-small fw-bold text-gray-900">Bonnie Green</span></div>
                  </div>
                </a>
                  <div className="dropdown-menu dashboard-dropdown dropdown-menu-end mt-2 py-1"><a className="dropdown-item d-flex align-items-center" href="#"><svg className="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg> My Profile </a><a className="dropdown-item d-flex align-items-center" href="#"><svg className="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg> Settings </a><a className="dropdown-item d-flex align-items-center" href="#"><svg className="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
                  </svg> Messages </a><a className="dropdown-item d-flex align-items-center" href="#"><svg className="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                  </svg> Support</a>
                    <div role="separator" className="dropdown-divider my-1" /><a className="dropdown-item d-flex align-items-center" href="#"><svg className="dropdown-icon text-danger me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                      </path>
                    </svg> Logout</a>
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
        <div className="container-fluid kanban-container py-4 px-0">

        </div>
        <footer className="bg-white rounded shadow p-5 mb-4 mt-4">
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
