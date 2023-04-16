import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';



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
  categoryList = [],
  recordStatusList = [],

}) {
  const [newProduct, setNewProduct] = useState({
    productName: "",
    categoryTypeId: null,
    attachment: null,
    description: "",
    recordStatusId: null,
    filesId: 0,
    productImage: null
  });

  const [categoryOptions, setCategoryOptions] = useState(categoryList.map((category, item) => (
    {
      key: item,
      text: category.categoryTypeName,
      value: category.categoryTypeId,
    })).filter((item) => item));

  const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatusList.map((recordStatus, item) => (
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
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };


  const saveFileSelected = (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const saveHandler = async () => {
    newProduct.attachment = fileSelected;
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

  const dropdownHandler = (event, { name, value }) => {
    setNewProduct((currentProduct) => ({ ...currentProduct, [name]: value }));
  }

  useEffect(() => {
    setCategoryOptions(categoryList.map((category, item) => (
      {
        key: item,
        text: category.categoryTypeName,
        value: category.categoryTypeId,
      })).filter((item) => item));

  }, [categoryList]);

  useEffect(() => {
    if (isEdit) {
      setNewProduct(productData);
    }
  }, []);

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
      !newProduct?.productName
      || !newProduct?.categoryTypeId
      || !newProduct?.recordStatusId;
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
          <div calss="col-md-12">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                  <Form.Group
                    className={styles.stFormContainer}
                    controlId="formProduct"
                  >
                    <Form.Label>Product Name<span className="required">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="productName"
                      placeholder="Product Name"
                      value={newProduct?.productName}
                      onChange={changeHandler}
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3" controlId="categoryType">
                    <Form.Label>Category Type<span className="required">*</span></Form.Label>
                    <Dropdown
                      name="categoryTypeId"
                      placeholder='Select Category Type'
                      fluid
                      search
                      selection
                      options={categoryOptions}
                      value={newProduct?.categoryTypeId}
                      onChange={dropdownHandler}
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
                      value={newProduct?.description}
                      onChange={changeHandler}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3" controlId="recordStatus">
                    <Form.Label>Status<span className="required">*</span></Form.Label>
                    <Dropdown
                      name="recordStatusId"
                      placeholder='Select Status'
                      fluid
                      search
                      selection
                      options={recordStatusOptions}
                      value={newProduct?.recordStatusId}
                      onChange={dropdownHandler}
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <Form.Group>
                <Form.Label>Product Image<span className="required">*</span></Form.Label>
              </Form.Group>
              <Form.Group>
                <input type="file" onChange={saveFileSelected} />
                <img className="product-view" src={newProduct?.productImage}>
                </img>
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
  /**
* recordStatusData for object type
*/
  recordStatusList: PropTypes.any,
  /**
* categoryList for object type
*/
  categoryList: PropTypes.any,
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
  recordStatusList: null,
  categoryList: null,

};

