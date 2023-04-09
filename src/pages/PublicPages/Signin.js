
import React, { useState } from "react";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useFetchLogins from "../../hooks/useFetchLoginUtility";


export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const {
    login,
  } = useFetchLogins();

  const [newLogin, setNewLogin] = useState({
    email: "",
    password: "",
  });
  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });
  const changeHandler = (e) => {
    setNewLogin({
      ...newLogin,
      [e.target.name]: e.target.value,
    });
  };

  const saveHandler = async () => {
    // setShowNavbar(!showNavbar)

    const response = await login(newLogin);
    if (response.payload.success) {
      setError({ status: true, msg: "Login Success", type: 'success' })
      const role = response?.payload?.result?.role?.roleName;

      const resource = {
        role: { 
          admin: (role =='SuperAdmin' ? true:false), 
          agent: (role =='Agent' ? true:false), 
          dealer: (role =='Dealer' ? true:false), 
          customer: (role =='Customer' ? true:false) 
        },
        loggedIn: true,
        resourcesId:response?.payload?.result?.resourcesId,
      };
      localStorage.setItem("loggedIn", JSON.stringify(resource))
      navigate('/dashboard');
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
          <Row className="justify-content-center form-bg-image" style={{}}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label> Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="email"
                        placeholder="email"
                        value={newLogin?.email}
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label> Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                        </InputGroup.Text>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="password"
                          value={newLogin?.password}
                          onChange={changeHandler}
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">Lost password?</Card.Link>
                    </div>
                  </Form.Group>
                  <div>
                    <Button variant="primary" onClick={saveHandler}>
                      SignIn
                    </Button>
                  </div>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?

                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
