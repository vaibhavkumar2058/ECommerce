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
    id: "",
    DisplayText:"",
    SortOrder:"",
    IsActive:"",
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

  const saveFileSelected= (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const saveHandler = async () => {
    newResourceAttachmentType.file = fileSelected;
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
      debugger;
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
    const isEnable =
      !newResourceAttachmentType?.id || !newResourceAttachmentType?.displaytext  || !newResourceAttachmentType?.sortorder || !newResourceAttachmentType?.isactive || !newResourceAttachmentType?.description;
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
          <Form.Group
            classId={styles.stFormContainer}
            controlId="formResourceAttachmentType"
          >
            <Form.Label>ResourceAttachmentType</Form.Label>
            <Form.Control
              type="text"
              id="id"
              placeholder="Enter ResourceAttachmentType"
              value={newResourceAttachmentType?.id}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group classId="mb-3" controlId="displaytext">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              id="displaytext"
              placeholder="displaytext"
              value={newResourceAttachmentType?.mobile}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group classId="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newResourceAttachmentType?.description}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="sortorder">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="sortorder"
              placeholder="SortOrder"
              value={newResourceAttachmentType?.email}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="isactive">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="isactive"
              placeholder="IsActive"
              value={newResourceAttachmentType?.email}
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

