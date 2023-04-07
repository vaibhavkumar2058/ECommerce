import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch 
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        
        <Modal.Header closeButton>
          <Modal.Title>Order Placed</Modal.Title>
        </Modal.Header>
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
          <div class=" col-md-4 col-lg-4"><button type="button" class="btn btn-warning">Continue Shopping</button></div>
          <div class=" col-md-4 col-lg-4"></div>
        </div>    
      </div>
       
      </Modal>
    </>
  );
}

export default Example;