import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
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
  }

  render() {
    return (
      <div>
        <div style={{ width: 300, height: 300 }}>
    <CustomMap google={this.props.google} locations={[{
            lat: "13.818693657174972",
            lng: "77.48491621843388"
          }]}/>
</div>
        {/* <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: "18.677490",
            lng: "74.116531"
          }}
        >
         <Marker
          onClick={this.onMarkerClick}
          name={'This is test name'}
        />
        </Map> */}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ''
  // apiKey: 'AIzaSyAf_G4R_GlpOOoGIDJ8WLvyAFjuq8F2jYc'
})(MapView);