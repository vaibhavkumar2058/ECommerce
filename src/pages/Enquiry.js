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
            // lat: "13.8083237000",
            // lng: "77.4972623000" 
            // lat: "12.9800000000",
            // lng: "77.5927000000"
            lat: "13.8195340000",
            lng: "77.4872130000"
          }]}/>
</div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  //apiKey: ''
  apiKey: 'AIzaSyAf_G4R_GlpOOoGIDJ8WLvyAFjuq8F2jYc'
})(MapView);