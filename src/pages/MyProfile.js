import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import React, { useState,useEffect } from "react";



  export default () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
  
  
   const [resourceAttachmentes, setResourceAttachments] = useState({
    
      });
  
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
      <div>Documents
      
      </div>
               
                
      </Tab>
    </Tabs>
  );
}



