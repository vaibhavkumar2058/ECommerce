import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function MeasurementValueModel({
  onAddMeasurementValue,
  onUpdateMeasurementValue,
  onDeleteMeasurementValue,
  isEdit,
  isDelete,
  onGetMeasurementValue,
  id,
  onClose,
  measurementValueData,
}) {
  const [newMeasurementValue, setNewMeasurementValue] = useState({
    value: "",
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
    setNewMeasurementValue({
      ...newMeasurementValue,
      [e.target.name]: e.target.value,
    });
  };

  
  const saveHandler = async () => {
    newMeasurementValue.file = fileSelected;
    if (isEdit) {
      const response = await onUpdateMeasurementValue(id, newMeasurementValue);
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
      const response = await onAddMeasurementValue(newMeasurementValue);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'MeasurementValue Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'MeasurementValue Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteMeasurementValue(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'MeasurementValue Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewMeasurementValue(measurementValueData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
      !newMeasurementValue?.value || !newMeasurementValue?.description;
    setSaveDisabled(isEnable);
  }, [newMeasurementValue]);

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
            controlId="formMeasurementValue"
          >
            <Form.Label>MeasurementValue</Form.Label>
            <Form.Control
              type="text"
              name="value"
              placeholder="Enter MeasurementValue"
              value={newMeasurementValue?.value}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newMeasurementValue?.description}
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

MeasurementValueModel.propTypes = {
  /**
   * Callback function for Add MeasurementValue
   */
  onAddMeasurementValue: PropTypes.func,
  /**
   * Callback function for Update MeasurementValue
   */
  onUpdateMeasurementValue: PropTypes.func,
  /**
   * Callback function for Delete MeasurementValue
   */
  onDeleteMeasurementValue: PropTypes.func,
  /**
   * Callback function for Get MeasurementValue
   */
  onGetMeasurementValue: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get MeasurementValue
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * measurementValueData for object type
 */
  measurementValueData: PropTypes.any,
};

MeasurementValueModel.defaultProps = {
  onAddMeasurementValue: null,
  onUpdateMeasurementValue: null,
  onDeleteMeasurementValue: null,
  onGetMeasurementValue: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  measurementValueData: null,
};

