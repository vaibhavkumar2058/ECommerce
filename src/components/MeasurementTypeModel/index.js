import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

export default function MeasurementTypeModel({
    onAddMeasurementType,
    onUpdateMeasurementType,
    onDeleteMeasurementType,
    isEdit,
    isDelete,
    onGetMeasurementType,
    id,
    onClose,
    measurementTypeData,
    recordStatusList = [],
}) {
    const [newMeasurementType, setNewMeasurementType] = useState({
        name: "",
        description: "",
        recordStatusId: null,
    });

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
        setNewMeasurementType({
            ...newMeasurementType,
            [e.target.name]: e.target.value,
        });
    };



    const saveHandler = async () => {
        newMeasurementType.file = fileSelected;
        if (isEdit) {
            const response = await onUpdateMeasurementType(id, newMeasurementType);
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
            const response = await onAddMeasurementType(newMeasurementType);
            if (response.payload.title == "Success") {
                setMessageStatus({
                    mode: 'success',
                    message: 'MeasurementType Record Saved Succefully.'
                })
                onClose(true);
                console.log(response.payload);
            }
            else {
                setMessageStatus({
                    mode: 'danger',
                    message: 'MeasurementType Save Failed.'
                })
            }
        }
    };

    const deleteHandler = async () => {
        const response = await onDeleteMeasurementType(id);
        if (response.payload.title == "Success") {
            onClose(true);
        }
        else {
            setMessageStatus({
                mode: 'danger',
                message: 'MeasurementType Delete Failed.'
            })
        }
    };
    const dropdownHandler = (event, { name,value }) => {
        setNewMeasurementType((currentMeasurementType) => ({ ...currentMeasurementType, [name]: value }));
    }


    useEffect(() => {
        if (isEdit) {
            setNewMeasurementType(measurementTypeData);
        }
    }, []);

    useEffect(() => {
        if (isEdit) {
            setButtonType("Update");
        }
        const isEnable =
            !newMeasurementType?.name || !newMeasurementType?.description|| !newMeasurementType?.recordStatusId;
        setSaveDisabled(isEnable);
    }, [newMeasurementType]);

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
                        controlId="formEnquiry"
                    >
                        <Form.Label>Measurement Type<span className="required">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Measurement Type"
                            value={newMeasurementType?.name}
                            onChange={changeHandler}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={newMeasurementType?.description}
                            onChange={changeHandler}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="recordStatus">
                        <Form.Label>Status<span className="required">*</span></Form.Label>
                        <Dropdown
                            name="recordStatusId"
                            placeholder='Select Status'
                            fluid
                            search
                            selection
                            options={recordStatusOptions}
                            value={newMeasurementType?.recordStatusId}
                            onChange={dropdownHandler}
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

MeasurementTypeModel.propTypes = {
    /**
     * Callback function for Add MeasurementType
     */
    onAddMeasurementType: PropTypes.func,
    /**
     * Callback function for Update MeasurementType
     */
    onUpdateMeasurementType: PropTypes.func,
    /**
     * Callback function for Delete MeasurementType
     */
    onDeleteMeasurementType: PropTypes.func,
    /**
     * Callback function for Get MeasurementType
     */
    onGetEnquiry: PropTypes.func,
    /**
     * isEdit for bool type
     */
    isEdit: PropTypes.bool,
    /**
     * isDelete for bool type
     */
    isDelete: PropTypes.bool,
    /**
     * Callback function for Get Enquiry
     */
    onClose: PropTypes.func,
    /**
     * id for number type
     */
    id: PropTypes.number,
    /**
   * enquiryData for object type
   */
    measurementTypeData: PropTypes.any,
    /**
 * recordStatusData for object type
 */
   recordStatusList: PropTypes.any,
};

MeasurementTypeModel.defaultProps = {
    onAddMeasurementType: null,
    onUpdateMeasurementType: null,
    onDeleteMeasurementType: null,
    onGetMeasurementType: null,
    isEdit: false,
    isDelete: false,
    onClose: null,
    id: null,
    measurementTypeData: null,
    recordStatusList:null,

};

