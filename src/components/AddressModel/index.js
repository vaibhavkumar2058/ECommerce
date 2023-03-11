import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';



export default function AddressModel({
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
  isEdit,
  isDelete,
  onGetAddress,
  id,
  onClose,
  addressData,
  addressTypeList=[],
  recordStatusList = [],
  countryList=[],
  stateList = [],
  //recordStatus,
}) {
  const [newAddress, setNewAddress] = useState({
    countryId:null,
    stateId:null,
    city:"",
    town:"",
    locality:"",
    pincode:null,
    addressTypeId:null,
    landMark:"",
    isDefault:"",
    defaultAddressTypeId:null,
    recordStatusId:null,

    
  });
  const [countryOptions, setCountryOptions] = useState(countryList.map((country, item) => (
    {
      key: item,
      text: country.countryName,
      value: country.countryId,
    })).filter((item) => item));
    const [stateOptions, setStateOptions] = useState(stateList.map((state, item) => (
      {
        key: item,
        text: state.stateName,
        value: state.stateId,
      })).filter((item) => item));
      const [addressTypeOptions, setAddressTypeOptions] = useState(addressTypeList.map((addressType, item) => (
        {
          key: item,
          text:addressType.addressTypeName,
          value: addressType.addressTypeId,
        })).filter((item) => item));
     
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

  const [saveDisabled, setSaveDisabled] = useState(true);
  const [buttonType, setButtonType] = useState("Save");

  const styles = {
    stFormContainer: css`
      width: 400px !important;
    `,
    stFormControl: css``,
  };

  const changeHandler = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };
  

  const saveHandler = async () => {
 
    if (isEdit) {
      const response = await onUpdateAddress(id, newAddress);
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
      const response = await onAddAddress(newAddress);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Address Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Address Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteAddress(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Address Delete Failed.'
      })
    }
  };
  const dropdownHandler = (event,{value}) => {
    setNewAddress((currentAddress) => ({...currentAddress, recordStatusId: value}));
    setNewAddress((currentAddress) => ({...currentAddress, countryId: value}));
    setNewAddress((currentAddress) => ({...currentAddress, stateId: value}));
    setNewAddress((currentAddress) => ({...currentAddress, addressTypeId: value}));

  }

  useEffect(() => {
    setCountryOptions(countryList.map((country, item) => (
      {
        key: item,
        text: country.countryName,
        value: country.countryId,
      })).filter((item) => item));

  }, [countryList]);
  useEffect(() => {
    setStateOptions(stateList.map((state, item) => (
      {
        key: item,
        text: state.stateName,
        value: state.stateId,
      })).filter((item) => item));

  }, [stateList]);
  useEffect(() => {
    setAddressTypeOptions(addressTypeList.map((addressType, item) => (
      {
        key: item,
        text: addressType.addressTypeName,
        value: addressType.addressTypeId,
      })).filter((item) => item));

  }, [addressTypeList]);
 
  useEffect(() => {
    if (isEdit) {
      setNewAddress(addressData);
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
    const isEnable = !newAddress?.city || !newAddress?.stateId  || !newAddress?.countryId || !newAddress?.addressTypeId|| !newAddress?.town  || !newAddress?.locality || !newAddress?.pincode|| !newAddress?.landMark|| !newAddress?.recordStatusId ;
    setSaveDisabled(isEnable);
  }, [newAddress]);

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
           <Form.Group className="mb-3" controlId="state">
            <Form.Label>State</Form.Label>
            <Dropdown
              name="stateName"
              placeholder='Select State'
              fluid
              search
              selection
              options={stateOptions}
              value = {newAddress?.stateId}
              onChange={dropdownHandler}
            />
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Dropdown
              name="countryName"
              placeholder='Select CountryName'
              fluid
              search
              selection
              options={countryOptions}
              value = {newAddress?.countryId}
              onChange={dropdownHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="addressType">
            <Form.Label>AddressType</Form.Label>
            <Dropdown
              name="addressTypeName"
              placeholder='Select AddressTypeName'
              fluid
              search
              selection
              options={addressTypeOptions}
              value = {newAddress?.addressTypeId}
              onChange={dropdownHandler}
            />
          </Form.Group>
         

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              placeholder="City"
              value={newAddress?.city}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="recordStatus">
            <Form.Label>RecordStatus</Form.Label>
            <Dropdown
              name="actionName"
              placeholder='Select Action'
              fluid
              search
              selection
              options={recordStatusOptions}
              value = {newAddress?.recordStatusId}
              onChange={dropdownHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="town">
            <Form.Label>Town</Form.Label>
            <Form.Control
              type="text"
              name="town"
              placeholder="Town"
              value={newAddress?.town}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="locality">
            <Form.Label>Locality</Form.Label>
            <Form.Control
              type="text"
              name="locality"
              placeholder="Locality"
              value={newAddress?.locality}
              onChange={changeHandler}
            />
            </Form.Group>
          <Form.Group className="mb-3" controlId="pincode">
            <Form.Label>PinCode</Form.Label>
            <Form.Control
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={newAddress?.pincode}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="isDefault">
            <Form.Label>IsDefault</Form.Label>
            <Form.Control
              type="text"
              name="isDefault"
              placeholder="IsDefault"
              value={newAddress?.isDefault}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="landMark">
            <Form.Label>LandMark</Form.Label>
            <Form.Control
              type="text"
              name="landMark"
              placeholder="LandMark"
              value={newAddress?.landMark}
              onChange={changeHandler}
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="defaultAddressTypeId">
            <Form.Label>DefaultAddressTypeId</Form.Label>
            <Form.Control
              type="text"
              name="defaultAddressTypeId"
              placeholder="DefaultAddressTypeId"
              value={newAddress?.defaultAddressTypeId}
              onChange={changeHandler}
            />
            </Form.Group>
             <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newAddress?.description}
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

AddressModel.propTypes = {
  /**
   * Callback function for Add Address
   */
  onAddAddress: PropTypes.func,
  /**
   * Callback function for Update Address
   */
  onUpdateAddress: PropTypes.func,
  /**
   * Callback function for Delete Address
   */
  onDeleteAddress: PropTypes.func,
  /**
   * Callback function for Get Address
   */
  onGetAddress: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Address
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * addressData for object type
 */
  addressData: PropTypes.any,
  /**
* countries for object type
*/
countries: PropTypes.any,
/**
* states for object type
*/
states: PropTypes.any,
/**
* addressTypes for object type
*/
addressTypes: PropTypes.any,
/**
 * recordStatusList for object type
 */
recordStatusList: PropTypes.any,
/**
 * countryList for object type
 */
countryList: PropTypes.any,
/**
 * stateList for object type
 */
stateList: PropTypes.any,
/**
 * addressTypeList for object type
 */
addressTypeList: PropTypes.any,
};

AddressModel.defaultProps = {
  onAddAddress: null,
  onUpdateAddress: null,
  onDeleteAddress: null,
  onGetAddress: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  addressData: null,
  recordStatusList:null,
  countryList:null,
  stateList:null,
  addressTypeList:null,
};

