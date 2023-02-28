import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function GenderModel({
  onAddGender,
  onUpdateGender,
  onDeleteGender,
  isEdit,
  isDelete,
  onGetGender,
  id,
  onClose,
  genderData,
}) {
  const [newGender, setNewGender] = useState({
    genderName: "",
    description:"",
    recordStatusId: null,
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
    setNewGender({
      ...newGender,
      [e.target.name]: e.target.value,
    });
  };

  
  const saveHandler = async () => {
   debugger;
    if (isEdit) {
      const response = await onUpdateGender(id, newGender);
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
     
      const response = await onAddGender(newGender);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Gender Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Gender  Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteGender(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Gender Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewGender(genderData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
      !newGender?.genderName || !newGender?.recordStatusId|| !newGender?.description  ;
    setSaveDisabled(isEnable);
  }, [newGender]);

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
            controlId="formGender"
          >
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              name="genderName"                                                                                                                                   
              placeholder="Enter GenderName"
              value={newGender?.genderName}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="recordStatusId">
            <Form.Label>RecordStatusId</Form.Label>
            <Form.Control
              type="text"
              name="recordStatusId"
              placeholder="RecordStatusId"
              value={newGender?.recordStatusId}
              onChange={changeHandler}
            />
          </Form.Group>
          


          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newGender?.description}
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

GenderModel.propTypes = {
  /**
   * Callback function for Add Gender
   */
  onAddGender: PropTypes.func,
  /**
   * Callback function for Update Gender
   */
  onUpdateGender: PropTypes.func,
  /**
   * Callback function for Delete Gender
   */
  onDeleteGender: PropTypes.func,
  /**
   * Callback function for Get Gender
   */
  onGetGender: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Gender
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * genderData for object type
 */
  genderData: PropTypes.any,
};

GenderModel.defaultProps = {
  onAddGender: null,
  onUpdateGender: null,
  onDeleteGender: null,
  onGetGender: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
genderData: null,
};

