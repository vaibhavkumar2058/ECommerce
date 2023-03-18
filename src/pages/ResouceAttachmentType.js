import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchResourceAttachmentType from "../hooks/useFetchResouceAttachmentType";
import ResourceAttachmentTypeModel from "../components/ResourceAttachmentTypeModel";      
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

export default function ResourceAttachmentType() {

  const [resourceAttachmentTypes, setResourceAttachmentTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllResourceAttachmentType();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [resourceAttachmentType, setResourceAttachmentType] = useState({
    displayText:"",
    sortOrder:null,
    isActive:null,
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
    addResouceAttachmentType,
    updateResouceAttachmentType,
    deleteResouceAttachmentType,
    getResouceAttachmentTypes,
    resouceAttachmentTypeById,
  } = useFetchResourceAttachmentType();

  const columns = [

    
    { dataField: 'resourceAttachmentTypeId', text: 'ResourceAttachmentTypeID', sort: true },
    { dataField: 'displayText', text: 'DisplayText', sort: true },
    { dataField: 'sortOrder', text: 'SortOrder', sort: true },
    { dataField: 'isActive', text: 'IsActive', sort: true },
    { dataField: 'description', text: 'Description', sort: true },
   
    // columns follow dataField and text structure
    {
      dataField: "Actions",
      // text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <><button
            className="btn btn-primary btn-xs"
            onClick={() => handleView(row.resourceAttachmentTypeId, row.name)}
          >
            View
          </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.resourceAttachmentTypeId, row)}
            >
              Edit
            </button><button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.resourceAttachmentTypeId, row.name)}
            >
              Delete
            </button></>
        );
      },
    },
  ];

  useEffect(() => {
    if (resourceAttachmentTypes.length == 0) {
      getAllResourceAttachmentType();
      setLoading(false)
    }
  }, [resourceAttachmentTypes]);


  const defaultSorted = [{
    dataField: 'resourceAttachmentTypeId',
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  const handleEdit = (rowId, row) => {
    setResourceAttachmentType(row);
    //getResourceAttachmentTypeById(rowId);
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


  const getAllResourceAttachmentType = async () => {
    const response = await getResouceAttachmentTypes();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'ResourceAttachmentType Record Fetch Succefully.'
      })

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(response.payload[key]);
      }

      setResourceAttachmentTypes(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ResourceAttachmentType Fetch Failed.'
      })
    }
  };

  const getResourceAttachmentTypeById = async (id) => {
    const response = await resouceAttachmentTypeById(id);
    if (response.payload.title == "Success") {
      setResourceAttachmentType(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ResourceAttachmentType Get Failed.'
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
        {resourceAttachmentType && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='resourceAttachmentTypeId'
            data={resourceAttachmentTypes}
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
                            Add ResourceAttachmentType
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
              <Modal.Title>Add ResourceAttachmentType</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ResourceAttachmentTypeModel
                onAddResourceAttachmentType={addResouceAttachmentType}
                onUpdateResourceAttachmentType={updateResouceAttachmentType}
                onDeleteResourceAttachmentType={deleteResouceAttachmentType}
                onGetResourceAttachmentType={resouceAttachmentTypeById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                resourceAttachmentTypeData={resourceAttachmentType}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </>
  );
};
