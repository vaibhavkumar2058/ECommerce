import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useFetchOrders from '../hooks/useFetchOrder';

export default () => {
  const {
    getOrderReport,
  } = useFetchOrders();

  const [orderReport, setOrderReport] = useState({
    productId: null,
    fromDate: null,
    toDate: null,
    roleId: null,
  });
  const saveHandler = async () => {
    const response = await getOrderReport(orderReport);
    if (response.payload.success) {

    }
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
              <div class="col-md-2 col-lg-2"><Form.Group>
                ProductId
                <Form.Control
                  type="text"
                  name="productId"
                  placeholder="ProductId"
                />
              </Form.Group></div>
              <div class="col-md-2 col-lg-2"><Form.Group>
                <Form.Label>FromDate</Form.Label>
                <Form.Control
                  type="date"
                  name="fromDate"
                  placeholder="fromDate"
                />
              </Form.Group>
              </div>
              <div class="col-md-2 col-lg-2"><Form.Group>
                <Form.Label>ToDate</Form.Label>
                <Form.Control
                  type="date"
                  name="toDate"
                  placeholder="toDate"
                />
              </Form.Group>
              </div>
              <div class="col-md-2 col-lg-2">
                RoleId
                <Form.Control
                  type="text"
                  name="roleId"
                  placeholder="RoleId"
                />
              </div>
              <div class="col-md-2 col-lg-2"><Button variant="secondary" onClick={saveHandler}>
                Get Reports </Button></div>
            </div>
          </form>
        </div>
      </Tab >
    </Tabs >
  );
}        