import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import Products from "../../pages/Product";

export default function ProductModel({
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  isEdit,
  isDelete,
  onGetProduct,
  id,
  onClose,
  productData,
  categories,
}) {
  const [newProduct, setNewProduct] = useState({
    productName: "",
    categoryTypeId: null,
    attachment: null,
    description: "",
  });

  const [categoryOptions, setCategoryOptions] = useState(categories.map((category, i) => (
    {
      key: i,
      label: category.categoryTypeName,
      value: category.categoryTypeId,
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
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const selectChangeHandler = (e) => {
    debugger;
    setNewProduct({
      ...newProduct,
      "productId": e.value,
    });
  };

  const saveFileSelected = (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const saveHandler = async () => {
    newProduct.file = fileSelected;
    if (isEdit) {
      const response = await onUpdateProduct(id, newProduct);
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

      const response = await onAddProduct(newProduct);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Product Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Product Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteProduct(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Product Delete Failed.'
      })
    }
  };

  useEffect(() => {
    setCategoryOptions(categories.map((category, i) => (
      {
        key: i,
        label: category.categoryTypeName,
        value: category.categoryTypeId,
      })).filter((item) => item));

  }, [categories]);

  useEffect(() => {
    if (isEdit) {
      setNewProduct(productData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
      !newProduct?.productName || !newProduct?.categoryTypeId || !newProduct?.description;
    setSaveDisabled(isEnable);
  }, [newProduct]);

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

          <Form.Group className="mb-3" controlId="categoryTypeId">
            <Form.Label>Category Type</Form.Label>
            <Select options={categoryOptions} name="categoryTypeId"
              value={newProduct?.categoryTypeId}
              onChange={selectChangeHandler} />
          </Form.Group>

          <Form.Group
            className={styles.stFormContainer}
            controlId="formProduct"
          >
            <Form.Label>ProductName</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              placeholder="ProductName"
              value={newProduct?.productName}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product Image</Form.Label>
          </Form.Group>
          <Form.Group>
            <input type="file" onChange={saveFileSelected} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newProduct?.description}
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

ProductModel.propTypes = {
  /**
   * Callback function for Add Product
   */
  onAddProduct: PropTypes.func,
  /**
   * Callback function for Update Product
   */
  onUpdateProduct: PropTypes.func,
  /**
   * Callback function for Delete Product
   */
  onDeleteProduct: PropTypes.func,
  /**     
   * Callback function for Get Product
   */
  onGetProduct: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for GetProduct
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * productData for object type
 */
  productData: PropTypes.any,
  /**
* categories for object type
*/
  categories: PropTypes.any,
};

ProductModel.defaultProps = {
  onAddProduct: null,
  onUpdateProduct: null,
  onDeleteProduct: null,
  onGetProduct: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  productData: null,
  categories: null,
};

