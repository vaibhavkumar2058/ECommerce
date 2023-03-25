import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchOrder from "../hooks/useFetchOrder";
import useFetchRecordStatus from "../hooks/useFetchRecordStatus";
import useFetchCategoryType from "../hooks/useFetchCategoryType";
import useFetchProduct from "../hooks/useFetchProduct";
import useFetchMeasurementType from "../hooks/useFetchMeasurementType";
import useFetchMeasurementValue from "../hooks/useFetchMeasurementValue";
import OrderModel from "../components/OrderModel";
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

export default function Orders() {
  const userInfo = JSON.parse(localStorage.getItem('loggedIn'));
  const admin=userInfo?.role?.admin;
  const agent=userInfo?.role?.agent;
  const dealer=userInfo?.role?.dealer;
  const customer=userInfo?.role?.customer;


  const [recordStatusList, setRecordStatusList] = useState([]);
  const [categoryTypeList, setcategoryTypeList] = useState([]);
  const [productList, setproductList] = useState([]);
  const [measurementTypeList, setmeasurementTypeList] = useState([]);
  const [measurementValueList, setmeasurementValueList] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllOrders();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [order, setOrder] = useState({
    orderItemId:null,
    resourcesId:null,
    orderDate:null,
    recordStatusId:null,
    description:"",
      });

  const [id, setId] = useState(null);

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  const { 
    addOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    orderById,
    placeOrder,
  } = useFetchOrder();
  const { 
    getRecordStatuss,
  } = useFetchRecordStatus();
  const { 
    getCategoryTypes,
  } = useFetchCategoryType();
  const { 
    getProducts,
  } = useFetchProduct();
  const { 
    getMeasurementTypes,
  } = useFetchMeasurementType();
  const { 
    getMeasurementValues,
  } = useFetchMeasurementValue();





  const columns = [ 

    { dataField: 'orderId', text: 'OrderId', sort: true,hidden:true},
    { dataField: 'orderItemId', text: ' OrderItemId', sort: true ,hidden:true},
    { dataField: 'resourcesId', text: 'ResourcesId', sort: true ,hidden:true},
    { dataField: 'description', text: 'Description', sort: true },
    { dataField: 'recordStatusId', text: ' RecordStatus', sort: true },
    { dataField: 'orderDate', text: 'OrderDate', sort: true },
    // columns follow dataField and text structure
    {
      dataField: "Actions",
      // text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <><button
            className="btn btn-primary btn-xs"
            onClick={() => handleView(row.orderId, row.name)}
          >
            View
          </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.orderId, row)}
            >
              Edit
            </button>
            { admin && <button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.orderId, row.name)}
            >
              Delete
            </button>}</>
        );
      },
    },
  ];

  useEffect(() => {
    getRecordStatusList();
    getCategoryTypeList();
    getProductList();
    getMeasurementTypeList();
    getMeasurementValueList();
    if (orders.length == 0) {
      getAllOrders();
      setLoading(false)
    }
  }, [orders]);


  const defaultSorted = [{
    dataField: 'orderId',
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  const handleEdit = (rowId, row) => {
    setOrder(row);
    //getOrdersById(rowId);
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
  const getCategoryTypeList = async () => {
    const response = await getCategoryTypes();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        arr.push(response.payload[key]);
      }
      setcategoryTypeList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'CategoryType Fetch Failed.'
      })
    }
  };
  const getProductList = async () => {
    const response = await getProducts();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        arr.push(response.payload[key]);
      }
      setproductList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Product Fetch Failed.'
      })
    }
  };
  const getMeasurementTypeList = async () => {
    const response = await getMeasurementTypes();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        arr.push(response.payload[key]);
      }
      setmeasurementTypeList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'MeasurementType Fetch Failed.'
      })
    }
  };
  const getMeasurementValueList = async () => {
    const response = await getMeasurementValues();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        arr.push(response.payload[key]);
      }
      setmeasurementValueList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'MeasurementValue Fetch Failed.'
      })
    }
  };


  const getAllOrders = async () => {
    const response = await getOrder();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'Orders Record Fetch Succefully.'
      })

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(response.payload[key]);
      }

      setOrders(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Order Fetch Failed.'
      })
    }
  };

  const getOrderById = async (id) => {
    const response = await orderById(id);
    if (response.payload.title == "Success") {
      setOrder(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Order Get Failed.'
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
        {orders && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='orderId'
            data={orders}
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
                            Add Order
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
              <Modal.Title>Add Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <OrderModel
                onAddOrder={addOrder}
                onUpdateOrder={updateOrder}
                onDeleteOrder={deleteOrder}
                onGetOrder={orderById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                orderData={order}
                onPlaceOrder={placeOrder}
                recordStatusList={recordStatusList}
                categoryTypeList={categoryTypeList}
                productList={productList}
                measurementTypeList={measurementTypeList}
                measurementValueList={measurementValueList}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </>
  );
};
