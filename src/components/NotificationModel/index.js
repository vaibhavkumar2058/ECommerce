import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';


export default function NotificationModel({
  onAddNotification,
  onUpdateNotification,
  onDeleteNotification,
  isEdit,
  isDelete,
  onGetNotification,
  id,
  onClose,
  notificationData,
  recordStatusList = [],
}) {
  const [newNotification, setNewNotification] = useState({
    notificationTypeId:null,
    notificationName: "",
    description: "",
    recordStatusId:null,
  });

  const [fileSelected, setFileSelected] = useState();

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
    setNewNotification({
      ...newNotification,
      [e.target.name]: e.target.value,
    });
  };

  const saveHandler = async () => {
    newNotification.file = fileSelected;
    if (isEdit) {
      const response = await onUpdateNotification(id, newNotification);
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
      const response = await onAddNotification(newNotification);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Notification Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Notification Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteNotification(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Notification Delete Failed.'
      })
    }
  };

  const dropdownHandler = (event,{value}) => {
    setNewNotification((currentNotification) => ({...currentNotification, recordStatusId: value}));
  }
  useEffect(() => {
    if (isEdit) {
      setNewNotification(notificationData);
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
      !newNotification?.notificationName|| !newNotification?.notificationTypeId|| !newNotification?.description || !newNotification?.recordStatusId;
    setSaveDisabled(isEnable);
  }, [newNotification]);

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
            controlId="formNotification"
          >
            
          </Form.Group>
          <Form.Group>
            <Form.Label>NotificationTypeId</Form.Label>
            <Form.Control
              type="text"
              name="notificationTypeId"
              placeholder="NotificationTypeId"
              value={newNotification?.notificationTypeId}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>NotificationName</Form.Label>
            <Form.Control
              type="text"
              name="notificationName"
              placeholder="NotificationName"
              value={newNotification?.notificationName}
              onChange={changeHandler}
            />
          </Form.Group>
          {/* <Form.Group>
            <Form.Label>NotificationDate</Form.Label>
            <Form.Control
              type="text"
              name="notificationDate"
              placeholder="NotificationDate"
              value={newNotification?.notificationDate}
              onChange={changeHandler}
            />
          </Form.Group> */}
           <Form.Group className="mb-3" controlId="recordStatus">
            <Form.Label>RecordStatus</Form.Label>
            <Dropdown
              name="actionName"
              placeholder='Select Action'
              fluid
              search
              selection
              options={recordStatusOptions}
              value = {newNotification?.recordStatusId}
              onChange={dropdownHandler}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newNotification?.description}
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

NotificationModel.propTypes = {
  /**
   * Callback function for Add Notification
   */
  onAddNotification: PropTypes.func,
  /**
   * Callback function for Update Notification
   */
  onUpdateNotification: PropTypes.func,
  /**
   * Callback function for Delete Notification
   */
  onDeleteNotification: PropTypes.func,
  /**
   * Callback function for Get Notification
   */
  onGetNotification: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Notification
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * notificationData for object type
 */
  notificationData: PropTypes.any,
  /**
 * recordStatusData for object type
 */
  recordStatusList: PropTypes.any,
};

NotificationModel.defaultProps = {
  onAddNotification: null,
  onUpdateNotification: null,
  onDeleteNotification: null,
  onGetNotification: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  notificationData: null,
  recordStatusList:null,
};

