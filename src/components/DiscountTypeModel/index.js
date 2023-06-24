import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function DiscountTypeModel({
  onAddDiscountType,
  onUpdateDiscountType,
  onDeleteDiscountType,
  isEdit,
  isDelete,
  onGetDiscountType,
  id,
  onClose,
  discountTypeData,
  recordStatusList = [],
  //recordStatus,
}) {
  const [newDiscountType, setNewDiscountType] = useState({
    discountTypeName:"",
    description:"",
    recordStatusId: null,
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
    setNewDiscountType({
      ...newDiscountType,
      [e.target.name]: e.target.value,
    });
  };


  const saveHandler = async () => {

    if (isEdit) {
      const response = await onUpdateDiscountType(id, newDiscountType);
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
      const response = await onAddDiscountType(newDiscountType);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'DiscountType Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'DiscountType Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteDiscountType(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'DiscountType Delete Failed.'
      })
    }
  };
  const dropdownHandler = (event, { name, value }) => {
    setNewDiscountType((currentDiscountType) => ({ ...currentDiscountType, [name]: value }));

  }

  

  useEffect(() => {
    if (isEdit) {
      setNewDiscountType(discountTypeData);
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
    
    const isEnable = !newDiscountType?.discountTypeName
      || !newDiscountType?.description
      || !newDiscountType?.recordStatusId;
    setSaveDisabled(isEnable);
  }, [newDiscountType]);


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
         
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Discount Type Name<span className="required">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="discountTypeName"
                  placeholder="Discount Type Name"
                  value={newDiscountType?.discountTypeName}
                  onChange={changeHandler}
                />
              </Form.Group>
           
           
            
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description<span className="required">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={newDiscountType?.description}
                  onChange={changeHandler}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="recordStatusId">
                <Form.Label>Status<span className="required">*</span></Form.Label>
                <Dropdown
                  name="recordStatusId"
                  placeholder='Select Status'
                  fluid
                  search
                  selection
                  options={recordStatusOptions}
                  value={newDiscountType?.recordStatusId}
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

DiscountTypeModel.propTypes = {
  /**
   * Callback function for Add DiscountType
   */
  onAddDiscountType: PropTypes.func,
  /**
   * Callback function for Update DiscountType
   */
  onUpdateDiscountType: PropTypes.func,
  /**
   * Callback function for Delete DiscountType
   */
  onDeleteDiscountType: PropTypes.func,
  /**
   * Callback function for Get DiscountType
   */
  onGetDiscountType: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get DiscountType
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * discountTypeData for object type
 */
  discountTypeData: PropTypes.any,
  /**
   * recordStatusList for object type
   */
  recordStatusList: PropTypes.any,
  
};

DiscountTypeModel.defaultProps = {
  onAddDiscountType: null,
  onUpdateDiscountType: null,
  onDeleteDiscountType: null,
  onGetDiscountType: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  discountTypeData: null,
  recordStatusList: null,
};

