import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function CountryModel({
  onAddCountry,
  onUpdateCountry,
  onDeleteCountry,
  isEdit,
  isDelete,
  onGetCountry,
  id,
  onClose,
  countryData,
  recordStatusList = [],
}) {
  const [newCountry, setNewCountry] = useState({
    countryName: "",
    regionCode: null,
    description: "",
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
    setNewCountry({
      ...newCountry,
      [e.target.name]: e.target.value,
    });
  };

  const saveHandler = async () => {
    
    if (isEdit) {
      const response = await onUpdateCountry(id, newCountry);
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
      const response = await onAddCountry(newCountry);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Country Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Country Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteCountry(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Country Delete Failed.'
      })
    }
  };

  const dropdownHandler = (event,{name,value}) => {
    setNewCountry((currentCountry) => ({...currentCountry, [name]: value}));
  }


  useEffect(() => {
    if (isEdit) {
      setNewCountry(countryData);
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
      !newCountry?.countryName 
      || !newCountry?.regionCode 
      || !newCountry?.recordStatusId;
    setSaveDisabled(isEnable);
  }, [newCountry]);

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
          <Form.Group
            className={styles.stFormContainer}
            controlId="formCountry"
          >
            <Form.Label>Country<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="countryName"
              placeholder="Country"
              value={newCountry?.countryName}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="regioncode">
            <Form.Label>Region<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="regionCode"
              placeholder="Region"
              value={newCountry?.regionCode}
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
              value={newCountry?.description}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="recordStatus">
            <Form.Label>Status<span className="required">*</span></Form.Label>
            <Dropdown
              name="recordStatusId"
              placeholder='Select Status'
              fluid
              search
              selection
              options={recordStatusOptions}
              value = {newCountry?.recordStatusId}
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

CountryModel.propTypes = {
  /**
   * Callback function for Add Country
   */
  onAddCountry: PropTypes.func,
  /**
   * Callback function for Update Country
   */
  onUpdateCountry: PropTypes.func,
  /**
   * Callback function for Delete Country
   */
  onDeleteCountry: PropTypes.func,
  /**
   * Callback function for Get Country
   */
  onGetCountry: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Country
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * countryData for object type
 */
  countryData: PropTypes.any,

   /**
 * recordStatusData for object type
 */
   recordStatusList: PropTypes.any,
};

CountryModel.defaultProps = {
  onAddCountry: null,
  onUpdateCountry: null,
  onDeleteCountry: null,
  onGetCountry: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  countryData: null,
  recordStatusList:null,
};

