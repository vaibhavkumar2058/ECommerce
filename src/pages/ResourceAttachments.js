import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchResourceAttachments from "../hooks/useFetchResourceAttachments";
import ResourceAttachmentsModel from "../components/ResourceAttachmentsModel";
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

export default function ResourceAttachments() {

  const [resourceAttachmentses, setResourceAttachmentses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllResourceAttachmentses();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [resourceAttachmentes, setResourceAttachments] = useState({
    resourcesId: null,
    filesId: null,
    resourceAttachmentTypeId: null,
    //visibleToCustomer: true,
    description: "",
   
      });

  const [id, setId] = useState(null);

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  const { 
    addResourceAttachments,
    updateResourceAttachments,
    deleteResourceAttachments,
    getResourceAttachmentses,
    resourceAttachmentsById,
  } = useFetchResourceAttachments();

  const columns = [

    { dataField: 'resourceAttachmentsId', text: 'ResourceAttachmentsId ', sort: true, hidden: true },
    { dataField: 'resourcesId', text: ' Resources', sort: true },
    { dataField: 'filesId', text: 'FilesId', sort: true },
    { dataField: 'resourceAttachmentTypeId', text: 'ResourceAttachmentType', sort: true,headerStyle: () => {
      return { width: "230px" };
    } },
    { dataField: 'description', text: 'Description', sort: true,headerStyle: () => {
      return { width: "200px" };
    } },
    //{ dataField: 'visibleToCustomer', text: 'VisibleToCustomer', sort: true ,headerStyle: () => {
      //return { width: "200px" };
    //}},
    
    // columns follow dataField and text structure
    {
      dataField: "Actions",
      // text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <><button
            className="btn btn-primary btn-xs"
            onClick={() => handleView(row.resourceAttachmentsId, row.name)}
          >
            View
          </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.resourceAttachmentsId, row)}
            >
              Edit
            </button><button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.resourceAttachmentsId, row.name)}
            >
              Delete
            </button></>
        );
      },
    },
  ];

  useEffect(() => {
    if (ResourceAttachments.length == 0) {
      getAllResourceAttachmentses();
      setLoading(false)
    }
  }, [ResourceAttachments]);


  const defaultSorted = [{
    dataField: 'ResourceAttachmentsId',
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  const handleEdit = (rowId, row) => {
    setResourceAttachments(row);
    //getResourceAttachmentsById(rowId);
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


  const getAllResourceAttachmentses = async () => {
    const response = await getResourceAttachmentses();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'ResourceAttachments Record Fetch Succefully.'
      })

      var arr = [];
      for (var key in response.payload) {
        arr.push(response.payload[key]);
      }

      setResourceAttachmentses(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ResourceAttachments Fetch Failed.'
      })
    }
  };

  const getResourceAttachmentsById = async (id) => {
    const response = await resourceAttachmentsById(id);
    if (response.payload.title == "Success") {
      setResourceAttachments(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'ResourceAttachments Get Failed.'
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
        {resourceAttachmentses && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='resourceAttachmentsId'
            data={resourceAttachmentses}
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
                            Add ResourceAttachments
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
              <Modal.Title>Add ResourceAttachments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ResourceAttachmentsModel
                onAddResourceAttachments={addResourceAttachments}
                onUpdateResourceAttachments={updateResourceAttachments}
                onDeleteResourceAttachments={deleteResourceAttachments}
                onGetResourceAttachments={resourceAttachmentsById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                resourceAttachmentsData={resourceAttachmentses}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </>
  );
};
