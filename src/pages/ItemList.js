import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import useFetchItemCost from "../hooks/useFetchItemCost";
import OrderSummaryModel from "../components/OrderSummaryModel";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetchCart from "../hooks/useFetchCart";
import useFetchMeasurementValue from "../hooks/useFetchMeasurementValue";
import useFetchMeasurementType from "../hooks/useFetchMeasurementType";
import { Dropdown } from 'semantic-ui-react'
import Form from "react-bootstrap/Form";



export default function ItemList() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [measurementValueList, setMeasurementValueList] = useState([]);
  const [measurementTypeList, setMeasurementTypeList] = useState([]);
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
  const { 
    getMeasurementValues,
  } = useFetchMeasurementValue();
  const { 
    getMeasurementTypes,
  } = useFetchMeasurementType();


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
      getMeasurementValueList();
    getMeasurementTypeList();
      getAllItemCosts();
      setLoading(false)
    }
  }, [itemcosts]);

  const [measurementValueOptions, setMeasurementValueOptions] = useState(measurementValueList.map((measurementValue,item) =>(
    {
    key: item,
    text: measurementValue.Value,
    value: measurementValue.measurementValueId,
  })).filter((item) => item));
  const [measurementTypeOptions, setMeasurementTypeOptions] = useState(measurementTypeList.map((measurementType,item) =>(
    {
    key: item,
    text: measurementType.name,
    value: measurementType.measurementTypeId,
  })).filter((item) => item));

  useEffect(() => { 
    setMeasurementValueOptions(measurementValueList.map((measurementValue,item) =>(
      {
      key: item,
      text: measurementValue.value,
      value: measurementValue.measurementValueId,
    })).filter((item) => item));
    }, [measurementValueList]);

    useEffect(() => { 
      setMeasurementTypeOptions(measurementTypeList.map((measurementType,item) =>(
        {
        key: item,
        text: measurementType.name,
        value: measurementType.measurementTypeId,
      })).filter((item) => item));
      }, [measurementTypeList]);

      const dropdownHandler = (event,{name,value}) => {
        setItemCost((currentItemCost) => ({...currentItemCost, [name]: value}));
        
      }
      const getMeasurementValueList = async () => {
        const response = await getMeasurementValues();
        if (response.payload.title == "Success") {
    
          var arr = [];
          for (var key in response.payload) {
            arr.push(response.payload[key]);
          }
          setMeasurementValueList(arr);
        }
        else {
          setMessageStatus({
            mode: 'danger',
            message: 'State Fetch Failed.'
          })
        }
      };
      const getMeasurementTypeList = async () => {
        const response = await getMeasurementTypes();
        if (response.payload.title == "Success") {
    
          var arr = [];
          for (var key in response.payload) {
            arr.push(response.payload[key]);
          }
          setMeasurementTypeList(arr);
        }
        else {
          setMessageStatus({
            mode: 'danger',
            message: 'State Fetch Failed.'
          })
        }
      };


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
  const quantity = [
    
    { key: '1', value: '1',  text: '1' },
    { key: '2', value: '2',  text: '2' },
    { key: '3', value: '3',  text: '3' },
    { key: '4', value: '4',  text: '4' },
    { key: '5', value: '5',  text: '5' },
    { key: '6', value: '6',  text: '6' },
  ]
  

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
            <div className="col-md-3">
              
              <div > {item?.productName}</div>
              <div>
                <img className="product-view" src={item.productImage}>
                </img>
              </div>
              <div > {item?.description}</div>
              <div>
              <div className="measurement">
              <Form>
                
          <Form.Group className="mb-3" controlId="MeasurementValueId">
            <Dropdown
              name="measurementValueId"
              fluid
              search
              selection
              options={measurementValueOptions}
              value={itemcosts?.measurementValueId}
              onChange={dropdownHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="measurementTypeId">
            <Dropdown
              name="measurementTypeId"
              fluid
              search
              selection
              options={measurementTypeOptions}
              value={itemcosts?.measurementTypeId}
              onChange={dropdownHandler}
            />
          </Form.Group>
          
          </Form>
          </div>
         
         
                <div className="quantity">
                  <label for="quantity">Quantity:</label>
                  <Dropdown
              name="quantity"
              fluid
              search
              selection
              options={quantity}
              onChange={dropdownHandler}
            />
                </div>
                <div className="row">
            <div className="col-md-6">
                <Button variant="secondary"
                  onClick={() => addToCart(item)}
                >
                  Add To Cart
                </Button>
                </div>
                <div className="col-md-6">
                <Button variant="secondary" >
                  Order
                </Button>

              </div>
            </div>
            </div>
            </div>
          )}


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
