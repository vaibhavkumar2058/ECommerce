import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchVehicleType from "../hooks/useFetchVehicleType";
import VehicleTypeModel from "../components/VehicleTypeModel";
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

export default function VehicleType() {

  const [vehicleType, setVehicleType] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllVehicleType();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [Vehicletype, setvehicleType] = useState({

    vehicleTypeName : "",
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
    addVehicleType,
    updateVehicleType,
    deleteVehicleType,
    getVehicleType,
    vehicleTypeById,
  } = useFetchVehicleType();

  const columns = [

    { dataField: ' vehicleType', text: ' vehicleType', sort: true, hidden: true },
    { dataField: ' vehicleTypeName', text: ' vehicleTypeName', sort: true },
    { dataField: 'description', text: 'Description', sort: true },
   
    // columns follow dataField and text structure
    {
      dataField: "Actions",
      text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <><button
            className="btn btn-primary btn-xs"
            onClick={() => handleView(row.enquiryId, row.name)}
          >
            View
          </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.enquiryId, row)}
            >
              Edit
            </button><button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.enquiryId, row.name)}
            >
              Delete
            </button></>
        );
      },
    },
  ];

  useEffect(() => {
    if ( vehicleType.length == 0) {
      getAllVehicleType();
      setLoading(false)
    }
  }, [vehicleType]);


  const defaultSorted = [{
    dataField: 'vehicleTypeId',
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  const handleEdit = (rowId, row) => {
    setVehicleType(row);
    //getVehicleTypeById(rowId);
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


  const getAllVehicleType = async () => {
    const response = await getVehicleType();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'VehicleType Record Fetch Succefully.'
      })

      var arr = [];
      for (var key in response.payload) {
        arr.push(response.payload[key]);
      }

      setVehicleType(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Enquiry Fetch Failed.'
      })
    }
  };

  const getvehicleTypeById = async (id) => {
    const response = await vehicleTypeById(id);
    if (response.payload.title == "Success") {
      setVehicleType(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'VehicleTyp Get Failed.'
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
        {vehicleType && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='enquiryId'
            data={vehicleType}
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
                            Add VehicleTyp
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
              <Modal.Title>Add Enquiry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <vehicleTypeModel
                onAddVehicleType={addVehicleType}
                onUpdateVehicleType={updateVehicleType}
                onDeleteVehicleType={deleteVehicleType}
                onGetVehicleType={vehicleTypeById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                vehicleTypeData={ vehicleType}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </>
  );
};