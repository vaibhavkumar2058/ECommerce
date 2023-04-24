import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function BannerTypeModel({
  onAddBannerType,
  onUpdateBannerType,
  onDeleteBannerType,
  isEdit,
  isDelete,
  onGetBannerType,
  id,
  onClose,
  bannerTypeData,
  recordStatusList = [],
 }) {
  const [newBannerType, setNewBannerType] = useState({
    bannerTypeName:"",
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


  const [saveDisabled, setSaveDisabled] = useState(true);
  const [buttonType, setButtonType] = useState("Save");

  const styles = {
    stFormContainer: css`
      width: 400px !important;
    `,
    stFormControl: css``,
  };

  const changeHandler = (e) => {
    setNewBannerType({
      ...newBannerType,
      [e.target.name]: e.target.value,
    });
  };

  

  const saveHandler = async () => {

    if (isEdit) {
      const response = await onUpdateBannerType(id, newBannerType);
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
      const response = await onAddBannerType(newBannerType);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'BannerType Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'BannerType Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteBannerType(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'BannerType Delete Failed.'
      })
    }
  };

  const dropdownHandler = (event,{name,value}) => {
    setNewBannerType((currentBannerType) => ({...currentBannerType, [name]: value}));
  }

  useEffect(() => {
    if (isEdit) {
      setNewBannerType(bannerTypeData);
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
       !newBannerType?.recordStatusId||!newBannerType?.bannerTypeName||!newBannerType?.description ;
    setSaveDisabled(isEnable);
  }, [newBannerType]);

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
            controlId="formBannerType"
          >
            <Form.Label>Banner Type<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="bannerTypeName"
              placeholder="Banner Type"
              value={newBannerType?.bannerTypeName}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newBannerType?.description}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="recordStatus">
            <Form.Label>Status<span className="required">*</span></Form.Label>
            <Dropdown
              name="recordStatusId"
              placeholder='Select Status'
              fluid
              search
              selection
              options={recordStatusOptions}
              value = {newBannerType?.recordStatusId}
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

BannerTypeModel.propTypes = {
  /**
   * Callback function for Add BannerType
   */
  onAddBannerType: PropTypes.func,
  /**
   * Callback function for Update BannerType
   */
  onUpdateBannerType: PropTypes.func,
  /**
   * Callback function for Delete BannerType
   */
  onDeleteBannerType: PropTypes.func,
  /**
   * Callback function for Get BannerType
   */
  onGetBannerType: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get BannerType
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * bannerTypeData for object type
 */
  bannerTypeData: PropTypes.any,
  /**
 * recordStatusData for object type
 */
  recordStatusList: PropTypes.any,
};

BannerTypeModel.defaultProps = {
  onAddBannerType: null,
  onUpdateBannerType: null,
  onDeleteBannerType: null,
  onGetBannerType: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  bannerTypeData: null,
  recordStatusList:null,
};

