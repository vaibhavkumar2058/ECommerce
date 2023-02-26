import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function StateModel({
  onAddState,
  onUpdateState,
  onDeleteState,
  isEdit,
  isDelete,
  onGetState,
  id,
  onClose,
  stateData,
}) {
  const [newState, setNewState] = useState({
    stateName: "",
    countryId: null,
    description: "",
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
    setNewState({
      ...newState,
      [e.target.name]: e.target.value,
    });
  };

  const saveHandler = async () => {
    if (isEdit) {
      const response = await onUpdateState(id, newState);
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
      const response = await onAddState(newState);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'State Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'State Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteState(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'State Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewState(stateData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
      !newState?.stateName || !newState?.countryId || !newState?.description;
    setSaveDisabled(isEnable);
  }, [newState]);

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
            controlId="formState"
          >
            <Form.Label>StateName</Form.Label>
            <Form.Control
              type="text"
              name="stateName"
              placeholder="Enter StateName"
              value={newState?.stateName}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="mobile">
            <Form.Label>Country ID</Form.Label>
            <Form.Control
              type="text"
              name="countryId"
              placeholder="Country Id"
              value={newState?.countryId}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newState?.description}
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

StateModel.propTypes = {
  /**
   * Callback function for Add State
   */
  onAddState: PropTypes.func,
  /**
   * Callback function for Update State
   */
  onUpdateState: PropTypes.func,
  /**
   * Callback function for Delete State
   */
  onDeleteState: PropTypes.func,
  /**
   * Callback function for Get State
   */
  onGetState: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get State
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * stateData for object type
 */
  stateData: PropTypes.any,
};

StateModel.defaultProps = {
  onAddState: null,
  onUpdateState: null,
  onDeleteState: null,
  onGetState: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  stateData: null,
};

