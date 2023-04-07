import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchItemCost from "../hooks/useFetchItemCost";
import useFetchRecordStatus from "../hooks/useFetchRecordStatus";
import useFetchProduct from "../hooks/useFetchProduct";
import useFetchMeasurementValue from "../hooks/useFetchMeasurementValue";
import useFetchMeasurementType from "../hooks/useFetchMeasurementType";
import useFetchCustomType from "../hooks/useFetchCustomType";
import ItemCostModel from "../components/ItemCostModel";
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

export default function ItemCosts() {

  const [itemcosts, setItemCosts] = useState([]);
  const [recordStatusList, setRecordStatusList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [measurementValueList, setMeasurementValueList] = useState([]);
  const [measurementTypeList, setMeasurementTypeList] = useState([]);
  const [customTypeList, setCustomTypeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllItemCosts();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [itemcost, setItemCost] = useState({
   
    productId: null,
    measurementTypeId: null,
    measurementValueId: null,
    customTypeId: null,
    price:null,
    description: "",
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
    addItemCost,
    updateItemCost,
    deleteItemCost,
    getItemCosts,
    itemCostById,
  } = useFetchItemCost();

  const { 
    getRecordStatuss,
  } = useFetchRecordStatus();
  const { 
    getProducts,
  } = useFetchProduct();
  const { 
    getMeasurementValues,
  } = useFetchMeasurementValue();
  const { 
    getMeasurementTypes,
  } = useFetchMeasurementType();
  const { 
    getCustomTypes,
  } = useFetchCustomType();



  const columns = [

    { dataField: 'itemCostId', text: 'ItemCost Id', sort: true, hidden: true},
    { dataField: 'productId', text: ' Product', sort: true ,headerStyle: () => {
      return { width: "120px" };
    } },
    { dataField: 'measurementTypeId', text: 'Measurement Type', sort: true ,headerStyle: () => {
      return { width: "200px" };
    } },
    { dataField: 'measurementValueId', text: 'Measurement Value', sort: true,headerStyle: () => {
      return { width: "200px" };
    }  },
    { dataField: 'customTypeId', text: 'Custom Type', sort: true,headerStyle: () => {
      return { width: "150px" };
    }  },
    { dataField: 'price', text: 'Price', sort: true,headerStyle: () => {
      return { width: "120px" };
    }  },
    { dataField: 'description', text: 'Description', sort: true,headerStyle: () => {
      return { width: "150px" };
    }  },
    { dataField: 'recordStatusId', text: 'Status', sort: true , hidden: true,headerStyle: () => {
      return { width: "180px" };
    } },
    // columns follow dataField and text structure
    {
      dataField: "Actions",
      // text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <><button
            className="btn btn-primary btn-xs"
            onClick={() => handleView(row.itemCostId, row.name)}
          >
            View
          </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.itemCostId, row)}
            >
              Edit
            </button><button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.itemCostId, row.name)}
            >
              Delete
            </button></>
        );
      },
    },
  ];

  useEffect(() => {
    getRecordStatusList();
    getProductList();
    getMeasurementValueList();
    getMeasurementTypeList();
    getCustomTypeList();
    if (itemcosts.length == 0) {
      getAllItemCosts();
      setLoading(false)
    }
  }, [itemcosts]);


  const defaultSorted = [{
    dataField: 'itemcostId',
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  const handleEdit = (rowId, row) => {
    setItemCost(row);
    //getItemCostsById(rowId);
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
        message: 'State Fetch Failed.'
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
        message: 'State Fetch Failed.'
      })
    }
  };
  const getMeasurementValueList = async () => {
    const response = await getMeasurementValues();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(response.payload[key]);
      }
      setMeasurementValueList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'State Fetch Failed.'
      })
    }
  };
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
  const getMeasurementTypeList = async () => {
    const response = await getMeasurementTypes();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(response.payload[key]);
      }
      setMeasurementTypeList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'State Fetch Failed.'
      })
    }
  };


  const getAllItemCosts = async () => {
    const response = await getItemCosts();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'ItemCosts Record Fetch Succefully.'
      })

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(response.payload[key]);
      }

      setItemCosts(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ItemCost Fetch Failed.'
      })
    }
  };

  const getItemCostById = async (id) => {
    const response = await itemCostById(id);
    if (response.payload.title == "Success") {
      setItemCost(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ItemCost Get Failed.'
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
        {itemcosts && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='itemcostId'
            data={itemcosts}
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
                            AddItemCost
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
            dialogClassName="w-p-80"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>AddItemCost</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ItemCostModel
                onAddItemCost={addItemCost}
                onUpdateItemCost={updateItemCost}
                onDeleteItemCost={deleteItemCost}
                onGetItemCost={itemCostById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                itemcostData={itemcost}
                recordStatusList={recordStatusList}
                productList={productList}
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
