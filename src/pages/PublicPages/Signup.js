
import React, { useState ,useEffect} from "react";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useFetchResources from "../../hooks/useFetchResources";
import { useNavigate } from "react-router-dom";
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const {
    addResources,
  } = useFetchResources();
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

  useEffect(() => {
   
  }, [hide]);
  const ClickHandler = (e) => {
   navigate('/dashboard');
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
    debugger;
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
                    <Form.Label>firstName</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>

                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="firstName"
                        value={newSignup?.firstName}
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="middleName" className="mb-4">
                    <Form.Label>middleName</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>

                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="middleName"
                        placeholder="middleName"
                        value={newSignup?.middleName}
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="lastName" className="mb-4">
                    <Form.Label>lastName</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>

                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="lastName"
                        value={newSignup?.lastName}
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="roleId" className="mb-4">
                    <Form.Label>roleId</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>

                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="roleId"
                        placeholder="roleId"
                        value={newSignup?.roleId}
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group id="mobileNumber" className="mb-4">
                    <Form.Label>mobileNumber</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>

                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="mobileNumber"
                        placeholder="mobileNumber"
                        value={newSignup?.mobileNumber}
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group id="email" className="mb-4">
                    <Form.Label>email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>

                      </InputGroup.Text>
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
                    <Form.Label>password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>

                      </InputGroup.Text>
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
                    <Button variant="primary" onClick={saveHandler}>
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
                    Click here to login
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
