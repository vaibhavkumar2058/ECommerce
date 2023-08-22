import React, { useState, useEffect } from "react";
import { Map, Marker, InfoWindow } from 'google-maps-react';
import useFetchGMTs from "../hooks/useFetchGMT";

export default function CustomMap({ google, locations = [] }) {
    var iconPin = {
        path: 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z',
        fillColor: 'red',
        fillOpacity: 0.8,
        scale: 0.015, //to reduce the size of icons
    };

    const [locationList, setLocationList] = useState([]);

    const {
        getRecordByResourcesId
    } = useFetchGMTs();

    useEffect(() => {
        if (locationList.length == 0) {
            getLocationList();
        }
    }, [locationList]);

    const getLocationList = async () => {
        const response = await getRecordByResourcesId(4155);
        if (response.payload.title == "Success") {
            const dataFormatter = (rawData) => {

                const curedData = {};
                curedData.lat = rawData?.latitude;
                curedData.lng = rawData?.longitude;
                return curedData;
            }
            
            var arr = [];
            for (var key in response.payload) {
                if (key !== 'title')
                    arr.push(dataFormatter(response.payload[key]));
            }
            setLocationList(arr);
        }
        else {
        }
    };

    return (
        <>
            {locationList.length > 0 && (<Map
                google={google}
                containerStyle={{
                    position: "absolute",
                    width: "100%",
                    height: "100%"
                }}
                style={{
                    width: "100%",
                    height: "100%"
                }}

                center={locationList[0]}
                initialCenter={locationList[0]}
                zoom={locationList.length === 1 ? 15 : 15}
                disableDefaultUI={true}
            >
                {locationList.map(
                    coords => <Marker position={coords} >
                        <InfoWindow>
                            Shop Kiran Rent House
                        </InfoWindow>
                    </Marker>
                )}
            </Map>)}
        </>
    )
};