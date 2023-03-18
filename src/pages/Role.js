import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchRole from "../hooks/useFetchRole";
import useFetchRecordStatus from "../hooks/useFetchRecordStatus";
import RoleModel from "../components/RoleModel";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { getRoles } from "@testing-library/react";
import Geocode from "react-geocode";


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

export default function Roles() {

  const [newGMT, setNewGMT] = useState({
    resourcesId: 6,
    longitude: 0,
    latitude: 0,
    description: "logged coordinates",
    recordStatusId: 1,
});
  
  Geocode.setApiKey("AIzaSyAf_G4R_GlpOOoGIDJ8WLvyAFjuq8F2jYc");
Geocode.enableDebug();

        navigator.geolocation.getCurrentPosition((position) => {
            newGMT.latitude = position.coords.latitude;
            newGMT.longitude = position.coords.longitude;
        });

Geocode.fromLatLng(newGMT.latitude, newGMT.longitude).then(
  response => {
    var addressComponent = response.pincode;
    console.log('pincode', response.results[5].address_components[0].long_name);
    const address = response.results[0].formatted_address;
    console.log(address);
  },
  error => {
    console.error(error);
  }
);
  const [recordStatusList, setRecordStatusList] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllRoles();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [role, setRole] = useState({
    
    roleName:"",
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
    addRole,
    updateRole,
    deleteRole,
    getRoles,
    roleById,
  } = useFetchRole();

  const { 
    getRecordStatuss,
  } = useFetchRecordStatus();

  const columns = [

    { dataField: 'roleId', text: ' Role Id', sort: true},
    { dataField: 'roleName', text: ' RoleName', sort: true},
    { dataField: 'description', text: 'Description', sort: true },
    {dataField: 'recordStatusId',text: 'RecordStatusId',sort: true},
    // columns follow dataField and text structure
    {
      dataField: "Actions",
      // text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <><button
            className="btn btn-primary btn-xs"
            onClick={() => handleView(row.roleId, row.name)}
          >
            View
          </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.roleId, row)}
            >
              Edit
            </button><button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.roleId, row.name)}
            >
              Delete
            </button></>
        );
      },
    },
  ];

  useEffect(() => {
    if (roles.length == 0) {
      getAllRoles();
      setLoading(false)
    }
  }, [roles]);

  useEffect(() => {
    getRecordStatusList();
    if (role.length == 0) {
      getAllRoles();
      setLoading(false)
    }
  }, [role]);


  const defaultSorted = [{
    dataField: 'roleId',
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  const handleEdit = (rowId, row) => {
    setRole(row);
    //getRolesById(rowId);
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
        arr.push(response.payload[key]);
      }
      setRecordStatusList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'RecordStatus Fetch Failed.'
      })
    }
  };

  const getAllRoles = async () => {
    const response = await getRoles();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'Roles Record Fetch Succefully.'
      })

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(response.payload[key]);
      }

      setRoles(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Role Fetch Failed.'
      })
    }
  };

  const getRoleById = async (id) => {
    const response = await roleById(id);
    if (response.payload.title == "Success") {
      setRole(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Role Get Failed.'
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
        {roles && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='roleId'
            data={roles}
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
                            Add Role
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
              <Modal.Title>Add Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <RoleModel
                onAddRole={addRole}
                onUpdateRole={updateRole}
                onDeleteRole={deleteRole}
                onGetRole={roleById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                roleData={role}
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
