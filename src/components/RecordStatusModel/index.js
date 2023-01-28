import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function RecordStatusModel({
  onAddRecordStatus,
  onUpdateRecordStatus,
  onDeleteRecordStatus,
  isEdit,
  isDelete,
  onGetRecordStatus,
  id,
  onClose,
  recordStatusData,
}) {
  const [newRecordStatus, setNewRecordStatus] = useState({
    actionName:"",
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
    setNewRecordStatus({
      ...newRecordStatus,
      [e.target.name]: e.target.value,
    });
  };

  const saveFileSelected= (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const saveHandler = async () => {
    newRecordStatus.file = fileSelected;
    if (isEdit) {
      const response = await onUpdateRecordStatus(id, newRecordStatus);
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
      const response = await onAddRecordStatus(newRecordStatus);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'RecordStatus Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'RecordStatus Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteRecordStatus(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'RecordStatus Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewRecordStatus(recordStatusData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
      !newRecordStatus?.actionName  || !newRecordStatus?.description ;
    setSaveDisabled(isEnable);
  }, [newRecordStatus]);

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
            controlId="formRecordStatus"
          >
            <Form.Label>Action</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Action"
              value={newRecordStatus?.action}
              onChange={changeHandler}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newRecordStatus?.description}
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

RecordStatusModel.propTypes = {
  /**
   * Callback function for Add RecordStatus
   */
  onAddRecordStatus: PropTypes.func,
  /**
   * Callback function for Update RecordStatus
   */
  onUpdateRecordStatus: PropTypes.func,
  /**
   * Callback function for Delete RecordStatus
   */
  onDeleteRecordStatus: PropTypes.func,
  /**
   * Callback function for Get RecordStatus
   */
  onGetRecordStatus: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get RecordStatus
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * recordStatusData for object type
 */
  recordStatusData: PropTypes.any,
};

RecordStatusModel.defaultProps = {
  onAddRecordStatus: null,
  onUpdateRecordStatus: null,
  onDeleteRecordStatus: null,
  onGetRecordStatus: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  recordStatusData: null,
};

