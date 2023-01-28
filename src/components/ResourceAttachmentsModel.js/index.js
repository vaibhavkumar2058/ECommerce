import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function ResourceAttachmentsModel({
  onAddResourceAttachments,
  onUpdateResourceAttachments,
  onDeleteResourceAttachments,
  isEdit,
  isDelete,
  onGetResourceAttachments,
  id,
  onClose,
  resourceAttachmentsData,
}) {
  const [newResourceAttachments, setNewResourceAttachments] = useState({
    resourceId: null,
    fileId: null,
    attachmentTypeId: null,
    visibleToCustomer: "",
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
    setNewResourceAttachments({
      ...newResourceAttachments,
      [e.target.name]: e.target.value,
    });
  };

  const saveFileSelected= (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const saveHandler = async () => {
    newResourceAttachments.file = fileSelected;
    if (isEdit) {
      const response = await onUpdateResourceAttachments(id, newResourceAttachments);
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
      const response = await onAddResourceAttachments(newResourceAttachments);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'ResourceAttachments Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'ResourceAttachments Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteResourceAttachments(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ResourceAttachments Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewResourceAttachments(ResourceAttachmentsData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
      !newResourceAttachments?.resourceId || !newResourceAttachments?.fileId || !newResourceAttachments?.attachmentTypeId || !newResourceAttachments?.description || !newResourceAttachments?.visibleToCustomer;
    setSaveDisabled(isEnable);
  }, [newResourceAttachments]);

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
            controlId="formResourceAttachments"
          >
            <Form.Label>ResourceId</Form.Label>
            <Form.Control
              type="text"
              name="resourceId"
              placeholder="Enter ResourceId"
              value={newResourceAttachments?.resourceId}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="file">
            <Form.Label>File</Form.Label>
            <Form.Control
              type="text"
              name="fileId"
              placeholder="FileId"
              value={newResourceAttachments?.fileId}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newResourceAttachments?.description}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="attachmentType">
            <Form.Label>AttachmentType</Form.Label>
            <Form.Control
              type="text"
              name="attachmentTypeId"
              placeholder="attachmentTypeId"
              value={newResourceAttachments?.attachmentTypeId}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="visibleToCustomer">
            <Form.Label>VisibleToCustomer</Form.Label>
            <Form.Control
              type="text"
              name="visibleToCustomer"
              placeholder="VisibleToCustomer"
              value={newResourceAttachments?.VisibleToCustomer}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group>
          <input type="file" className="custom-file-label" onChange={saveFileSelected} />
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

ResourceAttachmentsModel.propTypes = {
  /**
   * Callback function for Add Enquiry
   */
  onAddEnquiry: PropTypes.func,
  /**
   * Callback function for Update Enquiry
   */
  onUpdateEnquiry: PropTypes.func,
  /**
   * Callback function for Delete Enquiry
   */
  onDeleteEnquiry: PropTypes.func,
  /**
   * Callback function for Get Enquiry
   */
  onGetEnquiry: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Enquiry
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * enquiryData for object type
 */
  enquiryData: PropTypes.any,
};

ResourceAttachmentsModelModel.defaultProps = {
  onAddResourceAttachmentsModel: null,
  onUpdateResourceAttachmentsModel: null,
  onDeleteResourceAttachmentsModel: null,
  onGetResourceAttachmentsModel: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  eesourceAttachmentsModelData: null,
};

