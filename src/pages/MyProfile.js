import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { Dropdown } from 'semantic-ui-react'
import useFetchResources from '../hooks/useFetchResources';
import ResourceAttachments from './ResourceAttachments';
import Addresses from './Address';
import useFetchGender from "../hooks/useFetchGender";
import useFetchRecordStatus from "../hooks/useFetchRecordStatus";
import useFetchRole from "../hooks/useFetchRole";


export default () => {

  const userInfo = JSON.parse(localStorage.getItem('loggedIn'));
  const resourceId= userInfo?.resourcesId;
  const[ roleList, setRolesList]=useState([]);
  const[genderList,setGendersList]=useState([]);
  const [resource, setResource] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const {
    updateResources,
    resourcesById,
  } = useFetchResources();
  const {
    getRoles,
  } = useFetchRole();
  const {
    getGenders,
  } = useFetchGender();

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
      getResourcesById(resourceId);
    }


  }, [resource]);

  const getResourcesById = async (id) => {
    const response = await resourcesById(id);
    if (response.payload.title == "Success") {
      debugger
      setResource(response.payload);
    }
    else {

    }
  };

  const [roleOptions, setRoleOptions] = useState(roleList.map((role,item) =>(
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
    

    useEffect(() => { 
      setGenderOptions(genderList.map((gender, item) => (
      {
        key: item,
        text: gender.genderName,
        value: gender.genderId,
      })).filter((item) => item));
    },[genderList]);

    useEffect(() => { 
      setRoleOptions (roleList.map((role, item) => (
        {
          key: item,
          text: role.roleName,
          value: role.roleId,
        })).filter((item) => item));
    },[roleList]);

  const dropdownHandler = (event,{name, value}) => {
    setResource((currentResources) => ({...currentResources, [name]: value}));
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
              value = {resource?.genderId}
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
              value = {resource?.roleId}
              onChange={dropdownHandler}
            /></div>
          </Form.Group>

              
            </div>
            <div class="row">
              {/* <div class="col-md-2 col-lg-2">
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control 
                    type="text"
                    name="addressId"
                    placeholder="Address"
                    value={resource?.address.city} />
                </Form.Group>
              </div> */}

              {/* <div class="col-md-2 col-lg-2">
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control as="textarea" rows={1}
                    type="text"
                    name="addressId"
                    placeholder="Address"
                    value={resource?.address.town} />
                </Form.Group>
              </div> */}

              {/* <div class="col-md-2 col-lg-2">
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control as="textarea" rows={1}
                    type="text"
                    name="addressId"
                    placeholder="Address"
                    value={resource?.address.locality} />
                </Form.Group>
              </div> */}

              {/* <div class="col-md-2 col-lg-2">
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control as="textarea" rows={1}
                    type="text"
                    name="addressId"
                    placeholder="Address"
                    value={resource?.address.pincode} />
                </Form.Group>
              </div> */}

              {/* <div class="col-md-2 col-lg-2">
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control as="textarea" rows={1}
                    type="text"
                    name="addressId"
                    placeholder="Address"
                    value={resource?.landMark} />
                </Form.Group>
              </div> */}
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
       <Addresses></Addresses>
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



