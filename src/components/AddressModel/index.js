import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

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
}) {
  const [newAddress, setNewAddress] = useState({
    countryId:null,
    stateId:null,
    city:"",
    town:"",
    locality:"",
    pinCode:null,
    addressTypeId:null,
    isDefault:"",
    defaultAddressTypeId:null,
    
  });

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
    if (isEdit) {
      setNewAddress(addressData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
      !newAddress?.countryId || !newAddress?.stateId || !newAddress?.city || !newAddress?.town  || !newAddress?.locality|| !newAddress?.pinCode || !newAddress?.addressTypeId || !newAddress?.isDefault|| !newAddress?.defaultAddressTypeId ;
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
          <Form.Group
            className={styles.stFormContainer}
            controlId="formAddress"
          >
            <Form.Label>CountryId</Form.Label>
            <Form.Control
              type="text"
              name="countryId"
              placeholder="CountryId"
              value={newAddress?.countryId}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="state">
            <Form.Label>StateId</Form.Label>
            <Form.Control
              type="text"
              name="stateId"
              placeholder="StateId"
              value={newAddress?.stateId}
              onChange={changeHandler}
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
              name="pinCode"
              placeholder="PinCode"
              value={newAddress?.pinCode}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>AddressTypeId</Form.Label>
            <Form.Control
              type="text"
              name="addressTypeId"
              placeholder="AddressTypeId"
              value={newAddress?.addressTypeId}
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

          <Form.Group className="mb-3" controlId="defaultAddressTypeId">
            <Form.Label>DefaultAddressTypeId</Form.Label>
            <Form.Control
              type="text"
              name="defaultAddressTypeId"
              placeholder="DefaultAddressTypeId"
              value={newAddress?.defaultAddressTypeId}
              onChange={changeHandler}
            />
            
          
          
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={saveHandler}
              disabled={saveDisabled}>
              {buttonType}
            </Button>
          </Modal.Footer>
          </Form.Group>
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
};

