import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const ProviderLocationMap = ({ locations }) => {
  const safeLocations = locations || [];

  const indiaBounds = [
    [6.755, 68.111],
    [35.674, 97.395],
  ];
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && safeLocations.length === 0) {
      mapRef.current.fitBounds(indiaBounds);
    }
  }, []);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setView([location.lat, location.lon], currentZoom, {
        animate: true,
        duration: 0.5,
      });
    }
  };

  const getOffsetPosition = (lat, lon, index) => {
    const offset = index * 0.0009;
    return [lat + offset, lon + offset];
  };

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;

        // if (safeLocations.length === 0) {
        //   mapInstance.fitBounds(indiaBounds);
        // }
      }}
      style={{ height: "600px", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        url={process.env.REACT_APP_MAP_URL}
        attribution="&copy; 2025 Xuber Services."
      />

      {safeLocations.map((loc, index) => (
        <Marker
          key={index}
          position={getOffsetPosition(loc.lat, loc.lon, index)}
          eventHandlers={{
            click: () => handleMarkerClick(loc),
          }}
        >
          <Popup>
            <strong>{loc.providerName || `Location ${index + 1}`}</strong>
            <br />
            <p style={{ color: "gray" }}>
              {loc.locationName || "Unknown Location"}
            </p>
            <p
              style={{
                color: loc.status === "active" ? "green" : "red",
                backgroundColor:
                  loc.status === "active" ? "#e8f5e9" : "#ffebee",
                border: `1px solid ${
                  loc.status === "active" ? "#4caf50" : "#f44336"
                }`,
                borderRadius: "4px",
                padding: "4px 8px",
                display: "inline-block",
                fontWeight: "500",
                fontSize: "0.875rem",
                margin:"0px"
              }}
            >
              {loc.status || "Unknown Status"}
            </p>
          </Popup>
        </Marker>
      ))}
      <ScrollZoomHandler />
    </MapContainer>
  );
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

export default ProviderLocationMap;
