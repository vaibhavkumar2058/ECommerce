
import React, { useState,useEffect } from "react";
import { Col, Row, Form, Card, Button, Container, InputGroup } from 'react-bootstrap';
import useFetchLogins from "../../hooks/useFetchLoginUtility";
import { useNavigate, useSearchParams } from "react-router-dom";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const {
    changepassword,
  } = useFetchLogins();
  const userInfo = JSON.parse(localStorage.getItem('loggedIn'));
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const isotp = searchParams.get('otp');
  const [newPassword, setNewPassword] = useState({
    resourcesId: userInfo?.resourcesId,
    newPassword: "",
    oldPassword:"",
    newConfirmPassword: "",
    token: null,
    otp: null,
  });
  const [hide, setHide] = useState(true);
  useEffect(() => {
  }, [hide]);
  const navigate = useNavigate();
  const ClickHandler = (e) => {
    navigate('/signin')
  };
  const changeHandler = (e) => {
    setNewPassword({
      ...newPassword,
      [e.target.name]: e.target.value,
    });
  };
  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });


  const saveHandler = async () => {
    try {
      if (isotp) {
        newPassword.otp = newPassword.oldPassword; 
        newPassword.oldPassword = null;
      }
      newPassword.token=token;
      const response = await changepassword(newPassword);
      
      if (response.payload.title == 'Success') {
        setHide(false);
        alert('Reset Password is Successful')
      } else {
        alert('Failed to reset the password');
        setMessageStatus({
          mode: 'danger',
          message: 'An error occurred while resetting the password.',
        });
      }
    } catch (error) {
      alert('Failed to reset the password');
      setMessageStatus({
        mode: 'danger',
        message: 'An error occurred while resetting the password.',
      });
    }
  };
  
  
    return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          {hide && (<Row className="justify-content-center">
            {/* <p className="text-center">
              
                Back to sign in
           
            </p> */}
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="app-center">Change password</h3>
                <Form>
                  {/* <Form.Group id="resourcesId" className="mb-4">
                    <Form.Label>ResourcesId</Form.Label>
                    <InputGroup>

                      <Form.Control
                        type="text"
                        name="resourcesId"
                        placeholder="resourcesId"
                        value={newPassword?.resourcesId}
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group> */}
                  <Form.Group id="oldPassword" className="mb-4">
                    <Form.Label>  {isotp ? 'One Time Password': 'Old Password'} </Form.Label>
                    <InputGroup>

                      <Form.Control
                        type="text"
                        name="oldPassword"
                        placeholder="Old Password"
                        value={newPassword?.oldPassword}
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="newPassword" >
                    <Form.Label>New Password</Form.Label>
                    <InputGroup>

                      <Form.Control
                        type="text"
                        name="newPassword"
                        placeholder="New Password"
                        value={newPassword?.newPassword}
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>Confirm New Password</Form.Label>
                    <InputGroup>

                      <Form.Control
                        type="text"
                        name="newConfirmPassword"
                        placeholder="NewConfirm Password"
                        value={newPassword?.newConfirmPassword}
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" onClick={saveHandler} className="app-right">
                    Change Password
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>)}
          {!hide && (<Row className="justify-content-center">
          {/* <p className="text-center">
            
              Back to sign in
         
          </p> */}
          <Col xs={12} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
              <h3 className="mb-4">Password Change successfully</h3>
              <Button variant="primary" onClick={ ClickHandler}>
                   Click to Login
                  </Button>
            </div>
          </Col>
        </Row>)}
        </Container>
      </section>
    </main>
  );
};
