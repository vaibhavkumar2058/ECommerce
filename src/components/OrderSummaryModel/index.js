import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';


export default function OrderSummaryModel({
}) {

  return (
    <>
    <div className="m-t-40">
      <div class="row">
        <div class=" col-md-6 col-lg-3"></div>
        <div class=" col-md-6 col-lg-6"><b><h3>Order Summary</h3></b></div>
        <div class=" col-md-6 col-lg-3"></div>
      </div>
      
      <div class="row">
        <div class=" col-md-2 col-lg-2"></div>
        <div class=" col-md-5 col-lg-5">Manthra Soap</div>
        <div class=" col-md-1 col-lg-1"><b>Qty1|</b></div>
        <div class=" col-md-2 col-lg-2"><b>price:20</b></div>
        <div class=" col-md-1 col-lg-1"><b>Total:20.00</b></div>
        <div class=" col-md-1 col-lg-1"></div>
      </div>

      <div class="row">
        <div class=" col-md-2 col-lg-2"></div>
        <div class=" col-md-5 col-lg-5">Dishwash Bar</div>
        <div class=" col-md-1 col-lg-1"><b>Qty2|</b></div>
        <div class=" col-md-2 col-lg-2"><b>price:40</b></div>
        <div class=" col-md-1 col-lg-1"><b>Total:80.00</b></div>
        <div class=" col-md-1 col-lg-1"></div>
      </div>

        <div class="row">
          <div class=" col-md-2 col-lg-2"></div>
          <div class=" col-md-4 col-lg-4"></div>
          <div class=" col-md-1 col-lg-1"></div>
          <div class=" col-md-2 col-lg-2"><Button variant="primary">Cancel Order</Button>{' '}</div>
          <div class=" col-md-2 col-lg-2"> <Button variant="primary">Confirm Order</Button>{' '}</div>
          <div class=" col-md-1 col-lg-1"></div>
        </div>
    </div>
  </>
  
  );
}

OrderSummaryModel.propTypes = {
};

OrderSummaryModel.defaultProps = {

};

