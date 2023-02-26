import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import useFetchCart from "../hooks/useFetchCart";
import useFetchOrder from "../hooks/useFetchOrder";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function ShoppingList() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({
    ResourceId: null,
    ProductId: null,
    Cost: "",
    Quantity: "",
    description: "",
    recordStatusId: null,
  });
  const [order, setOrder] = useState({
    categoryTypeId:null,
    productId:null,
    orderPrice:null,
    location:"",
    customerNumber:null,
    email:"",
    description:"",
      });
      

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  const {
    placeOrder,
  } = useFetchOrder();

  
  const {
    getCarts,
  } = useFetchCart();

  useEffect(() => {
    if (carts.length == 0) {
      getAllCarts();
      setLoading(false)
    }
  }, [carts]);

  const PlaceOrder = async () => {
   await placeOrder(carts);
  };


  const getAllCarts = async () => {

    const response = await getCarts();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'Carts Record Fetch Succefully.'
      })
      const dataFormatter = (rawData) => {
        const curedData = {};
        curedData.categoryTypeId = rawData?.categoryTypeId;
        curedData.resourcesId = rawData?.resourcesId;
        curedData.location = "IND";
        curedData.email = "email";
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
        arr.push(response.payload[key]);
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
          <div class=" col-md-2 col-lg-2">{cart.categoryTypeId}</div>
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
            <Button variant="secondary"
                  onClick={() => PlaceOrder()}
                >
                  Place Order
                </Button>
               </div>
            <div class=" col-md-1 col-lg-1"></div>
          </div>
       
        </div>)}
      </div>
    </>
  );
};
