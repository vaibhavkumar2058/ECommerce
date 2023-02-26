import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function ItemCostModel({
  onAddItemCost,
  onUpdateItemCost,
  onDeleteItemCost,
  isEdit,
  isDelete,
  onGetItemCost,
  id,
  onClose,
  itemCostData,
}) {
  const [newItemCost, setNewItemCost] = useState({
    productId: null,
    measurementTypeId: null,
    measurementValueId: null,
    customTypeId: null,
    price:null,
    description: "",
    recordStatusId:null,
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
    setNewItemCost({
      ...newItemCost,
      [e.target.name]: e.target.value,
    });
  };

 
  const saveHandler = async () => {
   
    if (isEdit) {
      const response = await onUpdateItemCost(id, newItemCost);
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
      const response = await onAddItemCost(newItemCost);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'ItemCost Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'ItemCost Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteItemCost(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ItemCost Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewItemCost(itemCostData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
      !newItemCost?.productId || !newItemCost?.measurementTypeId || !newItemCost?.measurementValueId || !newItemCost?.customTypeId || !newItemCost?.price || !newItemCost?.description|| !newItemCost?.recordStatusId;
    setSaveDisabled(isEnable);
  }, [newItemCost]);

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
            controlId="formItemCost"
          >
            <Form.Label>ProductId</Form.Label>
            <Form.Control
              type="text"
              name="productId"
              placeholder="ProductId"
              value={newItemCost?.productId}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="measurementTypeId">
            <Form.Label>MeasurementTypeId</Form.Label>
            <Form.Control
              type="text"
              name="measurementTypeId"
              placeholder="MeasurementTypeId"
              value={newItemCost?.measurementTypeId}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="MeasurementValueId">
            <Form.Label>MeasurementValueId</Form.Label>
            <Form.Control
              type="text"
              name="measurementValueId"
              placeholder="MeasurementValueId"
              value={newItemCost?.measurementValueId}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="customTypeId">
            <Form.Label>CustomTypeId</Form.Label>
            <Form.Control
              type="text"
              name="customTypeId"
              placeholder="CustomTypeId"
              value={newItemCost?.customTypeId}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              placeholder="Price"
              value={newItemCost?.price}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newItemCost?.description}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="recordStatusId">
            <Form.Label>RecordStatusId</Form.Label>
            <Form.Control
              type="text"
              name="recordStatusId"
              placeholder="RecordStatusId"
              value={newItemCost?.recordStatusId}
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

ItemCostModel.propTypes = {
  /**
   * Callback function for Add ItemCost
   */
  onAddItemCost: PropTypes.func,
  /**
   * Callback function for Update ItemCost
   */
  onUpdateItemCost: PropTypes.func,
  /**
   * Callback function for Delete ItemCost
   */
  onDeleteItemCost: PropTypes.func,
  /**
   * Callback function for Get ItemCost
   */
  onGetItemCost: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get ItemCost
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * itemCostData for object type
 */
  itemCostData: PropTypes.any,
};

ItemCostModel.defaultProps = {
  onAddItemCost: null,
  onUpdateItemCost: null,
  onDeleteItemCost: null,
  onGetItemCost: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  itemCostData: null,
};

