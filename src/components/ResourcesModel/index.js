import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import Resourcess from "../../pages/Resources";

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
  roles,
  genders,
  // recordStatuss,

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
    recordStatusId: null,

    attachment: null,

  });

  const [roleOptions, setRoleOptions] = useState(roles.map((role, i) => (
    {
      key: i,
      label: role.roleName,
      value: role.roleId,
    })).filter((item) => item));
  const [genderOptions, setGenderOptions] = useState(genders.map((gender, i) => (
    {
      key: i,
      label: gender.genderName,
      value: gender.genderId,
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

  const selectChangeHandler = (e) => {
    setNewResources({
      ...newResources,
      "roleId": e.value,
    });
  };

  const saveFileSelected = (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const saveHandler = async () => {
    newResources.file = fileSelected;
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

  useEffect(() => {
    setRoleOptions(roles.map((role, i) => (
      {
        key: i,
        label: role.roleName,
        value: role.roleId,
      })).filter((item) => item));

  }, [roles]);
  useEffect(() => {
    setGenderOptions(genders.map((gender, i) => (
      {
        key: i,
        label: gender.genderName,
        value: gender.genderId,
      })).filter((item) => item));

  }, [genders]);



  useEffect(() => {
    if (isEdit) {
      setNewResources(resourcesData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
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

          <Form.Group className="mb-3" controlId="roleId">
            <Form.Label>Role</Form.Label>
            <Select options={roleOptions} 
              name="roleId"
              value={newResources?.roleId}
              onChange={selectChangeHandler} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="genderId">
            <Form.Label>Gender</Form.Label>
            <Select options={genderOptions} name="genderId"
              value={newResources?.genderId}
              onChange={selectChangeHandler} />
          </Form.Group>


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
          <Form.Group className="mb-3" controlId="recordStatusId">
            <Form.Label>RecordStatusId</Form.Label>
            <Form.Control
              type="text"
              name="recordStatusId"
              placeholder="RecordStatusId"
              value={newResources?.recordStatusId}
              onChange={changeHandler}
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
* roles for object type
*/
  roles: PropTypes.any,
  /**
  * genders for object type
  */
  genders: PropTypes.any,


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
  roles: null,
  genders: null,

};