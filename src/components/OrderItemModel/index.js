import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function OrderItemModel({
  onAddOrderItem,
  onUpdateOrderItem,
  onDeleteOrderItem,
  isEdit,
  isDelete,
  onGetOrderItem,
  id,
  onClose,
  orderItemData,
}) 
{
  const [newOrderItem, setNewOrderItem] = useState({
    productId:null,
    orderId:null,
    cost:"",
    quantity:"",
    // recordStatusId:null,

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
    setNewOrderItem({
      ...newOrderItem,
      [e.target.name]: e.target.value,
    });
  };

  

  const saveHandler = async () => {
    newOrderItem.file = fileSelected;
    if (isEdit) {
      debugger;
      const response = await onUpdateOrderItem(id, newOrderItem);
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
      const response = await onAddOrderItem(newOrderItem);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'OrderItem Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'OrderItem Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteOrderItem(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'OrderItem Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewOrderItem(orderItemData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
       !newOrderItem?.productId  || !newOrderItem?.orderId || !newOrderItem?.cost || !newOrderItem?.quantity ; 
    setSaveDisabled(isEnable);
  }, [newOrderItem]);

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
            controlId="formOrderItem"
          >
            <Form.Label>ProductId</Form.Label>
            <Form.Control
              type="text"
              name="productId"
              placeholder="Enter ProductId"
              value={newOrderItem?.productId}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="OrderId">
            <Form.Label>OrderId</Form.Label>
            <Form.Control
              type="text"
              name="orderId"
              placeholder="OrderId"
              value={newOrderItem?.orderId}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="Cost">
            <Form.Label>Cost</Form.Label>
            <Form.Control
              type="text"
              name="cost"
              placeholder="Cost"
              value={newOrderItem?.cost}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={newOrderItem?.quantity}
              onChange={changeHandler}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="RecordStatusId">
            <Form.Label>RecordStatusId</Form.Label>
            <Form.Control
              type="text"
              name="recordStatusId"
              placeholder="RecordStatusId"
              value={newOrderItem?.recordStatusId}
              onChange={changeHandler}
            />
          </Form.Group> */}
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

OrderItemModel.propTypes = {
  /**
   * Callback function for Add OrderItem
   */
  onAddOrderItem: PropTypes.func,
  /**
   * Callback function for Update OrderItem
   */
  onUpdateOrderItem: PropTypes.func,
  /**
   * Callback function for Delete OrderItem
   */
  onDeleteOrderItem: PropTypes.func,
  /**
   * Callback function for Get OrderItem
   */
  onGetOrderItem: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get OrderItem
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * orderItemData for object type
 */
  orderItemData: PropTypes.any,
};

OrderItemModel.defaultProps = {
  onAddOrderItem: null,
  onUpdateOrderItem: null,
  onDeleteOrderItem: null,
  onGetOrderItem: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  orderItemData: null,
};

