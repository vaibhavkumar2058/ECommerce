import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

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
}) {
  const [newAddressType, setNewAddressType] = useState({
    addressTypeName:"",
    description:"",
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
    setNewAddressType({
      ...newAddressType,
      [e.target.name]: e.target.value,
    });
  };

  const saveFileSelected= (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const saveHandler = async () => {
    newAddressType.file = fileSelected;
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
      debugger;
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

  useEffect(() => {
    if (isEdit) {
      setNewAddressType(addressTypeData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
      !newAddressType?.addressTypeName || !newAddressType?.description ;
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
            <Form.Label>AddressType</Form.Label>
            <Form.Control
              type="text"
              name="addressTypeName"
              placeholder="AddressTypeName"
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


          
          <Form.Group>
          <input type="file" className="custom-file-label" onChange={saveFileSelected} />
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
};

