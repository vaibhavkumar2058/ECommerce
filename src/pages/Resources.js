import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchResources from "../hooks/useFetchResources";
import useFetchRecordStatus from "../hooks/useFetchRecordStatus";
import useFetchRole from "../hooks/useFetchRole";
import useFetchGender from "../hooks/useFetchGender";
import ResourcesModel from "../components/ResourcesModel";
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'react-bootstrap-table-neuxt/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import Enquiry from "../pages/Enquiry";
import MyProfile from "./MyProfile";
import ResourceAttachments from "./ResourceAttachments";
import ViewDetailsModel from "../components/ViewDetailsModel";

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

export default function Resourcess() {
  const [recordStatusList, setRecordStatusList] = useState([]);
  const [resourcess, setResourcess] = useState([]);
  const [roleList, setRolesList] = useState([]);
  const [genderList, setGendersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewDetails, setViewDetails] = useState(false);
  const [show, setShow] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [documents , setDocuments]=useState(false);


  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllResourcess();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
    setShowMap(false);
    setViewDetails(false);
    setDocuments(false);
  };
  const handleShow = () => setShow(true);
  const handleShowMap = () => setShowMap(true);
 // const handleViewDetail =()=> setViewDetails(true)
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [resources, setResources] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    roleId: null,
    genderId: null,
    mobileNumber: null,
    bloodGroup: "",
    email: "",
    password: "",
    isEmailVerified: true,
    isMobileVerified: true,
    recordStatusId: null,
    resourcesAttachmentType: 3,
    filesId: null,
  });

  const [id, setId] = useState(null);

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  const {
    addResources,
    updateResources,
    deleteResources,
    getResources,
    resourcesById,
  } = useFetchResources();

  const {
    getRoles,
  } = useFetchRole();
  const {
    getGenders,
  } = useFetchGender();
  const {
    getRecordStatuss,
  } = useFetchRecordStatus();

  const columns = [

    { dataField: 'resourcesId', text: 'resourcesId', sort: true, hidden: true },
    {
      dataField: "resourcesImage",
      text: "Photo",
      headerStyle: () => {
        return { width: "60px" };
      },
      formatter: (cellContent, row) => {

        return (
          <>
            <img className="resources-image" src={row.resourcesImage}>
            </img>
          </>
        );
      },
    },
    {
      dataField: 'resourceName', text: 'Name', sort: true, headerStyle: () => {
        return { width: "120px" };
      }
    },
    {
      dataField: 'mobileNumber', text: 'Contact', sort: true, headerStyle: () => {
        return { width: "80px  " };
      }
    },
    // { dataField: 'email', text: 'Email', sort: true, headerStyle: () => {
    //   return { width: "150px" };
    // } },
    // { dataField: 'isEmailVerified', text: 'Verified', sort: true, headerStyle: () => {
    //   return { width: "80px" };
    // } },
    // { dataField: 'isMobileVerified ', text: 'IsMobileVerified', sort: true, headerStyle: () => {
    //   return { width: "150px" };
    // } },  
    // { dataField: 'role', text: 'Role', sort: true, headerStyle: () => {
    //   return { width: "100px" };
    // } },
    // columns follow dataField and text structure

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
            onClick={() => handleView(row.resourcesId, row.name)}
          >
            Track
          </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.resourcesId, row)}
            >
              Edit
            </button><button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.resourcesId, row.name)}
            >
              Delete
            </button>
            <button
             className="btn btn-primary btn-xs"
              onClick={()=> handleviewDetails(row.resourcesId, row)}
             >
              ViewDetails
             
            </button>
            <button
             className="btn btn-primary btn-xs"
              onClick={()=> handleDocuments()}
             >
              Documents
             
            </button>

            </>
        );
      },
    },
  ];

  useEffect(() => {
    getRecordStatusList();
    getGenderList();
    getRoleList();
    if (resourcess.length == 0) {
      getAllResourcess();
      setLoading(false)
    }
  }, [resourcess]);


  const defaultSorted = [{
    dataField: 'resourcesId',
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    setShowMap(true);
  };

  const handleEdit = (rowId, row) => {
    setResources(row);
    //getResources ById(rowId);
    setId(rowId);
    setIsEdit(true);
    setShow(true);
  };

  const handleDelete = (rowId, name) => {
    setId(rowId);
    setIsDelete(true);
    setShow(true);
  };
 
const handleviewDetails =(rowId, row)=>{
    setResources(row);
    setId(rowId);
    setViewDetails(true);
    getResourcesById(rowId);
    setIsEdit(true);
 }
 const handleDocuments =(rowId, name)=>{
    setId(rowId);
    setDocuments(true);
 }
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
  const getGenderList = async () => {
    const response = await getGenders();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
          arr.push(response.payload[key]);
      }
      setGendersList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'State Fetch Failed.'
      })
    }
  };

  const getRoleList = async () => {
    const response = await getRoles();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
          arr.push(response.payload[key]);
      }
      setRolesList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'State Fetch Failed.'
      })
    }
  };


  const getAllResourcess = async () => {
    const response = await getResources();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'Resources Record Fetch Succefully.'
      })
      const dataFormatter = (rawData) => {
        const curedData = {};
        curedData.resourcesId = rawData?.resourcesId;
        curedData.firstName = rawData?.firstName;
        curedData.middleName = rawData?.middleName;
        curedData.lastName = rawData?.lastName;
        curedData.resourceName = rawData?.firstName + rawData?.middleName + rawData?.lastName;
        curedData.bloodGroup = rawData?.bloodGroup;
        curedData.roleId = rawData?.role?.roleId;
        curedData.genderId = rawData?.gender?.genderId;
        curedData.mobileNumber = rawData?.mobileNumber;
        curedData.resourceAttachmentTypeId = rawData?.resourceAttachment?.resourceAttachmentTypeId ?? 1003;
        curedData.countryId = rawData?.address?.country.countryId;
        curedData.stateId = rawData?.address?.state.stateId;
        curedData.addressTypeId = rawData?.address?.addressTypeId;
        curedData.email = rawData?.email;
        curedData.password = rawData?.password;
        curedData.isEmailVerified = rawData?.isEmailVerified;
        curedData.isMobileVerified = rawData?.isMobileVerified;
        curedData.recordStatusId = rawData?.recordStatusId;
        curedData.filesId = rawData?.resourceAttachment?.files?.filesId ?? 0;
        if (rawData?.resourceAttachment)
          curedData.resourcesImage = 'data:' + rawData?.resourceAttachment?.files?.fileMimeType + ';base64,' + rawData?.resourceAttachment?.files?.base64;
        return curedData;
      }

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
          arr.push(dataFormatter(response.payload[key]));
      }

      setResourcess(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Resources Fetch Failed.'
      })
    }
  };

  const getResourcesById = async (id) => {
    const response = await resourcesById(id);
    if (response.payload.title == "Success") {
      setResources(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Resources Get Failed.'
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
        {resourcess && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='resourcesId'
            data={resourcess}
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
                          {/* <div className="app-float-right p-1">
                            <MyExportCSV {...props.csvProps} /></div> */}
                          <div className="app-float-right p-1">
                            <Button variant="primary" onClick={handleShow}>
                              Add Resources
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
          {/* <BootstrapTable bootstrap4  keyField='id' data={resourcess} columns={columns} defaultSorted={defaultSorted} pagination={pagination} /> */}

        </div>)}
        {/* <!--- Model Box ---> */}
        <div>
          <Modal dialogClassName="my-modal"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Resources</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ResourcesModel
                onAddResources={addResources}
                onUpdateResources={updateResources}
                onDeleteResources={deleteResources}
                onGetResources={resourcesById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                resourcesData={resources}
                roleList={roleList}
                genderList={genderList}
                recordStatusList={recordStatusList}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>

        {/* <!--- Model Box ---> */}
        <div>
          <Modal dialogClassName="my-modal"
            show={showMap}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Track Location</Modal.Title>
            </Modal.Header>
            <Modal.Body className="rm-p" >
              <Enquiry></Enquiry>
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
        <div>
          <Modal dialogClassName="my-modal"
            show={viewDetails}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body  >
            <ViewDetailsModel
                onGetResources={resourcesById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                resourcesData={resources}
                roleList={roleList}
                genderList={genderList}
                recordStatusList={recordStatusList}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
        <div>
          <Modal dialogClassName="my-modal"
            show={documents}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Documents</Modal.Title>
            </Modal.Header>
            <Modal.Body  >
           <ResourceAttachments></ResourceAttachments>
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </>
  );
};
