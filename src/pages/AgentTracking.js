import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { css } from "@emotion/react";
import { Dropdown } from 'semantic-ui-react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import useFetchAgentTracking from "../hooks/useFetchAgentTracking";

export default function AgentTracking ({
  getallAgentTracking,
  agentList = []
})

{
    const {
        getAgentTracking,
        agentTrackingById,
      } = useFetchAgentTracking();

      const [saveDisabled, setSaveDisabled] = useState(true);
      const [fromDateOptions, setFromDateOptions] = useState([]);
      const [toDateOptions, setToDateOptions] = useState([]);
      const [agentTracking, setAgentTracking] = useState({
        agentTrackingId: null,
        agentId: null,
        dealerId: null,
        trackingDate: "",
        gmtId: null,
        description: "",
        recordStatusId : null,
});

const dropdownHandler = (event, { name, value }) => {
  setAgentTracking((currentAgentTracking) => ({ ...currentAgentTracking, [name]: value }));
}

      const [agentOptions, setAgentOptions] = useState(agentList.map((agent, item) => (
        {
          key: item,
          text: agent.agentName,
          value: agent.agentId,
        })).filter((item) => item));

      const columns = [
        {
        },
        { dataField: 'agentTrackingId', text: 'AgentTracking Id', sort: true, hidden: true },
        {
          dataField: 'agentId', text: 'Agent Id', sort: true, hidden: true, headerStyle: () => {
            return { width: "120px" };
          }
        },
        {
          dataField: 'agentName', text: 'Agent', sort: true, hidden: true, headerStyle: () => {
            return { width: "120px" };
          }
        },
        {
          dataField: 'dealerId', text: 'Dealer Id', hidden: true, sort: true, headerStyle: () => {
            return { width: "100px" };
          }
        },
        {
          dataField: 'dealerName', text: 'Dealer Name', sort: true, headerStyle: () => {
            return { width: "100px" };
          }
        },
        {
          dataField: 'trackingDate', text: 'TrackingDate', sort: true, hidden: true, headerStyle: () => {
            return { width: "100px" };
    
          }
        },
        {
          dataField: 'gmtId', text: 'GMT', sort: true, headerStyle: () => {
            return { width: "100px" };
          }
        },
        {
          dataField: 'description', text: 'Description', sort: true, headerStyle: () => {
            return { width: "120px" };
          }
        },
        {
          dataField: 'recordStatusId', text: 'recordStatusId', hidden: true, sort: true, headerStyle: () => {
            return { width: "100px" };
          }
        },
        {
          dataField: 'recordStatus', text: 'Status', sort: true, headerStyle: () => {
            return { width: "100px" };
          }
        },
        // columns follow dataField and text structure
      ];
    
      useEffect(() => {
        setAgentOptions(agentList.map((agent, item) => (
          {
            key: item,
            text: agent.agentName,
            value: agent.agentId,
          })).filter((item) => item));
      }, [agentList]);

      const [messageStatus, setMessageStatus] = useState({
        mode: "",
        title: "",
        status: false,
        message: "",
      });

      const pagination = paginationFactory({
        page: 1,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
          console.log('page', page);
          console.log('sizePerPage', sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
          console.log('page', page);
          console.log('sizePerPage', sizePerPage);
        }
      });

      const getAllAgentTracking = async () => {
        const response = await getAgentTracking();
        if (response.payload.title == "Success") {
          setMessageStatus({
            mode: 'success',
            message: 'AgentTracking Record Fetch Succefully.'
          })
          const dataFormatter = (rawData) => {
            const curedData = {};
            curedData.agentTrackingId = rawData?.agentTrackingById;
            curedData.dealerId = rawData?.dealerId;
            curedData.dealerName = rawData?.dealerName;
            curedData.trackingDate = rawData?.trackingDate;
            curedData.gmtId = rawData?.gmtId;
            curedData.description = rawData?.description;
            curedData.recordStatusId = rawData?.recordStatusId;
            curedData.recordstatus = rawData?.recordstatus;
            return curedData;
          }
          var arr = [];
          for (var key in response.payload) {
            if (key !== 'title')
              arr.push(dataFormatter(response.payload[key]));
          }
          setAgentTracking(arr);
        }
        else {  
          setMessageStatus({
            mode: 'danger',
            message: 'AgentTracking Fetch Failed.'
          })
        }
      };

      const getAgentTrackingById = async (id) => {
        const response = await agentTrackingById(id);
        if (response.payload.title == "Success") {
          setAgentTracking(response.payload);
        }
        else {
          setMessageStatus({
            mode: 'danger',
            message: 'AgentTracking Get Failed.'
          })
        }
      };
      
 return (
  <Form>
          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3" controlId="agentId">
                <Form.Label>Agent<span className="required">*</span></Form.Label>
                <Dropdown
                  name="agentId"
                  placeholder='Select Agent'
                  fluid
                  search
                  selection
                  options={agentOptions}
                  value={agentTracking?.agentId}
                  onChange={dropdownHandler}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>FromDate<span className="required">*</span></Form.Label>
                <Dropdown
                  name="fromDate"
                  placeholder='Select FromDate'
                  fluid
                  search
                  selection
                  options={fromDateOptions}
                  value={agentTracking.fromDate}
                  onChange={dropdownHandler}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>ToDate</Form.Label>
                <Dropdown
                  name="toDate"
                  placeholder='Select ToDate'
                  fluid
                  search
                  selection
                  options={toDateOptions}
                  value={agentTracking.toDate}
                  onChange={dropdownHandler}
                />
              </Form.Group>
            </div>
          </div>
          <div>
          <Button variant="primary" onClick={getAllAgentTracking}>
              GetDetails
            </Button>
          </div>
            </Form>
 );
};

