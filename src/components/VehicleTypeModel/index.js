import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
export default function VehicleTypeModel({
  onAddVehicleType,
  onUpdateVehicleType,
  onDeleteVehicleType,
  isEdit,
  isDelete,
  onGetVehicleType,
  id,
  onClose,
  vehicleTypeData,
  recordStatusList = [],
}) {
  const [newVehicleType, setNewVehicleType] = useState({
    vehicleTypeName: "",
    description: "",
    recordStatusId:null,
  });

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
    setNewVehicleType({
      ...newVehicleType,
      [e.target.name]: e.target.value,
    });
  };

  const saveFileSelected = (e) => {
    setFileSelected(e.target.files[0]);
  };
  const saveHandler = async () => {
    newVehicleType.file = fileSelected;
    if (isEdit) {
      const response = await onUpdateVehicleType(id, newVehicleType);
      if (response.payload.title == "Success") {
        onClose(true);
      } else {
        setMessageStatus({
          mode: "danger",
          message: "Un-Known Error Occured.",
        });
      }
    } else {

      const response = await onAddVehicleType(newVehicleType);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: "success",
          message: "VehicleType Record Saved Succefully.",
        });
        onClose(true);
        console.log(response.payload);
      } else {
        setMessageStatus({
          mode: "danger",
          message: "VehicleType Save Failed.",
        });
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteVehicleType(id);
    if (response.payload.title == "Success") {
      onClose(true);
    } else {
      setMessageStatus({
        mode: "danger",
        message: "VehicleType Delete Failed.",
      });
    }
  };

  const dropdownHandler = (event,{name , value}) => {
    setNewVehicleType((currentVehicleType) => ({...currentVehicleType, [name]: value}));
  }


  useEffect(() => {
    if (isEdit) {
      setNewVehicleType(vehicleTypeData);
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
      !newVehicleType?.vehicleTypeName || !newVehicleType?.recordStatusId;
    setSaveDisabled(isEnable);
  }, [newVehicleType]);

  return (
    <>
      {messageStatus.message && (
        <Alert key={messageStatus.mode} variant={messageStatus.mode}>
          {messageStatus.message}
        </Alert>
      )}
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
            controlId="formVehicleType"
          >
            <Form.Label>VehicleType Name<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="vehicleTypeName"
              placeholder="VehicleType Name"
              value={newVehicleType?.vehicleTypeName}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newVehicleType?.description}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          </div>
          <div className="row">
            <div className="col-md-6">
          
          <Form.Group className="mb-3" controlId="recordStatus">
            <Form.Label>Status<span className="required">*</span></Form.Label>
            <Dropdown
              name="recordStatusId"
              placeholder='Select Action'
              fluid
              search
              selection
              options={recordStatusOptions}
              value = {newVehicleType?.recordStatusId}
              onChange={dropdownHandler}
            />
          </Form.Group>
          </div>
          </div>
         

          {/* <Form.Group>
            <input
              type="file"
              className="custom-file-label"
              onChange={saveFileSelected}
            />
          </Form.Group> */}
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={saveHandler}
              disabled={saveDisabled}
            >
              {buttonType}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </>
  );
}

VehicleTypeModel.propTypes = {
  /**
   * Callback function for Add VehicleType
   */
  onAddVehicleType: PropTypes.func,
  /**
   * Callback function for Update VehicleType
   */
  onUpdateVehicleType: PropTypes.func,
  /**
   * Callback function for Delete VehicleType
   */
  onDeleteVehicleType: PropTypes.func,
  /**
   * Callback function for Get VehicleType
   */
  onGetVehicleType: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get VehicleType
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
   * VehicleTypeData for object type
   */
  VehicleTypeData: PropTypes.any,
   /**
 * recordStatusData for object type
 */
   recordStatusList: PropTypes.any,
};

VehicleTypeModel.defaultProps = {
  onAddVehicleType: null,
  onUpdateVehicleType: null,
  onDeleteVehicleType: null,
  onGetVehicleType: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  VehicleTypeData: null,
  recordStatusList:null,
};
