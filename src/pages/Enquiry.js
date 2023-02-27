import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import CustomMap from '../pages/CustomMap';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class MapView extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
    this.locations = {
      lat: "13.8186936572",
      lng: "77.4849162184"
    };
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     this.locations.lat = position.coords.latitude;
  //     this.locations.lng = position.coords.longitude;
  // });
  }

  render() {
    return (
      <div>
        <div style={{ width: 300, height: 300 }}>
          <CustomMap google={this.props.google} locations={[{
            lat: this.locations.lat,
            lng: this.locations.lng
          },{
            lat: "13.8195340000",
            lng: "77.4872130000"
          }]} />
        </div>
        {/* <div style={{ width: 300, height: 300 }}>
          <CustomMap google={this.props.google} locations={[{
            // lat: "13.8083237000",
            // lng: "77.4972623000" 
            // lat: "12.9800000000",
            // lng: "77.5927000000"
            // lat: "13.8195340000",
            // lng: "77.4872130000"
            // lat: "13.8187076000",
            // lng: "77.4848860000",
            lat: "13.8186936572",
            lng: "77.4849162184"
          }]} />
        </div> */}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  //apiKey: ''
  apiKey: 'AIzaSyAf_G4R_GlpOOoGIDJ8WLvyAFjuq8F2jYc'
})(MapView);