import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchResourceAttachments from "../hooks/useFetchResourceAttachments";
import ResourceAttachmentsModel from "../components/ResourceAttachmentsModel";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { Dropdown } from 'semantic-ui-react';
import Form from "react-bootstrap/Form";
import useFetchApproveStatus from "../hooks/useFetchApproveStatus";
import useFetchApprove from "../hooks/useFetchApprove";
import useFetchFiles from "../hooks/useFetchFile";


const { SearchBar, ClearSearchButton } = Search;

const MyExportCSV = (props) => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    <div>
      <button className="btn btn-success" onClick={handleClick}>Export to CSV</button>
    </div>
  );
};

export default function ResourceAttachments() {
  const userInfo = JSON.parse(localStorage.getItem('loggedIn'));
  const resourceId = userInfo?.resourcesId;
  const [resourceAttachmentses, setResourceAttachmentses] = useState([]);
  const [approveStatusList, setApproveStatusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllResourceAttachmentses(resourceId);
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  const hapyCarURL = "https://localhost:44320/files";
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [approve, setApproves] = useState(
    {
      resourcesId: null,
      approverId: null,
      approveStatusId: null,
      comment: "",
    }
  );
  const [resourceAttachmentes, setResourceAttachments] = useState({
    resourcesId: null,
    filesId: null,
    resourceAttachmentTypeId: null,
    attachmentStatusTypeId: null,
    //visibleToCustomer: true,
    description: "",

  });

  const [id, setId] = useState(null);

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  const {
    addResourceAttachments,
    updateResourceAttachments,
    deleteResourceAttachments,
    getResourceAttachmentses,
    resourceAttachmentsById,
  } = useFetchResourceAttachments();

  const {
    getApproveStatuss,
  } = useFetchApproveStatus();
  const {
    addApprove,
  } = useFetchApprove();
  const {
    downloadFileById,
  } = useFetchFiles();


  const [approveStatusOptions, setApproveStatusOptions] = useState(approveStatusList.map((approveStatus, item) => (
    {
      key: item,
      text: approveStatus.approveStatusName,
      value: approveStatus.approveStatusId,
    })).filter((item) => item));

  const dropdownHandler = (event, { name, value }) => {
    setApproves((currentApprove) => ({ ...currentApprove, [name]: value }));

  }
  useEffect(() => {
    setApproveStatusOptions(approveStatusList.map((approveStatus, item) => (
      {
        key: item,
        text: approveStatus.approveStatusName,
        value: approveStatus.approveStatusId,
      })).filter((item) => item));
  }, [approveStatusList]);
  const changeHandler = (e) => {
    setApproves({
      ...approve,
      [e.target.name]: e.target.value,
    });
  };
  const columns = [

    { dataField: 'resourceAttachmentsId', text: 'ResourceAttachmentsId ', sort: true, hidden: true },
    { dataField: 'resourcesId', text: ' resourcesId', sort: true, hidden: true },
    { dataField: 'filesId', text: 'filesId', sort: true ,hidden: true},
    { dataField: 'fileName', text: 'File Name', sort: true },
    { dataField: 'attachmentStatusTypeId', text: 'Attachment Status Type', sort: true },
    { dataField: 'documentType', text: 'Document Type', sort: true,headerStyle: () => {return { width: "230px" };} },
    { dataField: 'attachmentStatusTypeId', text: 'AttachmentStatus Type', sort: true },
    {
      dataField: 'documentType', text: 'Document Type', sort: true, headerStyle: () => {
        return { width: "230px" };
      }
    },
    // { dataField: 'description', text: 'Description', sort: true,headerStyle: () => {
    //   return { width: "200px" };
    // } },
    //{ dataField: 'visibleToCustomer', text: 'VisibleToCustomer', sort: true ,headerStyle: () => {
    //return { width: "200px" };
    //}},

    // columns follow dataField and text structure
    {
      dataField: "Actions",
      // text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <><button
            className="btn btn-primary btn-xs"
            onClick={() => handleView(row.resourceAttachmentsId, row.name)}
          >
            View
          </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.resourceAttachmentsId, row)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.resourceAttachmentsId, row.name)}
            >
              Delete
            </button>
            <a href={`${hapyCarURL}/download/${row.filesId}`}>
              Download</a>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getApproveStatusList();
    if (ResourceAttachments.length == 0) {
      getAllResourceAttachmentses(resourceId);
      setLoading(false)
    }
  }, [ResourceAttachments]);


  const defaultSorted = [{
    dataField: 'ResourceAttachmentsId',
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  const handleEdit = (rowId, row) => {
    setResourceAttachments(row);
    //getResourceAttachmentsById(rowId);
    setId(rowId);
    setIsEdit(true);
    setShow(true);
  };

  const handleDelete = (rowId, name) => {
    setId(rowId);
    setIsDelete(true);
    setShow(true);
  };
  const handleDownload = (rowId) => {
    setId(rowId);
    handleFunction(rowId);
  };


  const handleFunction = async (filesId) => {
    
    const response = await downloadFileById(5050);

  }

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });

  const handleSubmit = async () => {
    alert("keerthana")
    approve.resourcesId = userInfo.resourcesId;
    approve.approverId = 1
    approve.approveStatusId = 1;
    approve.comment = "test";
    const response = await addApprove(approve);
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'Approve Record Saved Succefully.'
      })

    }

  }
  const getApproveStatusList = async () => {
    const response = await getApproveStatuss();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
          arr.push(response.payload[key]);
      }
      setApproveStatusList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ApproveStatus Fetch Failed.'
      })
    }
  };



  const getAllResourceAttachmentses = async (resourceId) => {
    const response = await getResourceAttachmentses(resourceId);
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'ResourceAttachments Record Fetch Succefully.'
      })
      const dataFormatter = (rawData) => {
        const curedData = {};
        curedData.resourceAttachmentsId = rawData?.resourceAttachmentsId;
        curedData.filesId = rawData?.filesId
        curedData.fileName = rawData?.files?.fileName;
        curedData.attachmentStatusTypeId = rawData?.attachmentStatusType?.attachmentStatusTypeName;
        curedData.documentType = rawData?.resourceAttachmentType?.displayText;
        curedData.resourcesId = rawData?.resourcesId;
        curedData.resourcesImage = 'data:' + rawData?.files?.fileMimeType + ';base64,' + rawData?.resourceAttachment?.files?.base64;
        return curedData;

      }

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
          arr.push(dataFormatter(response.payload[key]));
      }

      setResourceAttachmentses(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ResourceAttachments Fetch Failed.'
      })
    }
  };

  const getResourceAttachmentsById = async (id) => {
    const response = await resourceAttachmentsById(id);
    if (response.payload.title == "Success") {
      setResourceAttachments(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ResourceAttachments Get Failed.'
      })
    }
  };

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    clickToExpand: true,
  };

  const expandRow = {
    showExpandColumn: true,
    renderer: row => (
      <div>
        <p>{`This Expand row is belong to rowKey ${row.id}`}</p>
        <p>You can render anything here, also you can add additional data on every row object</p>
        <p>expandRow.renderer callback will pass the origin row object to you</p>
      </div>
    )
  };


  return (
    <>
      <div className="m-t-40">
        {loading && <div>A moment please...</div>}
        {resourceAttachmentses && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='resourceAttachmentsId'
            data={resourceAttachmentses}
            columns={columns}
            search
          >
            {
              props => (
                <div>
                  <div className="row m-t-5">
                    <div className="col-lg-6 ">
                      <div className="col-lg-6 text-gred">
                        <SearchBar {...props.searchProps} /><ClearSearchButton {...props.searchProps} />
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>Approve Status<span className="required">*</span></Form.Label>
                              <Dropdown
                                name="approveStatusId"
                                placeholder='Select  Status'
                                fluid
                                search
                                selection
                                options={approveStatusOptions}
                                value={approve?.approveStatusId}
                                onChange={dropdownHandler}
                              />
                            </Form.Group>
                          </div>

                          <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>Comment</Form.Label>
                              <Form.Control
                                type="text"
                                name="comment"
                                placeholder="Comment"
                                value={approve?.comment}
                                onChange={changeHandler}
                              />
                            </Form.Group>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="row">
                        <div className="app-right col-lg-12">
                          <div className="app-float-right p-1">
                            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                          </div>
                          {/* <div className="app-float-right p-1">
                          <MyExportCSV {...props.csvProps} /></div> */}
                          <div className="app-float-right p-1">
                            <Button variant="primary" onClick={handleShow}>
                              Add Resource Attachments
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <BootstrapTable
                    defaultSorted={defaultSorted}
                    pagination={pagination}
                    {...props.baseProps}
                    noDataIndication={emptyDataMessage}
                    wrapperClasses="table-responsive"
                    selectRow={selectRow}
                  />
                </div>
              )
            }
          </ToolkitProvider>
          {/* <BootstrapTable bootstrap4  keyField='id' data={products} columns={columns} defaultSorted={defaultSorted} pagination={pagination} /> */}

        </div>)}
        {/* <!--- Model Box ---> */}
        <div className="model_box">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Resource Attachments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ResourceAttachmentsModel
                onAddResourceAttachments={addResourceAttachments}
                onUpdateResourceAttachments={updateResourceAttachments}
                onDeleteResourceAttachments={deleteResourceAttachments}
                onGetResourceAttachments={resourceAttachmentsById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                resourceAttachmentsData={resourceAttachmentses}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </>
  );
};
