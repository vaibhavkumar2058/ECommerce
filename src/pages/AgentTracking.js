import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import BootstrapTable from 'react-bootstrap-table-next';
import { Dropdown } from 'semantic-ui-react';
import Form from "react-bootstrap/Form";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import useFetchAgentTracking from "../hooks/useFetchAgentTracking";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'; 
export default function AgentTrackings() {

    const [agentTrackings, setAgentTrackings] = useState([]);
    const [agentList, setAgentList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [show, setShow] = useState(false);

    const [newAgentTracking, setNewAgentTracking] = useState({
      agentTrackingId: null,
      agentId: null,
      dealerId: null,
      trackingDate: "",
      gmtId: null,
      description: "",
      recordStatusId: null,
    });

    const handleShow = () => setShow(true);
  const userInfo = JSON.parse(localStorage.getItem('loggedIn'));
  const [agentTracking, setAgentTracking] = useState({
    resourcesId: userInfo?.resourcesId,
    agentId: null,
    dealerId: null,
    trackingDate: "",
    gmtId: null,
    description: "",
    recordStatusId: null,
  });
  
    const [id, setId] = useState(null);

  const [messageStatus, setMessageStatus] = useState({
    mode: "",
    title: "",
    status: false,
    message: "",
  });

  const {
    getAgentTrackings,
    agentTrackingById,
  } = useFetchAgentTracking();

  const columns = [

    { dataField: 'agentTrackingId', text: 'AgentTracking Id', sort: true, hidden: true },
    {
      dataField: 'agentId', text: 'Agent Id', sort: true, hidden: true, headerStyle: () => {
        return { width: "120px" };
      }
    },
    {
      dataField: 'dealerId', text: 'Dealer Id', hidden: true, sort: true, headerStyle: () => {
        return { width: "100px" };
      }
    },
    {
      dataField: 'trackingDate', text: 'Tracking Date', sort: true, headerStyle: () => {
        return { width: "140px" };

      }
    },
    {
      dataField: 'gmtId', text: 'GMT', sort: true, hidden: true, headerStyle: () => {
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

  const defaultSorted = [{
    dataField: 'agentTrackingId',
    order: 'desc'
  }];

  useEffect(() => {
    getagentList();
    if (agentTrackings.length == 0) {
      getAllAgentTrackings();
      setLoading(false)
    }
  }, [agentTrackings]);

  const emptyDataMessage = () => { return 'No Data to Display'; }

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

  const getagentList = async () => {
    const response = await getagentList();
    if (response.payload.title == "Success") {

      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
          arr.push(response.payload[key]);
      }
      setAgentList(arr);
    }
    else {
      setMessageStatus({
        mode: 'danger',
        message: 'Agent Fetch Failed.'
      })
    }
  };

  const getAllAgentTrackings = async () => {
    const response = await getAgentTrackings();
    if (response.payload.title == "Success") {
      setMessageStatus({
        mode: 'success',
        message: 'AgentTracking Record Fetch Successfully.'
      })
      const dataFormatter = (rawData) => {
        debugger;
        const curedData = {};
        curedData.agentTrackingId = rawData?.agentTrackingId;
        curedData.agentId = rawData?.agentId;
        curedData.dealerId = rawData?.dealerId;
        curedData.trackingDate = rawData?.trackingDate;
        curedData.description = rawData?.description;
        curedData.gmtId = rawData?.gmtId;
        curedData.recordStatusId = rawData?.recordStatus.recordStatusId;
        curedData.recordStatus = rawData?.recordStatus.actionName;
        return curedData;
      }
      var arr = [];
      for (var key in response.payload) {
        if (key !== 'title')
          arr.push(dataFormatter(response.payload[key]));
      }
      setAgentTrackings(arr);
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

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    clickToExpand: true,
  };

  const expandRow = {
    showExpandColumn: true,
    renderer: row => (
      <div>
        <p>{`This Expand row is belong to rowKey ${row.id}`}</p>
        <p>You can render anything here, also you can add additional data on every row object</p>
        <p>expandRow.renderer callback will pass the origin row object to you</p>
      </div>
    )
  };


  return (
    <>
      <div className="m-t-40">
        {loading && <div>A moment please...</div>}
        {agentTrackings && (<div>
          <ToolkitProvider
            bootstrap4
            keyField='agentTrackingsId'
            data={agentTrackings}
            columns={columns}
            search
          >
            {
              props => (
                <div>
                  <div className="row m-t-5">
                    <div className="col-lg-6 text-gred">
                    </div>
                  
                    <div className="col-lg-6">
                      <div className="row">
                        <div className="app-right col-lg-12">
                          <div className="app-float-right p-3">
                             </div>
                          <div className="app-float-right p-3">
                            <Button variant="primary" onClick={handleShow}>
                            Get Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                    {/* <Form.Group className="mb-3" controlId="stateId">
                <Form.Label>Agent<span className="required">*</span></Form.Label>
                <Dropdown
                  name="agentTrackingId"
                  placeholder='Select Agent'
                  fluid
                  search
                  selection
                  options={agentOptions}
                  value={newAgentTracking?.agentId}
                  onChange={dropdownHandler}
                />
              </Form.Group> */}
                    </div>
                  </div>
                  <BootstrapTable
                    defaultSorted={defaultSorted}
                    pagination={pagination}
                    {...props.baseProps}
                    noDataIndication={emptyDataMessage}
                    wrapperClasses="table-responsive"
                    selectRow={selectRow}
                  />
                </div>
              )
            }
          </ToolkitProvider>
          {/* <BootstrapTable bootstrap4  keyField='id' data={products} columns={columns} defaultSorted={defaultSorted} pagination={pagination} /> */}

        </div>)}
      </div>
    </>
  );
};