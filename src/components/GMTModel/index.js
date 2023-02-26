import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function GMTModel({
  onAddGMT,
  onUpdateGMT,
  onDeleteGMT,
  isEdit,
  isDelete,
  onGetGMT,
  id,
  onClose,
  GMTData,
 }) {
  const [newGMT, setNewGMT] = useState({
    resourceId:null,
    longitude:null,
    latitude:null,
   // trackTime:null ,
    description:"",
    recordStatusId:null,
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
    setNewGMT({
      ...newGMT,
      [e.target.name]: e.target.value,
    });
  };

  

  const saveHandler = async () => {
    if (isEdit) {
      const response = await onUpdateGMT(id, newGMT);
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
      const response = await onAddGMT(newGMT);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'GMT Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'GMT Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteGMT(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'GMT Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewGMT(GMTData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
    
    !newGMT?.resourceId || !newGMT?.longitude || !newGMT?.latitude||  !newGMT?.description||  !newGMT?.recordStatusId;
    setSaveDisabled(isEnable);
  }, [newGMT]);

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
            controlId="formGMT"
          >
            <Form.Label>ResourceId</Form.Label>
            <Form.Control
              type="text"
              name="resourceId"
              placeholder="Enter resourceId"
              value={newGMT?.resourceId}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="longitude">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="text"
              name="longitude"
              placeholder="Longitude"
              value={newGMT?.longitude}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newGMT?.description}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="latitude">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="text"
              name="latitude"
              placeholder="latitude"
              value={newGMT?.latitude}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="latitude">
            <Form.Label>RecordStatusId</Form.Label>
            <Form.Control
              type="text"
              name="recordStatusId"
              placeholder="Enter recordStatusId"
              value={newGMT?.recordStatusId}
              onChange={changeHandler}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="tracktime">
            <Form.Label>TrackTime</Form.Label>
            <Form.Control
              type="text"
              name="trackTime"
              placeholder="Enter TrackTime"
              value={newGMT?.trackTime}
              onChange={changeHandler}
            />
          </Form.Group> */}

          
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

GMTModel.propTypes = {
  /**
   * Callback function for Add GMT
   */
  onAddGMT: PropTypes.func,
  /**
   * Callback function for Update GMT
   */
  onUpdateGMT: PropTypes.func,
  /**
   * Callback function for Delete GMT
   */
  onDeleteGMT: PropTypes.func,
  /**
   * Callback function for Get GMT
   */
  onGetGMT: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get GMT
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * GMTData for object type
 */
  GMTData: PropTypes.any,
};

GMTModel.defaultProps = {
  onAddGMT: null,
  onUpdateGMT: null,
  onDeleteGMT: null,
  onGetGMT: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  GMTData: null,
};

