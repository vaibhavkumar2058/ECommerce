import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

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
}) {
  const [newOrder, setNewOrder] = useState({
    categoryTypeId : null,
    productId : null,
    orderPrice : null,
    location : "",
    customerNumber : null,
    email:"",
    description : "",
  });

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  const [saveDisabled, setSaveDisabled] = useState(true);
  const [buttonType, setButtonType] = useState("Save");

  const styles = {
    stFormContainer: css`
      width: 400px !important;
    `,
    stFormControl: css``,
  };

  const changeHandler = (e) => {
    setNewOrder({
      ...newOrder,
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
      debugger;
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
  useEffect(() => {
    if (isEdit) {
      setNewOrder(orderData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
    !newOrder?.categoryTypeId || !newOrder?.productId|| !newOrder?.orderPrice || !newOrder?.location  || !newOrder?.customerNumber    || !newOrder?.description|| !newOrder?.email;
    setSaveDisabled(isEnable);
  }, [newOrder]);

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
          <Form.Group
            className={styles.stFormContainer}
            controlId="formOrder"
          >
            
          </Form.Group>

          <Form.Group className="mb-3" controlId="categoryTypeId">
            <Form.Label>CategoryTypeId</Form.Label>
            <Form.Control
              type="text"
              name="categoryTypeId"
              placeholder="CategoryTypeId"
              value={newOrder?.categoryTypeId}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newOrder?.description}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="productId">
            <Form.Label>ProductId</Form.Label>
            <Form.Control
              type="text"
              name="productId"
              placeholder="ProductId"
              value={newOrder?.productId}
              onChange={changeHandler}
            />
          </Form.Group>


          {/* <Form.Group className="mb-3" controlId="orderDate">
            <Form.Label>OrderDate</Form.Label>
            <Form.Control
              type="text"
              name="orderDate"
              placeholder="OrderDate"
              value={newOrder?.orderDate}
              onChange={changeHandler}
            />
          </Form.Group> */}


          <Form.Group className="mb-3" controlId="orderPrice">
            <Form.Label>OrderPrice</Form.Label>
            <Form.Control
              type="text"
              name="orderPrice"
              placeholder="OrderPrice"
              value={newOrder?.orderPrice}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              placeholder="Location"
              value={newOrder?.location}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="customerNumber">
            <Form.Label>CustomerNumber</Form.Label>
            <Form.Control
              type="text"
              name="customerNumber"
              placeholder="CustomerNumber"
              value={newOrder?.customerNumber}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Email"
              value={newOrder?.email}
              onChange={changeHandler}
            />
          </Form.Group>
          
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
  onPlaceOrder:null,
};

