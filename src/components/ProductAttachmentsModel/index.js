import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function ProductAttachmentsModel({
  onAddProductAttachments,
  onUpdateProductAttachments,
  onDeleteProductAttachments,
  isEdit,
  isDelete,
  onGetProductAttachments,
  id,
  onClose,
  productAttachmentsData,
}) {
  const [newProductAttachments, setNewProductAttachments] = useState({
    productAttachmentsId:null,
    productId:null,
    filesId:null,
    description:"",
  });

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
    setNewProductAttachments({
      ...newProductAttachments,
      [e.target.name]: e.target.value,
    });
  };

  
  const saveFileSelected= (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const saveHandler = async () => {
    newProductAttachments.file = fileSelected;
    if (isEdit) {
      const response = await onUpdateProductAttachments(id, newProductAttachments);
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
      const response = await onAddProductAttachments(newProductAttachments);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'ProductAttachments Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'ProductAttachments Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteProductAttachments(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ProductAttachments Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewProductAttachments(productAttachmentsData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    debugger;
    const isEnable = !newProductAttachments?.productAttachmentsId || !newProductAttachments?.productId  || !newProductAttachments?.filesId || !newProductAttachments?.description;
    setSaveDisabled(isEnable);
  }, [newProductAttachments]);

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
            controlId="formProductAttachments"
          >
            <Form.Label>ProductId</Form.Label>
            <Form.Control
              type="text"
              name="productId"
              placeholder="Enter ProductId"
              value={newProductAttachments?.productId}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="filesId">
            <Form.Label>FilesId</Form.Label>
            <Form.Control
              type="text"
              name="filesId"
              placeholder=" Enter FilesId"
              value={newProductAttachments?.filesId}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newProductAttachments?.description}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group>
          <input type="file" className="custom-file-label" onChange={saveFileSelected} />
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

ProductAttachmentsModel.propTypes = {
  /**
   * Callback function for Add ProductAttachments
   */
  onAddProductAttachments: PropTypes.func,
  /**
   * Callback function for Update ProductAttachments
   */
  onUpdateProductAttachments: PropTypes.func,
  /**
   * Callback function for Delete ProductAttachments
   */
  onDeleteProductAttachments: PropTypes.func,
  /**
   * Callback function for Get ProductAttachments
   */
  onGetProductAttachments: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get ProductAttachments
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * productAttachmentsData for object type
 */
  productAttachmentsData: PropTypes.any,
};

ProductAttachmentsModel.defaultProps = {
  onAddProductAttachments: null,
  onUpdateProductAttachments: null,
  onDeleteProductAttachments: null,
  onGetProductAttachments: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  productAttachmentsData: null,
};

