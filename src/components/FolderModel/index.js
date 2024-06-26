import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function FolderModel({
  onAddFolder,
  onUpdateFolder,
  onDeleteFolder,
  isEdit,
  isDelete,
  onGetFolder,
  id,
  onClose,
  folderData,
  recordStatusList = [],
}) {
  const [newFolder, setNewFolder] = useState({
    resourceId: null,
    parentFolderId: null,
    folderName: "",
    isSystemGenerated: true,
    isArchived: true,
    isDeleted:true,
    recordStatusId:null,
  });

  const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatusList.map((recordStatus,item) =>(
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
    setNewFolder({
      ...newFolder,
      [e.target.name]: e.target.value,
    });
  };

  const saveFileSelected= (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const saveHandler = async () => {
    newFolder.file = fileSelected;
    if (isEdit) {
      const response = await onUpdateFolder(id, newFolder);
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
      const response = await onAddFolder(newFolder);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'Folder Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'Folder Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteFolder(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Folder Delete Failed.'
      })
    }
  };

  const dropdownHandler = (event,{name,value}) => {
    setNewFolder((currentFolder) => ({...currentFolder, [name]: value}));
  }

  useEffect(() => {
    if (isEdit) {
      setNewFolder(folderData);
    }
  }, []);

  useEffect(() => { 
    setRecordStatusOptions(recordStatusList.map((recordStatus,item) =>(
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
    !newFolder?.resourceId 
    ||!newFolder?.parentFolderId 
    || !newFolder?.folderName  
    || !newFolder?.isArchived
     || !newFolder?.isDeleted
     || !newFolder?.recordStatusId;
    setSaveDisabled(isEnable);
  }, [newFolder]);

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
            controlId="formFolder"
          >
            <Form.Label>Resource<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="resourceId"
              placeholder="Enter ResourceId"
              value={newFolder?.resourceId}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="ParentFolderId">
            <Form.Label>Parent Folder<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="parentFolderId"
              placeholder="ParentFolderId"
              value={newFolder?.parentFolderId}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          </div>
          <div className="row">
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="folderName">
            <Form.Label>Folder Name<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="folderName"
              placeholder="FolderName"
              value={newFolder?.folderName}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="isSystemGenerated">
            <Form.Label>Is System Generated</Form.Label>
            <Form.Control
              type="text"
              name="isSystemGenerated"
              placeholder="IsSystemGenerated"
              value={newFolder?.isSystemGenerated}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          </div>
          <div className="row">
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="isArchived">
            <Form.Label>IsArchived<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="isArchived"
              placeholder="IsArchived"
              value={newFolder?.isArchived}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          <div className="col-md-6">
          <Form.Group className="mb-3" controlId="isArchived">
            <Form.Label>IsDeleted<span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="isDeleted"
              placeholder="IsDeleted"
              value={newFolder?.isDeleted}
              onChange={changeHandler}
            />
          </Form.Group>
          </div>
          </div>
          <div className="row">
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
              value = {newFolder?.recordStatusId}
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

FolderModel.propTypes = {
  /**
   * Callback function for Add Folder
   */
  onAddFolder: PropTypes.func,
  /**
   * Callback function for Update Folder
   */
  onUpdateFolder: PropTypes.func,
  /**
   * Callback function for Delete Folder
   */
  onDeleteFolder: PropTypes.func,
  /**
   * Callback function for Get Folder
   */
  onGetFolder: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get Folder
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * folderData for object type
 */
  folderData: PropTypes.any,
  /**
 * recordStatusData for object type
 */
  recordStatusList: PropTypes.any,
};

FolderModel.defaultProps = {
  onAddFolder: null,
  onUpdateFolder: null,
  onDeleteFolder: null,
  onGetFolder: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  folderData: null,
  recordStatusList:null,
};

