import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function TaxModel({
  onAddTax,
  onUpdateTax,
  onDeleteTax,
  isEdit,
  isDelete,
  onGetTax,
  id,
  onClose,
  taxData,
}) 
{
  const [newTax, setNewTax] = useState({
    productId:null,
    taxValue:"",
    taxDescription:"",

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
    setNewTax({
      ...newTax,
      [e.target.name]: e.target.value,
    });
  };

  

  const saveHandler = async () => {
    newTax.file = fileSelected;
    if (isEdit) {
      const response = await onUpdateTax(id, newTax);
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
      const response = await onAddTax(newTax);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Tax Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Tax Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteTax(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Tax Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewTax(taxData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
       !newTax?.productId  || !newTax?.taxValue || !newTax?.taxDescription; 
    setSaveDisabled(isEnable);
  }, [newTax]);

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
            controlId="formTax"
          >
            <Form.Label>ProductId</Form.Label>
            <Form.Control
              type="text"
              name="productId"
              placeholder="Enter ProductId"
              value={newTax?.productId}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="TaxValue">
            <Form.Label>TaxValue</Form.Label>
            <Form.Control
              type="text"
              name="taxValue"
              placeholder="TaxValue"
              value={newTax?.taxValue}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="TaxDescription">
            <Form.Label>TaxDescription</Form.Label>
            <Form.Control
              type="text"
              name="taxDescription"
              placeholder="TaxDescription"
              value={newTax?.taxDescription}
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

TaxModel.propTypes = {
  /**
   * Callback function for Add Tax
   */
  onAddTax: PropTypes.func,
  /**
   * Callback function for Update Tax
   */
  onUpdateTax: PropTypes.func,
  /**
   * Callback function for Delete Tax
   */
  onDeleteTax: PropTypes.func,
  /**
   * Callback function for Get Tax
   */
  onGetTax: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Tax
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * taxData for object type
 */
  taxData: PropTypes.any,
};

TaxModel.defaultProps = {
  onAddTax: null,
  onUpdateTax: null,
  onDeleteTax: null,
  onGetTax: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  taxData: null,
};

