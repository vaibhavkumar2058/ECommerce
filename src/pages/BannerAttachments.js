import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchBannerAttachments from "../hooks/useFetchBannerAttachments";
import BannerAttachmentsModel from "../components/BannerAttachmentsModel";
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

export default function BannerAttachments() {

  const [bannerAttachmentses, setBannerAttachmentses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllBannerAttachmentses();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [bannerAttachments, setBannerAttachments] = useState({
    bannerId:null,
    filesId:null,
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
    addBannerAttachments,
    updateBannerAttachments,
    deleteBannerAttachments,
    getBannerAttachmentses,
    bannerAttachmentsById,
  } = useFetchBannerAttachments();

  const columns = [
    { dataField: 'bannerAttachmentsId', text: 'bannerAttachmentsId', sort: true,hidden: true },
    { dataField: 'bannerId', text: 'Banner', sort: true},
    { dataField: 'filesId', text: 'FilesId ', sort: true ,hidden: true},
    { dataField: 'description', text: 'Description', sort: true,},
    
    
    // columns follow dataField and text structure
    {
      dataField: "Actions",
      // text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <><button
            className="btn btn-primary btn-xs"
            onClick={() => handleView(row.bannerAttachmentsId, row.name)}
          >
            View
          </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.bannerAttachmentsId, row)}
            >
              Edit
            </button><button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.bannerAttachmentsId, row.name)}
            >
              Delete
            </button></>
        );
      },
    },
  ];

  useEffect(() => {
    if (bannerAttachmentses.length == 0) {
        getAllBannerAttachmentses();
      setLoading(false)
    }
  }, [bannerAttachmentses]);


  const defaultSorted = [{
    dataField: 'bannerAttachmentsesId',
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  const handleEdit = (rowId, row) => {
    setBannerAttachments(row);
    //getbannerAttachmentsById(rowId);
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


  const getAllBannerAttachmentses = async () => {
    const response = await getBannerAttachmentses();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'BannerAttachments Record Fetch Succefully.'
      })

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(response.payload[key]);
      }

      setBannerAttachmentses(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'BannerAttachmentss Fetch Failed.'
      })
    }
  };

  const getBannerAttachmentsById = async (id) => {
    const response = await bannerAttachmentsById(id);
    if (response.payload.title == "Success") {
      setBannerAttachments(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'BannerAttachments Get Failed.'
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
        {bannerAttachmentses && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='bannerAttachmentsId'
            data={bannerAttachmentses}
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
                            Add Banner Attachments
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
          {/* <BootstrapTable bootstrap4  keyField='id' data={banners} columns={columns} defaultSorted={defaultSorted} pagination={pagination} /> */}

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
              <Modal.Title>Add Banner Attachments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <BannerAttachmentsModel
                onAddBannerAttachments={addBannerAttachments}
                onUpdateBannerAttachments={updateBannerAttachments}
                onDeleteBannerAttachments={deleteBannerAttachments}
                onGetBannerAttachments={bannerAttachmentsById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                bannerAttachmentsData={bannerAttachments}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </>
  );
};
