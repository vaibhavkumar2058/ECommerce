import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function ViewDetailsModel({
  isEdit,
  resourcesData,
  roleList = [],
  genderList = [],
  recordStatusList = [],
}) {
  const [details, setNewResources] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    roleId: null,
    genderId: null,
    mobileNumber: null,
    bloodGroup: "",
    email: "",
    password: "",
    isEmailVerified: true,
    isMobileVerified: true,
    recordStatusId: 1,
    attachment: null,
    resourcesAttachmentTypeId: 1003,
    resourcesImage:"",
  });


  const [roleOptions, setRoleOptions] = useState(roleList.map((role, item) => (
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
  const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatusList.map((recordStatus, item) => (
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
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) { 
        console.log('Error: ', error);
    };
}

const [previewImage, setPreviewImage] = useState('');
  const saveFileSelected = (e) => {
    let idCardBase64 = '';
getBase64(e.target.files[0], (result) => {
     idCardBase64 = result;
});
const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    //in case you wan to print the file selected
    console.log(idCardBase64);

    setFileSelected(e.target.files[0]);
    
  };

  const dropdownHandler = (event, { name, value }) => {
    setNewResources((currentResources) => ({ ...currentResources, [name]: value }));
  }

  useEffect(() => {
    if (isEdit) {
      setNewResources(resourcesData);
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
    setGenderOptions(genderList.map((gender, item) => (
      {
        key: item,
        text: gender.genderName,
        value: gender.genderId,
      })).filter((item) => item));
  }, [genderList]);

  useEffect(() => {
    setRoleOptions(roleList.map((role, item) => (
      {
        key: item,
        text: role.roleName,
        value: role.roleId,
      })).filter((item) => item));
  }, [roleList]);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    
    const isEnable =
      !details?.firstName
      || !details?.roleId || !details?.genderId
      || !details?.mobileNumber
      || !details?.email
      || !details?.password
      || !details?.recordStatusId;
    setSaveDisabled(isEnable);
  }, [details]);

  return (
    <>
        <div className="">
          <Form>
            <div className="row">
              <div className="col-md-3">
                <Form.Group
                  className={styles.stFormContainer}
                  controlId="formResources">
                  <Form.Label>First Name <span className="required">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={details?.firstName}
                    onChange={changeHandler}
                  />
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group className="mb-3" controlId="middleName">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="middleName"
                    placeholder="Middle Name"
                    value={details?.middleName}
                    onChange={changeHandler}
                  />
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={details?.lastName}
                    onChange={changeHandler}
                  />
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group>
                  <Form.Label>Photo</Form.Label>
                </Form.Group>
                <Form.Group>
                <img className="product-view" src={details?.resourcesImage} alt="Preview Image">
                </img>
                </Form.Group>
              </div>
              
              </div>
              
            <div className="row">
              
              <div className="col-md-3">
                <Form.Group className="mb-3" controlId="genderId">
                  <Form.Label>Gender</Form.Label>
                  <Dropdown
                    name="genderId"
                    // placeholder='Select Gender'
                    fluid
                    search
                    selection
                    options={genderOptions}
                    value={details?.genderId}
                    onChange={dropdownHandler}
                  />
                </Form.Group>
              </div>
           
              <div className="col-md-3">
                <Form.Group className="mb-3" controlId="mobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={details?.mobileNumber}
                    onChange={changeHandler}
                  />
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={details?.email}
                    onChange={changeHandler}
                  />
                </Form.Group>
              </div>
           
              <div className="col-md-3">
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={details?.password}
                    onChange={changeHandler}
                  />
                </Form.Group>
              </div>
              </div>
            <div className="row">
            <div className="col-md-3">
                <Form.Group className="mb-3" controlId="roleId">
                  <Form.Label>Role</Form.Label>
                  <Dropdown
                    name="roleId"
                    placeholder='Select Role'
                    fluid
                    search
                    selection
                    options={roleOptions}
                    value={details?.roleId}
                    onChange={dropdownHandler}
                  />
                </Form.Group>
              </div>
            
              <div className="col-md-3">
                <Form.Group className="mb-3" controlId="recordStatusId">
                  <Form.Label>Status</Form.Label>
                  <Dropdown
                    name="recordStatusId"
                    placeholder='Select Status'
                    fluid
                    search
                    selection
                    options={recordStatusOptions}
                    value={details?.recordStatusId}
                    onChange={dropdownHandler}
                  />
                </Form.Group>
              </div>
            </div>
            
          </Form>
        </div>
    </>
  );
}
