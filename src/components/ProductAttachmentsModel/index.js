import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';

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
    productId:null,
    attachment:null,
    description:"test",
  });

  const Products = [
    { label: "Soaps", value: 1 },
    { label: "Liquids", value: 2 },
    { label: "Dishwash", value: 3 },
    { label: "Power", value: 4 }
  ];

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
    debugger;
    setNewProductAttachments({
      ...newProductAttachments,
      [e.target.name]: e.target.value,
    });
  };

  const selectChangeHandler = (e) => {
    debugger;
    setNewProductAttachments({
      ...newProductAttachments,
      "productId": e.value,
    });
  };

  
  const saveFileSelected= (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const saveHandler = async () => {
    newProductAttachments.attachment = fileSelected;
    debugger;
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
    const isEnable =  !newProductAttachments?.productId;
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
            <Select options={Products} name="productId" value={newProductAttachments?.productId} onChange={selectChangeHandler} />
          </Form.Group>

          <Form.Group>
          <input type="file" onChange={saveFileSelected} />
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

