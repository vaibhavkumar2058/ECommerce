import React, { useState } from "react";
import useFetchLogins from "../hooks/useFetchLoginUtility";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const {
    changepassword,
  } = useFetchLogins();

  const [newPassword, setNewPassword] = useState({
    resourcesId: 6,
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
    <>
      <Form>
        <Form.Group className="mb-3" controlId="oldPassword">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="text"
            name="oldPassword"
            placeholder="oldPassword"
            value={newPassword?.oldPassword}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="text"
            name="newPassword"
            placeholder="newPassword"
            value={newPassword?.newPassword}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="newConfirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="text"
            name="newConfirmPassword"
            placeholder="newConfirmPassword"
            value={newPassword?.newConfirmPassword}
            onChange={changeHandler}
          />
        </Form.Group>
        <Button variant="primary" onClick={saveHandler}>
          Change Password
        </Button>
      </Form>
    </>
  );
}

export default ChangePassword;
