
import React, { useState } from "react";
import { Col, Row, Form, Card, Button, Container, InputGroup } from 'react-bootstrap';
import useFetchLogins from "../../hooks/useFetchLoginUtility";


export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const {
    changepassword,
  } = useFetchLogins();

  const [newPassword, setNewPassword] = useState({
    resourcesId: null,
    oldPassword: "",
    newPassword: "",
    newConfirmPassword: "",
  });

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

    const response = await changepassword(newPassword);
    if (response.payload.title == "Success") {
      alert("success")
    }
    else {
      alert("fail")
      setMessageStatus({
        mode: 'danger',
        message: 'Un-Known Error Occured.'

      })
    }
  };

  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              
                Back to sign in
           
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Reset password</h3>
                <Form>
                  <Form.Group id="resourcesId" className="mb-4">
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
                  </Form.Group>
                  <Form.Group id="oldPassword" className="mb-4">
                    <Form.Label>oldPassword</Form.Label>
                    <InputGroup>

                      <Form.Control
                        type="text"
                        name="oldPassword"
                        placeholder="oldPassword"
                        value={newPassword?.oldPassword}
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="newPassword" className="mb-4">
                    <Form.Label>New Password</Form.Label>
                    <InputGroup>

                      <Form.Control
                        type="text"
                        name="newPassword"
                        placeholder="newPassword"
                        value={newPassword?.newPassword}
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>

                      <Form.Control
                        type="text"
                        name="newConfirmPassword"
                        placeholder="newConfirmPassword"
                        value={newPassword?.newConfirmPassword}
                        onChange={changeHandler}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" onClick={saveHandler}>
                    Change Password
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
