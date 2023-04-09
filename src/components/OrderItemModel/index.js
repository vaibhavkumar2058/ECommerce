import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react';
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
  recordStatusList = [],
  productList = [],
}) 
{
  const [newOrderItem, setNewOrderItem] = useState({
    productId:null,
    orderId:null,
    cost:"",
    quantity:"",
     recordStatusId:null,

 });
 
const [productOptions, setProductOptions] = useState(productList.map((product,item) =>(
  {
  key: item,
  text: product.productName,
  value: product.productId,
})).filter((item) => item));
const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatusList.map((recordStatus,item) =>(
  {
  key: item,
  text: recordStatus.actionName,
  value: recordStatus.recordStatusId,
})).filter((item) => item));

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
  const dropdownHandler = (event,{name,value}) => {
    setNewOrderItem((currentOrderItem) => ({...currentOrderItem, [name] :value}));
  }

  useEffect(() => {
    if (isEdit) {
      setNewOrderItem(orderItemData);
    }
  }, []);

  useEffect(() => { 
    setProductOptions(productList.map((product,item) =>(
      {
      key: item,
      text: product.productName,
    value: product.productId,
    })).filter((item) => item));
    }, [productList]);

  useEffect(() => { 
    setRecordStatusOptions(recordStatusList.map((recordStatus,item) =>(
      {
      key: item,
      text: recordStatus.actionName,
    value: recordStatus.recordStatusId,
    })).filter((item) => item));
    }, [recordStatusList]);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
       !newOrderItem?.productId  
       || !newOrderItem?.orderId 
       || !newOrderItem?.cost 
       || !newOrderItem?.quantity
       || !newOrderItem?.recordStatusId ; 
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
          <div className="row">
            <div className="col-md-6">
           <Form.Group className="mb-3" controlId="mobile">
            <Form.Label>Product<span className="required">*</span></Form.Label>
            <Dropdown
              name="productId"
              placeholder='Select product'
              fluid
              search
              selection
              options={productOptions}
              value = {newOrderItem?.productId}
              onChange={dropdownHandler}
            />
            </Form.Group>
            </div>
            <div className="col-md-6">
          <Form.Group className="mb-3" controlId="OrderId">
            <Form.Label>Order<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="orderId"
              placeholder=" select Order"
              value={newOrderItem?.orderId}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          </div>
          <div className="row">
            <div className="col-md-6">

          <Form.Group className="mb-3" controlId="Cost">
            <Form.Label>Cost<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="cost"
              placeholder="Cost"
              value={newOrderItem?.cost}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="Quantity">
            <Form.Label>Quantity<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={newOrderItem?.quantity}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          </div>
          <div className="row">
            <div className="col-md-6">
          <Form.Group className="mb-3" controlId="mobile">
            <Form.Label>Status<span className="required">*</span></Form.Label>
            <Dropdown
              name="recordStatusId"
              placeholder='Select Status'
              fluid
              search
              selection
              options={recordStatusOptions}
              value = {newOrderItem?.recordStatusId}
              onChange={dropdownHandler}
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
  /**
 * recordStatusList for object type
 */
recordStatusList: PropTypes.any,
/**
 * productList for object type
 */
productList: PropTypes.any,
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
  recordStatusList:null,
  productList:null,
};

