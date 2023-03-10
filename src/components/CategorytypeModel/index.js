import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function CategorytypeModel({
  onAddCategoryType,
  onUpdateCategoryType,
  onDeleteCategoryType,
  isEdit,
  isDelete,
  onGetCategoryType,
  id,
  onClose,
  categoryTypeData,
  recordStatusList = [],
}) {
  const [newCategoryType, setNewCategoryType] = useState({
    categoryTypeName: "",
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
    setNewCategoryType({
      ...newCategoryType,
      [e.target.name]: e.target.value,
    });
  };

  const saveHandler = async () => {
    if (isEdit) {
      const response = await onUpdateCategoryType(id, newCategoryType);
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
   
      const response = await onAddCategoryType(newCategoryType);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'CategoryType Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'CategoryType Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteCategoryType(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'CategoryType Delete Failed.'
      })
    }
  };

  const dropdownHandler = (event,{value}) => {
    setNewCategoryType((currentCategoryType) => ({...currentCategoryType, recordStatusId: value}));
  }

  useEffect(() => {
    if (isEdit) {
      setNewCategoryType(categoryTypeData);
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
      !newCategoryType?.categoryTypeName|| !newCategoryType?.description|| !newCategoryType?.recordStatusId;
    setSaveDisabled(isEnable);
  }, [newCategoryType]);

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
            controlId="formCategoryType"
          >
            <Form.Label>CategoryTypename</Form.Label>
            <Form.Control
              type="text"
              name="categoryTypeName"
              placeholder="Enter CategoryType"
              value={newCategoryType?.categoryTypeName}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newCategoryType?.description}
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
              value = {newCategoryType?.recordStatusId}
              onChange={dropdownHandler}
            />
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

CategorytypeModel.propTypes = {
  /**
   * Callback function for Add Categorytype
   */
  onAddCategoryType: PropTypes.func,
  /**
   * Callback function for Update Categorytype
   */
  onUpdateCategoryType: PropTypes.func,
  /**
   * Callback function for Delete Categorytype
   */
  onDeleteCategoryType: PropTypes.func,
  /**
   * Callback function for Get Categorytype
   */
  onGetCategoryType: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Categorytype
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * categorytypeData for object type
 */
  CategoryTypeData: PropTypes.any,
  /**
 * recordStatusData for object type
 */
  recordStatusList: PropTypes.any,
};

CategorytypeModel.defaultProps = {
  onAddCategoryType: null,
  onUpdateCategoryType: null,
  onDeleteCategoryType: null,
  onGeCategoryType: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  categoryTypeData: null,
  recordStatusList:null,
};

