import React, { useState} from "react";
import useFetchLogins from "../hooks/useFetchLoginUtility";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Resetpassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
const{
  forgotPassword,
}=useFetchLogins();
  const [newReset, setNewReset] = useState({
    email:""
  });

  const changeHandler = (e) => {
    setNewReset({
      ...newReset,
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
    
    const response = await forgotPassword(newReset);
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
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>EMail</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="email"
            value={newReset?.email}
            onChange={changeHandler}
          />
        </Form.Group>
        <Button variant="primary" onClick={saveHandler}>
          Reset Password
        </Button>
      </Form>
    </>
  );
}

export default Resetpassword;
