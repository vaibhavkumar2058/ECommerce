import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function InVoiceModel({
  onAddInVoice,
  onUpdateInVoice,
  onDeleteInVoice,
  isEdit,
  isDelete,
  onGetInVoice,
  id,
  onClose,
  inVoiceData,
}) {
  const [newInVoice, setNewInVoice] = useState({
    resourcesId:null,
    productId:null,
    cost:"",
    costInclude:"",
    quantity:"",
    total:"",
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
    setNewInVoice({
      ...newInVoice,
      [e.target.name]: e.target.value,
    });
  };

  

  const saveHandler = async () => {
    newInVoice.file = fileSelected;
    if (isEdit) {
      const response = await onUpdateInVoice(id, newInVoice);
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
      const response = await onAddInVoice(newInVoice);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'InVoice Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'InVoice Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteInVoice(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'InVoice Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewInVoice(inVoiceData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    debugger;
    const isEnable = !newInVoice?.resourcesId || !newInVoice?.productId  || !newInVoice?.cost || !newInVoice?.costInclude || !newInVoice?.quantity||  !newInVoice?.total || !newInVoice?.description;
    setSaveDisabled(isEnable);
  }, [newInVoice]);

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
            controlId="formInVoice"
          >
            <Form.Label>ResorcesId</Form.Label>
            <Form.Control
              type="text"
              name="resourcesId"
              placeholder="ResourcesId"
              value={newInVoice?.resourcesId}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="product">
            <Form.Label>ProductId</Form.Label>
            <Form.Control
              type="text"
              name="productId"
              placeholder="ProductId"
              value={newInVoice?.productId}
              onChange={changeHandler}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Cost</Form.Label>
            <Form.Control
              type="text"
              name="cost"
              placeholder="Cost"
              value={newInVoice?.cost}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="costInclude">
            <Form.Label>CostInclude</Form.Label>
            <Form.Control
              type="text"
              name="costInclude"
              placeholder="CostInclude"
              value={newInVoice?.costInclude}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={newInVoice?.quantity}
              onChange={changeHandler}
            />
            


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Total</Form.Label>
            <Form.Control
              type="text"
              name="total"
              placeholder="Total"
              value={newInVoice?.total}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={newInVoice?.description}
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
          </Form.Group>
        </Form>
      )}
    </>
  );
}

InVoiceModel.propTypes = {
  /**
   * Callback function for Add InVoice
   */
  onAddInVoice: PropTypes.func,
  /**
   * Callback function for Update InVoice
   */
  onUpdateInVoice: PropTypes.func,
  /**
   * Callback function for Delete InVoice
   */
  onDeleteInVoice: PropTypes.func,
  /**
   * Callback function for Get InVoice
   */
  onGetInVoice: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get InVoice
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * inVoiceData for object type
 */
  inVoiceData: PropTypes.any,
};

InVoiceModel.defaultProps = {
  onAddInVoice: null,
  onUpdateInVoice: null,
  onDeleteInVoice: null,
  onGetInVoice: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  inVoiceData: null,
};

