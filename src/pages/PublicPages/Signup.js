
import React, { useState ,useEffect} from "react";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useFetchResources from "../../hooks/useFetchResources";
import useFetchRole from "../../hooks/useFetchRole";
import { useNavigate } from "react-router-dom";
import { Dropdown } from 'semantic-ui-react'

export default () => {
  const resource = {
    role: { admin: true, agent: false, dealer: false, customer: false },
    loggedIn: true,
  };
  const menu = {
    hidden: !true,
  };
  localStorage.setItem("hidemenu", JSON.stringify(menu))
  localStorage.setItem("loggedIn", JSON.stringify(resource))
  const[ roleList, setRolesList]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const {
    addResources,
  } = useFetchResources();
  const {
    getRoles,
  } = useFetchRole();
  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });
  const [newSignup, setNewSignup] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    roleId: null,
    mobileNumber: null,
    email: "",
    password: "",
  });
  
  const [hide, setHide] = useState(true);

  const isSignInDisabled = !newSignup.firstName 
  || !newSignup.password
  || !newSignup.roleId
  || !newSignup.mobileNumber
  || !newSignup.email
  || !newSignup.password;


  useEffect(() => {
   
  }, [hide]);
  const ClickHandler = (e) => {
   navigate('/emailverification');
  };
  const changeHandler = (e) => {
    setNewSignup({
      ...newSignup,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const saveHandler = async () => {
    // setShowNavbar(!showNavbar)
    const response = await addResources(newSignup);
    if (response.payload.title == "Success") {
      setError({ status: true, msg: "Login Success", type: 'success' })
      setHide(false);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Un-Known Error Occured.'
      })

    }
  };
  const [roleOptions, setRoleOptions] = useState(roleList.map((role,item) =>(
    {
    key: item,
    text: role.roleName,
    value: role.roleId,
  })).filter((item) => item));

  useEffect(() => { 
    getRoleList();
    setRoleOptions (roleList.map((role, item) => (
      {
        key: item,
        text: role.roleName,
        value: role.roleId,
      })).filter((item) => item));
  },[roleList]);
  const dropdownHandler = (event,{name, value}) => {
    setNewSignup((currentNewSignup) => ({...currentNewSignup, [name]: value}));
  } 

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
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">


          </p>
          {hide && (  <Row className="justify-content-center form-bg-image" >
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create an account</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="firstName" className="mb-4">
                    <Form.Label>Name</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Name"
                        value={ newSignup?.firstName }
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="role" className="mb-4">
                    <Form.Label>Role</Form.Label>
                    <InputGroup>
                      <Dropdown
                        name="roleId"
                        placeholder='Select Role'
                        fluid
                        search
                        selection
                        options={roleOptions}
                        value = {newSignup?.roleId}
                        onChange={dropdownHandler}
            />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="mobileNumber" className="mb-4">
                    <Form.Label>MobileNumber</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        name="mobileNumber"
                        placeholder="MobileNumber"
                        value={newSignup?.mobileNumber}
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        name="email"
                        placeholder="email"
                        value={newSignup?.email}
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        name="password"
                        placeholder="password"
                        value={newSignup?.password}
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group>
                  <FormCheck type="checkbox" className="d-flex mb-4">
                    <FormCheck.Input required id="terms" className="me-2" />
                    <FormCheck.Label htmlFor="terms">
                      I agree to the
                    </FormCheck.Label>
                  </FormCheck>

                  <div>
                    <Button variant="primary" onClick={saveHandler} disabled={isSignInDisabled}>
                      SignUp
                    </Button>
                  </div>
                </Form>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Already have an account?

                    {` Login here `}

                  </span>
                </div>
              </div>
            </Col>
          </Row>)}
          {!hide &&(<Row className="justify-content-center form-bg-image" >
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Registation</h3>
                </div>
              
                <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3>Register  successfully</h3>
                <p className="mb-4">please Check Your Mail to Verify</p>
                <Form>
                 
                  <Button variant="primary" onClick={ClickHandler}>
                    Click here to verifiemail
                  </Button>
                </Form>
              </div>
            </Col>
              </div>
            </Col>
          </Row>)}
        </Container>
      </section>
    </main>
  );
};
