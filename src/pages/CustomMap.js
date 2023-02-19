import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

export default function CustomMap({ google, locations = [] }) {
    var iconPin = {
        path: 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z',
        fillColor: 'red',
        fillOpacity: 0.8,
        scale: 0.015, //to reduce the size of icons
       };

    return (
        <Map
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
            
            center={locations[0]}
            initialCenter={locations[0]}
            zoom={locations.length === 1 ? 18 : 18}
            disableDefaultUI={true}
        >
            {locations.map(
                coords => <Marker position={coords} icon={iconPin} >
                    {/* <InfoWindow>
                            Shop Kiran Rent House
                    </InfoWindow> */}
                </Marker>
            )}

        </Map>
    )
};