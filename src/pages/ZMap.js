import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class ZMap extends React.Component {
  state = {
    currentPosition: null,
  };

  componentDidMount() {
    debugger;
    // Get current location and update the state every 5 seconds
    navigator.geolocation.watchPosition((position) => {
      this.setState({
        currentPosition: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
      });
    });

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    function success(pos) {
      const crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.watchPosition(success, error, options);


    // this.interval = setInterval(() => {
    //   debugger;
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.setState({
    //       currentPosition: {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //       },
    //     });
    //   });
    // }, 10000);
  }

  componentWillUnmount() {
    // Clear the interval when the component unmounts
    clearInterval(this.interval);
  }

  render() {
    const { google } = this.props;
    return (
      <Map google={google} zoom={14} 
      center={this.state.currentPosition}
      >
        {this.state.currentPosition && (
          <Marker position={this.state.currentPosition} />
        )}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAf_G4R_GlpOOoGIDJ8WLvyAFjuq8F2jYc',
})(ZMap);
