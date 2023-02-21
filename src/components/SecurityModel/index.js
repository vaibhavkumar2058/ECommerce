import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function SecurityModel({
  onAddSecurity,
  onUpdateSecurity,
  onDeleteSecurity,
  isEdit,
  isDelete,
  onGetSecurity,
  id,
  onClose,
  SecurityData,
}) {
  const [newSecurity, setNewSecurity] = useState({
    questionId:null,
    answerId:null,
    description:"",
  });

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
    setNewSecurity({
      ...newSecurity,
      [e.target.name]: e.target.value,
    });
  };

  const saveHandler = async () => {
   
    if (isEdit) {
      const response = await onUpdateSecurity(id, newSecurity);
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
      const response = await onAddSecurity(newSecurity);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Security Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Security Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    debugger; 
    const response = await onDeleteSecurity(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Security Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewSecurity(SecurityData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
    !newSecurity?.questionId ||!newSecurity?.answerId || !newSecurity?.description ;
    setSaveDisabled(isEnable);
  }, [newSecurity]);

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
            controlId="formSecurity"
          >
            <Form.Label>QuestionId</Form.Label>
            <Form.Control
              type="text"
              name="questionId"
              placeholder="Enter QuestionId"
              value={newSecurity?.questionId}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="answerId">
            <Form.Label>AnswerId</Form.Label>
            <Form.Control
              type="text"
              name="answerId"
              placeholder="AnswerId"
              value={newSecurity?.answerId}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newSecurity?.description}
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

SecurityModel.propTypes = {
  /**
   * Callback function for Add Security
   */
  onAddSecurity: PropTypes.func,
  /**
   * Callback function for Update Security
   */
  onUpdateSecurity: PropTypes.func,
  /**
   * Callback function for Delete Security
   */
  onDeleteSecurity: PropTypes.func,
  /**
   * Callback function for Get Security
   */
  onGetSecurity: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Security
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * securityData for object type
 */
  securityData: PropTypes.any,
};

SecurityModel.defaultProps = {
  onAddSecurity: null,
  onUpdateSecurity: null,
  onDeleteSecurity: null,
  onGetSecurity: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  securityData: null,
};
