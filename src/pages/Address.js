import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import useFetchAddress from "../hooks/useFetchAddress";
import useFetchRecordStatus from "../hooks/useFetchRecordStatus";
import useFetchCountry from "../hooks/useFetchCountry";
import useFetchState from "../hooks/useFetchState";
import useFetchAddressType from "../hooks/useFetchAddressType";
import AddressModel from "../components/AddressModel";
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

export default function Addresses() {

  const [addresses, setAddresses] = useState([]);
  const [recordStatusList, setRecordStatusList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [addressTypeList, setAddressTypeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    getAllAddresses();
    setIsEdit(false);
    setIsDelete(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [address, setAddress] = useState({
    countryId:null,
    stateId:null,
    city:"",
    town:"",
    locality:"",
    pincode:null,
    addressTypeId:null,
    addressLine:"",
    landMark:"",
    isDefault:"",
    defaultAddressTypeId:null,
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
    addAddress,
    updateAddress,
    deleteAddress,
    getAddresses,
    addressById,
  } = useFetchAddress();

  const { 
    getRecordStatuss,
  } = useFetchRecordStatus();
  const { 
    getStates,
  } = useFetchState();
  const { 
    getCountries,
  } = useFetchCountry();
  const { 
    getAddressTypes,
  } = useFetchAddressType();


  const columns = [
    { dataField: 'addressId', text: 'Address ', sort: true, hidden: true },
    { dataField: 'countryId', text: 'Country ', sort: true,headerStyle: () => {
      return { width: "120px" };
    }  },
    { dataField: 'stateId', text: 'State ', sort: true ,headerStyle: () => {
      return { width: "100px" };
    }},
    { dataField: 'city', text: 'City', sort: true,headerStyle: () => {
      return { width: "100px" };
    } },
    { dataField: 'town', text: 'Town', sort: true,headerStyle: () => {
      return { width: "100px" };
    } },
    { dataField: 'locality', text: 'Locality', sort: true,headerStyle: () => {
      return { width: "120px" };
    } },
    { dataField: 'addressLine', text: 'Address Line', sort: true,headerStyle: () => {
      return { width: "120px" };
    } },
    { dataField: 'pincode', text: 'Pincode', sort: true,headerStyle: () => {
      return { width: "120px" };
    } },
    { dataField: 'addressTypeId', text: 'Address Type ', sort: true,headerStyle: () => {
      return { width: "150px" };
    } },
    { dataField: 'isDefault', text: 'IsDefault', sort: true ,headerStyle: () => {
      return { width: "120px" };
    }},
    { dataField: 'defaultAddressTypeId', text: 'Default Address Type', sort: true ,headerStyle: () => {
      return { width: "200px" };
    }},
    { dataField: 'landMark', text: 'LandMark', sort: true,headerStyle: () => {
      return { width: "120px" };
    } },
    { dataField: 'recordStatusId', text: 'Status', sort: true,headerStyle: () => {
      return { width: "100px" };
    } },
    
    
    // columns follow dataField and text structure
    {
      dataField: "Actions",
      // text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <><button
            className="btn btn-primary btn-xs"
            onClick={() => handleView(row.addressId, row.name)}
          >
            View
          </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => handleEdit(row.addressId, row)}
            >
              Edit
            </button><button
              className="btn btn-danger btn-xs"
              onClick={() => handleDelete(row.addressId, row.name)}
            >
              Delete
            </button></>
        );
      },
    },
  ];

  useEffect(() => {
    getRecordStatusList();
    getCountryList();
    getStateList();
    getAddressTypeList();
    if (addresses.length == 0) {
      getAllAddresses();
      setLoading(false)
    }
  }, [addresses]);

  


  const defaultSorted = [{
    dataField: 'addressId',
    order: 'desc'
  }];


  const emptyDataMessage = () => { return 'No Data to Display'; }


  const handleView = (rowId, name) => {
    console.log(rowId, name);
    //1 YourCellName
  };

  const handleEdit = (rowId, row) => {
    setAddress(row);
    //getAddressById(rowId);
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
        message: 'Address Fetch Failed.'
      })
    }
  };
  const getCountryList = async () => {
    const response = await getCountries();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(response.payload[key]);
      }
      setCountryList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Address Fetch Failed.'
      })
    }
  };

  const getStateList = async () => {
    const response = await getStates();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(response.payload[key]);
      }
      setStateList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Address Fetch Failed.'
      })
    }
  };

  const getAddressTypeList = async () => {
    const response = await getAddressTypes();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(response.payload[key]);
      }
      setAddressTypeList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Address Fetch Failed.'
      })
    }
  };



  const getAllAddresses = async () => {
    const response = await getAddresses();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'Address Record Fetch Succefully.'
      })
      const dataFormatter = (rawData) => {
        const curedData = {};
        curedData.addressId=rawData?.addressId;
        curedData.countryId=rawData?.country.countryName;
        curedData.stateId=rawData?.state.stateName;
        curedData.city=rawData?.city;
        curedData.town=rawData?.town;
        curedData.locality=rawData?.locality;
        curedData.pincode=rawData?.pincode;
        curedData.addressTypeId=rawData?.addressType.addressTypeName;
        curedData.isDefault=rawData?.isDefault;
        curedData.defaultAddressTypeId=rawData?.defaultAddressTypeId;
        curedData.landMark=rawData?.landMark;
        curedData.recordStatusId=rawData?.recordStatus.actionName;
        
        return curedData;
      }
      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
        arr.push(dataFormatter(response.payload[key]));
      }

      setAddresses(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Address Fetch Failed.'
      })
    }
  };

  const getAddressById = async (id) => {
    const response = await addressById(id);
    if (response.payload.title == "Success") {
      setAddress(response.payload);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Address Get Failed.'
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
        {addresses && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='addressId'
            data={addresses}
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
                            Add Address
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
              <Modal.Title>Add Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddressModel
                onAddAddress={addAddress}
                onUpdateAddress={updateAddress}
                onDeleteAddress={deleteAddress}
                onGetAddress={addressById}
                onClose={handleClose}
                isEdit={isEdit}
                isDelete={isDelete}
                id={id}
                addressData={address}
                recordStatusList={recordStatusList}
                countryList={countryList}
                stateList={stateList}
                addressTypeList={addressTypeList}
              />
            </Modal.Body>

          </Modal>
          {/* Model Box Finsihs */}
        </div>
      </div>
    </>
  );
};
