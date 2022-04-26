import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./CurrentLocation";

const NewMap = (props) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [markers, setMarkers] = useState([
    {
      name: "Current position",
      position: {
        lat: 37.77,
        lng: -122.42,
      },
    },
  ]);

  const onMarkerDragEnd = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    const marker = [...markers];
    marker[index] = { ...marker[index], position: { lat, lng } };
    setMarkers([marker]);
    props.onTripLocation({ lat, lng });
  };

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const onClose = (props) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(true);
      setActiveMarker(null);
    }
  };

  return (
    <div className="map-container">
      <h1 className="grab-map">גרור את הסמן למיקום הטיול</h1>
      <button className="close-map" onClick={props.onCloseMap}>
        סגור
      </button>
      <CurrentLocation centerAroundCurrentLocation google={props.google}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            onClick={onMarkerClick}
            draggable={true}
            onDragend={(t, map, coord) => onMarkerDragEnd(coord, index)}
            name={marker.name}
          />
        ))}

        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={onClose}
        >
          <div>
            <h4>{selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDSjtMkPYlXpyTFdAN06nzciyiqudNsdYs",
})(NewMap);
