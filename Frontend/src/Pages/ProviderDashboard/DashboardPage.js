import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { DashboardProvider } from "./Dashboard";
import NavbarUserDashboardProvider from "./NavbarProvider";
import { Footer } from "../Footer";
import styles from "../../Styles/ProviderDashboardStyle/DashboardPage.module.css";
import axios from "axios";
import { USER_API } from "../Url";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";
import loading from "../../Assets/gears.gif";

export const DashboardPageProvider = () => {
  const [status, setStatus] = useState("offine");
  const [isLoading, setIsLoading] = useState(false);

  const getApi = async () => {
    let token = Cookies.get("providerToken");

    const headers = {
      authorization: `Bearer ${token}`,
    };
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/status`,
        {
          headers,
        }
      );
      setTimeout(() => {
        if (!response) {
          setIsLoading(true);
        }
      }, 2000);
      // console.log(response.data.ProviderStatusData);
      if (response.data.ProviderStatusData === null) {
        const data = "offline";
        setStatus(data);
        setIsLoading(false);
      } else {
        const data = response.data.ProviderStatusData.status;
        setStatus(data);
        setIsLoading(false);
      }
      // if (response.data.ProviderStatusData.status) {
      //   console.log(response.data.ProviderStatusData.status);
      // }
      // const data = response.data.ProviderStatusData || "offline";
      // setStatus(data);
      // if (response.data.ProviderStatusData) {
      //   console.log("Ajhdkjhkds");
      // } else {
      //   console.log(response.data.ProviderStatusData.status);
      // }
    } catch (error) {
      console.error("Failed to get provider status", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const handleToggleStatus = async () => {
    const newStatus = status === "active" ? "offline" : "active";
    let token = Cookies.get("providerToken");

    const headers = {
      authorization: `Bearer ${token}`,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/provider/status`,
        { status: newStatus },
        { headers }
      );
      toast.success(
        newStatus === "active"
          ? "You are online. Get ready to accept requests!"
          : "You are offline. Now you will not receive any new requests."
      );
      setStatus(newStatus);
    } catch (error) {
      console.error("Failed to update your status", error);
    }
  };

  return (
    <>
      <Toast />
      <div className={styles.fullComponent}>
        <NavbarUserDashboardProvider />

        <div className={styles.nav}>
          <Row
            // style={{
            //   padding: "90px 0px",
            //   gap: "20px",
            //   alignItems: "top",
            //   width: "100%",
            //   height:"100px",
            //   margin: "auto",
            // }}
            // className="justify-content-md-center"
            className={styles.mainDiv}
          >
            {/* <NavbarComp /> */}
            <Col md="3" lg="3" xl="3" xxl="2" className={styles.dashboard}>
              <DashboardProvider />
            </Col>

            <Col
              md="8"
              lg="8"
              xl="7"
              xxl="7"
              style={{ border: "1px solid #e2e2e2", padding: "20px" }}
              className={styles.mainDivContainer}
            >
              {isLoading && (
                <div className={styles.loadingContainer}>
                  <div className={styles.loadingDiv}>
                    <img
                      src={loading}
                      alt="Loading..."
                      className={styles.loadingImage}
                    />
                  </div>
                </div>
              )}
              <div className={styles.header}>SERVICE NOW</div>
              <div className={styles.container}>
                <div className={styles.contentBox}>
                  <img
                    src="https://urban.hexagoninfosoft.in/asset/img/offline.gif"
                    alt="Offline status"
                    className={styles.image}
                  />
                </div>
                <h1
                  className={
                    status === "active"
                      ? styles.onlineHeader
                      : styles.offlineHeader
                  }
                >
                  {status === "active" ? "You're Online" : "You're Offline"}
                </h1>
               
                <p className={styles.offlineMessage}>
                  {status === "active"
                    ? " You are now visible to customers and can receive service requests in your area."
                    : "Go online to start receiving service requests from customers."}
                </p>
                <button
                  className={
                    status === "active" ? styles.offline : styles.online
                  }
                  onClick={handleToggleStatus}
                >
                  {status === "active" ? "GO OFFLINE" : "GO ONLINE"}
                </button>
              </div>
            </Col>
          </Row>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
