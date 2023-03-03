import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate } from 'react-router-dom';

function UncontrolledExample() {
  const navigate =useNavigate();
  const changeHandler = (e) => {
    navigate('/signin')
  };

  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      
      <Tab eventKey="profile" title="Profile" onClick={changeHandler}>
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
