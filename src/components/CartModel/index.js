import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import Carts from "../../pages/Cart";

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
  products,
  // recordStatuses,
}) {
  const [newCart, setNewCart] = useState({
    resourcesId:null,
    productId:null,
    cost:null,
    quantity:"",
    description:"",
    recordStatusId:null,
  });
  const [productOptions, setProductOptions] = useState(products.map((product, i) => (
    {
      key: i,
      label: product.productName,
      value: product.productId,
    })).filter((item) => item));

    // const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatuses.map((recordStatus, i) => (
    //   {
    //     key: i,
    //     label: recordStatus.actionName,
    //     value: recordStatus.recordStatusId,
    //   })).filter((item) => item));
  


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
  const selectChangeHandler = (e) => {
    debugger;
    setNewCart({
      ...newCart,
      "cartId": e.value,
    });
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
    setProductOptions(products.map((product, i) => (
      {
        key: i,
        label: product.productName,
        value: product.productId,
      })).filter((item) => item));

  }, [products]);

  // useEffect(() => {
  //   setRecordStatusOptions(recordStatuses.map((recordStatus, i) => (
  //     {
  //       key: i,
  //       label: recordStatus.actionName,
  //       value: recordStatus.recordStatusId,
  //     })).filter((item) => item));

  // }, [recordStatuses]);



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
      !newCart?.resourcesId || !newCart?.productId  || !newCart?.cost || !newCart?.quantity|| !newCart?.description|| !newCart?.recordStatusId;
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
          <Form.Group className="mb-3" controlId="productId">
            <Form.Label>Product</Form.Label>
            <Select options={productOptions} name="productId"
              value={newCart?.productId}
              onChange={selectChangeHandler} />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="recordStatusId">
            <Form.Label>RecordStatus</Form.Label>
            <Select options={recordStatusOptions} name="recordStatusId"
              value={newCart?.recordStatusId}
              onChange={selectChangeHandler} />
          </Form.Group> */}


          <Form.Group
            className={styles.stFormContainer}
            controlId="formCart"
          >
            <Form.Label>ResourcesId</Form.Label>
            <Form.Control
              type="text"
              name="resourcesId"
              placeholder="ResourcesId"
              value={newCart?.resourcesId}
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
          <Form.Group className="mb-3" controlId="recordStatusId">
            <Form.Label>RecordStatusId</Form.Label>
            <Form.Control
              type="text"
              name="recordStatusId"
              placeholder="RecordStatusId"
              value={newCart?.recordStatusId}
              onChange={changeHandler}
            />
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
  /**
* products for object type
*/
products: PropTypes.any,
/**
* recordStatuses for object type
*/
// recordStatuses: PropTypes.any,
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
  products:null,
  // recordStatuses:null,
};

