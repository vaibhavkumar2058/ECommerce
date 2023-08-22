import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchOrderItem from "../hooks/useFetchOrderItem";
import useFetchRecordStatus from "../hooks/useFetchRecordStatus";
import useFetchProduct from "../hooks/useFetchProduct";
import OrderItemModel from "../components/OrderItemModel";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import Geocode from "react-geocode";


export default function OrderItems() {
  const [productList, setProductList] = useState([]);
  const [recordStatusList, setRecordStatusList] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllOrderItems();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [orderItem, setOrderItem] = useState({
    productId: null,
    orderId: null,
    cost: "",
    quantity: "",
    recordStatusId: null,
  });

  const [id, setId] = useState(null);

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  const {
    addOrderItem,
    updateOrderItem,
    deleteOrderItem,
    getOrderItems,
    orderItemById,
  } = useFetchOrderItem();

  const {
    getRecordStatuss,
  } = useFetchRecordStatus();

  const {
    getProducts,
  } = useFetchProduct();

  const columns = [
    {
      dataField: "Actions", headerstyle:() => {
        return {width:""}
      },
      // text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <><button
            className="btn btn-primary btn-xs"
            onClick={() => handleView(row.orderItemId, row.name)}
          >
            View
          </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.orderItemId, row)}
            >
              Edit
            </button><button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.orderItemId, row.name)}
            >
              Delete
            </button></>
        );
      },
    },
    { dataField: 'productId', text: 'productId', hidden: true, sort: true, },
    { dataField: 'productName', text: 'productName', sort: true, },
    { dataField: 'orderId', text: ' orderId', sort: true, hidden: true },
    { dataField: 'cost', text: 'Cost', sort: true },
    { dataField: 'quantity', text: 'Quantity', sort: true },
    { dataField: 'recordStatusId', text: 'RecordStatusId', hidden: true, sort: true, },
    { dataField: 'recordStatus', text: 'Status', sort: true, },
    // columns follow dataField and text structure
  ];

  useEffect(() => {
    getRecordStatusList();
    getProductList();

    if (orderItems.length == 0) {
      getAllOrderItems();
      setLoading(false)
    }
  }, [orderItems]);

  useEffect(() => {
    if (orderItems.length == 0) {
      getAllOrderItems();
      setLoading(false)
    }
  }, [orderItems]);


  const defaultSorted = [{
    dataField: 'orderItemId',
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  const handleEdit = (rowId, row) => {
    setOrderItem(row);
    //getOrderItemsById(rowId);
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
        message: 'OrderItem Fetch Failed.'
      })
    }
  };
  const getProductList = async () => {
    const response = await getProducts();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
          arr.push(response.payload[key]);
      }
      setProductList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'OrderItem Fetch Failed.'
      })
    }
  };


  const getAllOrderItems = async () => {
    const response = await getOrderItems();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'OrderItems Record Fetch Succefully.'
      })
      const dataFormatter = (rawData) => {
        const curedData = {};
        curedData.orderItemId = rawData?.orderItemId;
        curedData.productId = rawData?.productId;
        curedData.productName = rawData?.product.productName;
        curedData.orderId = rawData?.orderId;
        curedData.cost = rawData?.cost;
        curedData.quantity = rawData?.quantity;
        curedData.recordStatusId = rawData?.recordStatusId;
        curedData.recordStatus = rawData?.recordStatus.actionName;
        return curedData;
      }

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
          arr.push(dataFormatter(response.payload[key]));
      }

      setOrderItems(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'OrderItem Fetch Failed.'
      })
    }
  };

  const getOrderItemById = async (id) => {
    const response = await orderItemById(id);
    if (response.payload.title == "Success") {
      setOrderItem(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'OrderItem Get Failed.'
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


  return (
    <>
      <div className="m-t-40">
        {loading && <div>A moment please...</div>}
        {orderItems && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='orderItemId'
            data={orderItems}
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
                              Add OrderItem
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
              <Modal.Title>Add OrderItem</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <OrderItemModel
                onAddOrderItem={addOrderItem}
                onUpdateOrderItem={updateOrderItem}
                onDeleteOrderItem={deleteOrderItem}
                onGetOrderItem={orderItemById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                orderItemData={orderItem}
                recordStatusList={recordStatusList}
                productList={productList}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </>
  );
};
