import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchCart from "../hooks/useFetchCart";
import useFetchProduct from "../hooks/useFetchProduct";
import useFetchRecordStatus from "../hooks/useFetchRecordStatus";
import CartModel from "../components/CartModel";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

export default function Carts() {

  const [carts, setCarts] = useState([]);
  const [productList, setProductList] = useState([]);
  const [recordStatusList ,setRecordStatusList] = useState([]);
  //const [products, setProducts  ] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllCarts();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [cart, setCart] = useState({
    resourcesId:null,
    productId:null,
    cost:null,
    quantity:"",
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
    addCart,
    updateCart,
    deleteCart,
    getCarts,
    cartById,
  } = useFetchCart();
  
  const {
    getProducts,
  } = useFetchProduct();

  const {
    getRecordStatuss,
  } = useFetchRecordStatus();
  
  const columns = [ {
    dataField: "Actions",
    // text: "Actions",
    formatter: (cellContent, row) => {
      return (
        <><button
          className="btn btn-primary btn-xs"
          onClick={() => handleView(row.cartId, row.name)}
        >
          View
        </button>
          <button
            className="btn btn-primary btn-xs"
            onClick={() => handleEdit(row.cartId, row)}
          >
            Edit
          </button><button
            className="btn btn-danger btn-xs"
            onClick={() => handleDelete(row.cartId, row.name)}
          >
            Delete
          </button></>
      );
    },
  },
    { dataField: 'cartId', text: 'Cart ', sort: true, hidden: true },
    { dataField: 'resourcesId', text: 'resourcesId', sort: true, hidden: true },
    { dataField: 'resourceName', text: 'Resource', sort: true, },
    { dataField: 'productId', text: 'productId', sort: true, hidden: true },
    { dataField: 'productName', text: 'Product', sort: true },
    { dataField: 'cost', text: 'Cost', sort: true },
    { dataField: 'quantity', text: 'Quantity', sort: true },
    { dataField: 'description', text: 'Description', sort: true },
    { dataField: 'recordStatusId', text: 'recordStatusId', sort: true, hidden: true },
    { dataField: 'recordStatus', text: 'Status', sort: true },
    // columns follow dataField and text structure
  ];

  useEffect(() => {
    getProductList();
    getRecordStatusList();
    if (carts.length == 0) {
      getAllCarts();
      setLoading(false)
    }
  }, [carts]);

  const defaultSorted = [{
    dataField: 'cartId',
    order: 'desc'
  }];

  const emptyDataMessage = () => { return 'No Data to Display'; }

  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  const handleEdit = (rowId, row) => {
    setCart(row);
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
        message: 'State Fetch Failed.'
      })
    }
  };
 
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

  const getAllCarts = async () => {
    const response = await getCarts();
    if (response.payload.title == "Success") {
      
      setMessageStatus({
        mode: 'success',
        message: 'Carts Record Fetch Succefully.'
      })
      const dataFormatter = (rawData) => {
        const curedData = {};
        curedData.cartId = rawData?.cartId;
        curedData.resourcesId = rawData?.resourcesId;
        curedData.resourceName = rawData?.resources?.firstName+rawData?.resources?.middleName+rawData?.resources?.lastName;
        curedData.productId = rawData?.productId;
        curedData.productName = rawData?.product?.productName;
        curedData.cost = rawData?.cost;
        curedData.quantity = rawData?.quantity;
        curedData.description = rawData?.description;
        curedData.recordStatusId = rawData?.recordStatusId;
        curedData.recordStatus = rawData?.recordStatus.actionName;
        return curedData;
      }
      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(dataFormatter(response.payload[key]));
      }

      setCarts(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Cart Fetch Failed.'
      })
    }
  };

  const getCartById = async (id) => {
    const response = await cartById(id);
    if (response.payload.title == "Success") {
      setCart(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Cart Get Failed.'
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
        {carts && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='cartId'
            data={carts}
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
                            Add Cart
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
              <Modal.Title>Add Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CartModel
                onAddCart={addCart}
                onUpdateCart={updateCart}
                onDeleteCart={deleteCart}
                onGetCart={cartById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                cartData={cart}
                productList={productList}
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
