import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function ResourceAttachmentTypeModel({
  onAddResourceAttachmentType,
  onUpdateResourceAttachmentType,
  onDeleteResourceAttachmentType,
  isEdit,
  isDelete,
  onGetResourceAttachmentType,
  id,
  onClose,
  resourceAttachmentTypeData,
}) {
  const [newResourceAttachmentType, setNewResourceAttachmentType] = useState({
    displayText:"",
    sortOrder:null,
    isActive:null,
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
    setNewResourceAttachmentType({
      ...newResourceAttachmentType,
      [e.target.id]: e.target.value,
    });
  };

  

  const saveHandler = async () => {
    if (isEdit) {
      const response = await onUpdateResourceAttachmentType(id, newResourceAttachmentType);
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
      const response = await onAddResourceAttachmentType(newResourceAttachmentType);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'ResourceAttachmentType Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'ResourceAttachmentType Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteResourceAttachmentType(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ResourceAttachmentType Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewResourceAttachmentType(resourceAttachmentTypeData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable = !newResourceAttachmentType?.displayText  
    || !newResourceAttachmentType?.sortOrder
    || !newResourceAttachmentType?.isActive
    || !newResourceAttachmentType?.description;
    setSaveDisabled(isEnable);
  }, [newResourceAttachmentType]);

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
          <Form.Group classId="mb-3" controlId="displayText">
            <Form.Label>Display Text<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="displayText"
              placeholder="Select Displaytext"
              value={newResourceAttachmentType?.displayText}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="sortOrder">
            <Form.Label>Sort Order<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="sortOrder"
              placeholder="Select SortOrder"
              value={newResourceAttachmentType?.sortOrder}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          </div>
          <div className="row">
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="isActive">
            <Form.Label>Is Active<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="isActive"
              placeholder="Select IsActive"
              value={newResourceAttachmentType?.isActive}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          <div className="col-md-6">
          <Form.Group classId="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Select Description"
              value={newResourceAttachmentType?.description}
              onChange={changeHandler}
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

ResourceAttachmentTypeModel.propTypes = {
  /**
   * Callback function for Add ResourceAttachmentType
   */
  onAddResourceAttachmentType: PropTypes.func,
  /**
   * Callback function for Update ResourceAttachmentType
   */
  onUpdateResourceAttachmentType: PropTypes.func,
  /**
   * Callback function for Delete ResourceAttachmentType
   */
  onDeleteResourceAttachmentType: PropTypes.func,
  /**
   * Callback function for Get ResourceAttachmentType
   */
  onGetResourceAttachmentType: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get ResourceAttachmentType
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * resourceAttachmentTypeData for object type
 */
  resourceAttachmentTypeData: PropTypes.any,
};

ResourceAttachmentTypeModel.defaultProps = {
  onAddResourceAttachmentType: null,
  onUpdateResourceAttachmentType: null,
  onDeleteResourceAttachmentType: null,
  onGetResourceAttachmentType: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  resourceAttachmentTypeData: null,
};

