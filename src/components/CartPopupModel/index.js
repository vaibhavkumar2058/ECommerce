import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from "react";
import useFetchCarts from '../../hooks/useFetchCart';
import useFetchOrders from '../../hooks/useFetchOrder';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConfirmOrder from '../ComfirmOrderModel';


export default function OrderSummaryLists() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState(null);

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });  
  const userInfo = JSON.parse(localStorage.getItem('loggedIn'));
  
  const [placeOrders, setPlaceOrders] = useState({
    resourcesId: userInfo?.resourcesId,
    orderItems: null,
  });

  const {
    placeOrder,
  } = useFetchOrders();

  const {
    getCartListByResourcesId,

  } = useFetchCarts();

  useEffect(() => {
    if (carts.length == 0) {
      const userInfo = JSON.parse(localStorage.getItem('loggedIn'));

      getAllCarts(userInfo.resourcesId);
      setLoading(false)
    }
  }, [carts]);

  // const  ConfirmOrders = async () => {
  //   placeOrders.orderItems = carts;
  //   const response = await  placeOrder(placeOrders);
  //   if (response.payload.title == "Success") {
  //     alert("Order Placed Successfully..");
  //     window.location.href = "/orderPlacedList";
  //     setCarts([]);
  //   }
  //   else {
  //   }
  // };

  const getAllCarts = async (resourcesId) => {

    const response = await getCartListByResourcesId(resourcesId);
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'Carts Record Fetch Succefully.'
      })
      const dataFormatter = (rawData) => {
        const curedData = {};
        curedData.resourcesId = rawData?.resourcesId;
        curedData.productId = rawData?.productId;
        curedData.productName = rawData?.product?.productName;
        curedData.quantity = rawData?.quantity;
        curedData.cost = rawData?.cost;
        curedData.orderPrice = rawData?.cost;
        curedData.total = rawData?.total;
        return curedData;
      }

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
          arr.push(dataFormatter(response.payload[key]));
      }
      setCarts(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Cart Fetch Failed.'
      })
    }
  };

  return (
    <>
     <Button variant="primary" onClick={handleShow}>
     Place to order
      </Button>
   <Modal
   show={show}
   onHide={handleClose}
   backdrop="static"
   keyboard={false}>
      <div className="m-t-40">
        {loading && <div>A moment please...</div>}
        {carts && (<div>
          <div class="row">
            <div class=" col-md-6 col-lg-3"></div>
            <div class=" col-md-6 col-lg-6"><b><h3>Order Summary</h3></b></div>
            <div class=" col-md-6 col-lg-3"></div>
          </div>
          <div class="row">


            <div class=" col-md-2 col-lg-2"></div>
            <div class=" col-md-5 col-lg-5"><b>Product Name</b></div>
            <div class=" col-md-1 col-lg-1"><b>Quantity</b></div>
            <div class=" col-md-2 col-lg-2"><b>cost</b></div>
            <div class=" col-md-1 col-lg-1"><b>Total</b></div>
            <div class=" col-md-1 col-lg-1"></div>
          </div>
          {carts.map((cart) =>
            <div>
              <div class="row">
                <div class=" col-md-2 col-lg-2"><img height={50} width={50} ></img></div>
                <div class=" col-md-5 col-lg-5">{cart.productName}</div>
                <div class=" col-md-1 col-lg-1">{cart.quantity}</div>
                <div class=" col-md-2 col-lg-2">{cart.cost}</div>
                <div class=" col-md-1 col-lg-1">{cart.quantity * cart.cost}</div>
                <div class=" col-md-1 col-lg-1"></div>
              </div>
            </div>
          )}

          <div class="row">
            <div class=" col-md-2 col-lg-2"></div>
            <div class=" col-md-4 col-lg-4"></div>
            <div class=" col-md-1 col-lg-1"></div>
            <div class=" col-md-2 col-lg-2"><Button variant="primary">Cancel Order</Button>{' '}</div>
            <div class=" col-md-2 col-lg-2">
              {/* <Button variant="secondary"
                onClick={() => ConfirmOrders()}
>
                Confirm Order
              </Button> */}
           <ConfirmOrder></ConfirmOrder>

            </div>
            <div class=" col-md-1 col-lg-1"></div>
          </div>

        </div>)}
      </div>
      </Modal></>

  );
};