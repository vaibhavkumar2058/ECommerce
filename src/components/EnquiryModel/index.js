import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import { Modal } from 'react-bootstrap';

export default function EnquiryModel({
  onAddEnquiry,
  onUpdateEnquiry,
  onDeleteEnquiry,
  isEdit,
  isDelete,
  onGetEnquiry,
  id,
  onClose,
  enquiryData,
}) {
  const [newEnquiry, setNewEnquiry] = useState({
    name: "",
    mobile:"",
    email:"",
    description:"",
    enquiryTypeId:null
  });

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
    setNewEnquiry({
      ...newEnquiry,
      [e.target.name]: e.target.value,
    });
  };

  const saveHandler = async () => {
    if (isEdit) {
      const response = await onUpdateEnquiry(id, newEnquiry);
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
      const response = await onAddEnquiry(newEnquiry);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Enquiry Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Enquiry Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteEnquiry(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Enquiry Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewEnquiry(enquiryData);
    }
  }, []);

  useEffect(() => {             
      if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
      !newEnquiry?.name || !newEnquiry?.mobile || !newEnquiry?.email || !newEnquiry?.description || !newEnquiry?.enquiryTypeId;
    setSaveDisabled(isEnable);
  }, [newEnquiry]);

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
            controlId="formEnquiry"
          >
            <Form.Label>Enquiry</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Enquiry"
              value={newEnquiry?.name}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="mobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={newEnquiry?.mobile}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newEnquiry?.description}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Email"
              value={newEnquiry?.email}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="enquiryTypeId">
            <Form.Label>EnquiryTypeId</Form.Label>
            <Form.Control
              type="text"
              name="enquiryTypeId"
              placeholder="EnquiryTypeId" 
              value={newEnquiry?.enquiryTypeId}
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

EnquiryModel.propTypes = {
  /**
   * Callback function for Add Enquiry
   */
  onAddEnquiry: PropTypes.func,
  /**
   * Callback function for Update Enquiry
   */
  onUpdateEnquiry: PropTypes.func,
  /**
   * Callback function for Delete Enquiry
   */
  onDeleteEnquiry: PropTypes.func,
  /**
   * Callback function for Get Enquiry
   */
  onGetEnquiry: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Enquiry
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * enquiryData for object type
 */
  enquiryData: PropTypes.any,
};

EnquiryModel.defaultProps = {
  onAddEnquiry: null,
  onUpdateEnquiry: null,
  onDeleteEnquiry: null,
  onGetEnquiry: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  enquiryData: null,
};

