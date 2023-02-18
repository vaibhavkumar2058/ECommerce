import React, { Component } from 'react';
import { Map, GoogleApiWrapper,MapContainer } from 'google-maps-react';

export class GMTView extends Component {
    
    render() {
        return (
            <Map
              google={this.props.google}
              zoom={8}
              style={mapStyles}
              initialCenter={{ lat: 47.444, lng: -122.176}}
            />
        );
      }
}
const mapStyles = {
    width: '80%',
    height: '60%',
  };

  export default GMTView({
    apiKey: 'AIzaSyAf_G4R_GlpOOoGIDJ8WLvyAFjuq8F2jYc'
  })(MapContainer);
