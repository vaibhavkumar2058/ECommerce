import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';

export default function CustomMap({ google, locations = [] }) {
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
          zoom={locations.length === 1 ? 18 : 13}
          disableDefaultUI={true}
      >
          {locations.map(
              coords => <Marker position={coords} />
          )}

      </Map>
  )
};