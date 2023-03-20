import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function AddressTypeModel({
  onAddAddressType,
  onUpdateAddressType,
  onDeleteAddressType,
  isEdit,
  isDelete,
  onGetAddressType,
  id,
  onClose,
  addressTypeData,
  recordStatusList = [],
 }) {
  const [newAddressType, setNewAddressType] = useState({
    addressTypeName:"",
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
    setNewAddressType({
      ...newAddressType,
      [e.target.name]: e.target.value,
    });
  };

  

  const saveHandler = async () => {

    if (isEdit) {
      const response = await onUpdateAddressType(id, newAddressType);
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
      const response = await onAddAddressType(newAddressType);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'AddressType Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'AddressType Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteAddressType(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'AddressType Delete Failed.'
      })
    }
  };

  const dropdownHandler = (event,{name,value}) => {
    setNewAddressType((currentAddressType) => ({...currentAddressType, [name]: value}));
  }

  useEffect(() => {
    if (isEdit) {
      setNewAddressType(addressTypeData);
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
       !newAddressType?.recordStatusId ;
    setSaveDisabled(isEnable);
  }, [newAddressType]);

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
            <Form.Label>AddressTypeName<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="addressTypeName"
              placeholder=" Select AddressTypeName"
              value={newAddressType?.addressTypeName}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newAddressType?.description}
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
              value = {newAddressType?.recordStatusId}
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

AddressTypeModel.propTypes = {
  /**
   * Callback function for Add AddressType
   */
  onAddAddressType: PropTypes.func,
  /**
   * Callback function for Update AddressType
   */
  onUpdateAddressType: PropTypes.func,
  /**
   * Callback function for Delete AddressType
   */
  onDeleteAddressType: PropTypes.func,
  /**
   * Callback function for Get AddressType
   */
  onGetAddressType: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get AddressType
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * addressTypeData for object type
 */
  addressTypeData: PropTypes.any,
  /**
 * recordStatusData for object type
 */
  recordStatusList: PropTypes.any,
};

AddressTypeModel.defaultProps = {
  onAddAddressType: null,
  onUpdateAddressType: null,
  onDeleteAddressType: null,
  onGetAddressType: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  addressTypeData: null,
  recordStatusList:null,
};

