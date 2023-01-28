import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function CartModel({
  onAddCart,
  onUpdateCart,
  onDeleteCart,
  isEdit,
  isDelete,
  onGetCart,
  id,
  onClose,
  cartData,
}) {
  const [newCart, setNewCart] = useState({
    resourceId:null,
    productId:null,
    ProductName:"",
    cost:null,
    quantity:"",
    description:""
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
    setNewCart({
      ...newCart,
      [e.target.name]: e.target.value,
    });
  };

  const saveFileSelected= (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const saveHandler = async () => {
    newCart.file = fileSelected;
    if (isEdit) {
      const response = await onUpdateCart(id, newCart);
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
      const response = await onAddCart(newCart);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Cart Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Cart Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteCart(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Cart Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewCart(cartData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
      !newCart?.resourceId || !newCart?.productId || !newCart?.ProductName || !newCart?.cost || !newCart?.quantity|| !newCart?.description;
    setSaveDisabled(isEnable);
  }, [newCart]);

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
            controlId="formCart"
          >
            <Form.Label>ResourceId</Form.Label>
            <Form.Control
              type="text"
              name="resourceId"
              placeholder="ResourceId"
              value={newCart?.resourceId}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productId">
            <Form.Label>ProductId</Form.Label>
            <Form.Control
              type="text"
              name="productId"
              placeholder="ProductId"
              value={newCart?.productId}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>ProductName</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              placeholder="ProductName"
              value={newCart?.productName}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="cost">
            <Form.Label>Cost</Form.Label>
            <Form.Control
              type="text"
              name="cost"
              placeholder="Cost"
              value={newCart?.cost}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={newCart?.quantity}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newCart?.description}
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

CartModel.propTypes = {
  /**
   * Callback function for Add Cart
   */
  onAddCart: PropTypes.func,
  /**
   * Callback function for Update Cart
   */
  onUpdateCart: PropTypes.func,
  /**
   * Callback function for Delete Cart
   */
  onDeleteCart: PropTypes.func,
  /**
   * Callback function for Get Cart
   */
  onGetCart: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Cart
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * cartData for object type
 */
  cartData: PropTypes.any,
};

CartModel.defaultProps = {
  onAddCart: null,
  onUpdateCart: null,
  onDeleteCart: null,
  onGetCart: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  cartData: null,
};

