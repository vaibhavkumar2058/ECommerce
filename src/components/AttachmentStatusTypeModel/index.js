import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function AttachmentStatusTypeModel({
    onAddAttachmentStatusType,
    onUpdateAttachmentStatusType,
    onDeleteAttachmentStatusType,
    isEdit,
    isDelete,
    onGetAttachmentStatusType,
    id,
    onClose,
    attachmentStatusTypeData,
    recordStatusList = [],
    
}) {
    const [newAttachmentStatusType, setNewAttachmentStatusType] = useState({
        AttachmentStatusTypeName: null,
        Description: "",
        recordStatusId: null,
    });
    const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatusList.map((recordStatus, item) => (
        {
            key: item,
            text: recordStatus.actionName,
            value: recordStatus.recordStatusId,
        })).filter((item) => item));

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
        setNewAttachmentStatusType({
            ...newAttachmentStatusType,
            [e.target.name]: e.target.value,
        });
    };


    const saveHandler = async () => {

        if (isEdit) {
            const response = await onUpdateAttachmentStatusType(id, newAttachmentStatusType);
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
            const response = await onAddAttachmentStatusType(newAttachmentStatusType);
            if (response.payload.title == "Success") {
                setMessageStatus({
                    mode: 'success',
                    message: 'AttachmentStatusType Record Saved Succefully.'
                })
                onClose(true);
                console.log(response.payload);
            }
            else {
                setMessageStatus({
                    mode: 'danger',
                    message: 'AttachmentStatusType Save Failed.'
                })
            }
        }
    };

    const deleteHandler = async () => {
        const response = await onDeleteAttachmentStatusType(id);
        if (response.payload.title == "Success") {
            onClose(true);
        }
        else {
            setMessageStatus({
                mode: 'danger',
                message: 'AttachmentStatusType Delete Failed.'
            })
        }
    };
    const dropdownHandler = (event, { name, value }) => {
        setNewAttachmentStatusType((currentAttachmentStatusType) => ({ ...currentAttachmentStatusType, [name]: value }));

    }

    
    useEffect(() => {
        if (isEdit) {
            setNewAttachmentStatusType(attachmentStatusTypeData);
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
        const isEnable = !newAttachmentStatusType?.AttachmentStatusTypeId
            || !newAttachmentStatusType?.AttachmentStatusTypeName
            || !newAttachmentStatusType?.Description
            || !newAttachmentStatusType?.recordStatusId;
        setSaveDisabled(isEnable);
    }, [newAttachmentStatusType]);


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
                            <Form.Group className="mb-3" controlId="AttachmentStatusTypeId">
                                <Form.Label>AttachmentStatusType<span className="required">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="AttachmentStatusTypeId"
                                    placeholder=" Select AttachmentStatusType"
                                    value={newAttachmentStatusType?.AttachmentStatusTypeId}
                                    onChange={changeHandler}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="AttachmentStatusTypeName">
                                <Form.Label>AttachmentStatusTypeName<span className="required">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="AttachmentStatusTypeName"
                                    placeholder=" Select AttachmentStatusTypeName"
                                    value={newAttachmentStatusType?.AttachmentStatusTypeName}
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
                                    placeholder=" Select Description"
                                    value={newAttachmentStatusType?.description}
                                    onChange={changeHandler}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="recordStatusId">
                                <Form.Label>Status<span className="required">*</span></Form.Label>
                                <Dropdown
                                    name="recordStatusId"
                                    placeholder='Select RecordStatus'
                                    fluid
                                    search
                                    selection
                                    options={recordStatusOptions}
                                    value={newAttachmentStatusType?.recordStatusId}
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

AttachmentStatusTypeModel.propTypes = {
    /**
     * Callback function for Add AttachmentStatusType
     */
    onAddAttachmentStatusType: PropTypes.func,
    /**
     * Callback function for Update AttachmentStatusType
     */
    onUpdateAttachmentStatusType: PropTypes.func,
    /**
     * Callback function for Delete AttachmentStatusType
     */
    onDeleteAttachmentStatusType: PropTypes.func,
    /**
     * Callback function for Get AttachmentStatusType
     */
    onGetAttachmentStatusType: PropTypes.func,
    /**
     * isEdit for bool type
     */
    isEdit: PropTypes.bool,
    /**
     * isDelete for bool type
     */
    isDelete: PropTypes.bool,
    /**
     * Callback function for Get AttachmentStatusType
     */
    onClose: PropTypes.func,
    /**
     * id for number type
     */
    id: PropTypes.number,
    /**
   * attachmentStatusTypeData for object type
   */
    attachmentStatusTypeData: PropTypes.any,
    /**
  * attachmentStatusTypeName for object type
  */
    attachmentStatusTypeName: PropTypes.any,
    /**
     * recordStatusList for object type
     */
    recordStatusList: PropTypes.any,
};

AttachmentStatusTypeModel.defaultProps = {
    onAddAttachmentStatusType: null,
    onUpdateAttachmentStatusType: null,
    onDeleteAttachmentStatusType: null,
    onGetAttachmentStatusType: null,
    isEdit: false,
    isDelete: false,
    onClose: null,
    id: null,
    AttachmentStatusTypeData: null,
    recordStatusList: null,
};

