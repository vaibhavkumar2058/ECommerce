import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function ApproveModel({
  onAddApprove,
  onUpdateApprove,
  onDeleteApprove,
  isEdit,
  isDelete,
  onGetApprove,
  id,
  onClose,
  approveData,
  recordStatusList = [],
  approveStatusList = [],
  //recordStatus,
}) {

  const [saveDisabled, setSaveDisabled] = useState(true);
  const [buttonType, setButtonType] = useState("Save");



  const [newApprove, setNewApprove] = useState({
    resourcesId: null,
    approverId: null,
    comment: "",
    approveStatusId: null,
    recordStatusId: null,
  });
  
  const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatusList.map((recordStatus, item) => (
    {
      key: item,
      text: recordStatus.actionName,
      value: recordStatus.recordStatusId,
    })).filter((item) => item));

    const [approveStatusOptions, setApproveStatusOptions] = useState(approveStatusList.map((approveStatus, item) => (
      {
        key: item,
        text: approveStatus.approveStatusName,
        value: approveStatus.approveStatusId,
      })).filter((item) => item));
  

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  const styles = {
    stFormContainer: css`
      width: 400px !important;
    `,
    stFormControl: css``,
  };

  const changeHandler = (e) => {
    setNewApprove({
      ...newApprove,
      [e.target.name]: e.target.value,
    });
  };


  const saveHandler = async () => {

    if (isEdit) {
      const response = await onUpdateApprove(id, newApprove);
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
      const response = await onAddApprove(newApprove);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Approve Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Approve Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteApprove(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Approve Delete Failed.'
      })
    }
  };
  const dropdownHandler = (event, { name, value }) => {
    setNewApprove((currentApprove) => ({ ...currentApprove, [name]: value }));
  }

  
  useEffect(() => {
    if (isEdit) {
      setNewApprove(approveData);
    }
  }, []);

  useEffect(() => {
    setRecordStatusOptions(recordStatusList.map((recordStatus, item) => (
      {
        key: item,
        text: recordStatus.actionName,
        value: recordStatus.recordStatusId,
      })).filter((item) => item));
  }, [recordStatusList]);
  
  useEffect(() => {
    setApproveStatusOptions(approveStatusList.map((approveStatus, item) => (
      {
        key: item,
        text: approveStatus.approveStatusName,
        value: approveStatus.approveStatusId,
      })).filter((item) => item));
  }, [approveStatusList]);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable = !newApprove?.resourcesId
      || !newApprove?.approverId
      || !newApprove?.comment
      || !newApprove?.approveStatusId
      || !newApprove?.recordStatusId;
    setSaveDisabled(isEnable);
  }, [newApprove]);


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
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Resources<span className="required">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="resourcesId"
                  placeholder="Resources"
                  value={newApprove?.resourcesId}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
           
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Approver<span className="required">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="approverId"
                  placeholder="Approver"
                  value={newApprove?.approverId}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
            </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="text"
                  name="comment"
                  placeholder="Comment"
                  value={newApprove?.comment}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
          
            <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Approve Status<span className="required">*</span></Form.Label>
                <Dropdown
                  name="approveStatusId"
                  placeholder='Select Approve Status'
                  fluid
                  search
                  selection
                  options={approveStatusOptions}
                  value={newApprove?.approveStatusId}
                  onChange={dropdownHandler}
                />
              </Form.Group>
            </div>
          </div>
          
          <div className="row">
            
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="recordStatusId">
                <Form.Label>Status<span className="required">*</span></Form.Label>
                <Dropdown
                  name="recordStatusId"
                  placeholder='Select Status'
                  fluid
                  search
                  selection
                  options={recordStatusOptions}
                  value={newApprove?.recordStatusId}
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

ApproveModel.propTypes = {
  /**
   * Callback function for Add Approve
   */
  onAddApprove: PropTypes.func,
  /**
   * Callback function for Update Approve
   */
  onUpdateApprove: PropTypes.func,
  /**
   * Callback function for Delete Approve
   */
  onDeleteApprove: PropTypes.func,
  /**
   * Callback function for Get Approve
   */
  onGetApprove: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Approve
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * approveData for object type
 */
  approveData: PropTypes.any,
  /**
   * recordStatusList for object type
   */
  recordStatusList: PropTypes.any,
  /**
   * approveStatusList for object type
   */
  approveStatusList: PropTypes.any,
};

ApproveModel.defaultProps = {
  onAddApprove: null,
  onUpdateApprove: null,
  onDeleteApprove: null,
  onGetApprove: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  approveData: null,
  recordStatusList: null,
  approveStatusList: null,
};

