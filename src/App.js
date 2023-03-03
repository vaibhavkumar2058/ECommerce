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
  const [menu, setMenu] = useState(true);
  const hideMenu = JSON.parse(localStorage.getItem('hidemenu'));
  const Signout = () => {
   
    const resource = {
      role: null,
      loggedIn: false,
    };
    localStorage.setItem("loggedIn", JSON.stringify(resource))
    window.location.href = "/signin";
  };

  useEffect(() => {
    setMenu(hideMenu?.hidden);
  }, [menu]);

  const userInfo = JSON.parse(localStorage.getItem('loggedIn'));
  const admin = userInfo?.role?.admin;
  const agent = userInfo?.role?.agent;
  const dealer = userInfo?.role?.dealer;
  const customer = userInfo?.role?.customer;

  return (
    <div>
      <nav className="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none"><a className="navbar-brand me-lg-5" href="https://demo.themesberg.com/volt-pro/index.html"><img src="http://manthrasoaps.co.in/image/catalog/logo.png" height="50" width="150" alt="Manthra Soaps"></img></a>
        <div className="d-flex align-items-center"><button className="navbar-toggler d-lg-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button></div>
      </nav>
      {(menu && <nav id="sidebarMenu" className="sidebar d-lg-block bg-gray-800 text-white collapse" data-simplebar>
        <div className="sidebar-inner px-4 pt-3">
          <div className="user-card d-flex d-md-none justify-content-between justify-content-md-center pb-4">
            <div className="d-flex align-items-center">
              <div className="avatar-lg me-4"><img src="../assets/img/team/profile-picture-3.jpg" className="card-img-top rounded-circle border-white" alt="Bonnie Green" /></div>
              <div className="d-block">
                <h2 className="h5 mb-3">Hi, Jane</h2><a href="examples/sign-in.html" className="btn btn-secondary btn-sm d-inline-flex align-items-center"> Sign Out</a>
              </div>
            </div>
            <div className="collapse-close d-md-none"><a href="#sidebarMenu" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="true" aria-label="Toggle navigation"></a></div>
          </div>
          <ul className="nav flex-column pt-3 pt-md-0">
            <li className="nav-item"><a href="http://manthrasoaps.co.in/" target="_blank" className="nav-link d-flex align-items-center"><span className="sidebar-icon">
              <img src="http://manthrasoaps.co.in/image/catalog/logo.png" height={50} width={150} alt="Volt Logo">
              </img></span></a></li>

            {(admin && <li className="nav-item active"><a href="dashboard" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Dashboard </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="addressType" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">AddressType </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="country" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Country </span></span></a></li>)}
            {((admin || agent||dealer) && <li className="nav-item "><a href="product" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Product </span></span></a></li>)}

            {((admin || agent || dealer || customer) && <li className="nav-item "><a href="order" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Order </span></span></a></li>)}

             {(admin && <li className="nav-item "><a href="recordStatus" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"> 
             </span><span className="sidebar-text">RecordStatus </span></span></a></li>)}
             {((admin||agent||dealer||customer) && <li className="nav-item"><a href="orderTracking" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"> 
             </span><span className="sidebar-text">OrderTracking </span></span></a></li>)}
             {((admin||agent||dealer) && <li className="nav-item "><a href="invoice" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"> 
             </span><span className="sidebar-text">Invoice </span></span></a></li>)}
             {(admin && <li className="nav-item active"><a href="GMT" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"> 
             </span><span className="sidebar-text">GMT </span></span></a></li>)}
             {(admin && <li className="nav-item active"><a href="cart" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"> 
             </span><span className="sidebar-text">Cart </span></span></a></li>)}
             {(admin && <li className="nav-item active"><a href="itemCost" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"> 
             </span><span className="sidebar-text">ItemCost </span></span></a></li>)}
             {((admin||agent||dealer||customer)  && <li className="nav-item"><a href="order" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"> 
             </span><span className="sidebar-text">Order </span></span></a></li>)}
             {(admin && <li className="nav-item active"><a href="measurementValue" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"> 
             </span><span className="sidebar-text">MeasurementValue </span></span></a></li>)}
             {(admin && <li className="nav-item active"><a href="orderStatus" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"> 
             </span><span className="sidebar-text">OrderStatus </span></span></a></li>)}
            {(admin && <li className="nav-item "><a href="recordStatus" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">RecordStatus </span></span></a></li>)}
            {((admin || agent || dealer || customer) && <li className="nav-item"><a href="orderTracking" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">OrderTracking </span></span></a></li>)}
            {(admin || agent && <li className="nav-item "><a href="invoice" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Invoice </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="GMT" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">GMT </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="cart" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Cart </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="itemCost" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">ItemCost </span></span></a></li>)}
            {((admin || agent || dealer || customer) && <li className="nav-item active"><a href="order" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Order </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="measurementValue" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">MeasurementValue </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="orderStatus" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">OrderStatus </span></span></a></li>)}

            {(admin && <li className="nav-item active"><a href="role" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Role </span></span></a></li>)}

            {(admin && <li className="nav-item active"><a href="state" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">State </span></span></a></li>)}

            {(admin && <li className="nav-item active"><a href="vehicleType" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">VehicleType </span></span></a></li>)}

            {(admin && <li className="nav-item active"><a href="resources" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Resources </span></span></a></li>)}


            {(admin && <li className="nav-item active"><a href="orderStatus" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">OrderStatus </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="role" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Role </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="state" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">State </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="vehicleType" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">VehicleType </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="resources" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Resources </span></span></a></li>)}


            {(admin && <li className="nav-item active"><a href="productAttachments" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">ProductAttachments </span></span></a></li>)}



            {(admin && <li className="nav-item"><a href="address" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"> </span><span className="sidebar-text">Address </span></span></a></li>)}
            {(admin && <li className="nav-item"><a href="categoryType" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"> </span><span className="sidebar-text">Tax</span></span></a></li>)}
            {(admin && <li className="nav-item"><a href="measurementType" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"> </span><span className="sidebar-text">Order Tracking</span></span></a></li>)}
            <li className="nav-item"><a href="product" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z">
              </path>
              <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z">
              </path>
            </svg> </span><span className="sidebar-text">Product</span> </span><span className="badge badge-sm bg-danger badge-pill notification-count">4</span></a></li>
            <li className="nav-item"><a href="enquiry" className="nav-link"><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg> </span><span className="sidebar-text">Track Agent/User</span></a></li>
            <li className="nav-item"><a href="resourceAttachments" className="nav-link"><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg> </span><span className="sidebar-text">Documents</span></a></li>

          </ul>
        </div>
      </nav>)}
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


                <ul className="navbar-nav align-items-center">
                  <li className="nav-item dropdown"><a href="changePassword" className="nav-link text-dark changePassword-bell unread dropdown-toggle" data-unread-changePassword="true" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">ChangePassword</a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                      <div className="list-group list-group-flush"><a href="changePassword" className="text-center text-primary fw-bold border-bottom border-light py-3">ChangePassword</a> <a href="calendar.html" className="list-group-item list-group-item-action border-bottom">
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
