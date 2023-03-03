import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function InvoiceModel({
  onAddInvoice,
  onUpdateInvoice,
  onDeleteInvoice,
  isEdit,
  isDelete,
  onGetInvoice,
  id,
  onClose,
  invoiceData,
}) {
  const [newInvoice, setNewInvoice] = useState({
    resourcesId:null,
    orderId:null,
    totalIncludeTax:null,
    total:null,
    description:"",
    recordStatusId:"1"
    //invoiceDate:""
    
    
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
    setNewInvoice({
      ...newInvoice,
      [e.target.name]: e.target.value,
    });
  };

  

  const saveHandler = async () => {
    newInvoice.file = fileSelected;
    if (isEdit) {
      const response = await onUpdateInvoice(id, newInvoice);
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
      const response = await onAddInvoice(newInvoice);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Invoice Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Invoice Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteInvoice(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Invoice Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewInvoice(invoiceData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable = !newInvoice?.resourcesId || !newInvoice?.orderId   || !newInvoice?.totalIncludeTax ||  !newInvoice?.total || !newInvoice?.description;
    setSaveDisabled(isEnable);
  }, [newInvoice]);

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
            controlId="formInvoice"
          >
            <Form.Label>ResourcesId</Form.Label>
            <Form.Control
              type="text"
              name="resourcesId"
              placeholder="ResourcesId"
              value={newInvoice?.resourcesId}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="orderId">
            <Form.Label>OrderId</Form.Label>
            <Form.Control
              type="text"
              name="orderId"
              placeholder="OrderId"
              value={newInvoice?.orderId}
              onChange={changeHandler}
            />
          </Form.Group>


          
          <Form.Group className="mb-3" controlId="totalIncludeTax">
            <Form.Label>TotalIncludeTax</Form.Label>
            <Form.Control
              type="text"
              name="totalIncludeTax"
              placeholder="TotalIncludeTax"
              value={newInvoice?.totalIncludeTax}
              onChange={changeHandler}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="invoiceDate">
            <Form.Label>InvoiceDate</Form.Label>
            <Form.Control
              type="text"
              name="invoiceDate"
              placeholder="InvoiceDate"
              value={newInvoice?.invoiceDate}
              onChange={changeHandler}
            />
          </Form.Group> */}

          
            


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Total</Form.Label>
            <Form.Control
              type="text"
              name="total"
              placeholder="Total"
              value={newInvoice?.total}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newInvoice?.description}
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

InvoiceModel.propTypes = {
  /**
   * Callback function for Add Invoice
   */
  onAddInvoice: PropTypes.func,
  /**
   * Callback function for Update Invoice
   */
  onUpdateInvoice: PropTypes.func,
  /**
   * Callback function for Delete Invoice
   */
  onDeleteInvoice: PropTypes.func,
  /**
   * Callback function for Get Invoice
   */
  onGetInvoice: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Invoice
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * invoiceData for object type
 */
  invoiceData: PropTypes.any,
};

InvoiceModel.defaultProps = {
  onAddInvoice: null,
  onUpdateInvoice: null,
  onDeleteInvoice: null,
  onGetInvoice: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  invoiceData: null,
};

