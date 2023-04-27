import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { Dropdown ,Checkbox} from 'semantic-ui-react'
import useFetchResources from '../hooks/useFetchResources';
import ResourceAttachments from './ResourceAttachments';
import useFetchAddress from "../hooks/useFetchAddress";
import useFetchGender from "../hooks/useFetchGender";
import useFetchRecordStatus from "../hooks/useFetchRecordStatus";
import useFetchRole from "../hooks/useFetchRole";
import useFetchCountry from "../hooks/useFetchCountry";
import useFetchState from "../hooks/useFetchState";
import useFetchAddressType from "../hooks/useFetchAddressType";


export default () => {

  const userInfo = JSON.parse(localStorage.getItem('loggedIn'));
  const resourceId = userInfo?.resourcesId;
  const [roleList, setRolesList] = useState([]);
  const [genderList, setGendersList] = useState([]);
  const [recordStatusList, setRecordStatusList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [addressTypeList, setAddressTypeList] = useState([]);
  const [resource, setResource] = useState();
  const [address, setAddress] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const {
    updateResources,
    resourcesById,
  } = useFetchResources();
  const { 
   updateAddress,
    getAddresses,
    addressById,
  } = useFetchAddress();
  const {
    getRoles,
  } = useFetchRole();
  const {
    getGenders,
  } = useFetchGender();
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

  const UpdateResource = () => {
    const saveHandler = async () => {


      const response = await updateResources(resourceId, resource);
      if (response.payload.title == "Success") {

      }
      else {

      }
    }

  }

  useEffect(() => {
    if (resource == null) {
      getGenderList();
      getRoleList();
      getRecordStatusList();
      getCountryList();
      getStateList();
      getAddressTypeList();
      getResourcesById(resourceId);
      getAddressById(resourceId);
    }


  }, [resource]);

  const getResourcesById = async (id) => {
    const response = await resourcesById(id);
    if (response.payload.title == "Success") {
      setResource(response.payload);
    }
    else {

    }
  };

  const getAddressById = async (id) => {
    const response = await addressById(1);
    if (response.payload.title == "Success") {
      debugger
      setAddress(response.payload);
    }
    else {
      
    }
  };
  const [roleOptions, setRoleOptions] = useState(roleList.map((role, item) => (
    {
      key: item,
      text: role.roleName,
      value: role.roleId,
    })).filter((item) => item));

  const [genderOptions, setGenderOptions] = useState(genderList.map((gender, item) => (
    {
      key: item,
      text: gender.genderName,
      value: gender.genderId,
    })).filter((item) => item));

  const [countryOptions, setCountryOptions] = useState(countryList.map((country, item) => (
    {
      key: item,
      text: country.countryName,
      value: country.countryId,
    })).filter((item) => item));
  const [stateOptions, setStateOptions] = useState(stateList.map((state, item) => (
    {
      key: item,
      text: state.stateName,
      value: state.stateId,
    })).filter((item) => item));
  const [addressTypeOptions, setAddressTypeOptions] = useState(addressTypeList.map((addressType, item) => (
    {
      key: item,
      text: addressType.addressTypeName,
      value: addressType.addressTypeId,
    })).filter((item) => item));

  const [recordStatusOptions, setRecordStatusOptions] = useState(recordStatusList.map((recordStatus, item) => (
    {
      key: item,
      text: recordStatus.actionName,
      value: recordStatus.recordStatusId,
    })).filter((item) => item));


  useEffect(() => {
    setGenderOptions(genderList.map((gender, item) => (
      {
        key: item,
        text: gender.genderName,
        value: gender.genderId,
      })).filter((item) => item));
  }, [genderList]);

  useEffect(() => {
    setRoleOptions(roleList.map((role, item) => (
      {
        key: item,
        text: role.roleName,
        value: role.roleId,
      })).filter((item) => item));
  }, [roleList]);

  useEffect(() => {
    setCountryOptions(countryList.map((country, item) => (
      {
        key: item,
        text: country.countryName,
        value: country.countryId,
      })).filter((item) => item));

  }, [countryList]);
  useEffect(() => {
    setStateOptions(stateList.map((state, item) => (
      {
        key: item,
        text: state.stateName,
        value: state.stateId,
      })).filter((item) => item));

  }, [stateList]);
  useEffect(() => {
    setAddressTypeOptions(addressTypeList.map((addressType, item) => (
      {
        key: item,
        text: addressType.addressTypeName,
        value: addressType.addressTypeId,
      })).filter((item) => item));

  }, [addressTypeList]);



  const dropdownHandler = (event, { name, value }) => {
    setResource((currentResources) => ({ ...currentResources, [name]: value }));
  }
  const dropdownAddressHandler = (event, { name, value }) => {
    setAddress((currentAddress) => ({ ...currentAddress, [name]: value }));
  }

  const getGenderList = async () => {
    const response = await getGenders();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        arr.push(response.payload[key]);
      }
      setGendersList(arr);
    }
    else {

    }
  };

  const getRoleList = async () => {
    const response = await getRoles();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        arr.push(response.payload[key]);
      }
      setRolesList(arr);
    }
    else {

    }
  };

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

    }
  };
  const getCountryList = async () => {
    const response = await getCountries();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        arr.push(response.payload[key]);
      }
      setCountryList(arr);
    }
    else {

    }
  };

  const getStateList = async () => {
    const response = await getStates();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        arr.push(response.payload[key]);
      }
      setStateList(arr);
    }
    else {

    }
  };

  const getAddressTypeList = async () => {
    const response = await getAddressTypes();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        arr.push(response.payload[key]);
      }
      setAddressTypeList(arr);
    }
    else {

    }
  };



  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >

      <Tab eventKey="profile" title="Profile" >
        <div>
          <div class="row">
            <div class="col-md-4 col-lg-4"><Form.Group>
              <Form.Label>FirstName</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="FirstName"
                value={resource?.firstName}
              />
            </Form.Group></div>
            <div class="col-md-4 col-lg-4"><Form.Group>
              <Form.Label>MiddleName</Form.Label>
              <Form.Control
                type="text"
                name="middleName"
                placeholder="MiddleName"
                value={resource?.middleName}
              />
            </Form.Group></div>
            <div class="col-md-4 col-lg-4"><Form.Group>
              <Form.Label>LastName</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="LastName"
                value={resource?.lastName}
              />
            </Form.Group></div>
          </div>

          <div class="row">
            <div class="col-md-4 col-lg-4"><Form.Group>
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={resource?.mobileNumber}
              />
            </Form.Group></div>
            <div class="col-md-4 col-lg-4">
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="email"
                  value={resource?.email}
                />
              </Form.Group></div>
            <Form.Group className="mb-3" controlId="genderId">
              <Form.Label>Gender</Form.Label>
              <div class="col-md-4 col-lg-4">
                <Dropdown
                  name="genderId"
                  placeholder='Select Gender'
                  fluid
                  search
                  selection
                  options={genderOptions}
                  value={resource?.genderId}
                  onChange={dropdownHandler}
                /></div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="roleId">
              <Form.Label>Role</Form.Label>
              <div class="col-md-4 col-lg-4">
                <Dropdown
                  name="roleId"
                  placeholder='Select Role'
                  fluid
                  search
                  selection
                  options={roleOptions}
                  value={resource?.roleId}
                  onChange={dropdownHandler}
                /></div>
            </Form.Group>


          </div>
         
          <div class="row">
            <div class="col-md-8 col-lg-8"></div>
            <div class="col-md-4 col-lg-4"><Button variant="secondary" onClick={() => UpdateResource()}>
              Update Profile </Button></div>
            <div class="col-md-2 col-lg-2"></div>
          </div>
        </div>
      </Tab >

      <Tab eventKey="address" title="Address" >
        <div>
          <Form>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="stateId">
                  <Form.Label>State<span className="required">*</span></Form.Label>
                  <Dropdown
                    name="stateId"
                    placeholder='Select State'
                    fluid
                    search
                    selection
                    options={stateOptions}
                    value={address?.stateId}
                    onChange={dropdownAddressHandler}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="countryId">
                  <Form.Label>Country<span className="required">*</span></Form.Label>
                  <Dropdown
                    name="countryId"
                    placeholder='Select Country'
                    fluid
                    search
                    selection
                    options={countryOptions}
                    value={address?.countryId}
                    onChange={dropdownAddressHandler}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="addressTypeId">
                  <Form.Label>Address Type</Form.Label>
                  <Dropdown
                    name="addressTypeId"
                    placeholder='Select AddressType'
                    fluid
                    search
                    selection
                    options={addressTypeOptions}
                    value={address?.addressTypeId}
                    onChange={dropdownAddressHandler}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>City<span className="required">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder=" Select City"
                    value={address?.city}
                  // onChange={changeHandler}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="town">
                  <Form.Label>Town<span className="required">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="town"
                    placeholder=" Select Town"
                    value={address?.town}
                  //onChange={changeHandler}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="locality">
                  <Form.Label>Locality</Form.Label>
                  <Form.Control
                    type="text"
                    name="locality"
                    placeholder=" Select Locality"
                    value={address?.locality}
                  //onChange={changeHandler}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="pincode">
                  <Form.Label>PinCode<span className="required">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="pincode"
                    placeholder=" Select Pincode"
                    value={address?.pincode}
                  //onChange={changeHandler}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="isDefault">
               
                  <Checkbox 
                  label='Is Default' 
                  checked={address?.isDefault}
                   name="isDefault"
                    //onChange={changeHandler}
                    />
                 
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="landMark">
                  <Form.Label>LandMark<span className="required">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="landMark"
                    placeholder=" Select LandMark"
                    value={address?.landMark}
                  //onChange={changeHandler}
                  />
                </Form.Group>
              </div>
             
               <div className="col-md-6">
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    placeholder=" Select Description"
                    value={address?.description}
                  //onChange={changeHandler}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              {/* <div className="col-md-6">
                <Form.Group className="mb-3" controlId="defaultAddressTypeId">
                  <Form.Label>DefaultAddressType</Form.Label>
                  <Form.Control
                    type="text"
                    name="defaultAddressTypeId"
                    placeholder=" Select DefaultAddressTypeId"
                    value={address?.defaultAddressTypeId}
                  //onChange={changeHandler}
                  />
                </Form.Group>
              </div> */}
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="recordStatusId">
                  <Form.Label>Status<span className="required">*</span></Form.Label>
                  <Dropdown
                    name="recordStatusId"
                    placeholder='Select RecordStatus'
                    fluid
                    search
                    selection
                    options={recordStatusOptions}
                    value={address?.recordStatusId}
                    onChange={dropdownAddressHandler}
                  />
                </Form.Group>
              </div>
            </div>

          </Form>
        </div>


      </Tab>

      <Tab eventKey="documents" title="Documents" >
        <div>
          <ResourceAttachments></ResourceAttachments>
        </div>


      </Tab>
    </Tabs >
  );
}



