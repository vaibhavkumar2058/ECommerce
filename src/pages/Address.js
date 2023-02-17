import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';

export default function CustomMap({ google, locations = [] }) {
  return (
      <Map
          google={google}
          containerStyle={{
              position: "absolute",
              width: "300px",
              height: "300px"
          }}
          style={{
              width: "300",
              height: "300"
          }}
          center={locations[0]}
          initialCenter={locations[0]}
          zoom={locations.length === 1 ? 14 : 14}
          disableDefaultUI={true}
      >
          {locations.map(
              coords => <Marker position={coords} />
          )}

      </Map>
  )
}
GoogleApiWrapper({
  apiKey: 'AIzaSyAf_G4R_GlpOOoGIDJ8WLvyAFjuq8F2jYc'
})(CustomMap);
