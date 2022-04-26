import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./CurrentLocation";

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    markers: [
      {
        name: "Current position",
        position: {
          lat: 37.77,
          lng: -122.42,
        },
      },
    ],
  };

  onMarkerDragEnd = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState((prevState) => {
      const markers = [...this.state.markers];
      markers[index] = { ...markers[index], position: { lat, lng } };
      console.log(lat, "", lng);
    });
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <div className="map-container">
        <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
          {/* <Marker
            draggable={true}
            onClick={this.onMarkerClick}
            name={"last location"}
            onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
          /> */}
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              onClick={this.onMarkerClick}
              draggable={true}
              onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
              name={marker.name}
            />
          ))}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </CurrentLocation>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDSjtMkPYlXpyTFdAN06nzciyiqudNsdYs",
})(MapContainer);

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyAsg4DBhl8QDTg5ZyEn2Pi9RVVnhDZimzQ",
// })(DisplayMap);
