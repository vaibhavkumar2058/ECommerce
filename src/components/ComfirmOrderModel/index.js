import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import useFetchItemCosts from "../../hooks/useFetchItemCost";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmOrder() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const ContinueShopping = () => {
           window.location.href = "/itemList";
         }

  return (
    <>
     <Button variant="primary" onClick={handleShow}> Confirm Order</Button>
    
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
      <div className="m-t-40">
        
        
        <div class="row">
          <div class=" col-md-6 col-lg-3"></div>
          <div class=" col-md-6 col-lg-6"><b><h2>Your Order has been received</h2></b></div>
          <div class=" col-md-6 col-lg-3"></div>
        </div>

        <div class="row">
          <div class=" col-md-5 col-lg-5"></div>
          <div class=" col-md-2 col-lg-2"><img src="https://image.shutterstock.com/image-vector/flat-round-check-mark-green-260nw-652023034.jpg" width="80" height="80"></img></div>
          <div class=" col-md-5 col-lg-5"></div>
        </div>

        <div class="row">
          <div class=" col-md-4 col-lg-4"></div>
          <div class=" col-md-4 col-lg-4"><b><h5>Thank you for your purchase!</h5></b></div>
          <div class=" col-md-4 col-lg-4"></div>
        </div>

        <div class="row">
          <div class=" col-md-4 col-lg-4"></div>
          <div class=" col-md-4 col-lg-4">Your order ID:12345678999</div>
          <div class=" col-md-4 col-lg-4"></div>
        </div>

        <div class="row">
          <div class=" col-md-2 col-lg-2"></div>
          <div class=" col-md-8 col-lg-8">You will received an order conformation email with details of your order.</div>
          <div class=" col-md-2 col-lg-2"></div>
        </div>

        <div class="row">
          <div class=" col-md-4 col-lg-4"></div>
          <div class=" col-md-4 col-lg-4"> <Button variant="secondary"
             onClick={() => ContinueShopping()}
            >
            Continue Shopping
            
            </Button></div>
          <div class=" col-md-4 col-lg-4"></div>
        </div>    
      </div>
      </Modal>
    </>
  );
};
