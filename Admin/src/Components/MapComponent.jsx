import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useState } from "react";

const MapComponent = ({ location }) => {
  return (
    <MapContainer
      center={[location.lat, location.lon]}
      zoom={11}
      style={{ height: "400px", width: "100%" }}
      zoomControl={false}
      scrollWheelZoom={false}
    >
      <TileLayer
        url={process.env.REACT_APP_MAP_URL}
        attribution="&copy; 2025 Xuber Services."
      />

      <MapUpdater location={location} />
      {/* <Marker position={[location.lat, location.lon]}>
        <Popup>{location.city || "Selected Location"}</Popup>
      </Marker> */}
      <ScrollZoomHandler />
    </MapContainer>
  );
};

const MapUpdater = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([location.lat, location.lon], 3);
  }, [location, map]);

  return null;
};

const ScrollZoomHandler = () => {
  const map = useMap();
  const [ctrlPressed, setCtrlPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey) {
        setCtrlPressed(true);
        map.scrollWheelZoom.enable();
      }
    };

    const handleKeyUp = () => {
      setCtrlPressed(false);
      map.scrollWheelZoom.disable();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [map]);

  return null;
};

export default MapComponent;
