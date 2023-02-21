import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import Addresses from "../../pages/Address";


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
  countries,
  states,
  addressTypes,
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
  const [countryOptions, setCountryOptions] = useState(countries.map((country, i) => (
    {
      key: i,
      label: country.countryName,
      value: country.countryId,
    })).filter((item) => item));
    const [stateOptions, setStateOptions] = useState(states.map((state, j) => (
      {
        key: j,
        label: state.stateName,
        value: state.stateId,
      })).filter((item) => item));
      const [addressTypeOptions, setAddressTypeOptions] = useState(addressTypes.map((addressType, k) => (
        {
          key: k,
          label:addressType.addressTypeName,
          value: addressType.addressTypeId,
        })).filter((item) => item));
        // const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatus.map((recordStatus, L) => (
        //   {
        //     key: L,
        //     label: recordStatus.recordStatusName,
        //     value: recordStatus.recordStatusId,
        //   })).filter((item) => item));

  const [fileSelected, setFileSelected] = useState();

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
  const selectChangeHandler = (e) => {
    debugger;
    setNewAddress({
      ...newAddress,
      "addressId": e.value,
    });
  };
  

  const saveHandler = async () => {
    newAddress.file = fileSelected;
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
      debugger;
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
  useEffect(() => {
    setCountryOptions(countries.map((country, i) => (
      {
        key: i,
        label: country.countryName,
        value: country.countryId,
      })).filter((item) => item));

  }, [countries]);
  useEffect(() => {
    setStateOptions(states.map((state, j) => (
      {
        key: j,
        label: state.stateName,
        value: state.stateId,
      })).filter((item) => item));

  }, [states]);
  useEffect(() => {
    setAddressTypeOptions(addressTypes.map((addressType, k) => (
      {
        key: k,
        label: addressType.addressTypeName,
        value: addressType.addressTypeId,
      })).filter((item) => item));

  }, [addressTypes]);
  // useEffect(() => {
  //   setRecordStatusOptions(recordStatus.map((recordStatus, L) => (
  //     {
  //       key: L,
  //       label: recordStatus.recordStatusName,
  //       value: recordStatus.recordStatusId,
  //     })).filter((item) => item));
  // }, [recordStatus]);
  useEffect(() => {
    if (isEdit) {
      setNewAddress(addressData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    debugger;
    const isEnable = !newAddress?.city || !newAddress?.town  || !newAddress?.locality || !newAddress?.pincode|| !newAddress?.landMark|| !newAddress?.recordStatusId ;
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
           <Form.Group className="mb-3" controlId="countryId">
            <Form.Label>Country</Form.Label>
            <Select options={countryOptions} name="countryId"
              value={newAddress?.countryId}
              onChange={selectChangeHandler} />
          </Form.Group>
        
           <Form.Group className="mb-3" controlId="stateId">
            <Form.Label>State</Form.Label>
            <Select options={stateOptions} name="stateId"
              value={newAddress?.stateId}
              onChange={selectChangeHandler} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="addressTypeId">
            <Form.Label>AddressType</Form.Label>
            <Select options={addressTypeOptions} name="addressTypeId"
              value={newAddress?.addressTypeId}
              onChange={selectChangeHandler} />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="recordStatusId">
            <Form.Label>RecordStatus</Form.Label>
            <Select options={recordStatusOptions} name="recordStatusId"
              value={newAddress?.recordStatusId}
              onChange={selectChangeHandler} />
          </Form.Group> */}

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
// /**
// * recordStatuss for object type
// */
// recordStatuss: PropTypes.any,
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
  countries: null,
  states: null,
  addressTypes: null,
  //recordStatuss: null,
};

