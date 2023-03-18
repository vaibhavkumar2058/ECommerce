import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import { Dropdown } from 'semantic-ui-react'

export default function RoleModel({
  onAddRole,
  onUpdateRole,
  onDeleteRole,
  isEdit,
  isDelete,
  onGetRole,
  id,
  onClose,
  roleData,
  recordStatusList = [],
}) 
{
  const [newRole, setNewRole] = useState({
    roleName: "",
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
    setNewRole({
      ...newRole,
      [e.target.name]: e.target.value,
    });
  };

  

  const saveHandler = async () => {
    newRole.file = fileSelected;
    if (isEdit) {
      const response = await onUpdateRole(id, newRole);
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
      const response = await onAddRole(newRole);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Role Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Role Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteRole(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Role Delete Failed.'
      })
    }
  };

  const dropdownHandler = (event,{name , value}) => {
    setNewRole((currentRole) => ({...currentRole, [name]: value}));
  }


  useEffect(() => {
    if (isEdit) {
      setNewRole(roleData);
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
       !newRole?.roleName 
       || !newRole?.description
        || !newRole?.recordStatusId; 
    setSaveDisabled(isEnable);
  }, [newRole]);

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
            controlId="formRole"
          >
            <Form.Label>Role<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="roleName"
              placeholder="Select RoleName"
              value={newRole?.roleName}
              onChange={changeHandler}
            />
          </Form.Group>
          


          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newRole?.description}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="mobile">
            <Form.Label>Status<span className="required">*</span></Form.Label>
            <Dropdown
              name="recordStatusId"
              placeholder='Select Status'
              fluid
              search
              selection
              options={recordStatusOptions}
              value = {newRole?.recordStatusId}
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

RoleModel.propTypes = {
  /**
   * Callback function for Add Role
   */
  onAddRole: PropTypes.func,
  /**
   * Callback function for Update Role
   */
  onUpdateRole: PropTypes.func,
  /**
   * Callback function for Delete Role
   */
  onDeleteRole: PropTypes.func,
  /**
   * Callback function for Get Role
   */
  onGetRole: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Role
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * roleData for object type
 */
  roleData: PropTypes.any,
   /**
 * recordStatusList for object type
 */
   recordStatusList: PropTypes.any,
};

RoleModel.defaultProps = {
  onAddRole: null,
  onUpdateRole: null,
  onDeleteRole: null,
  onGetRole: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  roleData: null,
  recordStatusList:null,
};

