import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { Dropdown } from 'semantic-ui-react'
import NotificationTypes from "../../pages/NotificationType";

export default function NotificationTypeModel({
  onAddNotificationType,
  onUpdateNotificationType,
  onDeleteNotificationType,
  isEdit,
  isDelete,
  onGetNotificationType,
  id,
  onClose,
  notificationTypeData,
  recordStatusList = [],
}) {
  const [newNotificationType, setNewNotificationType] = useState({
    notificationTypeName: "",
    description:"",
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
    setNewNotificationType({
      ...newNotificationType,
      [e.target.name]: e.target.value,
    });
  };
 
  const saveHandler = async () => {
    if (isEdit) {
      const response = await onUpdateNotificationType(id, newNotificationType);
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
     
      const response = await onAddNotificationType(newNotificationType);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'NotificationType Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'NotificationType  Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteNotificationType(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'NotificationType Delete Failed.'
      })
    }
  };
  const dropdownHandler = (event,{name, value}) => {
    setNewNotificationType((currentNotificationType) => ({...currentNotificationType, [name]: value}));
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
      setNewNotificationType(notificationTypeData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
      !newNotificationType?.notificationTypeName
       || !newNotificationType?.recordStatusId ;
    setSaveDisabled(isEnable);
  }, [newNotificationType]);

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
            controlId="formNotificationType"
          >
            <Form.Label>NotificationType Name<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="notificationTypeName"                                                                                                                                   
              placeholder="Enter NotificationTypeName"
              value={newNotificationType?.notificationTypeName}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newNotificationType?.description}
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
              value = {newNotificationType?.recordStatusId}
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

NotificationTypeModel.propTypes = {
  /**
   * Callback function for Add NotificationType
   */
  onAddNotificationType: PropTypes.func,
  /**
   * Callback function for Update NotificationType
   */
  onUpdateNotificationType: PropTypes.func,
  /**
   * Callback function for Delete NotificationType
   */
  onDeleteNotificationType: PropTypes.func,
  /**
   * Callback function for Get NotificationType
   */
  onGetNotificationType: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get NotificationType
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * notificationTypeData for object type
 */
  notificationTypeData: PropTypes.any,
  /**
 * recordStatusData for object type
 */
  recordStatusList: PropTypes.any,
};

NotificationTypeModel.defaultProps = {
  onAddNotificationType: null,
  onUpdateNotificationType: null,
  onDeleteNotificationType: null,
  onGetNotificationType: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  notificationTypeData: null,
  recordStatusList:null,
};

