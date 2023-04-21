import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function DiscountModel({
  onAddDiscount,
  onUpdateDiscount,
  onDeleteDiscount,
  isEdit,
  isDelete,
  onGetDiscount,
  id,
  onClose,
  discountData,
  recordStatusList = [],
  discountTypeList=[],

 }) {
  const [newDiscount, setNewDiscount] = useState({
    discountCode:"",
    discountTypeId:null,
    discountValue:null,
    isActive:"",
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
  const [discountTypeOptions, setDiscountTypeOptions] = useState(discountTypeList.map((discountType,item) =>(
    {
    key: item,
    text: discountType.discountTypeName,
    value: discountType.discountTypeId,
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
    setNewDiscount({
      ...newDiscount,
      [e.target.name]: e.target.value,
    });
  };

  

  const saveHandler = async () => {

    if (isEdit) {
      const response = await onUpdateDiscount(id, newDiscount);
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
      const response = await onAddDiscount(newDiscount);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Discount Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Discount Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteDiscount(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Discount Delete Failed.'
      })
    }
  };

  const dropdownHandler = (event,{name,value}) => {
    setNewDiscount((currentDiscount) => ({...currentDiscount, [name]: value}));
  }

  useEffect(() => {
    if (isEdit) {
      setNewDiscount(discountData);
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
      setDiscountTypeOptions(discountTypeList.map((discountType,item) =>(
        {
        key: item,
        text: discountType.discountTypeName,
      value: discountType.discountTypeId,
      })).filter((item) => item));
      }, [discountTypeList]);
    

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
       !newDiscount?.recordStatusId ;
    setSaveDisabled(isEnable);
  }, [newDiscount]);

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
          <Form.Group
            className={styles.stFormContainer}
            controlId="formDiscount"
          >
            <Form.Label>Discount Code<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="discountCode"
              placeholder="Discount Code"
              value={newDiscount?.discountCode}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          <div className="col-md-4">
          <Form.Group
            className={styles.stFormContainer}
            controlId="formDiscountType"
          >
           
            <Form.Label>Discount Type<span className="required">*</span></Form.Label>
            <Dropdown
              name="discountTypeId"
              placeholder='Select Discount Type'
              fluid
              search
              selection
              options={discountTypeOptions}
              value = {newDiscount?.discountTypeId}
              onChange={dropdownHandler}
            />
          </Form.Group>
          </div>
         
          <div className="col-md-4">
          <Form.Group
            className={styles.stFormContainer}
            controlId="formDiscountValue"
          >
            <Form.Label>Discount Value<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="discountValue"
              placeholder="Discount Value"
              value={newDiscount?.discountValue}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          </div>
          <div className="row">
            <div className="col-md-4">
          <Form.Group
            className={styles.stFormContainer}
            controlId="formIsActive"
          >
            <Form.Label>Is Active<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="isActive"
              placeholder="Is Active"
              value={newDiscount?.isActive}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          
          <div className="col-md-4">
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newDiscount?.description}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          <div className="col-md-4">
          <Form.Group className="mb-3" controlId="recordStatus">
            <Form.Label>Status<span className="required">*</span></Form.Label>
            <Dropdown
              name="recordStatusId"
              placeholder='Select Status'
              fluid
              search
              selection
              options={recordStatusOptions}
              value = {newDiscount?.recordStatusId}
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

DiscountModel.propTypes = {
  /**
   * Callback function for Add Discount
   */
  onAddDiscount: PropTypes.func,
  /**
   * Callback function for Update Discount
   */
  onUpdateDiscount: PropTypes.func,
  /**
   * Callback function for Delete Discount
   */
  onDeleteDiscount: PropTypes.func,
  /**
   * Callback function for Get Discount
   */
  onGetDiscount: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Discount
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 *discountData for object type
 */
 discountData: PropTypes.any,
  /**
 * recordStatusData for object type
 */
  recordStatusList: PropTypes.any,
  /**
 * discountTypeData for object type
 */
  discountTypeList: PropTypes.any,
};

DiscountModel.defaultProps = {
  onAddDiscount: null,
  onUpdateDiscount: null,
  onDeleteDiscount: null,
  onGetDiscount: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  discountData: null,
  recordStatusList:null,
  discountTypeList:null,
};

