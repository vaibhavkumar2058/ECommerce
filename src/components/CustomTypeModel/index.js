import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function CustomTypeModel({
  onAddCustomType,
  onUpdateCustomType,
  onDeleteCustomType,
  isEdit,
  isDelete,
  onGetCustomType,
  id,
  onClose,
  customTypeData,
  recordStatusList = [],
 }) {
  const [newCustomType, setNewCustomType] = useState({
    customTypeName:"",
    description:"",
    recordStatusId:null,
  });


  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatusList.map((recordStatus,item) =>(
    {
    key: item,
    text: recordStatus.actionName,
    value: recordStatus.recordStatusId,
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
    setNewCustomType({
      ...newCustomType,
      [e.target.name]: e.target.value,
    });
  };

  

  const saveHandler = async () => {

    if (isEdit) {
      const response = await onUpdateCustomType(id, newCustomType);
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
      const response = await onAddCustomType(newCustomType);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'CustomType Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'CustomType Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteCustomType(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'CustomType Delete Failed.'
      })
    }
  };

  const dropdownHandler = (event,{name,value}) => {
    setNewCustomType((currentCustomType) => ({...currentCustomType, [name]: value}));
  }

  useEffect(() => {
    if (isEdit) {
      setNewCustomType(customTypeData);
    }
  }, []);

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
      setButtonType("Update");
    }
    const isEnable =
       !newCustomType?.recordStatusId ;
    setSaveDisabled(isEnable);
  }, [newCustomType]);

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
            controlId="formAddressType"
          >
            <Form.Label>Custom Type<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="customTypeName"
              placeholder=" Select Custom Type"
              value={newCustomType?.customTypeName}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newCustomType?.description}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="recordStatus">
            <Form.Label>Status<span className="required">*</span></Form.Label>
            <Dropdown
              name="recordStatusId"
              placeholder='Select Status'
              fluid
              search
              selection
              options={recordStatusOptions}
              value = {newCustomType?.recordStatusId}
              onChange={dropdownHandler}
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

CustomTypeModel.propTypes = {
  /**
   * Callback function for Add CustomType
   */
  onAddCustomType: PropTypes.func,
  /**
   * Callback function for Update CustomType
   */
  onUpdateCustomType: PropTypes.func,
  /**
   * Callback function for Delete CustomType
   */
  onDeleteCustomType: PropTypes.func,
  /**
   * Callback function for Get CustomType
   */
  onGetCustomType: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get CustomType
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * customTypeData for object type
 */
  customTypeData: PropTypes.any,
  /**
 * recordStatusData for object type
 */
  recordStatusList: PropTypes.any,
};

CustomTypeModel.defaultProps = {
  onAddCustomType: null,
  onUpdateCustomType: null,
  onDeleteCustomType: null,
  onGetCustomType: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  customTypeData: null,
  recordStatusList:null,
};

