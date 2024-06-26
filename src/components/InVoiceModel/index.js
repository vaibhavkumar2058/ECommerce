import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
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
  recordStatusList = [],
}) {
  const [newInvoice, setNewInvoice] = useState({
    resourcesId:null,
    orderId:null,
    totalIncludeTax:null,
    total:null,
    description:"",
    recordStatusId:null,
    //invoiceDate:""
    
    
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
    setNewInvoice({
      ...newInvoice,
      [e.target.name]: e.target.value,
    });
  };

  

  const saveHandler = async () => {
    
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

  const dropdownHandler = (event,{name,value}) => {
    setNewInvoice((currentInvoice) => ({...currentInvoice, [name]: value}));
  }

  useEffect(() => {
    if (isEdit) {
      setNewInvoice(invoiceData);
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
    
    const isEnable = !newInvoice?.resourcesId || !newInvoice?.orderId    ||  !newInvoice?.total   || !newInvoice?.recordStatusId;
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
          <div className="row">
            <div className="col-md-6">
          <Form.Group
            className={styles.stFormContainer}
            controlId="formInvoice"
          >
            <Form.Label>Resources<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="resourcesId"
              placeholder="Resources"
              value={newInvoice?.resourcesId}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="orderId">
            <Form.Label>Order<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="orderId"
              placeholder="Order"
              value={newInvoice?.orderId}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          </div>
          <div className="row">
            <div className="col-md-6">

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Total<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="total"
              placeholder="Total"
              value={newInvoice?.total}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          <div className="col-md-6"> 
          <Form.Group className="mb-3" controlId="totalIncludeTax">
            <Form.Label>Total Include Tax<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="totalIncludeTax"
              placeholder="TotalIncludeTax"
              value={newInvoice?.totalIncludeTax}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          </div>
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

          
            <div className="row">
            <div className="col-md-6">
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
          </div>
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="recordStatus">
            <Form.Label>Status<span className="required">*</span></Form.Label>
            <Dropdown
              name="recordStatusId"
              placeholder='Select Status'
              fluid
              search
              selection
              options={recordStatusOptions}
              value = {newInvoice?.recordStatusId}
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

   /**
 * recordStatusData for object type
 */
   recordStatusList: PropTypes.any,
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
  recordStatusList:null,
};

