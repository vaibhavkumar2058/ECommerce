import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
//import OrderTracking from "../../pages/OrderTracking";

export default function OrderTrackingModel({
  onAddOrderTracking,
  onUpdateOrderTracking,
  onDeleteOrderTracking,
  isEdit,
  isDelete,
  onGetOrderTracking,
  id,
  onClose,
  orderTrackingData,
  //orderStatuss,
  recordStatusList = [],

}) {
  const [newOrderTracking, setNewOrderTracking] = useState({
    orderId:null,
    orderStatusId:null,
    description:"",
    recordStatusId:null,
    
  });
  
  // const [orderStatusOptions, setOrderStatusOptions] = useState(orderStatuss.map((orderStatus, i) => (
  //   {
  //     key: i,
  //     label: orderStatus.actionName,
  //     value: orderStatus.orderStatusId,
  //   })).filter((item) => item));

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
    setNewOrderTracking({
      ...newOrderTracking,
      [e.target.name]: e.target.value,
    });
  };
  const selectChangeHandler = (e) => {
    setNewOrderTracking({
      ...newOrderTracking,
      "orderTrackingId": e.value,
    });
  };

  

  const saveHandler = async () => {
    newOrderTracking.file = fileSelected;
    if (isEdit) {
      const response = await onUpdateOrderTracking(id, newOrderTracking);
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
      const response = await onAddOrderTracking(newOrderTracking);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'OrderTracking Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'OrderTracking Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteOrderTracking(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'OrderTracking Delete Failed.'
      })
    }
  };
  const dropdownHandler = (event,{value}) => {
    setNewOrderTracking((currentOrderTracking) => ({...currentOrderTracking, recordStatusId: value}));
  }


  useEffect(() => {
    if (isEdit) {
      setNewOrderTracking(orderTrackingData);
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
    const isEnable = !newOrderTracking?.orderId || !newOrderTracking?.orderStatusId  || !newOrderTracking?.description ;
    setSaveDisabled(isEnable);
  }, [newOrderTracking]);

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
            controlId="formOrderTracking"
          >
            <Form.Label>OrderId</Form.Label>
            <Form.Control
              type="text"
              name="orderId"
              placeholder="OrderId"
              value={newOrderTracking?.orderId}
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
              value = {newOrderTracking?.recordStatusId}
              onChange={dropdownHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="state">
            <Form.Label>OrderStatusId</Form.Label>
            <Form.Control
              type="text"
              name="orderStatusId"
              placeholder="OrderStatusId"
              value={newOrderTracking?.orderStatusId}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newOrderTracking?.description}
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

OrderTrackingModel.propTypes = {
  /**
   * Callback function for Add OrderTracking
   */
  onAddOrderTracking: PropTypes.func,
  /**
   * Callback function for Update OrderTracking
   */
  onUpdateOrderTracking: PropTypes.func,
  /**
   * Callback function for Delete OrderTracking
   */
  onDeleteOrderTracking: PropTypes.func,
  /**
   * Callback function for Get OrderTracking
   */
  onGetOrderTracking: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get OrderTracking
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * orderTrackingData for object type
 */
  orderTrackingData: PropTypes.any,
   /**
 * recordStatusData for object type
 */
   recordStatusList: PropTypes.any,
};


OrderTrackingModel.defaultProps = {
  onAddOrderTracking: null,
  onUpdateOrderTracking: null,
  onDeleteOrderTracking: null,
  onGetOrderTracking: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  orderTrackingData: null,
  recordStatusList:null,

};