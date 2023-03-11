import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
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
  recordStatusList = [],
}) {
  const [newOrder, setNewOrder] = useState({
    orderItemId : null,
    resourcesId:null,
    orderDate:null,
    description : "",
    recordStatusId:null,

  });

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });
  const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatusList.map((recordStatus,item) =>(
    {
    key: item,
    text: recordStatus.actionName,
    value: recordStatus.recordStatusId,
  })).filter((item) => item));


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

const dropdownHandler = (event,{value}) => {
  setNewOrder((currentOrder) => ({...currentOrder, recordStatusId: value}));
}
  useEffect(() => {
    if (isEdit) {
      setNewOrder(orderData);
    }
  }, []);

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
    !newOrder?.orderItemId || !newOrder?.resourcesId || !newOrder?.orderDate || !newOrder?.description|| !newOrder?.recordStatusId;
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


          <Form.Group className="mb-3" controlId="orderItemId">
            <Form.Label>OrderItemId</Form.Label>
            <Form.Control
              type="text"
              name="orderItemId"
              placeholder="OrderItemId"
              value={newOrder?.orderItemId}
              onChange={changeHandler}
            />
          </Form.Group>


           <Form.Group className="mb-3" controlId="orderDate">
            <Form.Label>OrderDate</Form.Label>
            <Form.Control
              type="text"
              name="orderDate"
              placeholder="OrderDate"
              value={newOrder?.orderDate}
              onChange={changeHandler}
            />
          </Form.Group> 
          <Form.Group className="mb-3" controlId="resourcesId">
            <Form.Label>ResourcesId</Form.Label>
            <Form.Control
              type="text"
              name="resourcesId"
              placeholder="ResourcesId"
              value={newOrder?.resourcesId}
              onChange={changeHandler}
            />
          </Form.Group> 


          <Form.Group className="mb-3" controlId="recordStatus">
            <Form.Label>RecordStatus</Form.Label>
            <Dropdown
              name="actionName"
              placeholder='Select Action'
              fluid
              search
              selection
              options={recordStatusOptions}
              value = {newOrder?.recordStatusId}
              onChange={dropdownHandler}
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
 /**
 * recordStatusData for object type
 */
 recordStatusList: PropTypes.any,
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
  recordStatusList:null,
};

