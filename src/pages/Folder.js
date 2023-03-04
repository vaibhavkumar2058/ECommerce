import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchFolder from "../hooks/useFetchFolder";
import FolderModel from "../components/FolderModel";
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

export default function Folders() {

  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllFolders();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [folder, setFolder] = useState({
    resourceId:null, 
    parentFolderId: null,
    folderName: "",
    folderTypeId: null,
    isSystemGenerated: true,
    isArchived: true,
    isDeleted: true,
    recordStatusId:null
      });

  const [id, setId] = useState(null);

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  const { 
    addFolder,
    updateFolder,
    deleteFolder,
    getFolders,
    folderById,
  } = useFetchFolder();

  const columns = [
    // columns follow dataField and text structure
    {
      dataField: "Actions",
      // text: "Actions",
      headerStyle: () => {
        return { width: "200px" };
      },
      formatter: (cellContent, row) => {
        return (
          <><button
            className="btn btn-primary btn-xs"
            onClick={() => handleView(row.folderId, row.name)}
          >
            View
          </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.folderId, row)}
            >
              Edit
            </button><button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.folderId, row.name)}
            >
              Delete
            </button></>
        );
      },
    },

    { dataField: 'folderId', text: 'Folder ', sort: true, hidden: true },
    { dataField: 'resourceId', text: ' Resource', sort: true, headerStyle: () => {
      return { width: "150px" };
    }},
    { dataField: 'parentFolderId', text: ' ParentFolder', sort: true,headerStyle: () => {
      return { width: "150px" };
    } },
    { dataField: 'folderName', text: 'FolderName', sort: true ,headerStyle: () => {
      return { width: "150px" };
    }},
    { dataField: 'folderTypeId', text: 'FolderType', sort: true ,headerStyle: () => {
      return { width: "150px" };
    }},
    { dataField: 'isSystemGenerated', text: 'IsSystemGenerated', sort: true,headerStyle: () => {
      return { width: "200px" };
    } },
    { dataField: 'isArchived', text: 'IsArchived', sort: true,headerStyle: () => {
      return { width: "150px" };
    } },
    { dataField: 'isDeleted', text: 'IsDeleted', sort: true ,headerStyle: () => {
      return { width: "100px" };
    }},
    { dataField: 'recordStatusId', text: 'RecordStatus', sort: true,headerStyle: () => {
      return { width: "150px" };
    } },
    
  ];

  useEffect(() => {
    if (folders.length == 0) {
      getAllFolders();
      setLoading(false)
    }
  }, [folders]);


  const defaultSorted = [{
    dataField: 'FolderId',
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  const handleEdit = (rowId, row) => {
    setFolder(row);
    //getFoldersById(rowId);
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


  const getAllFolders = async () => {
    const response = await getFolders();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'Folders Record Fetch Succefully.'
      })

      var arr = [];
      for (var key in response.payload) {
        arr.push(response.payload[key]);
      }

      setFolders(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Folder Fetch Failed.'
      })
    }
  };

  const getFolderById = async (id) => {
    const response = await folderById(id);
    if (response.payload.title == "Success") {
      setFolder(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Folder Get Failed.'
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
        {folders && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='folderId'
            data={folders}
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
                            Add Folder
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
              <Modal.Title>Add Folder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FolderModel
                onAddFolder={addFolder}
                onUpdateFolder={updateFolder}
                onDeleteFolder={deleteFolder}
                onGetFolder={folderById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                folderData={folder}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </>
  );
};
