import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

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
}) 
{
  const [newRole, setNewRole] = useState({
    roleName: "",
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
      debugger;
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

  useEffect(() => {
    if (isEdit) {
      setNewRole(roleData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
       !newRole?.roleName || !newRole?.description; 
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
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              name="roleName"
              placeholder="Enter RoleName"
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
};

