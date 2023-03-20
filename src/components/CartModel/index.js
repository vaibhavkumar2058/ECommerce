import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import Carts from "../../pages/Cart";
import { Dropdown } from 'semantic-ui-react'

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

  recordStatusList = [],
  productList = [],

  // recordStatuses,
}) {
  const [newCart, setNewCart] = useState({
    resourcesId: null,
    productId: null,
    cost: null,
    quantity: "",
    description: "",
    recordStatusId: null,
  });





  const [fileSelected, setFileSelected] = useState();

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  const [productOptions, setProductOptions] = useState(productList.map((product, item) => (
    {
      key: item,
      text: product.productName,
      value: product.productId,
    })).filter((item) => item));

  const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatusList.map((recordStatus, item) => (
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
    setNewCart({
      ...newCart,
      [e.target.name]: e.target.value,
    });
  };
  const selectChangeHandler = (e) => {
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
  const dropdownHandler = (event, { name, value }) => {
    setNewCart((currentCart) => ({ ...currentCart, [name]: value }));
  }
  useEffect(() => {
    if (isEdit) {
      setNewCart(cartData);
    }
  }, []);


  useEffect(() => {
    setProductOptions(productList.map((product, item) => (
      {
        key: item,
        text: product.productName,
        value: product.productId,
      })).filter((item) => item));
  }, [productList]);

  useEffect(() => {
    setRecordStatusOptions(recordStatusList.map((recordStatus, item) => (
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
      !newCart?.resourcesId ||
      !newCart?.productId || !newCart?.cost ||
      !newCart?.quantity ||
      !newCart?.recordStatusId;
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
          <div className="row">
            <div className="col-md-6">
              <Form.Group

                className={styles.stFormContainer}
                controlId="formCart"
              >

                <Form.Label>Resources<span className="required">*</span></Form.Label>
                <Form.Control
                  type="resourceId"
                  name="resourcesId"
                  placeholder=" Select Resources"
                  value={newCart?.resourcesId}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="productId">
                <Form.Label>Product<span className="required">*</span></Form.Label>
                <Dropdown
                  name="productId"
                  placeholder=" Select Product"
                  fluid
                  search
                  selection
                  options={productOptions}
                  value={newCart?.productId}
                  onChange={dropdownHandler}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="cost">
                <Form.Label>Cost<span className="required">*</span></Form.Label>
                <Form.Control
                  type="cost"
                  name="cost"
                  placeholder=" Select Cost"
                  value={newCart?.cost}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="quantity">
                <Form.Label>Quantity<span className="required">*</span></Form.Label>
                <Form.Control
                  type="quantity"
                  name="quantity"
                  placeholder=" Select Quantity"
                  value={newCart?.quantity}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
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
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="recordStatusId">
                <Form.Label>Status<span className="required">*</span></Form.Label>
                <Dropdown
                  name="recordStatusId"
                  placeholder=" Select Status"
                  fluid
                  search
                  selection
                  options={recordStatusOptions}
                  value={newCart?.recordStatusId}
                  onChange={dropdownHandler}
                />
              </Form.Group>
            </div>
          </div>
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
   
  * produtList for object type
  */
  produtList: PropTypes.any,
  /**
  
 * recordStatusList for object type
 */
  recordStatusList: PropTypes.any,
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

  productList: null,
  recordStatusList: null,

};

