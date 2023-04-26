import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';

export default function BannerAttachmentsModel({
  onAddBannerAttachments,
  onUpdateBannerAttachments,
  onDeleteBannerAttachments,
  isEdit,
  isDelete,
  onGetBannerAttachments,
  id,
  onClose,
  bannerAttachmentsData,
}) {
  const [newBannerAttachments, setNewBannerAttachments] = useState({
    bannerId:id,
    attachment:null,
    description:"test",
    
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
    setNewBannerAttachments({
      ...newBannerAttachments,
      [e.target.name]: e.target.value,
    });
  };

  const selectChangeHandler = (e) => {
    setNewBannerAttachments({
      ...newBannerAttachments,
      "bannerId": e.value,
    });
  };

  
  const saveFileSelected= (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const saveHandler = async () => {
    newBannerAttachments.attachment = fileSelected;
    if (isEdit) {
      const response = await onUpdateBannerAttachments(id, newBannerAttachments);
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
      const response = await onAddBannerAttachments(newBannerAttachments);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'BannerAttachments Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'BannerAttachments Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteBannerAttachments(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'BannerAttachments Delete Failed.'
      })
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNewBannerAttachments(bannerAttachmentsData);
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =  !newBannerAttachments?.bannerId;
    setSaveDisabled(isEnable);
  }, [newBannerAttachments]);

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
            controlId="formBannerAttachments"
          >
            <Form.Label>Banner<span className="required">*</span></Form.Label>
            <Form.Control
                  type="text"
                  name="bannerId"
                  placeholder="Banner"
                  value={newBannerAttachments?.bannerId}
                  onChange={changeHandler}
                />


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

BannerAttachmentsModel.propTypes = {
  /**
   * Callback function for Add BannerAttachments
   */
  onAddBannerAttachments: PropTypes.func,
  /**
   * Callback function for Update BannerAttachments
   */
  onUpdateBannerAttachments: PropTypes.func,
  /**
   * Callback function for Delete BannerAttachments
   */
  onDeleteBannerAttachments: PropTypes.func,
  /**
   * Callback function for Get BannerAttachments
   */
  onGetBannerAttachments: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get BannerAttachments
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * bannerAttachmentsData for object type
 */
  bannerAttachmentsData: PropTypes.any,
};

BannerAttachmentsModel.defaultProps = {
  onAddBannerAttachments: null,
  onUpdateBannerAttachments: null,
  onDeleteBannerAttachments: null,
  onGetBannerAttachments: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  bannerAttachmentsData: null,
};

