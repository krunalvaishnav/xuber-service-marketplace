import React from "react";
import Dashboard from "../Dashboard";
import { Footer } from "../../Components/Footer";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";
import axios from "axios";
import styles from "../../Styles/Details/Map.module.css";
import { useState, useEffect } from "react";
import ProviderLocationMap from "../../Components/ProviderLocationMap";
import loading from "../../Assets/gears.gif";

function Map() {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);

  const getApi = async () => {
    try {
      setLoading(true);
      
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/provider-location`,
        { timeout: 5000 } 
      );
  
      const locationsToGeocode = response.data.locationData
        .map((loc) => ({
          ...loc,
          latitude: parseFloat(loc.latitude),
          longitude: parseFloat(loc.longitude),
        }))
        .filter(
          (loc) =>
            !isNaN(loc.latitude) &&
            !isNaN(loc.longitude) &&
            Math.abs(loc.latitude) <= 90 &&
            Math.abs(loc.longitude) <= 180 &&
            !(loc.latitude === 0 && loc.longitude === 0)
        );

      const apiKey = process.env.REACT_APP_GEOCODE_API_KEY || "855fe44f69b54ce3acf7795e437e96ea";
  
      const geocodingPromises = locationsToGeocode.map(async (loc) => {
        try {
          const geocodeResponse = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json`,
            {
              params: {
                q: `${loc.latitude},${loc.longitude}`,
                key: apiKey,
                no_annotations: 1,
                limit: 1,
              },
              timeout: 3000 
            }
          );
  
          const result = geocodeResponse.data.results[0];
          return {
            lat: loc.latitude,
            lon: loc.longitude,
            providerName: `${loc.first_name || ""} ${loc.last_name || ""}`.trim() || "Unknown Provider",
            locationName: result?.formatted || "Unknown Location",
            status: loc.status,
            rawGeocode: result,
          };
        } catch (geoError) {
          console.error(
            `Geocoding failed for ${loc.latitude},${loc.longitude}:`,
            geoError
          );
          return {
            lat: loc.latitude,
            lon: loc.longitude,
            providerName: `${loc.first_name || ""} ${loc.last_name || ""}`.trim() || "Unknown Provider",
            locationName: "Location unavailable",
            status: loc.status,
            error: geoError.message,
          };
        }
      });
  
      const geocodedLocations = await Promise.all(geocodingPromises);
    
      setData(geocodedLocations);
      setLoading(false);
  
    } catch (error) {
      console.error("Failed to fetch provider locations:", error);
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to load locations"
      );
      setData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      <Toast />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Dashboard />
        </div>

        <div className={styles.mainContent}>
          <div className={styles.tableDiv}>
            <div className={styles.table}>
              <div className={styles.topStart}>
                <h5>Provider Location</h5>
                {isloading && (
                  <div className={styles.loadingContainer}>
                    <div className={styles.loadingDiv}>
                      <img
                        src={loading}
                        alt="Loading..."
                        className={styles.loadingImage}
                      />
                      <p>
                        Just a moment! We're fetching location details to show
                        you the map.
                      </p>
                    </div>
                  </div>
                )}
                {!isloading && <ProviderLocationMap locations={data} />}
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Map;
