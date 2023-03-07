import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import Dropdown from 'react-bootstrap/Dropdown';

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  
  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >

      <Tab eventKey="profile" title="Profile" >
        <div>
          <form>
            <div class="row">
              <div class="col-md-4 col-lg-4"><Form.Group>
                <Form.Label>FirstName</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="FirstName"
                />
              </Form.Group></div>
              <div class="col-md-4 col-lg-4"><Form.Group>
                <Form.Label>MiddleName</Form.Label>
                <Form.Control
                  type="text"
                  name="middleName"
                  placeholder="MiddleName"
                />
              </Form.Group></div>
              <div class="col-md-4 col-lg-4"><Form.Group>
                <Form.Label>LastName</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="LastName"
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
                />
              </Form.Group></div>
              <div class="col-md-4 col-lg-4"><Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </Form.Group></div>
              <div class="col-md-4 col-lg-4"><Dropdown>
      <Dropdown.Toggle  >
      
                Gender
                <Form.Control
                  type="text"
                  name="gender"
                  placeholder="Gender"
                />
             
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Female</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Male </Dropdown.Item>
       
      </Dropdown.Menu>
    </Dropdown></div>
             

            </div>
            <div class="row">

            <div class="col-md-8 col-lg-8"><Form.Group>
            
            <Form.Label>Address</Form.Label>
        <Form.Control as="textarea" rows={3} />
              </Form.Group></div>

              <div class="col-md-4 col-lg-4"><Form.Group>
                <Form.Label>BloodGroup</Form.Label>
                <Form.Control
                  type="text"
                  name="bloodGroup"
                  placeholder="BloodGroup"
                />
              </Form.Group></div>
              <div class="row">
            <div class="col-md-8 col-lg-8"></div>
            <div class="col-md-4 col-lg-4"><Button variant="secondary">
              Update Profile </Button></div>
            <div class="col-md-2 col-lg-2"></div>
          </div>


            </div>






          </form>

        </div>
      </Tab>
      <Tab eventKey="documents" title="Documents" >
        <div>Documents

        </div>


      </Tab>
    </Tabs>
  );
}



