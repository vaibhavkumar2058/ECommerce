import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import useFetchCart from "../hooks/useFetchCart";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ItemList() {
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
        debugger
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
      <div className="row">
        {loading && <div>A moment please...</div>}
        {cart && (<div className="row">
          <div class="row">
            <div class="col-md-3 col-lg-3"></div>
            <div class="col-md-6 col-lg-6"><b><h1>Shopping Cart</h1></b></div>
          </div>

        </div>)}
      </div>
    </>
  );
};
