import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import useFetchResourceAttachments from "../hooks/useFetchResourceAttachments";
import { Col, Row, Form, Card, Button, Container, InputGroup } from 'react-bootstrap';
import React, { useState,useEffect } from "react";



  export default () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
  
  const { 
    getResourceAttachmentses,
  } = useFetchResourceAttachments();
  const [newMyProfile, setNewMyProfile] = useState({
    resourcesId: null,
    
  });
   const [resourceAttachmentes, setResourceAttachments] = useState({
    resourcesId: null,
    filesId: null,
    resourceAttachmentTypeId: null,
    //visibleToCustomer: true,
    description: "",
   
      });
  const changeHandler = (e) => {
    setNewMyProfile({
      ...newMyProfile,
      [e.target.name]: e.target.value,
    });
  };
  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });
  const Get = () => {
   
  };

  
  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      
      <Tab eventKey="profile" title="Profile" >
      <div>Profile
      
      </div>
      </Tab>
      <Tab eventKey="documents" title="Documents" >
      
                <Form>
                  <Form.Group id="resourcesId" className="mb-4">
                    <Form.Label>ResourcesId</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        name="resourcesId"
                        placeholder="resourcesId"
                        value={newMyProfile?.resourcesId}
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
                <Button variant="secondary"
                    onClick={Get}>
                    Get
                  </Button>
              
      </Tab>
    </Tabs>
  );
}



