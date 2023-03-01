import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';


export default function OrderStatusModel({
  onAddOrderStatus,
  onUpdateOrderStatus,
  onDeleteOrderStatus,
  isEdit,
  isDelete,
  onGetOrderStatus,
  id,
  onClose,
  orderStatusData,
  //orderStatuss,


}) {
  const [newOrderStatus, setNewOrderStatus] = useState({
    orderStatusName:"",
    description:"",
    recordStatusId:null,
    
  });
  
  // const [orderStatusOptions, setOrderStatusOptions] = useState(orderStatuss.map((orderStatus, i) => (
  //   {
  //     key: i,
  //     label: orderStatus.actionName,
  //     value: orderStatus.orderStatusId,
  //   })).filter((item) => item));

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
    setNewOrderStatus({
      ...newOrderStatus,
      [e.target.name]: e.target.value,
    });
  };
  const selectChangeHandler = (e) => {
    setNewOrderStatus({
      ...newOrderStatus,
      "orderStatusId": e.value,
    });
  };

  

  const saveHandler = async () => {
    newOrderStatus.file = fileSelected;
    if (isEdit) {
      const response = await onUpdateOrderStatus(id, newOrderStatus);
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
      const response = await onAddOrderStatus(newOrderStatus);
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
    const response = await onDeleteOrderStatus(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'OrderStatus Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewOrderStatus(orderStatusData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable = !newOrderStatus?.orderStatusName || !newOrderStatus?.recordStatusId  || !newOrderStatus?.description ;
    setSaveDisabled(isEnable);
  }, [newOrderStatus]);

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
            controlId="formOrderStatus"
          >
            <Form.Label>OrderStatusName</Form.Label>
            <Form.Control
              type="text"
              name="orderStatusName"
              placeholder="OrderStatusName"
              value={newOrderStatus?.orderStatusName}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="state">
            <Form.Label>RecordStatusId</Form.Label>
            <Form.Control
              type="text"
              name="recordStatusId"
              placeholder="RecordStatusId"
              value={newOrderStatus?.recordStatusId}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newOrderStatus?.description}
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

OrderStatusModel.propTypes = {
  /**
   * Callback function for Add OrderStatus
   */
  onAddOrderStatus: PropTypes.func,
  /**
   * Callback function for Update OrderStatus
   */
  onUpdateOrderStatus: PropTypes.func,
  /**
   * Callback function for Delete OrderStatus
   */
  onDeleteOrderStatus: PropTypes.func,
  /**
   * Callback function for Get OrderStatus
   */
  onGetOrderStatus: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get OrderStatus
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * orderTrackingData for object type
 */
  orderStatusData: PropTypes.any,
};

OrderStatusModel.defaultProps = {
  onAddOrderStatus: null,
  onUpdateOrderStatus: null,
  onDeleteOrderStatus: null,
  onGetOrderStatus: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  orderStatusData: null,
};

