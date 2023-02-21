import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetchGMT from "../hooks/useFetchGMT";

export default function Dashboard() {

    const [newGMT, setNewGMT] = useState({
        resourcesId: 6,
        longitude: 0,
        latitude: 0,
        description: "logged coordinates",
        recordStatusId: 1,
    });

    const { 
        addGMT,
      } = useFetchGMT();

    const [messageStatus, setMessageStatus] = useState({
        mode: "",
        title: "",
        status: false,
        message: "",
    });

    setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            newGMT.latitude = position.coords.latitude;
            newGMT.longitude = position.coords.longitude;
            saveHandler();
        });
    }, 100000);

    const saveHandler = async () => {
        debugger;
        const response = await addGMT(newGMT);
        if (response.payload.title == "Success") {
            setMessageStatus({
                mode: 'success',
                message: 'GMT Record Saved Succefully.'
            })
            console.log(response.payload);
        }
        else {
            setMessageStatus({
                mode: 'danger',
                message: 'GMT Save Failed.'
            })
        }
    }

    return (
        <>
            <div className="m-t-40">
                Dashboard
            </div>
        </>
    );
};
