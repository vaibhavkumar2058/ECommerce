import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function UncontrolledExample() {
  
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
       <div>Documents</div>
      </Tab>
    </Tabs>
  );
}

export default UncontrolledExample;
