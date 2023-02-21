import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import useFetchItemCost from "../hooks/useFetchItemCost";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function ItemList() {

  const [itemcosts, setItemCosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemcost, setItemCost] = useState({
    productId: null,
    measurementTypeId: null,
    measurementValueId: null,
    customTypeId: null,
    price: null,
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
    getItemCosts,
  } = useFetchItemCost();

  useEffect(() => {
    if (itemcosts.length == 0) {
      getAllItemCosts();
      setLoading(false)
    }
  }, [itemcosts]);

  const getAllItemCosts = async () => {
    const response = await getItemCosts();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'ItemCosts Record Fetch Succefully.'
      })

      var arr = [];
      for (var key in response.payload) {
        arr.push(response.payload[key]);
      }

      setItemCosts(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ItemCost Fetch Failed.'
      })
    }
  };

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
       






        {loading && <div>A moment please...</div>}
        {itemcosts && (<div>


        </div>)}
      </div>
    </>
  );
};
