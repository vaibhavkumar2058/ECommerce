import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import useFetchCart from "../hooks/useFetchCart";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";


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
  const Placetoorder = () => {
    window.location.href = "/orderSummaryList";
  }

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  const {
    getCarts,
  } = useFetchCart();

  useEffect(() => {
    if (carts.length == 0) {
      getAllCarts();
      setLoading(false)
    }
  }, [carts]);

  const getAllCarts = async () => {

    const response = await getCarts();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'Carts Record Fetch Succefully.'
      })

      const dataFormatter = (rawData) => {
        const curedData = {};
        curedData.productName = rawData?.product?.productName;
        curedData.description = rawData?.product?.description;
        curedData.quantity = rawData?.quantity;
        curedData.cost = rawData?.cost;
        return curedData;
      }
      var arr = [];
      for (var key in response.payload) {
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
      <div className="m-t-40">
        {loading && <div>A moment please...</div>}
        {carts && (<div>
          <div class="row">
            <div class="col-md-3 col-lg-3"></div>
            <div class="col-md-6 col-lg-6"><b><h1>Shopping Cart</h1></b></div>
            <div class="col-md-3 col-lg-3"><h6>Subtotal 5 items:200</h6></div>
          </div>
          <div class="row">

            <div class="col-md-2 col-lg-2">
            </div>
            <div class="col-md-3 col-lg-3"><b>Product Name </b></div>
            <div class="col-md-2 col-lg-2"><b>Description</b></div>
            <div class="col-md-1 col-lg-1"><b>Cost</b></div>
            <div class="col-md-1 col-lg-1"><b>Quantity</b></div>
            <div class="col-md-1 col-lg-1"><b>Total</b></div>

          </div>
          {carts.map((cart) =>
            <div>

              <div class="row">

                <div class="col-md-2 col-lg-2"><img width="50" src="data:image/png;base64,
          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"
                  height="50"></img>
                </div>
                <div class="col-md-3 col-lg-3">{cart.productName} </div>
                <div class="col-md-2 col-lg-2">{cart.description}</div>
                <div class="col-md-1 col-lg-1">{cart.cost}</div>
                <div class="col-md-1 col-lg-1">{cart.quantity}</div>
                <div class="col-md-1 col-lg-1">{cart.quantity * cart.cost}</div>
                <div class="col-md-1 col-lg-1"><Button variant="primary">Delete</Button></div>
              </div>
            </div>
          )}
          <div class="row">
            <div class="col-md-8 col-lg-8"></div>
            <div class="col-md-4 col-lg-4"><Button variant="secondary"
             onClick={() => Placetoorder()}
            >
              Place to order
            
            </Button></div>
            
            <div class="col-md-2 col-lg-2"></div>
          </div>
        </div>)}
      </div>
    </>
  );
};
