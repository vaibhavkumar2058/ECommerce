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
    ProductId: "",
    MeasurementTypeId: "",
    MeasurementValueId: "",
    CustomTypeId: null,
    Price:null,
    description: "",
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
    setNewItemCost({
      ...newItemCost,
      [e.target.name]: e.target.value,
    });
  };

  const saveFileSelected= (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const saveHandler = async () => {
    newItemCost.file = fileSelected;
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
      debugger;
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
      !newItemCost?.ProductId || !newItemCost?.MeasurementTypeId || !newItemCost?.MeasurementValueId || !newItemCost?.CustomTypeId || !newItemCost?.Price || !newItemCost?.description;
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
            <Form.Label>ItemCost</Form.Label>
            <Form.Control
              type="text"
              name="ProductId"
              placeholder="Enter ItemCost"
              value={newItemCost?.ProductId}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="mobile">
            <Form.Label>MeasurementTypeId</Form.Label>
            <Form.Control
              type="text"
              name="MeasurementTypeId"
              placeholder="MeasurementTypeId"
              value={newItemCost?.MeasurementTypeId}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>MeasurementValueId</Form.Label>
            <Form.Control
              type="text"
              name="MeasurementValueId"
              placeholder="MeasurementValueId"
              value={newItemCost?.MeasurementValueId}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="itemCostTypeId">
            <Form.Label>CustomTypeId</Form.Label>
            <Form.Control
              type="text"
              name="CustomTypeId"
              placeholder="CustomTypeId"
              value={newItemCost?.CustomTypeId}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="itemCostTypeId">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="Price"
              placeholder="Price"
              value={newItemCost?.Price}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newItemCost?.description}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group>
          <input type="file" className="custom-file-label" onChange={saveFileSelected} />
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

