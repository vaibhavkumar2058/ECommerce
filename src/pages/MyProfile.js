import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import Dropdown from 'react-bootstrap/Dropdown';
import useFetchResources from '../hooks/useFetchResources';

export default () => {
  const [resource, setResource] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const {
    updateResources,
    resourcesById,
  } = useFetchResources();

  const UpdateResource = () => {
    const saveHandler = async () => {


      const response = await updateResources(6, resource);
      if (response.payload.title == "Success") {

      }
      else {

      }
    }

  }

  useEffect(() => {
    if (resource == null) {
      getResourcesById(6);

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
              <div class="col-md-4 col-lg-4">
                <Dropdown>
                  <Dropdown.Toggle  >

                    Gender
                    <Form.Control
                      type="text"
                      name="genderId"
                      placeholder="Gender"
                      value={resource?.genderId}
                    />

                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Female</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Male </Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown></div>


            </div>
            <div class="row">

              <div class="col-md-2 col-lg-2">
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control 
                    type="text"
                    name="addressId"
                    placeholder="Address"
                    value={resource?.address.city} />
                </Form.Group>
              </div>

              <div class="col-md-2 col-lg-2">
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control as="textarea" rows={1}
                    type="text"
                    name="addressId"
                    placeholder="Address"
                    value={resource?.address.town} />
                </Form.Group>
              </div>

              <div class="col-md-2 col-lg-2">
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control as="textarea" rows={1}
                    type="text"
                    name="addressId"
                    placeholder="Address"
                    value={resource?.address.locality} />
                </Form.Group>
              </div>

              <div class="col-md-2 col-lg-2">
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control as="textarea" rows={1}
                    type="text"
                    name="addressId"
                    placeholder="Address"
                    value={resource?.address.pincode} />
                </Form.Group>
              </div>

              <div class="col-md-2 col-lg-2">
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control as="textarea" rows={1}
                    type="text"
                    name="addressId"
                    placeholder="Address"
                    value={resource?.address.landMark} />
                </Form.Group>
              </div>
            </div>
        <div class="row">
          <div class="col-md-8 col-lg-8"></div>
          <div class="col-md-4 col-lg-4"><Button variant="secondary" onClick={() => UpdateResource()}>
            Update Profile </Button></div>
          <div class="col-md-2 col-lg-2"></div>
        </div>
      </div>
      </Tab >
    <Tab eventKey="documents" title="Documents" >
      <div>Documents

      </div>


    </Tab>
    </Tabs >
  );
}



