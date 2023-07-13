import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchOrder from "../hooks/useFetchOrder";
import useFetchRecordStatus from "../hooks/useFetchRecordStatus";
import useFetchCategoryType from "../hooks/useFetchCategoryType";
import useFetchCustomType from "../hooks/useFetchCustomType";
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

export default function Orders() {
  const userInfo = JSON.parse(localStorage.getItem('loggedIn'));
  const admin = userInfo?.role?.admin;
  const agent = userInfo?.role?.agent;
  const dealer = userInfo?.role?.dealer;
  const customer = userInfo?.role?.customer;

  // #region To bind the Griddata for Categorytype list
  const [categoryTypeList, setcategoryTypeList] = useState([]);

  // To bind the Griddata for Product
  const [productList, setproductList] = useState([]);

  // To bind the Griddata for MeasurementValue
  const [measurementValueList, setmeasurementValueList] = useState([]);

  // To bind the Griddata for MeasurementType
  const [measurementTypeList, setmeasurementTypeList] = useState([]);

  // Never used
  const [recordStatusList, setRecordStatusList] = useState([]);

  //  Used to Display Data by using Dataformatter 
  const [orders, setOrders] = useState([]);

  // To Load the Required Object
  const [loading, setLoading] = useState(true);

  // Never used
  const [error, setError] = useState(null);

  // Never used
  const [customTypeList, setCustomTypeList] = useState([]);

  // To show or Hide the Model popup 
  const [show, setShow] = useState(false);

  // To Edit the Model popup
  const [isEdit, setIsEdit] = useState(false);

  // To Delete data
  const [isDelete, setIsDelete] = useState(false);

  // To set Id of row
  const [id, setId] = useState(null);
  // #endregion

  // Function for open and Close Model popup
  const handleClose = () => {
    getAllOrders();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  // #region Hooks

  const {
    // To add order
    addOrder,
    // To update order
    updateOrder,
    // to delete order
    deleteOrder,
    // to get All orders
    getOrder,
    // get order by Id
    orderById,
    // to get order
    placeOrder,
  } = useFetchOrder();

  // To get Recordstatuss from hooks
  const {
    getRecordStatuss,
  } = useFetchRecordStatus();

  // To get CategoryTypes from hooks
  const {
    getCategoryTypes,
  } = useFetchCategoryType();

  // To get Products from hooks
  const {
    getProducts,
  } = useFetchProduct();

  // To get MeasurementTypes from hooks
  const {
    getMeasurementTypes,
  } = useFetchMeasurementType();

  // To get MeasurementValues from hooks
  const {
    getMeasurementValues,
  } = useFetchMeasurementValue();

  // To get CustomTypes from hooks
  const {
    getCustomTypes,
  } = useFetchCustomType();

  // #endregion

  // #region Order Object and its Properties
  const [order, setOrder] = useState({
    productId: null,
    orderItemId: null,
    resourcesId: null,
    orderDate: null,
    recordStatusId: null,
    description: "",
    dicountId:null,
    discountCode: null,
  });

  // MessageStatus object And its Properties
  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });
  // #endregion

  // #region Display Columns in the pages 
  const columns = [
    // columns follow dataField and text structure
    {
      dataField: "Actions", headerStyle: () => {
        return { width: "110px" };
      },
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
            {admin && <button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.orderId, row.name)}
            >
              Delete
            </button>}</>
        );
      },
    },
    { dataField: 'orderItemId', text: ' OrderItemId', sort: true, hidden: true, },
    { dataField: 'orderId', text: 'Order Id', sort: true, hidden: true},
    { dataField: 'orderName', text: 'Order', sort: true,headerStyle: () => {
      return { width: "120px" };
    } },
    { dataField: 'productId', text: 'productId', sort: true, hidden: true, },
    { dataField: 'productName', text: 'product', sort: true, hidden: true, },
    { dataField: 'discountId', text: 'discountId', sort: true, hidden: true, },
    { dataField: 'discountCode', text: 'discountCode', sort: true, hidden: true,},
    { dataField: 'quantity', text: 'quantity', sort: true, hidden: true, },
    { dataField: 'cost', text: ' cost', sort: true, hidden: true, },
    { dataField: 'description', text: 'Description', sort: true,headerStyle: () => {
      return { width: "150px" };
    } },
    {
      dataField: 'orderDate', text: 'Order Date', sort: true, headerStyle: () => {
        return { width: "160px" };
      }
    },
    { dataField: 'orderStatusId', text: 'orderStatusId', sort: true, hidden: true,
    } ,
    { dataField: 'orderStatusName', text: 'OrderStatus', sort: true,headerStyle: () => {
      return { width: "120px" };
    } },
    { dataField: 'recordStatusId', text: 'recordStatusId', sort: true, hidden: true },
    { dataField: 'recordStatus', text: 'Status', sort: true, hidden: true },
  ];
  // #endregion

  // useEffect Hook for Orders
  useEffect(() => {
    getRecordStatusList();
    getCategoryTypeList();
    getProductList();
    getCustomTypeList();
    getMeasurementTypeList();
    getMeasurementValueList();
    if (orders.length == 0) {
      getAllOrders();
      setLoading(false)
    }
  }, [orders]);

  // Never Used
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
        message: 'State Fetch Failed.'
      })
    }
  };

  // Never Used
  const getCustomTypeList = async () => {
    const response = await getCustomTypes();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
          arr.push(response.payload[key]);
      }
      setCustomTypeList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'CustomType Fetch Failed.'
      })
    }
  };


  // #region  API Calls  

  // API Call - To get the list of Orders in Grid
  async function getAllOrders() {
    const response = await getOrder();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'Orders Record Fetch Succefully.'
      });

      const dataFormatter = (rawData) => {
        const curedData = {};
        curedData.orderId = rawData?.orderId;
        curedData.orderName = 'MSO-' + rawData?.orderId;
        curedData.orderItemId = rawData?.orderItemId;
        curedData.orderDate = rawData?.orderDate;
        curedData.orderStatusId = rawData?.orderStatusId;
        curedData.orderStatusName = rawData?.orderStatus?.orderStatusName;
        curedData.categoryTypeId = rawData?.orderItemList[0]?.categoryTypeId;
        curedData.productId = rawData?.orderItemList[0]?.productId;
        curedData.measurementTypeId = rawData?.orderItemList[0]?.measurementTypeId;
        curedData.measurementValueId = rawData?.orderItemList[0]?.measurementValueId;
        curedData.productName = rawData?.product?.productName;
        curedData.description = rawData?.description;
        curedData.quantity = rawData?.orderItemList[0]?.quantity;
        curedData.cost = rawData?.orderItemList[0]?.cost;
        curedData.isIndividual = rawData?.orderItemList[0]?.isIndividual;
        curedData.totalCost = rawData?.orderItemList[0]?.totalCost;
        curedData.discountId = rawData?.discount?.discountId;
        curedData.discountCode = rawData?.discount?.discountCode;
        curedData.recordStatusId = rawData?.recordStatusId;
        curedData.recordStatus = rawData?.recordStatus.actionName;
        // curedData.orderDate = rawData?.createdDate;
        return curedData;
      };

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
          arr.push(dataFormatter(response.payload[key]));
      }

      setOrders(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Order Fetch Failed.'
      });
    }
  }

  // API CAll - To get the list of CategoryTypes for Dropdown
  const getCategoryTypeList = async () => {
    const response = await getCategoryTypes();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
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

  // API CAll - To get the list of Products for Dropdown
  const getProductList = async () => {
    const response = await getProducts();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
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

  // API CAll - To get the list of MeasurementValues for Dropdown
  const getMeasurementValueList = async () => {
    const response = await getMeasurementValues();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
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

  // API Call - To get the list of MeasurementValues for Dropdown
  const getMeasurementTypeList = async () => {
    const response = await getMeasurementTypes();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
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

  // To get Order by Id 
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

  // #endregion 

 // #region Bootstrap Table Functionality  - Start
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

  const defaultSorted = [{
    dataField: 'OrderId',
    order: 'desc'
  }];

  // Message to Display in Table when no data is present
  const emptyDataMessage = () => { return 'No Data to Display'; }

 // #region Button - Start
 
  // View handle Functionality for Orders
  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  // Edit handle Functionality for Orders
  const handleEdit = (rowId, row) => {
    setOrder(row);
    //getOrdersById(rowId);
    setId(rowId);
    setIsEdit(true);
    setShow(true);
  };

  // Delete handle Functionality for Orders
  const handleDelete = (rowId, name) => {
    setId(rowId);
    setIsDelete(true);
    setShow(true);
  };
  // #endregion Button  - End

  // #endregion Boostrap Table Functionality - End

  //  HTML Code - start
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
                onUpdateOrder={updateOrder}
                onDeleteOrder={deleteOrder}
                onGetOrder={orderById}
                onClose={handleClose}
                onPlaceOrder={placeOrder}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                orderData={order}
                recordStatusList={recordStatusList}
                categoryTypeList={categoryTypeList}
                measurementTypeList={measurementTypeList}
                measurementValueList={measurementValueList}
                customTypeList={customTypeList}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </>
  );
};

//  HTML Code  - End
