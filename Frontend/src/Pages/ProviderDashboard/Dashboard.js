import React, { useEffect, useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import styles from "../../Styles/ProviderDashboardStyle/DashboardProvider.module.css";
import { USER_API, IMAGE_URL } from "../Url";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const DashboardProvider = () => {
  const [provider, setprovider] = useState([]);
  const [providerError, setproviderError] = useState(null);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const getApiprovider = async () => {
    let token = Cookies.get("providerToken");
    // console.log(token)
    const headers = {
      authorization: `Bearer ${token}`,
    };

    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/provider/profile`, { headers })
      .then((response) => {
        // console.log(response.data.providerData);
        setprovider(response.data.providerData);
        // console.log(response.data.providerData.rating)
        setRating(response.data.providerData.rating);
      })
      .catch((error) => {
        console.log(error);
        setproviderError(error);
      });
  };
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  //wallet API

  useEffect(() => {
    getApiprovider();
  }, []);

  const handleLogout = () => {
    Cookies.remove("providerToken");
  };

  return (
    <div>
      <div
        // style={{
        //   maxHeight: "600px",
        //   border: "1px solid #e2e2e2",
        //   display: "flex",
        //   flexDirection: "column",
        //   alignItems: "center",
        //   justifyContent: "center",
        // }}
        className={styles.dashboard_container}
      >
        <div className={styles.avater}>
          <img
            src={
              provider.avatar
                ? `${process.env.REACT_APP_IMAGE_URL}/${provider.avatar}`
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbEnZMy6gxOu8jsQLx__K94qH2FhKQgvc4fg&s"
            }
            alt="provider_logo"
            // style={{
            //   width: "200px",
            //   height: "200px",
            //   borderRadius: "10%",
            //   marginTop: "10px",
            // }}
          />
        </div>
        <br />
        <div className={styles.nameRatingStatus}>
          <div>
            <p>
              {" "}
              {`${capitalizeFirstLetter(
                provider.first_name
              )} ${capitalizeFirstLetter(provider.last_name)}`}
            </p>
          </div>

          <div className="rating flex">
            {[1, 2, 3, 4, 5].map((index) => {
              let fillPercentage = 0;
              if (rating >= index) {
                fillPercentage = 100;
              } else if (rating > index - 1) {
                fillPercentage = (rating - (index - 1)) * 100;
              }

              return (
                <OverlayTrigger
                  key={index}
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-rating`}>
                      Rating: {Number(rating).toFixed(1)}
                    </Tooltip>
                  }
                >
                  <div
                    key={index}
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{
                        color: "#CCC",
                        cursor: "pointer",
                      }}
                    />
                    {fillPercentage > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: `${fillPercentage}%`,
                          overflow: "hidden",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faStar}
                          style={{
                            color: "#fabd12",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </OverlayTrigger>
              );
            })}
          </div>

          <div className={styles.statusDiv}>
            <p
              className={
                provider.status === "Approved" ? styles.approved : styles.banned
              }
            >{`${provider.status} `}</p>{" "}
            <br />
          </div>
        </div>
      </div>
      {/* -------------------------------------------------------------------------- */}
      <div
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   borderLeft: "1px solid #e2e2e2",
        //   borderRight: "1px solid #e2e2e2",
        //   color: "black",
        // }}
        className={styles.dashboard_navigation}
      >
        <NavLink
          to="/provider/dashboard"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#37b38b" : "",
            textDecoration: isActive ? "none" : "none",
            color: isActive ? "white" : "black",
            fontSize: isActive ? "19px" : "16px",
          })}
        >
          <div className={styles.div_border}>Dashboard</div>
        </NavLink>
        {/* <Link to="/user/dashboard">Dashboard</Link>  */}
        <NavLink
          to="/provider/earning"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#37b38b" : "",
            textDecoration: isActive ? "none" : "none",
            color: isActive ? "white" : "black",
            fontSize: isActive ? "18px" : "16px",
          })}
        >
          <div className={styles.div_border}>Your Earnings</div>
        </NavLink>
        <NavLink
          to="/provider/request"
          style={() => {
            const isActive =
              location.pathname.startsWith("/provider/request") ||
              location.pathname.startsWith("/provider/accepet-request") ||
              location.pathname.startsWith("/provider/complated-request") ||
              location.pathname.startsWith("/provider/cancelled-request");
            return {
              backgroundColor: isActive ? "#37b38b" : "",
              textDecoration: "none",
              color: isActive ? "white" : "black",
              fontSize: isActive ? "18px" : "16px",
            };
          }}
        >
          {" "}
          <div className={styles.div_border}>Service Request</div>
        </NavLink>
        <NavLink
          to="/provider/profile"
          style={() => {
            const isActive =
              location.pathname.startsWith("/provider/profile") ||
              location.pathname.startsWith("/provider/document") ||
              location.pathname.startsWith("/provider/location");
            return {
              backgroundColor: isActive ? "#37b38b" : "",
              textDecoration: "none",
              color: isActive ? "white" : "black",
              fontSize: isActive ? "18px" : "16px",
            };
          }}
        >
          <div className={styles.div_border}>Profile</div>
        </NavLink>

        <NavLink
          to="/"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#37b38b" : "",
            textDecoration: isActive ? "none" : "none",
            color: isActive ? "white" : "black",
            fontSize: isActive ? "18px" : "16px",
          })}
        >
          <div className={styles.div_border} onClick={handleLogout}>
            Logout
          </div>
        </NavLink>
      </div>
    </div>
  );
};
