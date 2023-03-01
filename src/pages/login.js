import React, { useState } from "react";
import useFetchLogins from "../hooks/useFetchLoginUtility";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ZMap from "./ZMap";
import { useNavigate } from "react-router-dom";
import Dashboard from "./DashBoard";
function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // const [showNavbar, setShowNavbar] = useState(true);
  const {
    login,
  } = useFetchLogins();

  const [newLogin, setNewLogin] = useState({
    email:"",
    password:"",
  });

  const changeHandler = (e) => {
    setNewLogin({
      ...newLogin,
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
    // setShowNavbar(!showNavbar)
    debugger;
    const response = await login(newLogin);
    if (response.payload.title == "Success") {
      setError({ status: true, msg: "Login Success", type: 'success' })
      navigate('/dashboard')
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Un-Known Error Occured.'
        
      })
      
    }
  };

  return (
    <>
    <div><h3>LogIn</h3></div>
    <div>
  
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="email"
            value={newLogin?.email}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label> Password</Form.Label>
          <Form.Control
            type="text"
            name="password"
            placeholder="password"
            value={newLogin?.password}
            onChange={changeHandler}
          />
        </Form.Group>
        <div>
        <Button variant="primary" onClick={saveHandler}>
          Login
        </Button>
        </div>
      </Form>
   
      </div>
   
    </>
 
  );
}

export default SignIn;
