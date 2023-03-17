import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';



export default function ResourcesModel({
  onAddResources,
  onUpdateResources,
  onDeleteResources,
  isEdit,
  isDelete,
  onGetResources,
  id,
  onClose,
  resourcesData,
  roleList=[],
  genderList=[],
  recordStatusList = [],

}) {
  const [newResources, setNewResources] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    roleId: null,
    genderId: null,
    mobileNumber: null,
    addressId: null,
    bloodGroup: "",
    email: "",
    password: "",
    isEmailVerified: true,
    isMobileVerified: true,
    recordStatusId:null,
    attachment: null,
    resourcesAttachmentType:3,


  });
  

  const [roleOptions, setRoleOptions] = useState(roleList.map((role,item) =>(
    {
    key: item,
    text: role.roleName,
    value: role.roleId,
  })).filter((item) => item));

  const [genderOptions, setGenderOptions] = useState(genderList.map((gender, item) => (
    {
      key: item,
      text: gender.genderName,
      value: gender.genderId,
    })).filter((item) => item));
    const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatusList.map((recordStatus,item) =>(
      {
      key: item,
      text: recordStatus.actionName,
      value: recordStatus.recordStatusId,
    })).filter((item) => item));


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
    setNewResources({
      ...newResources,
      [e.target.name]: e.target.value,
    });
  };

 
  const saveFileSelected = (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const saveHandler = async () => {
    newResources.attachment = fileSelected;
    if (isEdit) {
      const response = await onUpdateResources(id, newResources);
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

      const response = await onAddResources(newResources);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Resources Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Resources Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteResources(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Resources Delete Failed.'
      })
    }
  };

  const dropdownHandler = (event,{value}) => {
    setNewResources((currentResources) => ({...currentResources, roleId: value}));
    setNewResources((currentResources) => ({...currentResources, genderId: value}));
    setNewResources((currentResources) => ({...currentResources, recordStatusId: value}));
  } 


  useEffect(() => {
    if (isEdit) {
      setNewResources(resourcesData);
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
      setGenderOptions(genderList.map((gender, item) => (
      {
        key: item,
        text: gender.genderName,
        value: gender.genderId,
      })).filter((item) => item));
    },[genderList]);

      useEffect(() => { 
        setRoleOptions (roleList.map((role, item) => (
          {
            key: item,
            text: role.roleName,
            value: role.roleId,
          })).filter((item) => item));
      },[roleList]);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    debugger
    const isEnable =
      !newResources?.firstName || !newResources?.middleName || !newResources?.lastName || !newResources?.roleId || !newResources?.genderId || !newResources?.mobileNumber || !newResources?.addressId || !newResources?.bloodGroup || !newResources?.email || !newResources?.password || !newResources?.isEmailVerified || !newResources?.isMobileVerified || !newResources?.recordStatusId;
    setSaveDisabled(isEnable);
  }, [newResources]);

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
            controlId="formResources"
          >
            <Form.Label>FirstName</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="FirstName"
              value={newResources?.firstName}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="middleName">
            <Form.Label>MiddleName</Form.Label>
            <Form.Control
              type="text"
              name="middleName"
              placeholder="MiddleName"
              value={newResources?.middleName}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>LastName</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="LastName"
              value={newResources?.lastName}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="roleId">
            <Form.Label>Role</Form.Label>
            <Dropdown
              name="roleName"
              placeholder='Select Action'
              fluid
              search
              selection
              options={roleOptions}
              value = {newResources?.roleId}
              onChange={dropdownHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="genderId">
            <Form.Label>Gender</Form.Label>
            <Dropdown
              name="genderName"
              placeholder='Select Action'
              fluid
              search
              selection
              options={genderOptions}
              value = {newResources?.genderId}
              onChange={dropdownHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="mobileNumber">
            <Form.Label>MobileNumber</Form.Label>
            <Form.Control
              type="text"
              name="mobileNumber"
              placeholder="MobileNumber"
              value={newResources?.mobileNumber}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="addressId">
            <Form.Label>addressId</Form.Label>
            <Form.Control
              type="text"
              name="addressId"
              placeholder="AddressId"
              value={newResources?.addressId}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bloodGroup">
            <Form.Label>BloodGroup</Form.Label>
            <Form.Control
              type="text"
              name="bloodGroup"
              placeholder="BloodGroup"
              value={newResources?.bloodGroup}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Email"
              value={newResources?.email}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              name="password"
              placeholder="Password"
              value={newResources?.password}
              onChange={changeHandler}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="isEmailVerified">
            <Form.Label>IsEmailVerified</Form.Label>
            <Form.Control
              type="text"
              name="isEmailVerified"
              placeholder="IsEmailVerified"
              value={newResources?.isEmailVerified}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="isMobileVerified">
            <Form.Label>IsMobileVerified</Form.Label>
            <Form.Control
              type="text"
              name="isMobileVerified"
              placeholder="isMobileVerified"
              value={newResources?.isMobileVerified}
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
              value = {newResources?.recordStatusId}
              onChange={dropdownHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Resources Image</Form.Label>
          </Form.Group>
          <Form.Group>
            <input type="file" onChange={saveFileSelected} />
          </Form.Group>

          <Form.Group>

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

ResourcesModel.propTypes = {
  /**
   * Callback function for Add Resources
   */
  onAddResources: PropTypes.func,
  /**
   * Callback function for Update Resources
   */
  onUpdateResources: PropTypes.func,
  /**
   * Callback function for Delete Resources
   */
  onDeleteResources: PropTypes.func,
  /**
   * Callback function for Get Resources
   */
  onGetResources: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for GetPResources
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * resourcesData for object type
 */
  resourcesData: PropTypes.any,
  /**
* roleList for object type
*/
  roleList: PropTypes.any,
  /**
  * genderList for object type
  */
  genderList: PropTypes.any,
  /**
 * recordStatusData for object type
 */
  recordStatusList: PropTypes.any,


};

ResourcesModel.defaultProps = {
  onAddResources: null,
  onUpdateResources: null,
  onDeleteResources: null,
  onGetResources: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  resourcesData: null,
  roleList: null,
  genderList: null,
  recordStatusList:null,

};