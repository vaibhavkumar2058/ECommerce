import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { Dropdown } from 'semantic-ui-react'
import Leads from "../../pages/Lead";

export default function LeadModel({
  onAddLead,
  onUpdateLead,
  onDeleteLead,
  isEdit,
  isDelete,
  onGetLead,
  id,
  onClose,
  leadData,
  recordStatusList = [],
}) {
  const [newLead, setNewLead] = useState({
    leadCount:null,
    resourcesId:null,
    orderValue:null,
    recordStatusId: null,
  });
  

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
    setNewLead({
      ...newLead,
      [e.target.name]: e.target.value,
    });
  };
 
  const saveHandler = async () => {
    if (isEdit) {
      const response = await onUpdateLead(id, newLead);
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
     
      const response = await onAddLead(newLead);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Lead Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Lead  Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteLead(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Lead Delete Failed.'
      })
    }
  };
  const dropdownHandler = (event,{value}) => {
    setNewLead((currentLead) => ({...currentLead, recordStatusId: value}));
  }
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
      setNewLead(leadData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
      !newLead?.leadCount||!newLead?.resourcesId  || !newLead?.recordStatusId ;
    setSaveDisabled(isEnable);
  }, [newLead]);

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
            controlId="formLead"
          >
          <Form.Label>Lead Count<span className="required">*</span></Form.Label>
            <Form.Control
              type="text" 
              name="leadCount"                                                                                                                                   
              placeholder="Lead Count"
              value={newLead?.leadCount}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          <div className="col-md-6">

          <Form.Group
            className={styles.stFormContainer}
            controlId="formLead"
          >        
            <Form.Label>Resources<span className="required">*</span></Form.Label>
            <Form.Control
              type="text" 
              name="resourcesId"                                                                                                                                   
              placeholder="Resources"
              value={newLead?.resourcesId}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          </div>
          <div className="row">
          <div className="col-md-6">
          <Form.Group
            className={styles.stFormContainer}
            controlId="formLead"
          >
            <Form.Label>Order Value<span className="required">*</span></Form.Label>
            <Form.Control
              type="text" 
              name="orderValue"                                                                                                                                   
              placeholder="Order value"
              value={newLead?.orderValue}
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
              value = {newLead?.recordStatusId}
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

LeadModel.propTypes = {
  /**
   * Callback function for Add Lead
   */
  onAddLead: PropTypes.func,
  /**
   * Callback function for Update Lead
   */
  onUpdateLead: PropTypes.func,
  /**
   * Callback function for Delete Lead
   */
  onDeleteLead: PropTypes.func,
  /**
   * Callback function for Get Lead
   */
  onGetLead: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Lead
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * leadData for object type
 */
  leadData: PropTypes.any,
  /**
 * recordStatusData for object type
 */
  recordStatusList: PropTypes.any,
};

LeadModel.defaultProps = {
  onAddLead: null,
  onUpdateLead: null,
  onDeleteLead: null,
  onGetLead: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  leadData: null,
recordStatusList:null,
};

