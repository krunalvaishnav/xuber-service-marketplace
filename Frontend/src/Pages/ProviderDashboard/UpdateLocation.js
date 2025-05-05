import React, { useEffect, useState } from "react";
import { Footer } from "../Footer";
import { NavLink } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import NavbarUserDashboardProvider from "./NavbarProvider";
import { DashboardProvider } from "./Dashboard";
import styles from "../../Styles/ProviderDashboardStyle/UpdateLocation.module.css";
import ProfileNavbar from "./ProfileNavbar";
import LocationSearch from "../../Components/LocationSearch";
import MapComponent from "../../Components/MapComponent";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";
import axios from "axios";
import Cookies from "js-cookie";

export const UpdateLocation = () => {
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    city: "",
  });
  const [isLocationAvailable, setIsLocationAvailable] = useState(false);

  const getLocationData = async () => {
    let token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/update-location`,
        { headers }
      );

      console.log("Location Data API Response:", response.data);

      if (response.data.locationData.length > 0) {
        const providerLocation = response.data.locationData[0];

        if (
          providerLocation.latitude != null &&
          providerLocation.longitude != null
        ) {
          setLocation({
            lat: providerLocation.latitude,
            lon: providerLocation.longitude,
            city: providerLocation.city || "",
          });

          setIsLocationAvailable(true);
        } else {
          console.warn("Latitude or Longitude is missing.");
          setIsLocationAvailable(false);
        }
      } else {
        setIsLocationAvailable(false);
      }
    } catch (error) {
      console.error("Error fetching provider status:", error);
      setIsLocationAvailable(false);
    }
  };

  useEffect(() => {
    getLocationData();
  }, []);

  const handleUpdateLocation = async () => {
    if (!location.city) {
      toast.error("Please select a location first!");
      return;
    }

    let token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    const locationData = {
      latitude: location.lat,
      longitude: location.lon,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/provider/update-location`,
        locationData,
        { headers }
      );
      console.log(response);

      toast.success(response.data.message || "Update Successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error fetching update location", error);
    }
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    setIsLocationAvailable(true);
  };

  return (
    <>
      <Toast />
      <div className={styles.fullComponent}>
        <div>
          <NavbarUserDashboardProvider />
        </div>

        <div className={styles.nav}>
          <Row className={styles.mainDiv}>
            <Col md="3" lg="3" xl="3" xxl="2" className={styles.dashboard}>
              <DashboardProvider />
            </Col>

            <Col
              md="8"
              lg="8"
              xl="8"
              xxl="7"
              style={{
                border: "1px solid #e2e2e2",
                padding: "20px 20px 0px 20px",
              }}
            >
              <ProfileNavbar />
              <hr />
              <div className={styles.locationSerch}>
                <label htmlFor="location">
                  Update Your Location: <br />
                  <span
                    style={{
                      color: "red",
                      fontSize: "13px",
                      paddingBottom: "2px",
                    }}
                  >
                    (<strong>Note: </strong>Please select a location from the
                    suggestions. Your Current Service Location are Mark In the
                    Map)
                  </span>
                </label>
                <LocationSearch setLocation={handleLocationChange} />
              </div>
              {isLocationAvailable ? (
                <div className={styles.mapSection}>
                  <MapComponent location={location} />
                </div>
              ) : (
                <span
                  style={{
                    // color: "red",
                    fontSize: "13px",
                    padding: "10px 30px 10px 30px",
                    border:"1px solid red",
                    borderRadius:"5px"
                  }}
                >
                  No location selected. Please choose a location from the suggestions to view the map.           
                </span>
              )}

              <input
                type="submit"
                className={styles.buttonEdit}
                value="Update Location"
                onClick={handleUpdateLocation}
                disabled={!location.city}
                style={{
                  cursor: location.city ? "pointer" : "not-allowed",
                  backgroundColor: location.city ? "#37b38b" : "#ccc",
                  color: location.city ? "#ffffff" : "#535353",
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
