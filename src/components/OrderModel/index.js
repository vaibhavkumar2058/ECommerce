import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import useFetchOrders from "../../hooks/useFetchOrder";

export default function OrderModel({
  onAddOrder,
  onUpdateOrder,
  onDeleteOrder,
  isEdit,
  isDelete,
  onGetOrder,
  id,
  onClose,
  orderData,
  onPlaceOrder,
  recordStatusList = [],
  categoryTypeList = [],
  productList = [],
  measurementTypeList = [],
  measurementValueList = [],
}) {
  
  const userInfo = JSON.parse(localStorage.getItem('loggedIn'));

  const [newOrder, setNewOrder] = useState({
    resourcesId: userInfo.resourcesId,
    orderItems: [],
    description: "Test",
  });

  const [placeOrder, setPlaceOrder] = useState({
    productId: null,
    cost: null,
    quantity: null,
    description: "",
  });

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatusList.map((recordStatus, item) => (
    {
      key: item,
      text: recordStatus.actionName,
      value: recordStatus.recordStatusId,
    })).filter((item) => item));

  const [categoryTypeOptions, setCategoryTypeOptions] = useState(categoryTypeList.map((categoryType, item) => (
    {
      key: item,
      text: categoryType.categoryTypeName,
      value: categoryType.categoryTypeId,
    })).filter((item) => item));

  const [productOptions, setProductOptions] = useState(productList.map((product, item) => (
    {
      key: item,
      text: product.productName,
      value: product.productId,
    })).filter((item) => item));

  const [measurementTypeOptions, setMeasurementTypeOptions] = useState(measurementTypeList.map((measurementType, item) => (
    {
      key: item,
      text: measurementType.name,
      value: measurementType.measurementTypeId,
    })).filter((item) => item));

  const [measurementValueOptions, setMeasurementValueOptions] = useState(measurementValueList.map((measurementValue, item) => (
    {
      key: item,
      text: measurementValue.value,
      value: measurementValue.measurementValueId,
    })).filter((item) => item));

  const [saveDisabled, setSaveDisabled] = useState(true);
  const [buttonType, setButtonType] = useState("Place Order");

  const styles = {
    stFormContainer: css`
      width: 400px !important;
    `,
    stFormControl: css``,
  };

  const changeHandler = (e) => {
    setPlaceOrder({
      ...placeOrder,
      [e.target.name]: e.target.value,
    });
  };

  const saveHandler = async () => {
    if (isEdit) {
      const response = await onUpdateOrder(id, newOrder);
      if (response.payload.title == "Success") {
        onClose(true);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Un-Known Error Occured.'
        })
      }
    }
    else {
      newOrder.orderItems.push(placeOrder)
      const response = await onPlaceOrder(newOrder);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Order Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Order Save Failed.'
        })
      }
    }
  };


  const deleteHandler = async () => {
    const response = await onDeleteOrder(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Order Delete Failed.'
      })
    }
  };
  const placeOrderHandler = async () => {
    const response = await onAddOrder(newOrder);
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'Order Record Saved Succefully.'
      })
      onClose(true);
      console.log(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Order Save Failed.'
      })
    }
  };

  const dropdownHandler = (event, { name, value }) => {
    setPlaceOrder((currentPlaceOrder) => ({ ...currentPlaceOrder, [name]: value }));
  }
  useEffect(() => {
    if (isEdit) {
      setNewOrder(orderData);
    }
  }, []);

  useEffect(() => {
    setRecordStatusOptions(recordStatusList.map((recordStatus, item) => (
      {
        key: item,
        text: recordStatus.actionName,
        value: recordStatus.recordStatusId,
      })).filter((item) => item));
  }, [recordStatusList]);
  useEffect(() => {
    setCategoryTypeOptions(categoryTypeList.map((categoryType, item) => (
      {
        key: item,
        text: categoryType.categoryTypeName,
        value: categoryType.categoryTypeId,
      })).filter((item) => item));
  }, [categoryTypeList]);
  useEffect(() => {
    setProductOptions(productList.map((product, item) => (
      {
        key: item,
        text: product.productName,
        value: product.productId,
      })).filter((item) => item));
  }, [productList]);
  useEffect(() => {
    setMeasurementTypeOptions(measurementTypeList.map((measurementType, item) => (
      {
        key: item,
        text: measurementType.name,
        value: measurementType.measurementTypeId,
      })).filter((item) => item));
  }, [measurementTypeList]);
  useEffect(() => {
    setMeasurementValueOptions(measurementValueList.map((measurementValue, item) => (
      {
        key: item,
        text: measurementValue.value,
        value: measurementValue.measurementValueId,
      })).filter((item) => item));
  }, [measurementValueList]);


  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
debugger
    const isEnable =
      !placeOrder?.productId
      || !placeOrder?.cost
      || !placeOrder?.quantity
      || !placeOrder?.measurementTypeId
      || !placeOrder?.measurementValueId
     
    setSaveDisabled(isEnable);
  }, [placeOrder]);

  return (
    <>
      {(messageStatus.message && <Alert key={messageStatus.mode} variant={messageStatus.mode}>
        {messageStatus.message}
      </Alert>)}
      {isDelete && (
        <>
          <Modal.Body>
            <p>Are you sure you want to delete?.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={deleteHandler}>
              Delete
            </Button>
          </Modal.Footer>
        </>
      )}
      {!isDelete && (
        <Form>
          <div className="row">
            <div className="col-md-6">
              <Form.Group
                className={styles.stFormContainer}
                controlId="formOrder"
              >
              </Form.Group>

              <Form.Group className="mb-3" controlId="categoryTypeId">
                <Form.Label>CategoryType<span className="required">*</span></Form.Label>
                <Dropdown
                  name="categoryTypeId"
                  placeholder='Select CategoryType'
                  fluid
                  search
                  selection
                  options={categoryTypeOptions}
                  value={placeOrder?.categoryTypeId}
                  onChange={dropdownHandler}
                />
              </Form.Group>

            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="productId">
                <Form.Label>Product<span className="required">*</span></Form.Label>
                <Dropdown
                  name="productId"
                  placeholder='Select Product'
                  fluid
                  search
                  selection
                  options={productOptions}
                  value={placeOrder?.productId}
                  onChange={dropdownHandler}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="measurementValueId">
                <Form.Label>Measurement Value<span className="required">*</span></Form.Label>
                <Dropdown
                  name="measurementValueId"
                  placeholder="Enter MeasurementValue"
                  fluid
                  search
                  selection
                  options={measurementValueOptions}
                  value={placeOrder?.measurementValueId}
                  onChange={dropdownHandler}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="measurementTypeId">
                <Form.Label>Measurement Type</Form.Label>
                <Dropdown
                  name="measurementTypeId"
                  placeholder="Enter MeasurementType"
                  fluid
                  search
                  selection
                  options={measurementTypeOptions}
                  value={placeOrder?.measurementTypeId}
                  onChange={dropdownHandler}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">

            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="cost"
                  placeholder="Enter Price"
                  value={placeOrder?.cost}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" >
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  name="quantity"
                  placeholder="Enter Quantity"
                  value={placeOrder?.quantity}
                  onChange={changeHandler}
                />
              </Form.Group>

            </div>
          </div>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={saveHandler}
              disabled={saveDisabled}>
              {buttonType}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </>
  );
}

OrderModel.propTypes = {
  /**
   * Callback function for Add Order
   */
  onAddOrder: PropTypes.func,
  /**
   * Callback function for Update Order
   */
  onUpdateOrder: PropTypes.func,
  /**
   * Callback function for Delete Order
   */
  onDeleteOrder: PropTypes.func,
  /**
   * Callback function for Get Order
   */
  onGetOrder: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Order
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * orderData for object type
 */
  orderData: PropTypes.any,

  /**
 * onPlaceOrder for object type
 */
  onPlaceOrder: PropTypes.any,
  /**
  * recordStatusData for object type
  */
  recordStatusList: PropTypes.any,
  /**
  * categoryTypeData for object type
  */
  categoryTypeList: PropTypes.any,
  /**
  * productData for object type
  */
  productTypeList: PropTypes.any,
  /**
  * measurementTypeData for object type
  */
  measurementTypeList: PropTypes.any,
  /**
  * measurementValueData for object type
  */
  measurementValueList: PropTypes.any,
};

OrderModel.defaultProps = {
  onAddOrder: null,
  onUpdateOrder: null,
  onDeleteOrder: null,
  onGetOrder: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  orderData: null,
  onPlaceOrder: null,
  recordStatusList: null,
  categoryTypeList: null,
  productList: null,
  measurementTypeList: null,
  measurementValueList: null,
};

