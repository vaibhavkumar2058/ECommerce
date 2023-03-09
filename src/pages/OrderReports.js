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
    const handleView = (rowId, name) => {
        console.log(rowId, name);
        //1 YourCellName
      };
      const handleEdit = (rowId, row) => {
        setOrderReport(row);
        //getProductsById(rowId);
        setId(rowId);
        setIsEdit(true);
        setShow(true);
      };
      const [id, setId] = useState(null);
      const [isEdit, setIsEdit] = useState(false);
      const [show, setShow] = useState(false);
      const handleDelete = (rowId, name) => {
        setId(rowId);
        setIsDelete(true);
        setShow(true);
      };
     const [isDelete, setIsDelete] = useState(false);
     const [orderReport, setOrderReport] = useState({
      productId:null,
      fromDate:null,
      toDate:null,
      roleId:null,
     });
    const saveHandler = async () => {
        const response = await getOrderReport(orderReport);
        if (response.payload.success){
        const columns = [

            { dataField: 'productId', text: 'Product Id', sort: true },
            { dataField: 'fromDate', text: 'FromDate', sort: true },
            { dataField: 'toDate', text: 'ToDate', sort: true },
            { dataField: 'roleId', text: 'Role Id', sort: true },

            // columns follow dataField and text structure
           
            {
              dataField: 'productId',headerStyle: () => {
                return { width: "100px" };
              }, text: ' Product', sort: true
            },
            {
              dataField: 'fromDate',
              headerStyle: () => {
                return { width: "100px" };
              }, text: ' FromDate', sort: true
            },
            {
                dataField: 'toDate',
                headerStyle: () => {
                  return { width: "100px" };
                }, text: ' ToDate', sort: true
              },
              {
                dataField: 'roleId',
                headerStyle: () => {
                  return { width: "100px" };
                }, text: ' RoleId', sort: true
              },
            // columns follow dataField and text structure
            {
              dataField: "Actions",
              // text: "Actions",
              headerStyle: () => {
                return { width: "80px" };
              },
              formatter: (cellContent, row) => {
                return (
                  <><button
                    className="btn btn-primary btn-xs"
                    onClick={() => handleView(row.productId, row)}
                  >
                    View
                  </button>
                  <button
                      className="btn btn-primary btn-xs"
                      onClick={() => handleEdit(row.productId, row)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-xs"
                      onClick={() => handleDelete(row.productId, row)}
                    >
                      Delete
                    </button>
                    </>
                );
              },
            },
          ]; }
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
                            <div class="col-md-4 col-lg-4"><Form.Group>
                                ProductId
                                <Form.Control
                                    type="text"
                                    name="productId"
                                    placeholder="ProductId"
                                />
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
                            <div class="col-md-4 col-lg-4">
                                RoleId
                                <Form.Control
                                    type="text"
                                    name="roleId"
                                    placeholder="RoleId"
                                />
                            </div>
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