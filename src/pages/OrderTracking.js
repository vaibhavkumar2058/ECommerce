	
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchOrderTracking from "../hooks/useFetchOrderTracking";
import useFetchOrderStatus from "../hooks/useFetchOrderStatus";
import OrderTrackingModel from "../components/OrderTrackingModel";
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

export default function OrderTracking() {
  const userInfo = JSON.parse(localStorage.getItem('loggedIn'));
  const admin=userInfo?.role?.admin;
  const agent=userInfo?.role?.agent;
  const dealer=userInfo?.role?.dealer;
  const customer=userInfo?.role?.customer;


  const [orderTrackinges, setOrderTrackinges] = useState([]);
  const [recordStatusList, setRecordStatusList] = useState([]);
  const [orderStatusList, setOrderStatusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllOrderTrackinges();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [orderTracking, setOrderTracking] = useState({
    orderId:null,
    orderStatusId:null,
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
    addOrderTracking,
    updateOrderTracking,
    deleteOrderTracking,
    getOrderTrackinges,
    orderTrackingById,
  } = useFetchOrderTracking();
  const { 
    getOrderStatuses,
  } = useFetchOrderStatus();

  
  const { 
    getRecordStatuss,
  } = useFetchRecordStatus();


  const columns = [
    { dataField: 'orderTrackingId', text: 'Order Tracking ', sort: true, hidden: true },
    { dataField: 'orderName', text: 'Order', sort: true},
    { dataField: 'orderId', text: 'Order', sort: true, hidden: true},
    { dataField: 'orderStatus', text: 'Order Status ', sort: true},
     { dataField: 'orderStatusId', text: 'orderStatusId ', sort: true,hidden: true },
    { dataField: 'description', text: 'Description', sort: true},
    { dataField: 'recordStatusId', text: 'recordStatusId', sort: true, hidden: true },
    { dataField: 'recordStatus', text: 'Status', sort: true,hidden: true },

    // columns follow dataField and text structure
    {
      dataField: "Actions",
      // text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <><button
            className="btn btn-primary btn-xs"
            onClick={() => handleView(row.orderTrackingId, row.name)}
          >
            View
          </button>
            {admin && <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.orderTrackingId, row)}
            >
              Edit
            </button>}
            {admin && <button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.orderTrackingId, row.name)}
            >
              Delete
            </button>}</>
        );
      },
    },
  ];

  useEffect(() => {
    getRecordStatusList();
    getOrderStatusList();
    if (orderTrackinges.length == 0) {
      getAllOrderTrackinges();
      setLoading(false)
    }
  }, [orderTrackinges]);


  const defaultSorted = [{
    dataField: 'orderTrackingId',
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  const handleEdit = (rowId, row) => {
    setOrderTracking(row);
    //getOrderTrackingById(rowId);
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
        message: 'OrderTracking Fetch Failed.'
        
      })
    }
  };
  const getOrderStatusList = async () => {
    const response = await getOrderStatuses();
    if (response.payload.title == "Success") {
      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(response.payload[key]);
      }
      setOrderStatusList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'OrderTracking Fetch Failed.'
       
      })
    }
  };


  const getAllOrderTrackinges = async () => {
    const response = await getOrderTrackinges();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'OrderTracking Record Fetch Succefully.'
      })
      debugger
      const dataFormatter = (rawData) => {
        const curedData = {};
        curedData.orderTrackingId=rawData.orderTrackingId;
        curedData.orderName = 'MSO-' + rawData?.orderId;
        curedData.orderId = rawData?.orderId;
        curedData.orderStatus = rawData?.orderStatus.orderStatusName;
        curedData.orderStatusId = rawData?.orderStatusId;
        curedData.description=rawData?.description;
        curedData.recordStatusId=rawData?.recordStatusId;
        curedData.recordStatus=rawData?.recordStatus.actionName;
        return curedData;
      }
      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(dataFormatter(response.payload[key]));
      }

      setOrderTrackinges(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'OrderTracking Fetch Failed.'
      })
    }
  };

  const getOrderTrackingById = async (id) => {
    const response = await orderTrackingById(id);
    if (response.payload.title == "Success") {
      setOrderTracking(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'OrderTracking Get Failed.'
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
        {orderTrackinges && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='orderTrackingId'
            data={orderTrackinges}
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
                            Add OrderTracking
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
              <Modal.Title>Add OrderTracking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <OrderTrackingModel
                onAddOrderTracking={addOrderTracking}
                onUpdateOrderTracking={updateOrderTracking}
                onDeleteOrderTracking={deleteOrderTracking}
                onGetOrderTracking={orderTrackingById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                orderTrackingData={orderTracking}
                recordStatusList={recordStatusList}

                orderStatusList={orderStatusList}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </>
  );
};
	
















