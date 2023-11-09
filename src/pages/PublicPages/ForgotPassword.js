
import React, { useState ,useEffect} from "react";
import {Button,Form,InputGroup,Container,Row,Card,Col} from 'react-bootstrap';
import { SignIntersection } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import useFetchLogins from "../../hooks/useFetchLoginUtility";
import Alert from 'react-bootstrap/Alert';
export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailValidation, setEmailValidation] = useState("");
  const [message, setMessage] = useState("");
  const {
    forgotPassword,
  } = useFetchLogins();
  const [newReset, setNewReset] = useState({
    email: "",
  });
  const [hide, setHide] = useState(true);
  const changeHandler = (e) => {
    setNewReset({
      ...newReset,
      [e.target.name]: e.target.value,
    });

    if (e.target.name == "email") {
      if (e.target.value.trim() =="") {
        setMessage("");
      } 
      else 
      {
        const emailRegex = /^[A-Z0-9._%+-]+@(gmail\.com|outlook\.com|\w+\.co\.in)$/i;
        if (!emailRegex.test(e.target.value)) {
          setMessage("Invalid email format.");
        } else {
          setMessage("");
        }
      }
    }    
  };
  const navigate = useNavigate();
  const ClickHandler = (e) => {
    navigate('/signin')
  };
  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  useEffect(() => {
   
  }, [hide]);

  const saveHandler = async () => {
    const response = await forgotPassword(newReset.email);
    if(response == undefined)
    {
      setEmailValidation("Invalid Credential.")
    }
    if (response.payload.title == "Success") {
   setHide(false);
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
      <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
        <Container>
          {hide && (<Row className="justify-content-center">
            <p className="text-center">
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3>Forgot your password?</h3>
                <p className="mb-4">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
                <div className="text-center text-md-center mb-4 mt-md-0">
                {emailValidation && <Alert variant="danger">{emailValidation}</Alert>}
                </div>
                <Form>
                  <div className="mb-4">
                    <Form.Label htmlFor="email">Your Email</Form.Label>
                    <InputGroup id="email">
                      <Form.Control
                        type="text"
                        name="email"
                        placeholder="email"
                        value={newReset?.email}
                        onChange={changeHandler}
                      />
                     
                    </InputGroup>
                    {message &&<p className="text-danger">{message}</p>} 
                  </div>
                  <Button variant="primary" onClick={saveHandler}>
                    Reset Password
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>)}
          {!hide && (<Row className="justify-content-center">
            <p className="text-center">
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3>Reset Password successfully</h3>
                <p className="mb-4">please Check Your Mail to Verify</p>
                <Form>
                 
                  <Button variant="primary" onClick={ClickHandler}>
                    Click here to login
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>)}
        </Container>
      </section>
    </main>
  );
};
