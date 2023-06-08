import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchProducts from "../hooks/useFetchProduct";
import useFetchCategoryType from "../hooks/useFetchCategoryType";
import useFetchRecordStatus from "../hooks/useFetchRecordStatus";
import ProductModel from "../components/ProductModel";
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

export default function Products() {
  const userInfo = JSON.parse(localStorage.getItem('loggedIn'));
  const admin=userInfo?.role?.admin;
  const agent=userInfo?.role?.agent;
  const dealer=userInfo?.role?.dealer;
  const customer=userInfo?.role?.customer;


  const [recordStatusList, setRecordStatusList] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllProducts();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [product, setProduct] = useState({
    productName: "",
    attachment:null,
    categoryTypeId: null,
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
    addProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    productById,
  } = useFetchProducts();

  const {
    getCategoryTypes,
  } = useFetchCategoryType();

  const { 
    getRecordStatuss,
  } = useFetchRecordStatus();

  const columns = [


    { dataField: 'productId', text: 'Product Id', sort: true, hidden: true },
    // columns follow dataField and text structure
    
    {
      dataField: "productImage",
      text: "Photo",
      headerStyle: () => {
        return { width: "60px" };
      },
      formatter: (cellContent, row) => {
        
        return (
          <>
            <img className="product-image" src={row.productImage}>
            </img>
          </>
        );
      },
    },
    {
      dataField: 'categoryType',headerStyle: () => {
        return { width: "100px" };
      }, text: ' Category', sort: true
    },
    {
      dataField: 'categoryTypeId',headerStyle: () => {
        return { width: "100px" };
      }, text: ' categoryTypeId', sort: true, hidden:true,
    },
    {
      dataField: 'recordStatus',headerStyle: () => {
        return { width: "100px" };
      }, text: ' Status', sort: true, hidden:true,
    },
    {
      dataField: 'recordStatusId',headerStyle: () => {
        return { width: "100px" };
      }, text: ' recordStatusId', sort: true, hidden:true,
    },
    
    {
      dataField: 'productName',
      headerStyle: () => {
        return { width: "100px" };
      }, text: ' Product', sort: true
    },
    // columns follow dataField and text structure
    {
      dataField: "Actions",
      // text: "Actions",
      headerStyle: () => {
        return { width: "80px" };
      },
      formatter: (cellContent, row) => {
        return (
          <><button
            className="btn btn-primary btn-xs"
            onClick={() => handleView(row.productId, row)}
          >
            View
          </button>
            { admin && <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.productId, row)}
            >
              Edit
            </button>}
            { admin && <button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.productId, row)}
            >
              Delete
            </button>}
            </>
        );
      },
    },
  ];

  useEffect(() => {
    getRecordStatusList();
    getCategoryTypeList();
    if (products.length == 0) {
      getAllProducts();
      setLoading(false)
    }
  }, [products]);


  const defaultSorted = [{
    dataField: 'productId', 
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  const handleEdit = (rowId, row) => {
    setProduct(row);
    //getProductsById(rowId);
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
        message: 'product Fetch Failed.'
      })
    }
  };

  const getCategoryTypeList = async () => {
    const response = await getCategoryTypes();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(response.payload[key]);
      }
      setCategoryList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'product Fetch Failed.'
      })
    }
  };


  const getAllProducts = async () => {
    const response = await getProducts();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'Products Record Fetch Succefully.'
      })

      const dataFormatter = (rawData) => {
        const curedData = {};
        curedData.productId = rawData?.productId;
        curedData.productName = rawData?.productName;
        curedData.description = rawData?.description;
        curedData.categoryTypeId = rawData?.categoryTypeId;
        curedData.categoryType = rawData?.categoryType?.categoryTypeName;
        curedData.fileName = rawData?.productAttachments?.files?.fileName;
        curedData.productImage = 'data:'+ rawData?.productAttachments?.files.fileMimeType +';base64,'+ rawData?.productAttachments?.files?.base64;
        curedData.filesId = rawData?.productAttachments?.files?.filesId ? rawData?.productAttachments?.files?.filesId : 0;
        curedData.recordStatusId = rawData?.recordStatusId;
        curedData.recordStatus = rawData?.recordStatus?.actionName;
        return curedData;
      }

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(dataFormatter(response.payload[key]));
      }

      setProducts(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Product Fetch Failed.'
      })
    }
  };

  const getProductById = async (id) => {
    const response = await productById(id);
    if (response.payload.title == "Success") {
      setProduct(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Product Get Failed.'
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
        {products && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='productId'
            data={products}
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
                              Add Product
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
              <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProductModel
                onAddProduct={addProduct}
                onUpdateProduct={updateProduct}
                onDeleteProduct={deleteProduct}
                onGetProduct={productById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                productData={product}
                recordStatusList={recordStatusList}
                categoryList={categoryList}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </>
  );
};
