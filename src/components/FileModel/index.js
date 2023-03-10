import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function FileModel({
  onAddFile,
  onUpdateFile,
  onDeleteFile,
  isEdit,
  isDelete,
  onGetFile,
  id,
  onClose,
  fileData,
  recordStatusList = [],
  folderList =[],
}) {
  const [newFile, setNewFile] = useState({
    folderId: null,
    resourceId: null,
    attachment:null,
  });

  const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatusList.map((recordStatus,item) =>(
    {
    key: item,
    text: recordStatus.actionName,
    value: recordStatus.recordStatusId,
  })).filter((item) => item));
  const [folderOptions, setFolderOptions] = useState(folderList.map((folder,item) =>(
    {
    key: item,
    text: folder.folderName,
    value: folder.folderId,
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
    setNewFile({
      ...newFile,
      [e.target.name]: e.target.value,
    });
  };  

  const saveFileSelected = (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const saveHandler = async () => {
    newFile.attachment = fileSelected;
    if (isEdit) {
      const response = await onUpdateFile(id, newFile);
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
      const response = await onAddFile(newFile);
      if (response.payload.title == "Success") {
        setMessageStatus({
          mode: 'success',
          message: 'File Record Saved Succefully.'
        })
        onClose(true);
        console.log(response.payload);
      }
      else {
        setMessageStatus({
          mode: 'danger',
          message: 'File Save Failed.'
        })
      }
    }
  };

  const deleteHandler = async () => {
    const response = await onDeleteFile(id);
    if (response.payload.title == "Success") {
      onClose(true);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'File Delete Failed.'
      })
    }
  };

  const dropdownHandler = (event,{value}) => {
    setNewFile((currentFile) => ({...currentFile, recordStatusId: value}));
    setNewFile((currentFile) => ({...currentFile, folderId: value}));
  }

  useEffect(() => {
    if (isEdit) {
      setNewFile(fileData);
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
      setFolderOptions(folderList.map((folder,item) =>(
        {
        key: item,
        text: folder.folderName,
      value: folder.folderId,
      })).filter((item) => item));
      }, [folderList]);
  

  useEffect(() => {
    if (isEdit) {
      setButtonType("Update");
    }
    const isEnable =
      !newFile?.resourceId;
    setSaveDisabled(isEnable);
  }, [newFile]);

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
            controlId="formFile"
          >
            <Form.Label>FolderId</Form.Label>
            <Dropdown
              name="folderName"
              placeholder="Select Folder"
              fluid
              search
              selection
              options={folderOptions}
              value={newFile?.folderId}
              onChange={dropdownHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="mobile">
            <Form.Label>ResourceId</Form.Label>
            <Form.Control
              type="text"
              name="resourceId"
              placeholder="resourceId"
              value={newFile?.resourceId}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="recordStatus">
            <Form.Label>RecordStatus</Form.Label>
            <Dropdown
              name="actionName"
              placeholder='Select Action'
              fluid
              search
              selection
              options={recordStatusOptions}
              value = {newFile?.recordStatusId}
              onChange={dropdownHandler}
            />
          </Form.Group>

          <Form.Group>
            <input type="file" name="attachment" className="custom-file-label" onChange={saveFileSelected} />
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

FileModel.propTypes = {
  /**
   * Callback function for Add File
   */
  onAddFile: PropTypes.func,
  /**
   * Callback function for Update File
   */
  onUpdateFile: PropTypes.func,
  /**
   * Callback function for Delete File
   */
  onDeleteFile: PropTypes.func,
  /**
   * Callback function for Get File
   */
  onGetFile: PropTypes.func,
  /**
   * isEdit for bool type
   */
  isEdit: PropTypes.bool,
  /**
   * isDelete for bool type
   */
  isDelete: PropTypes.bool,
  /**
   * Callback function for Get File
   */
  onClose: PropTypes.func,
  /**
   * id for number type
   */
  id: PropTypes.number,
  /**
 * fileData for object type
 */
  FileData: PropTypes.any,
  /**
 * recordStatusData for object type
 */
  recordStatusList: PropTypes.any,
  /**
 * folderData for object type
 */
  folderList: PropTypes.any,
};

FileModel.defaultProps = {
  onAddFile: null,
  onUpdateFile: null,
  onDeleteFile: null,
  onGetFile: null,
  isEdit: false,
  isDelete: false,
  onClose: null,
  id: null,
  fileData: null,
  recordStatusList:null,
  folderList:null,
};

