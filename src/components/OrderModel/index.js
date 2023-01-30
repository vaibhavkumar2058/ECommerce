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
}) {
  const [newOrder, setNewOrder] = useState({
    categoryId : "null",
    productId : "null",
    orderDate : "",
    orderPrice : "",
    location : "",
    customerNumber : "",
    orderTrackingId : "null",
    email:"null",
    description : "",
  });

  const [fileSelected, setFileSelected] = useState();

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

  const saveFileSelected= (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const saveHandler = async () => {
    newOrder.file = fileSelected;
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
    !newOrder?.categoryId || !newOrder?.productId || !newOrder?.orderDate || !newOrder?.orderPrice || !newOrder?.location  || !newOrder?.customerNumber  || !newOrder?.orderTrackingId  || !newOrder?.description|| !newOrder?.email;
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
            <Form.Label>OrderId</Form.Label>
            <Form.Control
              type="text"
              name="orderId"
              placeholder="orderId"
              value={newOrder?.orderId}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="categoryId">
            <Form.Label>CategoryId</Form.Label>
            <Form.Control
              type="text"
              name="categoryId"
              placeholder="categoryId"
              value={newOrder?.categoryId}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="description"
              value={newOrder?.description}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="productId">
            <Form.Label>ProductId</Form.Label>
            <Form.Control
              type="text"
              name="productId"
              placeholder="productId"
              value={newOrder?.productId}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="orderDate">
            <Form.Label>OrderDate</Form.Label>
            <Form.Control
              type="text"
              name="orderDate"
              placeholder="orderDate"
              value={newOrder?.orderDate}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="orderPrice">
            <Form.Label>OrderPrice</Form.Label>
            <Form.Control
              type="text"
              name="orderPrice"
              placeholder="orderPrice"
              value={newOrder?.orderPrice}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              placeholder="location"
              value={newOrder?.location}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="customerNumber">
            <Form.Label>CustomerNumber</Form.Label>
            <Form.Control
              type="text"
              name="customerNumber"
              placeholder="customerNumber"
              value={newOrder?.customerNumber}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="orderTrackingId">
            <Form.Label>OrderTrackingId</Form.Label>
            <Form.Control
              type="text"
              name="orderTrackingId"
              placeholder="orderTrackingId"
              value={newOrder?.orderTrackingId}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="email"
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
};

