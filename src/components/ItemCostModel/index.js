import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import { propTypes } from "react-bootstrap/esm/Image";



export default function ItemCostModel({
  onAddItemCost,
  onUpdateItemCost,
  onDeleteItemCost,
  isEdit,
  isDelete,
  onGetItemCost,
  id,
  onClose,
  itemCostData,
  recordStatusList = [],
  productList = [],
  measurementValueList = [],
  measurementTypeList =[],
  customTypeList=[],
  categoryTypeList=[],
}) {
  const [newItemCost, setNewItemCost] = useState({
    productId: null,
    measurementTypeId: null,
    measurementValueId: null,
    customTypeId: null,
    price:null,
    description: "",
    categoryTypeId: null,
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
  const [productOptions, setProductOptions] = useState(productList.map((product,item) =>(
    {
    key: item,
    text: product.productName,
    value: product.productId,
  })).filter((item) => item));
  const [measurementValueOptions, setMeasurementValueOptions] = useState(measurementValueList.map((measurementValue,item) =>(
    {
    key: item,
    text: measurementValue.Value,
    value: measurementValue.measurementValueId,
  })).filter((item) => item));
  const [measurementTypeOptions, setMeasurementTypeOptions] = useState(measurementTypeList.map((measurementType,item) =>(
    {
    key: item,
    text: measurementType.name,
    value: measurementType.measurementTypeId,
  })).filter((item) => item));

  const [customTypeOptions, setCustomTypeOptions] = useState(customTypeList.map((customType,item) =>(
    {
    key: item,
    text: customType.customTypeName,
    value: customType.customTypeId,
  })).filter((item) => item));
  const [categoryTypeOptions, setCategoryTypeOptions] = useState(categoryTypeList.map((categoryType, item) => (
    {
      key: item,
      text: categoryType.categoryTypeName,
      value: categoryType.categoryTypeId,
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
    setNewItemCost({
      ...newItemCost,
      [e.target.name]: e.target.value,
    });
  };

 
  const saveHandler = async () => {
   
    if (isEdit) {
      const response = await onUpdateItemCost(id, newItemCost);
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
      const response = await onAddItemCost(newItemCost);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'ItemCost Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'ItemCost Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteItemCost(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ItemCost Delete Failed.'
      })
    }
  };

  const dropdownHandler = (event,{name,value}) => {
    setNewItemCost((currentItemCost) => ({...currentItemCost,[name]: value}));
    
  }


  useEffect(() => {
    if (isEdit) {
      setNewItemCost(itemCostData);
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
      setProductOptions(productList.map((product,item) =>(
        {
        key: item,
        text: product.productName,
        value: product.productId,
      })).filter((item) => item));
      }, [productList]);

      useEffect(() => { 
        setMeasurementValueOptions(measurementValueList.map((measurementValue,item) =>(
          {
          key: item,
          text: measurementValue.value,
          value: measurementValue.measurementValueId,
        })).filter((item) => item));
        }, [measurementValueList]);

        useEffect(() => { 
          setMeasurementTypeOptions(measurementTypeList.map((measurementType,item) =>(
            {
            key: item,
            text: measurementType.name,
            value: measurementType.measurementTypeId,
          })).filter((item) => item));
          }, [measurementTypeList]);
          useEffect(() => { 
            setCustomTypeOptions(customTypeList.map((customType,item) =>(
              {
              key: item,
              text: customType.customTypeName,
              value: customType.customTypeId,
            })).filter((item) => item));
            }, [customTypeList]);
            useEffect(() => {
              setCategoryTypeOptions(categoryTypeList.map((categoryType, item) => (
                {
                  key: item,
                  text: categoryType.categoryTypeName,
                  value: categoryType.categoryTypeId,
                })).filter((item) => item));
          
            }, [categoryTypeList]);
    
  
  

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
   
    const isEnable =
      !newItemCost?.productId || !newItemCost?.categoryTypeId|| !newItemCost?.measurementTypeId || !newItemCost?.measurementValueId || !newItemCost?.customTypeId || !newItemCost?.price|| !newItemCost?.recordStatusId|| !newItemCost?.description;
    setSaveDisabled(isEnable);
  }, [newItemCost]);

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
            <Form.Group className="mb-3" controlId="categoryType">
                    <Form.Label>Category Type<span className="required">*</span></Form.Label>
                    <Dropdown
                      name="categoryTypeId"
                      placeholder='Select Category Type'
                      fluid
                      search
                      selection
                      options={categoryTypeOptions}
                      value={newItemCost?.categoryTypeId}
                      onChange={dropdownHandler}
                    />
                  </Form.Group>
          
          </div>
          <div className="col-md-6">
          <Form.Group
            className={styles.stFormContainer}
            controlId="formItemCost"
          >
            <Form.Label>Product<span className="required">*</span></Form.Label>
            <Dropdown
              name="productId"
              placeholder=" Select Product"
              fluid
              search
              selection
              options={productOptions}
              value={newItemCost?.productId}
              onChange={dropdownHandler}
            />
          </Form.Group>
         
          </div>
          </div>
          <div className="row">
            <div className="col-md-6">

          <Form.Group className="mb-3" controlId="MeasurementValueId">
            <Form.Label>Measurement Value<span className="required">*</span></Form.Label>
            <Dropdown
              name="measurementValueId"
              placeholder="Select Measurement Value"
              fluid
              search
              selection
              options={measurementValueOptions}
              value={newItemCost?.measurementValueId}
              onChange={dropdownHandler}
            />
          </Form.Group>
          </div>
          <div className="col-md-6">
             <Form.Group className="mb-3" controlId="measurementTypeId">
            <Form.Label>Measurement Type<span className="required">*</span></Form.Label>
            <Dropdown
              name="measurementTypeId"
              placeholder=" Select Measurement Type"
              fluid
              search
              selection
              options={measurementTypeOptions}
              value={newItemCost?.measurementTypeId}
              onChange={dropdownHandler}
            />
          </Form.Group>
          </div>
          </div>
          <div className="row">
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="customTypeId">
            <Form.Label>Custom Type<span className="required">*</span></Form.Label>
            <Dropdown
              name="customTypeId"
              placeholder="Select Custom Type"
              fluid
              search
              selection
              options={customTypeOptions}
              value={newItemCost?.customTypeId}
              onChange={dropdownHandler}
            />
          </Form.Group>
          </div>
            <div className="col-md-6">
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="price"
              placeholder="Price"
              value={newItemCost?.price}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          </div>
          <div className="row">
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newItemCost?.description}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          
          
          
            <div className="col-md-6">
          <Form.Group className="mb-3" controlId="recordStatusId">
            <Form.Label>Status<span className="required">*</span></Form.Label>
            <Dropdown
              name="recordStatusId"
              placeholder='Select Status'
              fluid
              search
              selection
              options={recordStatusOptions}
              value={newItemCost?.recordStatusId}
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

ItemCostModel.propTypes = {
  /**
   * Callback function for Add ItemCost
   */
  onAddItemCost: PropTypes.func,
  /**
   * Callback function for Update ItemCost
   */
  onUpdateItemCost: PropTypes.func,
  /**
   * Callback function for Delete ItemCost
   */
  onDeleteItemCost: PropTypes.func,
  /**
   * callback function for Get ItemsCost
   */
  onGetItemsCost: propTypes.func,
  /**
   * Callback function for Get ItemCost
   */
  onGetItemCost: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get ItemCost
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * itemCostData for object type
 */
  itemCostData: PropTypes.any,

    /**
 * recordStatusList for object type
 */
    recordStatusList: PropTypes.any,
    
    /**
 * productList for object type
 */
    productList: PropTypes.any,
     /**
 * measurementValueList for object type
 */
     measurementValueList: PropTypes.any,
      /**
 * measurementTypeList for object type
 */
   measurementTypeList: PropTypes.any,
   /**
 * customTypeList for object type
 */
   customTypeList: PropTypes.any,
   /**
 * categoryTypeList for object type
 */
   categoryTypeList: PropTypes.any,
};

ItemCostModel.defaultProps = {
  onAddItemCost: null,
  onUpdateItemCost: null,
  onDeleteItemCost: null,
  onGetItemCost: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  itemCostData: null,
  recordStatusList:null,
  productList:null,
  measurementTypeList:null,
  measurementValueList:null,
  customTypeList:null,
  categoryTypeList:null,
};