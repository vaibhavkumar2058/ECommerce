
import React from "react";
import { Col, Row, Card, Image, Button, Container } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';


export default () => {
  const menu = {
    hidden: !true,
  };
  const navigate = useNavigate();
  const saveHandler = (e) =>{
    navigate('/dashboard')
  }
  localStorage.setItem("hidemenu", JSON.stringify(menu))
  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col xs={12} className="text-center d-flex align-items-center justify-content-center">
              <div>
                <Card.Link as={Link}>
                
                </Card.Link>
                <h1 className="text-primary mt-5">
                 Email sent successfully
                </h1>
                <Button onClick={saveHandler} variant="primary" className="animate-hover" >
          
                  Dashboard
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
