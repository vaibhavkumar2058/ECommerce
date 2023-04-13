
import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { CSSTransition } from 'react-transition-group';
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Routes } from "../pages/routes";

export default (props = {}) => {
  const location = "";
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { to: link };
    const userInfo = JSON.parse(localStorage.getItem('loggedIn'));
    const admin = userInfo?.role?.admin;
    const agent = userInfo?.role?.agent;
    const dealer = userInfo?.role?.dealer;
    const customer = userInfo?.role?.customer;

    return (

      <nav id="sidebarMenu" className="sidebar d-lg-block bg-gray-800 text-white collapse" data-simplebar>
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
            <Dropdown>
              <Dropdown.Toggle variant="secondary">
                Settings
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">

                {(admin && <li className="nav-item active"><Dropdown.Item href="role" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
                </span><span className="sidebar-text">Role </span></span></Dropdown.Item></li>)}
                {(admin && <li className="nav-item active"><Dropdown.Item href="gender" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
                </span><span className="sidebar-text">Gender </span></span></Dropdown.Item></li>)}
                {(admin && <li className="nav-item active"><Dropdown.Item href="addressType" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
                </span><span className="sidebar-text">Address Type </span></span></Dropdown.Item></li>)}
                {(admin && <li className="nav-item active"><Dropdown.Item href="country" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
                </span><span className="sidebar-text">Country </span></span></Dropdown.Item></li>)}
                {(admin && <li className="nav-item active"><Dropdown.Item href="state" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
                </span><span className="sidebar-text">State </span></span></Dropdown.Item></li>)}
                {(admin && <li className="nav-item"><Dropdown.Item href="categoryType" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"> </span><span className="sidebar-text">Category Type</span></span></Dropdown.Item></li>)}
                {(admin && <li className="nav-item active"><Dropdown.Item href="customType" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
                </span><span className="sidebar-text">Custom Type </span></span></Dropdown.Item></li>)}
                {(admin && <li className="nav-item"><a href="measurementType" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"> </span><span className="sidebar-text">Measurement Type</span></span></a></li>)}
                {(admin && <li className="nav-item active"><Dropdown.Item href="measurementValue" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
                </span><span className="sidebar-text">MeasurementValue </span></span></Dropdown.Item></li>)}
                {(admin && <li className="nav-item active"><a href="resourceAttachmentType" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
                </span><span className="sidebar-text">ResourceAttachmentType </span></span></a></li>)}
                {(admin && <li className="nav-item active"><a href="attachmentStatusType" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
                </span><span className="sidebar-text">AttachmentStatusType </span></span></a></li>)}
                {(admin && <li className="nav-item active"><Dropdown.Item href="notificationType" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
                </span><span className="sidebar-text">NotificationType </span></span></Dropdown.Item></li>)}
                {(admin && <li className="nav-item "><Dropdown.Item href="recordStatus" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
                </span><span className="sidebar-text">RecordStatus </span></span></Dropdown.Item></li>)}
                {(admin && <li className="nav-item active"><Dropdown.Item href="orderStatus" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
                </span><span className="sidebar-text">OrderStatus </span></span></Dropdown.Item></li>)}
              </Dropdown.Menu>
            </Dropdown>

            {(admin && <li className="nav-item active"> <a href="dashboard" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Dashboard </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="resources" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Resources </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="address" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"> </span><span className="sidebar-text">Address </span></span></a></li>)}
            {((admin || agent || dealer) && <li className="nav-item active"><a href="product" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Product </span></span></a></li>)}
            {((admin || agent || dealer || customer) && <li className="nav-item active"><a href="order" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Order </span></span></a></li>)}
            {((admin || agent || dealer || customer) && <li className="nav-item active"><a href="itemList" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">ItemList </span></span></a></li>)}
            {((admin || agent || dealer || customer) && <li className="nav-item active"><a href="orderTracking" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">OrderTracking </span></span></a></li>)}
            {((admin || agent || dealer) && <li className="nav-item active"><a href="invoice" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Invoice </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="cart" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Cart </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="itemCost" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">ItemCost </span></span></a></li>)}
            {(admin || agent && <li className="nav-item active"><a href="invoice" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text active">Invoice </span></span></a></li>)}
            {(admin || agent || dealer || customer && <li className="nav-item active"><a href="cart" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">Cart </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="vehicleType" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">VehicleType </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="productAttachments" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">ProductAttachments </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="resourceAttachments" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
                </span><span className="sidebar-text">ResourceAttachments </span></span></a></li>)}
            {(admin && <li className="nav-item active"><a href="tax" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"> </span><span className="sidebar-text">Tax</span></span></a></li>)}
            {((admin || agent || dealer || customer) && <li className="nav-item active"><a href="orderItem" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon">
            </span><span className="sidebar-text">orderItem </span></span></a></li>)}
            {/* {(admin && <li className="nav-item active"><a href="GMT" className="nav-link d-flex align-items-center justify-content-between"><span><span className="sidebar-icon"> 
             </span><span className="sidebar-text">GMT </span></span></a></li>)} */}
            <li className="nav-item active"><a href="enquiry" className="nav-link"><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg> </span><span className="sidebar-text">Track Agent/User</span></a></li>
            <li className="nav-item active"><a href="resourceAttachments" className="nav-link"><span className="sidebar-icon"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg> </span><span className="sidebar-text">Documents</span></a></li>

          </ul>
        </div>
      </nav>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" to={Routes.DashboardOverview.path}>
          <Image src="" className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image src="" className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h6>Hi, Jane</h6>
                  <Button variant="secondary" size="xs" to={Routes.Signin.path} className="text-dark">
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="Volt React" link={Routes.Presentation.path} image="" />

              <NavItem title="Overview" link={Routes.DashboardOverview.path} />
              <NavItem external title="Messages" link="https://demo.themesberg.com/volt-pro-react/#/messages" target="_blank" badgeText="Pro" />
              <NavItem title="Transactions" link={Routes.Transactions.path} />
              <NavItem title="Settings" link={Routes.Settings.path} />
              <NavItem external title="Calendar" link="https://demo.themesberg.com/volt-pro-react/#/calendar" target="_blank" badgeText="Pro" />
              <NavItem external title="Map" link="https://demo.themesberg.com/volt-pro-react/#/map" target="_blank" badgeText="Pro" />

              <NavItem external title="Plugins" link="https://demo.themesberg.com/volt-pro-react/#/plugins/datatable" target="_blank" badgeText="Pro" />

              <Dropdown.Divider className="my-3 border-indigo" />
              <NavItem external title="Themesberg" link="https://themesberg.com" target="_blank" />
              <Button to={Routes.Upgrade.path} variant="secondary" className="upgrade-to-pro">Upgrade to Pro</Button>
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
