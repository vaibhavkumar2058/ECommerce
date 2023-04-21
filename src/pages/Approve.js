import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchApprove from "../hooks/useFetchApprove";
import useFetchRecordStatus from "../hooks/useFetchRecordStatus";
import useFetchApproveStatus from "../hooks/useFetchApproveStatus";
import ApproveModel from "../components/ApproveModel";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';


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

export default function Approves() {

  const [approves, setApproves] = useState([]);
  const [recordStatusList, setRecordStatusList] = useState([]);
  const [approveStatusList, setApproveStatusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllApproves();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [approve, setApprove] = useState({
    resourcesId: null,
    approverId: null,
    comment: "",
    approveStatusId: null,
    recordStatusId:null,
    
      });

  const [id, setId] = useState(null);

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  const { 
    addApprove,
    updateApprove,
    deleteApprove,
    getApproves,
    approveById,
  } = useFetchApprove();

  const { 
    getRecordStatuss,
  } = useFetchRecordStatus();
  
  const { 
    getApproveStatuss,
  } = useFetchApproveStatus();
  

  const columns = [
    { dataField: 'approveId', text: 'Approve Id', sort: true, hidden: true },
    { dataField: 'resourcesId', text: 'resourcesId', sort: true, hidden: true },
    { dataField: 'resourceName', text: 'Resource', sort: true, },
    { dataField: 'approverId', text: 'Approver Id', sort: true },
    { dataField: 'Comment', text: 'Comment', sort: true},
    { dataField: 'approveStatusId', text: 'ApproveStatus Id', sort: true },
    { dataField: 'recordStatusId', text: 'recordStatusId',hidden:true, sort: true,headerStyle: () => {
      return { width: "100px" };
    } },
    { dataField: 'recordStatus', text: 'Status', sort: true,headerStyle: () => {
      return { width: "100px" };
    } },
    
    
    // columns follow dataField and text structure
    {
      dataField: "Actions",
      // text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <><button
            className="btn btn-primary btn-xs"
            onClick={() => handleView(row.approveId, row.name)}
          >
            View
          </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.approveId, row)}
            >
              Edit
            </button><button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.approveId, row.name)}
            >
              Delete
            </button></>
        );
      },
    },
  ];

  useEffect(() => {
    getRecordStatusList();
    getApproveStatusList();
    if (approves.length == 0) {
      getAllApproves();
      setLoading(false)
    }
  }, [approves]);


  const defaultSorted = [{
    dataField: 'approveId',
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  const handleEdit = (rowId, row) => {
    setApprove(row);
    //getApproveById(rowId);
    setId(rowId);
    setIsEdit(true);
    setShow(true);
  };

  const handleDelete = (rowId, name) => {
    setId(rowId);
    setIsDelete(true);
    setShow(true);
  };

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
  const getRecordStatusList = async () => {
    const response = await getRecordStatuss();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(response.payload[key]);
      }
      setRecordStatusList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Approve Fetch Failed.'
      })
    }
  };
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
  

  const getAllApproves = async () => {
    const response = await getApproves();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'Approve Record Fetch Succefully.'
      })
      const dataFormatter = (rawData) => {
        const curedData = {};
        curedData.approveId=rawData?.approveId;
        curedData.resourcesId=rawData?.resourcesId;
        curedData.resourceName=rawData?.resources?.firstName+rawData?.resources?.middleName+rawData?.resources?.lastName;
        curedData.approverId=rawData?.approverId;
        curedData.comment=rawData?.comment;
        curedData.approveStatusId=rawData?.approveStatusId;
        curedData.recordStatusId=rawData?.recordStatus.recordStatusId;
        curedData.recordStatus=rawData?.recordStatus.actionName;
        
        return curedData;
      }
      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(dataFormatter(response.payload[key]));
      }

      setApproves(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Approve Fetch Failed.'
      })
    }
  };

  const getApproveById = async (id) => {
    const response = await approveById(id);
    if (response.payload.title == "Success") {
      setApprove(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Approve Get Failed.'
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
        {approves && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='approveId'
            data={approves}
            columns={columns}
            search
          >
            {
              props => (
                <div>
                  <div className="row m-t-5">
                    <div className="col-lg-6 text-gred">
                      <SearchBar {...props.searchProps} /><ClearSearchButton {...props.searchProps} />
                    </div>
                    <div className="col-lg-6">
                      <div className="row">
                        <div className="app-right col-lg-12">
                          <div className="app-float-right p-1">
                          <MyExportCSV {...props.csvProps} /></div>
                          <div className="app-float-right p-1">
                          <Button variant="primary" onClick={handleShow}>
                            Add Approve
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
          <Modal dialogClassName="my-modal" 
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Approve</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ApproveModel
                onAddApprove={addApprove}
                onUpdateApprove={updateApprove}
                onDeleteApprove={deleteApprove}
                onGetApprove={approveById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                approveData={approve}
                recordStatusList={recordStatusList}
                approveStatusList={approveStatusList}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </>
  );
};
