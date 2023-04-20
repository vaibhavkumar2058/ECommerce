import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function ApproveStatusModel({
  onAddApproveStatus,
  onUpdateApproveStatus,
  onDeleteApproveStatus,
  isEdit,
  isDelete,
  onGetApproveStatus,
  id,
  onClose,
  approveStatusData,
  recordStatusList = [],
 }) {
  const [newApproveStatus, setNewApproveStatus] = useState({
    approveStatusName:"",
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
    setNewApproveStatus({
      ...newApproveStatus,
      [e.target.name]: e.target.value,
    });
  };

  

  const saveHandler = async () => {

    if (isEdit) {
      const response = await onUpdateApproveStatus(id, newApproveStatus);
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
      const response = await onAddApproveStatus(newApproveStatus);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'ApproveStatus Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'ApproveStatus Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteApproveStatus(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ApproveStatus Delete Failed.'
      })
    }
  };

  const dropdownHandler = (event,{name,value}) => {
    setNewApproveStatus((currentApproveStatus) => ({...currentApproveStatus, [name]: value}));
  }

  useEffect(() => {
    if (isEdit) {
      setNewApproveStatus(approveStatusData);
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
       !newApproveStatus?.recordStatusId ;
    setSaveDisabled(isEnable);
  }, [newApproveStatus]);

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
            controlId="formApproveStatus"
          >
            <Form.Label>Approve Status<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="approveStatusName"
              placeholder="Approve Status"
              value={newApproveStatus?.approveStatusName}
              onChange={changeHandler}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="recordStatus">
            <Form.Label>Status<span className="required">*</span></Form.Label>
            <Dropdown
              name="recordStatusId"
              placeholder='Select Status'
              fluid
              search
              selection
              options={recordStatusOptions}
              value = {newApproveStatus?.recordStatusId}
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

ApproveStatusModel.propTypes = {
  /**
   * Callback function for Add ApproveStatus
   */
  onAddApproveStatus: PropTypes.func,
  /**
   * Callback function for Update ApproveStatus
   */
  onUpdateApproveStatus: PropTypes.func,
  /**
   * Callback function for Delete ApproveStatus
   */
  onDeleteApproveStatus: PropTypes.func,
  /**
   * Callback function for Get ApproveStatus
   */
  onGetApproveStatus: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get ApproveStatus
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * approveStatusData for object type
 */
  approveStatusData: PropTypes.any,
  /**
 * recordStatusData for object type
 */
  recordStatusList: PropTypes.any,
};

ApproveStatusModel.defaultProps = {
  onAddApproveStatus: null,
  onUpdateApproveStatus: null,
  onDeleteApproveStatus: null,
  onGetApproveStatus: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  approveStatusData: null,
  recordStatusList:null,
};

