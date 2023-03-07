import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import Dropdown from 'react-bootstrap/Dropdown';
import useFetchOrders from '../hooks/useFetchOrder';

export default () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    const {
        getOrderReport,
      } = useFetchOrders();
    const saveHandler = async () => {
        const response = await getOrderReport();
      };
    return (
        <Tabs
            defaultActiveKey="orderReports"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="orderReports" title="OrderReports" >
                <div>
                    <form>
                        
                            <div class="row">
                                <div class="col-md-4 col-lg-4"><Form.Group><Dropdown>
                                    <Dropdown.Toggle>
                                        Product
                                        <Form.Control
                                            type="text"
                                            name="product"
                                            placeholder="Product"
                                        />

                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Soaps</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Liquids </Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Detergents </Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Agarbathi </Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>
                                </Form.Group></div>
                            </div>



                            
                            
                            <div class="col-md-4 col-lg-4"><Form.Group>
                             <Form.Label>FromDate</Form.Label> 
                             <Form.Control 
                             type="date"
                              name="fromDate"
                               placeholder="fromDate"
                                
                                 />
                                 </Form.Group>
                                 </div>
                    

                        <div class="row">
                        <div class="col-md-4 col-lg-4"><Form.Group>
                             <Form.Label>ToDate</Form.Label> 
                             <Form.Control 
                             type="date"
                              name="toDate"
                               placeholder="toDate"
                                
                                 />
                                 </Form.Group>
                                 </div>
                    

                            <div class="col-md-4 col-lg-4"><Dropdown>
                                <Dropdown.Toggle  >

                                    Role
                                    <Form.Control
                                        type="text"
                                        name="role"
                                        placeholder="Role"
                                    />

                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Admin</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Agent </Dropdown.Item>
                                    <Dropdown.Item href="#/action-1">Dealer</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Customer </Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown></div>
                        </div>
                        <div class="row">
                <div class="col-md-8 col-lg-8"></div>
                <div class="col-md-4 col-lg-4"><Button variant="secondary" onClick={saveHandler}>
                  Get Reports </Button></div>
                <div class="col-md-2 col-lg-2"></div>
              </div>


                    </form>
                </div>
            </Tab >
        </Tabs >
    );
}        