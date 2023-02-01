import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

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
}) {
  const [newCategoryType, setNewCategoryType] = useState({
    categoryTypeName: "",
    description: "",
   
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

  useEffect(() => {
    if (isEdit) {
      setNewCategoryType(categoryTypeData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
      !newCategoryType?.categoryTypeName|| !newCategoryType?.description;
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
          <Form.Group className="mb-3" controlId="mobile">
            <Form.Label>Discription</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Discription"
              value={newCategoryType?.description}
              onChange={changeHandler}
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
};
