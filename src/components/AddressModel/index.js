import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

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
  addressTypeList = [],
  recordStatusList = [],
  countryList = [],
  stateList = [],
  //recordStatus,
}) {
  const [newAddress, setNewAddress] = useState({
    countryId: null,
    stateId: null,
    city: "",
    town: "",
    locality: "",
    pincode: null,
    addressTypeId: null,
    landMark: "",
    isDefault: "",
    defaultAddressTypeId: null,
    recordStatusId: null,
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
      text: addressType.addressTypeName,
      value: addressType.addressTypeId,
    })).filter((item) => item));

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
  const dropdownHandler = (event, { name, value }) => {
    setNewAddress((currentAddress) => ({ ...currentAddress, [name]: value }));

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
    const isEnable = !newAddress?.city
      || !newAddress?.stateId
      || !newAddress?.countryId
      || !newAddress?.addressTypeId
      || !newAddress?.town
      || !newAddress?.pincode || !newAddress?.landMark
      || !newAddress?.recordStatusId;
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
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="stateId">
                <Form.Label>State<span className="required">*</span></Form.Label>
                <Dropdown
                  name="stateId"
                  placeholder='Select State'
                  fluid
                  search
                  selection
                  options={stateOptions}
                  value={newAddress?.stateId}
                  onChange={dropdownHandler}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="countryId">
                <Form.Label>Country<span className="required">*</span></Form.Label>
                <Dropdown
                  name="countryId"
                  placeholder='Select Country'
                  fluid
                  search
                  selection
                  options={countryOptions}
                  value={newAddress?.countryId}
                  onChange={dropdownHandler}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="addressTypeId">
                <Form.Label>AddressType</Form.Label>
                <Dropdown
                  name="addressTypeId"
                  placeholder='Select AddressType'
                  fluid
                  search
                  selection
                  options={addressTypeOptions}
                  value={newAddress?.addressTypeId}
                  onChange={dropdownHandler}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>City<span className="required">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  placeholder=" Select City"
                  value={newAddress?.city}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="town">
                <Form.Label>Town<span className="required">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="town"
                  placeholder=" Select Town"
                  value={newAddress?.town}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="locality">
                <Form.Label>Locality</Form.Label>
                <Form.Control
                  type="text"
                  name="locality"
                  placeholder=" Select Locality"
                  value={newAddress?.locality}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="pincode">
                <Form.Label>PinCode<span className="required">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="pincode"
                  placeholder=" Select Pincode"
                  value={newAddress?.pincode}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="isDefault">
                <Form.Label>IsDefault</Form.Label>
                <Form.Control
                  type="text"
                  name="isDefault"
                  placeholder=" Select IsDefault"
                  value={newAddress?.isDefault}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="landMark">
                <Form.Label>LandMark<span className="required">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="landMark"
                  placeholder=" Select LandMark"
                  value={newAddress?.landMark}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="defaultAddressTypeId">
                <Form.Label>Default Address Type</Form.Label>
                <Form.Control
                  type="text"
                  name="defaultAddressTypeId"
                  placeholder=" Select Default Address Type"
                  value={newAddress?.defaultAddressTypeId}
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
                  placeholder=" Select Description"
                  value={newAddress?.description}
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
                  value={newAddress?.recordStatusId}
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
  recordStatusList: null,
  countryList: null,
  stateList: null,
  addressTypeList: null,
};

