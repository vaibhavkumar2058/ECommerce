import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import { Dropdown } from 'semantic-ui-react';
import Select from 'react-select';
import States from "../../pages/State";

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
  countryList = [],
  recordStatusList = [],
}) {
  const [newState, setNewState] = useState({
    stateName: "",
    countryId: null,
    description: "",
    recordStatusId:null,
  });
  const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatusList.map((recordStatus,item) =>(
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
  

  const [countryOptions, setCountryOptions] = useState(countryList.map((country,item) =>(
    {
    key: item,
    text: country.countryName,
    value: country.countryId,
  })).filter((item) => item));

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

  const dropdownHandler = (event,{name , value}) => {
    setNewState((currentState) => ({...currentState, [name]: value}));
  }
  useEffect(() => { 
    setRecordStatusOptions(recordStatusList.map((recordStatus,item) =>(
      {
      key: item,
      text: recordStatus.actionName,
    value: recordStatus.recordStatusId,
    })).filter((item) => item));
    }, [recordStatusList]);
  

  useEffect(() => {
    if (isEdit) {
      setNewState(stateData);
    }
  }, []);
  
  useEffect(() => { 
  setCountryOptions(countryList.map((country,item) =>(
    {
    key: item,
    text: country.countryName,
    value: country.countryId,
  })).filter((item) => item));
  }, [countryList]);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
      !newState?.stateName 
      || !newState?.countryId 
      || !newState?.recordStatusId;
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
           <div className="row">
            <div className="col-md-6">
          <Form.Group
            className={styles.stFormContainer}
            controlId="formState"
          >
            <Form.Label>StateName<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="stateName"
              placeholder="Select StateName"
              value={newState?.stateName}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="mobile">
            <Form.Label>Country<span className="required">*</span></Form.Label>
            <Dropdown
              name="countryId"
              placeholder='Select Country'
              fluid
              search
              selection
              options={countryOptions}
              value = {newState?.countryId}
              onChange={dropdownHandler}
            />
           
          </Form.Group>
          </div>
          </div>
          <div className="row">
            <div className="col-md-6">
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
          </div>
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="recordStatus">
            <Form.Label>Status<span className="required">*</span></Form.Label>
            <Dropdown
              name="recordStatusId"
              placeholder='Select Action'
              fluid
              search
              selection
              options={recordStatusOptions}
              value = {newState?.recordStatusId}
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
    /**
 * countryList for object type
 */
    countryList: PropTypes.any,
    /**
 * recordStatusData for object type
 */
   recordStatusList: PropTypes.any,
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
  countryList:null,
  recordStatusList:null,
};

