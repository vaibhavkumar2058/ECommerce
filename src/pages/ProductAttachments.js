import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchProductAttachments from "../hooks/useFetchProductAttachments";
import ProductAttachmentsModel from "../components/ProductAttachmentsModel";
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

export default function ProductAttachments() {

  const [productAttachmentses, setProductAttachmentses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllProductAttachmentses();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [productAttachments, setProductAttachments] = useState({
    productId:null,
    fileId:null,
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
    addProductAttachments,
    updateProductAttachments,
    deleteProductAttachments,
    getProductAttachmentses,
    productAttachmentsById,
  } = useFetchProductAttachments();

  const columns = [
    { dataField: 'productAttachmentsId', text: 'productAttachmentsId', sort: true, hidden: true },
    { dataField: 'productId', text: 'ProductId ', sort: true,headerStyle: () => {
      return { width: "130px" };
    }  },
    { dataField: 'fileId', text: 'FileId ', sort: true ,headerStyle: () => {
      return { width: "100px" };
    }},
    { dataField: 'description', text: 'Description', sort: true,headerStyle: () => {
      return { width: "150px" };
    } },
    
    
    // columns follow dataField and text structure
    {
      dataField: "Actions",
      text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <><button
            className="btn btn-primary btn-xs"
            onClick={() => handleView(row.productAttachmentsId, row.name)}
          >
            View
          </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.productAttachmentsId, row)}
            >
              Edit
            </button><button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.productAttachmentsId, row.name)}
            >
              Delete
            </button></>
        );
      },
    },
  ];

  useEffect(() => {
    if (productAttachmentses.length == 0) {
        getAllProductAttachmentses();
      setLoading(false)
    }
  }, [productAttachmentses]);


  const defaultSorted = [{
    dataField: 'productAttachmentssId',
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  const handleEdit = (rowId, row) => {
    setProductAttachments(row);
    //getproductAttachmentsById(rowId);
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


  const getAllProductAttachmentses = async () => {
    const response = await getProductAttachmentses();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'ProductAttachments Record Fetch Succefully.'
      })

      var arr = [];
      for (var key in response.payload) {
        arr.push(response.payload[key]);
      }

      setProductAttachmentses(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ProductAttachmentss Fetch Failed.'
      })
    }
  };

  const getProductAttachmentssById = async (id) => {
    const response = await productAttachmentsById(id);
    if (response.payload.title == "Success") {
      setProductAttachments(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ProductAttachments Get Failed.'
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
        {productAttachmentses && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='productAttachmentsId'
            data={productAttachmentses}
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
                            Add ProductAttachments
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
              <Modal.Title>Add ProductAttachments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProductAttachmentsModel
                onAddProductAttachments={addProductAttachments}
                onUpdateProductAttachments={updateProductAttachments}
                onDeleteProductAttachments={deleteProductAttachments}
                onGetProductAttachments={productAttachmentsById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                productAttachmentsData={productAttachments}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </>
  );
};
