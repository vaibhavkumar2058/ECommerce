import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import useFetchItemCost from "../hooks/useFetchItemCost";
import OrderSummaryModel from "../components/OrderSummaryModel";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetchCart from "../hooks/useFetchCart";

export default function ItemList() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [itemcosts, setItemCosts] = useState([]);
  const [carts, setCarts] = useState([]);
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

  const handleClose = () => {
    setShow(false);
  };

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });
  const userInfo = JSON.parse(localStorage.getItem('loggedIn'));
  const [newCart, setNewCart] = useState({
    resourcesId: userInfo.resourcesId,
    productId: null,
    cost: null,
    quantity: "1",
    description: null,
    recordStatusId: 1,
  });

  const addToCart = async (item) => {
    newCart.resourcesId = userInfo.resourcesId;
    newCart.productId = item.productId;
    newCart.description = item.description;
    newCart.cost = item.price.toString();
    const response = await addCart(newCart);
    if (response.payload.title == "Success") {
      debugger
      setMessageStatus({
        mode: 'success',
        message: 'Cart Record Saved Successfully.'
      })
      alert("Add To Cart Successfully.");
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Cart Save Failed.'
      })
    }
  };

  const {
    getItemCosts,
  } = useFetchItemCost();
  const {
    addCart,
  } = useFetchCart();

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

      const dataFormatter = (rawData) => {
        const curedData = {};
        debugger
        curedData.productId = rawData?.productId;
        curedData.productName = rawData?.product?.productName;
        curedData.description = rawData?.product?.description;
        curedData.categoryTypeId = rawData?.product?.categoryTypeId;
        curedData.fileName = rawData?.product?.productAttachments?.files?.fileName;
        curedData.productImage = 'data:' + rawData?.product?.productAttachments?.files.fileMimeType + ';base64,' + rawData?.product?.productAttachments?.files?.base64;
        curedData.filesId = rawData?.product?.productAttachments?.files?.filesId ? rawData?.product?.productAttachments?.files?.filesId : 0;
        curedData.recordStatusId = rawData?.recordStatusId;
        return curedData;
      }

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
          arr.push(dataFormatter(response.payload[key]));
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
      <div className="row">
        {loading && <div>A moment please...</div>}
        {itemcosts && (<div className="row">
          <div class="row">
            <div class="col-md-12 col-lg-12 m-center">
              <h1>
                <span class="mp-heading">
                  Products
                </span>
              </h1>
            </div>
          </div>

          {itemcosts.map((item) =>
            <div className="col-md-2">
              <div>
                <img className="product-view" src={item.productImage}>
                </img>
              </div>
              <div > {item?.productName}</div>
              <div > {item?.description}</div>
              <div>
                <select>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
                <select>
                  <option value="GM">GM</option>
                  <option value="ML">ML</option>
                </select>
                <div>
                  <label for="quantity">Quantity:</label>
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <Button variant="secondary"
                  onClick={() => addToCart(item)}
                >
                  Add To Cart
                </Button>
                <Button variant="secondary" >
                  Order
                </Button>

              </div>
            </div>
          )};


          <div className="model_box">
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>View Order Summary</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <OrderSummaryModel
                />
              </Modal.Body>

            </Modal>
            {/* Model Box Finsihs */}
          </div>


        </div>)}
      </div>
    </>
  );
};
