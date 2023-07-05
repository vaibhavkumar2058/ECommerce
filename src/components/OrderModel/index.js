import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown, Checkbox, Input } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import useFetchOrders from "../../hooks/useFetchOrder";
import useFetchDiscounts from "../../hooks/useFetchDiscount";
import useFetchItemCosts from "../../hooks/useFetchItemCost";
import useFetchBoxes from "../../hooks/useFetchBox";
import useFetchProduct from "../../hooks/useFetchProduct";

export default function OrderModel({
  onAddOrder,
  onUpdateOrder,
  onDeleteOrder,
  isEdit,
  isDelete,
  onGetOrder,
  id,
  onClose,
  orderData,
  onPlaceOrder,
  recordStatusList = [],
  categoryTypeList = [],
  measurementTypeList = [],
  measurementValueList = [],
}) {

  const userInfo = JSON.parse(localStorage.getItem('loggedIn'));

  const {
    getProductsByCategoryId,
  } = useFetchProduct();

  const [newOrder, setNewOrder] = useState({
    resourcesId: userInfo.resourcesId,
    orderItems: [],
    description: "Test",
    discountId: null,
  });

  const [quantityType, setQuantityType] = useState({
    isBox: false,
    isIndividual: true
  });

  const [itemCost, setItemCost] = useState({
    categoryTypeId: null,
    productId: null,
    measurementTypeId: null,
    measurementValueId: null,
  });

  const [boxes, setBoxes] = useState({
    boxId: null,
    boxName: null,
    piecesCount: null,
    boxLimit: null,
  });

  const [discount, setDiscount] = useState({
    discountId: null,
    discountCode: null,
    discountTypeId: null,
    discountValue: 0,
    discountPrice: 0,
    isActive: "",
    description: "",
    recordStatusId: null,
  });

  const [placeOrder, setPlaceOrder] = useState({
    categoryTypeId: null,
    productId: null,
    measurementTypeId: null,
    measurementValueId: null,
    cost: null,
    quantity: null,
    description: "",
  });

  const {
    getRecordByName,
  } = useFetchDiscounts();

  const {
    getBoxByName,
  } = useFetchBoxes();

  const {
    getItemPrice,
  } = useFetchItemCosts();

  const [isDefault, setIsDefault] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [isApply, setIsApply] = useState(true)
  const [isClear, setIsClear] = useState(false)
  const [buttonType, setButtonType] = useState("Place Order");
  const isOverLimit = (value = "", limit) => value.length > limit;

  const getPrice = async () => {
    itemCost.productId = placeOrder?.productId;
    itemCost.measurementTypeId = placeOrder?.measurementValueId;
    itemCost.measurementValueId = placeOrder?.measurementTypeId;
    const response = await getItemPrice(itemCost);
    if (response?.payload?.title == "Success") {
      setPlaceOrder((currentPlaceOrder) => ({ ...currentPlaceOrder, ["cost"]: response.payload.price }));
      getBoxesByName();
    }
    else {
      setPlaceOrder((currentPlaceOrder) => ({ ...currentPlaceOrder, ["cost"]: '' }));
      setBoxes((currentBoxes) => ({ ...currentBoxes, ["boxLimit"]: null }));
    }
  };

  const getBoxesByName = async () => {
    boxes.boxName = "TestBox";
    const response = await getBoxByName(boxes.boxName);
    if (response.payload.title == "Success") {
      setBoxes(response.payload);
    }
  }

  const getDiscoutPrice = async () => {
    if (discount?.discountCode) {
      const response = await getRecordByName(discount.discountCode);
      if (response.payload.title == "Success") {
        setDiscount(response.payload);
        // Logic for Discount Price
        //Boxes 
        if (quantityType.isBox) {
          if (response.payload.discountType.discountTypeName == "Percentage") {
            discount.discountPrice = placeOrder?.quantity * boxes.piecesCount * (placeOrder?.cost - (placeOrder?.cost * response.payload.discountValue) / 100);
            console.log('discount price : ', discount.discountPrice);
          }
          else
            if (response.payload.discountType.discountTypeName == "Amount") {
              discount.discountPrice = (placeOrder?.quantity * boxes.piecesCount * placeOrder?.cost) - response.payload.discountValue;
            }
        }

        // Individual 
        if (quantityType.isIndividual) {
          if (response.payload.discountType.discountTypeName == "Percentage") {
            discount.discountPrice = placeOrder?.quantity * (placeOrder?.cost - (placeOrder?.cost * response.payload.discountValue) / 100);
            console.log('discount price : ', discount.discountPrice);
          }
          else
            if (response.payload.discountType.discountTypeName == "Amount") {
              discount.discountPrice = (placeOrder?.quantity * placeOrder?.cost) - response.payload.discountValue;
            }
        }

        setDiscount({
          ...discount,
          ["discountPrice"]: discount.discountPrice,
        });

        setIsClear(true);
      }
      else {
        setIsClear(false);
      }
    }
    else {
      // Individual 
      if (quantityType.isIndividual) {
        discount.discountPrice = placeOrder?.quantity * placeOrder?.cost;
      }
      else
        // Boxes 
        if (quantityType.isBox) {
          discount.discountPrice = placeOrder?.quantity * boxes.piecesCount * placeOrder?.cost;
        }
      setDiscount({
        ...discount,
        ["discountPrice"]: discount.discountPrice,
      });
    }
  };

  const clearDiscountPrice = () => {
    setDiscount({
      ...discount,
      discountPrice: '',
      discountCode: '',
    });
    setIsClear(false);
  }

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatusList.map((recordStatus, item) => (
    {
      key: item,
      text: recordStatus.actionName,
      value: recordStatus.recordStatusId,
    })).filter((item) => item));

  const [categoryTypeOptions, setCategoryTypeOptions] = useState(categoryTypeList.map((categoryType, item) => (
    {
      key: item,
      text: categoryType.categoryTypeName,
      value: categoryType.categoryTypeId,
    })).filter((item) => item));

  const [productOptions, setProductOptions] = useState(null)

  const [measurementTypeOptions, setMeasurementTypeOptions] = useState(measurementTypeList.map((measurementType, item) => (
    {
      key: item,
      text: measurementType.name,
      value: measurementType.measurementTypeId,
    })).filter((item) => item));

  const [measurementValueOptions, setMeasurementValueOptions] = useState(measurementValueList.map((measurementValue, item) => (
    {
      key: item,
      text: measurementValue.value,
      value: measurementValue.measurementValueId,
    })).filter((item) => item));

  const styles = {
    stFormContainer: css`
      width: 400px !important;
    `,
    stFormControl: css``,
  };

  const changeHandler = (e) => {
    setPlaceOrder({
      ...placeOrder,
      [e.target.name]: e.target.value,
    });
  };

  const changeQuanityHandler = (e, { name, value }) => {
    const valid = new RegExp(/^\d*$/)
    if (valid.test(value)) {
      setPlaceOrder((currentState) => ({
        ...currentState,
        quantity: value
      }));
    }
  };

  const checkBoxChangeHandler = (e, { name, value }) => {
    if (name == "isBox") {
      quantityType.isIndividual = false;
    }
    if (name == "isIndividual") {
      quantityType.isBox = false;
    }
    setQuantityType((currentState) => ({ ...currentState, [name]: !value }));
    getDiscoutPrice();
  };

  const changeDiscountHandler = (e) => {
    setDiscount({
      ...discount,
      [e.target.name]: e.target.value,
    });
  };

  const saveHandler = async () => {
    newOrder.discountId = discount.discountId
    if (isEdit) {
      const response = await onUpdateOrder(id, newOrder);
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
      newOrder.orderItems.push(placeOrder)
      const response = await onPlaceOrder(newOrder);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Order Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Order Save Failed.'
        })
      }
    }
  };


  const deleteHandler = async () => {
    const response = await onDeleteOrder(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Order Delete Failed.'
      })
    }
  };

  const placeOrderHandler = async () => {
    const response = await onAddOrder(newOrder);
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'Order Record Saved Succefully.'
      })
      onClose(true);
      console.log(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Order Save Failed.'
      })
    }
  };

  const categoryDropdownHandler = (event, { name, value }) => {
    getProductByCategoryId(value);
    setPlaceOrder((currentPlaceOrder) => ({ ...currentPlaceOrder, [name]: value }));
  }

  const dropdownHandler = (event, { name, value }) => {
    setPlaceOrder((currentPlaceOrder) => ({ ...currentPlaceOrder, [name]: value }));
    if (placeOrder?.productId
      && placeOrder?.measurementValueId
      && placeOrder?.measurementTypeId) {
      getPrice();
    }
  }

  const getProductByCategoryId = async (id) => {
    const response = await getProductsByCategoryId(id);
    if (response.payload.title == "Success") {
      const productList = [];
      for (var key in response.payload) {
        if (key !== 'title')
          productList.push(response.payload[key]);
      }
      setProductOptions(productList.map((product, item) => (
        {
          key: item,
          text: product.productName,
          value: product.productId,
        })).filter((item) => item));
    }
    else {
      setProductOptions(null);
    }
  };


  useEffect(() => {
    setRecordStatusOptions(recordStatusList.map((recordStatus, item) => (
      {
        key: item,
        text: recordStatus.actionName,
        value: recordStatus.recordStatusId,
      })).filter((item) => item));
  }, [recordStatusList]);

  useEffect(() => {
    setCategoryTypeOptions(categoryTypeList.map((categoryType, item) => (
      {
        key: item,
        text: categoryType.categoryTypeName,
        value: categoryType.categoryTypeId,
      })).filter((item) => item));
  }, [categoryTypeList]);

  useEffect(() => {
    setMeasurementTypeOptions(measurementTypeList.map((measurementType, item) => (
      {
        key: item,
        text: measurementType.name,
        value: measurementType.measurementTypeId,
      })).filter((item) => item));
  }, [measurementTypeList]);

  useEffect(() => {
    setMeasurementValueOptions(measurementValueList.map((measurementValue, item) => (
      {
        key: item,
        text: measurementValue.value,
        value: measurementValue.measurementValueId,
      })).filter((item) => item));
  }, [measurementValueList]);


  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
      !placeOrder?.productId
      || !placeOrder?.cost
      || !placeOrder?.quantity
      || !placeOrder?.measurementTypeId
      || !placeOrder?.measurementValueId
      || !(boxes?.boxLimit > placeOrder?.quantity)
      || !(quantityType?.isBox || quantityType?.isIndividual)

    setSaveDisabled(isEnable);
    const apply =
      !placeOrder?.quantity
      || !discount?.discountCode
      || !placeOrder?.cost

    setIsApply(apply);

  }, [placeOrder, discount, boxes, quantityType]);

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
                controlId="formOrder"
              >
              </Form.Group>

              <Form.Group className="mb-3" controlId="categoryTypeId">
                <Form.Label>Category Type<span className="required">*</span></Form.Label>
                <Dropdown
                  name="categoryTypeId"
                  placeholder='Select CategoryType'
                  fluid
                  search
                  selection
                  options={categoryTypeOptions}
                  value={placeOrder?.categoryTypeId}
                  onChange={categoryDropdownHandler}
                />
              </Form.Group>

            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="productId">
                <Form.Label>Product<span className="required">*</span></Form.Label>
                <Dropdown
                  name="productId"
                  placeholder='Select Product'
                  fluid
                  search
                  selection
                  options={productOptions}
                  value={placeOrder?.productId}
                  onChange={dropdownHandler}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Label>Measurement<span className="required">*</span></Form.Label>
              <div className="row">
                <div class="col-md-4 ">
                  <Form.Group className="mb-3 measures" controlId="measurementValueId">
                    <Dropdown
                      name="measurementValueId"
                      placeholder=""
                      fluid
                      search
                      selection
                      options={measurementValueOptions}
                      value={placeOrder?.measurementValueId}
                      onChange={dropdownHandler}
                    />
                  </Form.Group>
                </div>
                <div class="col-md-3 ">
                  <Form.Group className="mb-3  measures" controlId="measurementValueId">
                    <Dropdown
                      name="measurementTypeId"
                      placeholder=""
                      fluid
                      search
                      selection
                      options={measurementTypeOptions}
                      value={placeOrder?.measurementTypeId}
                      onChange={dropdownHandler}
                    /> </Form.Group>
                </div>
              </div>
            </div>
            <div className="col-md-6">

            </div>

          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" >
                <Form.Label>Quantity</Form.Label>
                <Checkbox
                  label='Boxes'
                  checked={quantityType.isBox}
                  name="isBox"
                  value={quantityType.isBox}
                  onChange={checkBoxChangeHandler}
                />
                <Checkbox
                  label='Individual'
                  checked={quantityType.isIndividual}
                  name="isIndividual"
                  value={quantityType.isIndividual}
                  onChange={checkBoxChangeHandler}
                />
                <Input
                  type="text"
                  name="quantity"
                  placeholder="Quantity"
                  value={placeOrder?.quantity}
                  onChange={changeQuanityHandler}
                  onBlur={() => getDiscoutPrice()}
                />
                {boxes.boxLimit && (<div className="info">{boxes.boxLimit} boxes limit per order</div>)}
              </Form.Group>

            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-5">
                  <Form.Group >
                    <Form.Label>Discount</Form.Label>
                    <Form.Control
                      type="text"
                      name="discountCode"
                      placeholder="Discount Code"
                      value={discount?.discountCode}
                      onChange={changeDiscountHandler}
                      onBlur={() => getDiscoutPrice()}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-7">
                  <div className="row btn-apply">
                    <div className="col-md-5">
                      {!isClear &&
                        <Button
                          disabled={isApply}
                          onClick={() => getDiscoutPrice()}
                        >
                          Apply
                        </Button>
                      }
                      {isClear &&
                        <Button onClick={() => clearDiscountPrice()}
                        >
                          Clear
                        </Button>}
                    </div>
                    <div className="col-md-6">

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3 " controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="cost"
                  disabled
                  placeholder="Price"
                  value={placeOrder?.cost}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" >
                <Form.Label>Total Price</Form.Label>
                <Form.Control
                  type="text"
                  name="discountPrice"
                  placeholder="Discount Price"
                  disabled
                  value={discount?.discountPrice}
                  onChange={changeDiscountHandler}
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

OrderModel.propTypes = {
  /**
   * Callback function for Add Order
   */
  onAddOrder: PropTypes.func,
  /**
   * Callback function for Update Order
   */
  onUpdateOrder: PropTypes.func,
  /**
   * Callback function for Delete Order
   */
  onDeleteOrder: PropTypes.func,
  /**
   * Callback function for Get Order
   */
  onGetOrder: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Order
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * orderData for object type
 */
  orderData: PropTypes.any,

  /**
 * onPlaceOrder for object type
 */
  onPlaceOrder: PropTypes.any,
  /**
  * recordStatusData for object type
  */
  recordStatusList: PropTypes.any,
  /**
  * categoryTypeData for object type
  */
  categoryTypeList: PropTypes.any,
  /**
  * productData for object type
  */
  productTypeList: PropTypes.any,
  /**
  * measurementTypeData for object type
  */
  measurementTypeList: PropTypes.any,
  /**
  * measurementValueData for object type
  */
  measurementValueList: PropTypes.any,

};

OrderModel.defaultProps = {
  onAddOrder: null,
  onUpdateOrder: null,
  onDeleteOrder: null,
  onGetOrder: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  orderData: null,
  onPlaceOrder: null,
  recordStatusList: null,
  categoryTypeList: null,
  measurementTypeList: null,
  measurementValueList: null,
};

