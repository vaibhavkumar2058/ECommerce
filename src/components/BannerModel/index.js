import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function BannerModel({
  onAddBanner,
  onUpdateBanner,
  onDeleteBanner,
  isEdit,
  isDelete,
  onGetBanner,
  id,
  onClose,
  bannerData,
  recordStatusList = [],
  // bannerTypeList = [],
  //recordStatus,
}) {
  const [newBanner, setNewBanner] = useState({
    bannerTypeId: null,
    title: "",
    description: "",
    recordStatusId: null,
  });
  
 

  const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatusList.map((recordStatus, item) => (
    {
      key: item,
      text: recordStatus.actionName,
      value: recordStatus.recordStatusId,
    })).filter((item) => item));
    // const [bannerTypeOptions, setBannerTypeOptions] = useState(bannerTypeList.map((bannerType, item) => (
    //   {
    //     key: item,
    //     text: bannerType.bannerTypeName,
    //     value: bannerType.bannerTypeId,
    //   })).filter((item) => item));
  

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
    setNewBanner({
      ...newBanner,
      [e.target.name]: e.target.value,
    });
  };


  const saveHandler = async () => {

    if (isEdit) {
      const response = await onUpdateBanner(id, newBanner);
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
      const response = await onAddBanner(newBanner);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Banner Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Banner Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteBanner(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Banner Delete Failed.'
      })
    }
  };
  const dropdownHandler = (event, { name, value }) => {
    setNewBanner((currentBanner) => ({ ...currentBanner, [name]: value }));

  }

  

  useEffect(() => {
    if (isEdit) {
      setNewBanner(bannerData);
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
  // useEffect(() => {
  //   setBannerTypeOptions(bannerTypeList.map((bannerType, item) => (
  //     {
  //       key: item,
  //       text: bannerType.bannerTypeName,
  //       value: bannerType.bannerTypeId,
  //     })).filter((item) => item));
  // }, [bannerTypeList]);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable = !newBanner?.bannerTypeId
      || !newBanner?.title
      || !newBanner?.description
      || !newBanner?.recordStatusId;
    setSaveDisabled(isEnable);
  }, [newBanner]);


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
              <Form.Group className="mb-3" controlId="recordStatusId">
                <Form.Label>Banner Type<span className="required">*</span></Form.Label>
                <Dropdown
                  name="bannerTypeId"
                  placeholder='Select Banner Type'
                  fluid
                  search
                  selection
                  // options={bannerTypeOptions}
                  value={newBanner?.bannerTypeId}
                  onChange={dropdownHandler}
                />
              </Form.Group>
            </div>
           
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Title<span className="required">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={newBanner?.title}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
            </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={newBanner?.description}
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
                  value={newBanner?.recordStatusId}
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

BannerModel.propTypes = {
  /**
   * Callback function for Add Banner
   */
  onAddBanner: PropTypes.func,
  /**
   * Callback function for Update Banner
   */
  onUpdateBanner: PropTypes.func,
  /**
   * Callback function for Delete Banner
   */
  onDeleteBanner: PropTypes.func,
  /**
   * Callback function for Get Banner
   */
  onGetBanner: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Banner
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * bannerData for object type
 */
  bannerData: PropTypes.any,
  /**
   * recordStatusList for object type
   */
  recordStatusList: PropTypes.any,
  // /**
  //  * bannerTypeList for object type
  //  */
  // bannerTypeList: PropTypes.any,
};

BannerModel.defaultProps = {
  onAddBanner: null,
  onUpdateBanner: null,
  onDeleteBanner: null,
  onGetBanner: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  bannerData: null,
  recordStatusList: null,
  // bannerTypeList: null,
};

