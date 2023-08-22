import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchGMT from "../hooks/useFetchGMT";
import GMTModel from "../components/GMTModel";
import useFetchRecordStatus from "../hooks/useFetchRecordStatus";
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

export default function GMTs() {

  const [GMTs, setGMTs] = useState([]);
  const [recordStatusList, setRecordStatusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllGMTs();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [GMT, setGMT] = useState({
    resourcesId:null,
    longitude:null,
    latitude:null,
    //trackTime:null ,
    description:"",
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
    addGMT,
    updateGMT,
    deleteGMT,
    getGMTs,
    GMTById,
  } = useFetchGMT();
  
  const { 
    getRecordStatuss,
  } = useFetchRecordStatus();


  const columns = [
    { dataField: 'gmtId', text: 'GMT', sort: true, hidden: true },
    { dataField: 'resourcesId', text: 'resourcesId',hidden:true, sort: true },
    { dataField: 'resourceName', text: 'Resource', sort: true },
    { dataField: 'longitude', text: ' Longitude', sort: true },
    { dataField: 'latitude', text: 'Latitude', sort: true },
    //{ dataField: 'trackTime', text: 'TrackTime', sort: true },
    { dataField: 'description', text: 'Description', sort: true },
    { dataField: 'recordStatusId', text: 'RecordStatusId',hidden:true, sort: true },
    { dataField: 'recordStatus', text: 'Status', sort: true },

        // columns follow dataField and text structure
    {
      dataField: "Actions",
      // text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <><button
            className="btn btn-primary btn-xs"
            onClick={() => handleView(row.gmtId, row.name)}
          >
            View
          </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.gmtId, row)}
            >
              Edit
            </button><button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.gmtId, row.name)}
            >
              Delete
            </button></>
        );
      },
    },
  ];

  useEffect(() => {
    getRecordStatusList();
    if (GMTs.length == 0) {
      getAllGMTs();
      setLoading(false)
    }
  }, [GMTs]);


  const defaultSorted = [{
    dataField: 'GMTId',
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };
  const handleEdit = (rowId, row) => {
    setGMT(row);
    //getGMTById(rowId);
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
        message: 'RecordStatus Fetch Failed.'
      })
    }
  };



  const getAllGMTs = async () => {
    const response = await getGMTs();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'GMTs Record Fetch Succefully.'
      })
      const dataFormatter = (rawData) => {
        const curedData = {};
        curedData.gmtId=rawData?.gmtId;
        curedData.resourcesId=rawData?.resourcesId;
        curedData.resourceName=rawData?.resources?.firstName+rawData?.resources?.middleName+rawData?.resources?.lastName;
        curedData.longitude=rawData?.longitude;
        curedData.latitude=rawData?.latitude;
        curedData.description=rawData?.description;
        curedData.recordStatusId=rawData?.recordStatusId;
        curedData.recordStatus=rawData?.recordStatus.actionName;
        return curedData;
      }

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(dataFormatter(response.payload[key]));      }

      setGMTs(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'GMT Fetch Failed.'
      })
    }
  };

  const getGMTById = async (id) => {
    const response = await GMTById(id);
    if (response.payload.title == "Success") {
      setGMT(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'GMT Get Failed.'
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
        {GMTs && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='GMTId'
            data={GMTs}
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
                            Add GMT
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
              <Modal.Title>Add GMT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <GMTModel
                onAddGMT={addGMT}
                onUpdateGMT={updateGMT}
                onDeleteGMT={deleteGMT}
                onGetGMT={GMTById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                GMTData={GMT}
                recordStatusList={recordStatusList}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </>
  );
};
