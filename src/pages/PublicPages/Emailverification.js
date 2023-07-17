
import React, { useState ,useEffect} from "react";
import {Button,Form,InputGroup,Container,Row,Card,Col} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import useFetchLogins from "../../hooks/useFetchLoginUtility";
export default () => {
  const {
    emailverification,
    } = useFetchLogins();

  const [emailToken, setEmailToken] = useState({
    emailToken: null,
  });
  const queryParams = new URLSearchParams(window.location.search);
  emailToken.emailToken = queryParams.get('token');
  const saveHandler = async () => {
    const response = await  emailverification(emailToken.emailToken);
    
    if (response.payload.title == "Success") {
   setHide(true);
    }
    else {
     setHide(false);
      setMessageStatus({
        mode: 'danger',
        message: 'Un-Known Error Occured.'

      })
    }
  };

  if(emailToken.emailToken != null)
  saveHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const [hide, setHide] = useState(true);
  const [newhide, setnewHide] = useState(true);
  
  const navigate = useNavigate();
  const ClickHandler = (e) => {
    navigate('/dashboard')
  };

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  useEffect(() => {
  }, [hide]);

  return (
    <main>
      <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
        <Container>
          {hide && (<Row className="justify-content-center">
            <p className="text-center">
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3>EMAIL VERIFIED Succefully</h3>
                <p className="mb-4">Please check your email</p>
                <Form>
                 
                  <Button variant="primary" onClick={ClickHandler}>
                    Click here to DashBoard
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
                <h3>EMAIL NOT VERIFIED</h3>
                <p className="mb-4">Please check your email</p>
                <Form>
                 
                  <Button variant="primary" onClick={ClickHandler}>
                    Click here to BACK
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
