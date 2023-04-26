import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function BoxModel({
  onAddBox,
  onUpdateBox,
  onDeleteBox,
  isEdit,
  isDelete,
  onGetBox,
  id,
  onClose,
  boxData,
  recordStatusList = [],
  //recordStatus,
}) {
  const [newBox, setNewBox] = useState({
    boxName: "",
    piecesCount: null,
    boxLimit: null,
    recordStatus: null,
  });
  
  const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatusList.map((recordStatus, item) => (
    {
      key: item,
      text: recordStatus.actionName,
      value: recordStatus.recordStatusId,
    })).filter((item) => item));

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
    setNewBox({
      ...newBox,
      [e.target.name]: e.target.value,
    });
  };


  const saveHandler = async () => {

    if (isEdit) {
      const response = await onUpdateBox(id, newBox);
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
      const response = await onAddBox(newBox);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Box Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Box Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteBox(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Box Delete Failed.'
      })
    }
  };
  const dropdownHandler = (event, { name, value }) => {
    setNewBox((currentBox) => ({ ...currentBox, [name]: value }));

  }

 
  useEffect(() => {
    if (isEdit) {
      setNewBox(boxData);
    }
  }, []);

  useEffect(() => {
    setRecordStatusOptions(recordStatusList.map((recordStatus, item) => (
      {
        key: item,
        text: recordStatus.actionName,
        value: recordStatus.recordStatusId,
      })).filter((item) => item));
  }, [recordStatusList]);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable = !newBox?.boxName
      || !newBox?.piecesCount
      || !newBox?.boxLimit
      || !newBox?.recordStatusId;
    setSaveDisabled(isEnable);
  }, [newBox]);


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
            <div className="col-md-4">
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Box Name<span className="required">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="boxName"
                  placeholder="Box Name"
                  value={newBox?.boxName}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Pieces Count<span className="required">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="piecesCount"
                  placeholder="Pieces Count "
                  value={newBox?.piecesCount}
                  onChange={changeHandler}
                />
              </Form.Group>
            
            </div>
            </div>
          <div className="row">
            <div className="col-md-4">
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Box Limit<span className="required">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="boxLimit"
                  placeholder="Box Limit"
                  value={newBox?.boxLimit}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
            <Form.Group className="mb-3" controlId="recordStatusId">
                <Form.Label>Status<span className="required">*</span></Form.Label>
                <Dropdown
                  name="recordStatusId"
                  placeholder='Select Status'
                  fluid
                  search
                  selection
                  options={recordStatusOptions}
                  value={newBox?.recordStatusId}
                  onChange={dropdownHandler}
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

BoxModel.propTypes = {
  /**
   * Callback function for Add Box
   */
  onAddBox: PropTypes.func,
  /**
   * Callback function for Update Box
   */
  onUpdateBox: PropTypes.func,
  /**
   * Callback function for Delete Box
   */
  onDeleteBox: PropTypes.func,
  /**
   * Callback function for Get Box
   */
  onGetBox: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Box
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
   * recordStatusList for object type
   */
  recordStatusList: PropTypes.any,
  
};

BoxModel.defaultProps = {
  onAddBox: null,
  onUpdateBox: null,
  onDeleteBox: null,
  onGetBox: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  boxData: null,
  recordStatusList: null,
  
};

