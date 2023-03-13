import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchNotification from "../hooks/useFetchNotification";
import useFetchNotificationType from "../hooks/useFetchNotificationType";
import useFetchRecordStatus from "../hooks/useFetchRecordStatus";
import NotificationModel from "../components/NotificationModel";
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

export default function Notifications() {
  const [recordStatusList, setRecordStatusList] = useState([]);
  const [notificationTypeList, setNotificationTypeList] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllNotifications();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [notification, setNotification] = useState({
    notificationTypeId:null,
    notificationName:"",
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
    addNotification,
    updateNotification,
    deleteNotification,
    getNotifications,
    notificationById,
  } = useFetchNotification();

  const { 
    getRecordStatuss,
  } = useFetchRecordStatus();
  
  const { 
    getNotificationTypes,
  } = useFetchNotificationType();
  
  const columns = [

    { dataField: 'notificationTypeId', text: 'NotificationTypeId', sort: true},
    { dataField: 'notificationId', text: 'NotificationId', sort: true},
    { dataField: 'notificationName', text: ' NotificationName', sort: true },
    { dataField: 'description', text: 'Description', sort: true },
    { dataField: 'recordStatusId', text: ' RecordStatus', sort: true },
    // columns follow dataField and text structure
    {
      dataField: "Actions",
      // text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <><button
            className="btn btn-primary btn-xs"
            onClick={() => handleView(row.notificationId, row.name)}
          >
            View
          </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.notificationId, row)}
            >
              Edit
            </button><button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.notificationId, row.name)}
            >
              Delete
            </button></>
        );
      },
    },
  ];

  

  useEffect(() => {
    getRecordStatusList();
    getNotificationTypeList();
    if (notifications.length == 0) {
      getAllNotifications();
      setLoading(false)
    }
  }, [notifications]);

  

  const defaultSorted = [{
    dataField: 'notificationId',
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  const handleEdit = (rowId, row) => {
    setNotification(row);
    //getNotificationsById(rowId);
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
        arr.push(response.payload[key]);
      }
      setRecordStatusList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'State Fetch Failed.'
      })
    }
  };

  const getNotificationTypeList = async () => {
    const response = await getNotificationTypes();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        arr.push(response.payload[key]);
      }
      setNotificationTypeList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'State Fetch Failed.'
      })
    }
  };


  const getAllNotifications = async () => {
    const response = await getNotifications();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'Notifications Record Fetch Succefully.'
      })

      var arr = [];
      for (var key in response.payload) {
        arr.push(response.payload[key]);
      }

      setNotifications(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Notification Fetch Failed.'
      })
    }
  };

  const getNotificationById = async (id) => {
    const response = await notificationById(id);
    if (response.payload.title == "Success") {
      setNotification(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Notification Get Failed.'
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
        {notifications && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='notificationId'
            data={notifications}
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
                            Add Notification
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
              <Modal.Title>Add Notification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <NotificationModel
                onAddNotification={addNotification}
                onUpdateNotification={updateNotification}
                onDeleteNotification={deleteNotification}
                onGetNotification={notificationById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                notificationData={notification}
                recordStatusList={recordStatusList}
                notificationTypeList={notificationTypeList}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </>
  );
};
