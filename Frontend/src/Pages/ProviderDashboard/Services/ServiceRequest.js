import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { DashboardProvider } from "../Dashboard";
import NavbarUserDashboardProvider from "../NavbarProvider";
import styles from "../../../Styles/ProviderDashboardStyle/Services/ServiceRequest.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faCalendarDays,
  faClock,
  faGear,
  faCheck,
  faTimes,
  faCircleExclamation,
  faTriangleExclamation,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import UpcomingServiceNavbar from "./UpcomingServiceNavbar";
import { toast } from "react-toastify";
import Toast from "../../../Components/Toast";
import { useNavigate } from "react-router-dom";

export const ServiceRequest = () => {
  const [serviceRequestsData, setServiceRequestsData] = useState([]);
  const [statusAndService, setStatusAndService] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [serviceLocation, setServiceLocation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProviderStatusAndService();
    getServiceRequests();
    getProviderServiceLocation();
  }, []);

  // Fetch provider status and available services
  const getProviderStatusAndService = async () => {
    let token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/status-service`,
        { headers }
      );

      // console.log("Status API:", response.data.statusAndServiceData);

      setStatusAndService(response.data.statusAndServiceData);
    } catch (error) {
      console.error("Error fetching provider status:", error);
    }
  };

  const getServiceRequests = async () => {
    let token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/request`,
        { headers }
      );

      // console.log("Service Requests API:", response.data.requestData);

      setServiceRequestsData(response.data.requestData);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  useEffect(() => {
    const isProviderActive = statusAndService.some(
      (service) =>
        service.status === "active" && service.provider_status === "Approved"
    );

    if (!isProviderActive) {
      setFilteredRequests([]);
      return;
    }

    // if (statusAndService.length === 0) {
    //   setFilteredRequests([]);
    //   return;
    // }

    const filtered = serviceRequestsData.filter((request) =>
      statusAndService.some(
        (service) => service.service_type_id === request.service_type_id
      )
    );

    setFilteredRequests(filtered);
  }, [serviceRequestsData, statusAndService]);

  // console.log("filtered", filteredRequests);

  const handleSubmitAccept = async (booking_id) => {
    let token = Cookies.get("providerToken");

    const headers = {
      authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/provider/accept-service`,
        { booking_id },
        { headers }
      );

      toast.success(response.data.message || "Service Accepted Successfully!");
      setTimeout(() => {
        navigate("/provider/accepet-request");
      }, 1000);
    } catch (error) {
      console.error("Failed accept service", error);
      toast.error(error.response.data.error || "Failed accept service!");
    }
  };

  const handleRejectService = async (booking_id) => {
    let token = Cookies.get("providerToken");

    const headers = {
      authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/provider/reject-service`,
        { booking_id },
        { headers }
      );
      // console.log(response);

      toast.success(response.data.message || "Service Rejected Successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Failed to reject service", error);
      toast.error("Failed to reject service!");
    }
  };

  const getProviderServiceLocation = async () => {
    let token = Cookies.get("providerToken");

    const headers = {
      authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/service-location`,
        { headers }
      );

      setServiceLocation(response.data.providerServiceLocation[0].latitude);
      // console.log(response.data.providerServiceLocation.latitude);
    } catch (error) {
      console.error("Failed to reject service", error);
      toast.error("Failed to reject service!");
    }
  };

  // console.log(serviceLocation);

  return (
    <>
      <Toast />
      <div className={styles.fullComponent}>
        <NavbarUserDashboardProvider />

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
              style={{ border: "1px solid #e2e2e2", padding: "20px" }}
            >
              <UpcomingServiceNavbar />

              {serviceLocation === null ? (
                <div className={styles.locationMessage}>
                  <p>
                    <FontAwesomeIcon icon={faTriangleExclamation} /> Please
                    select the service location first and then accept the
                    service.
                  </p>
                  <button
                    className={styles.selectLocationBtn}
                    onClick={() => navigate("/provider/location")}
                  >
                    Select Service Location
                  </button>
                </div>
              ) : (
                <div className={styles.locationMessage}>
                  <p>
                    <FontAwesomeIcon icon={faTriangleExclamation} /> Before
                    accepting a service, please check the service location
                    carefully.
                  </p>
                </div>
              )}

              <hr />

              {/* Debugging Message */}

              {/* Show offline message if provider is inactive */}
              {/* <p>Provider Status: {request.status}</p> */}

              <div className={styles.container}>
                <div className={styles.requestsList}>
                  {filteredRequests.length > 0 ? (
                    filteredRequests.reverse().map((request) => (
                      <div key={request.id} className={styles.card}>
                        {request.booking_id}
                        <div className={styles.cardHeader}>
                          <h3 className={styles.name}>
                            {request.user_first_name} {request.user_last_name}
                          </h3>
                          <div className={styles.cardHeaderRightSide}>
                            <p className={styles.price}>
                              ₹ {request.fixed_price}
                            </p>
                            <p
                              className={`${styles.status} ${
                                request.schedule_at === null
                                  ? styles.instant
                                  : styles.scheduled
                              }`}
                            >
                              {request.schedule_at === null
                                ? "Instant"
                                : "Scheduled"}
                            </p>
                          </div>
                        </div>

                        <div className={styles.details}>
                          <div className={styles.serviceTime}>
                            <p className={styles.service}>
                              <FontAwesomeIcon icon={faGear} />{" "}
                              {request.service_type_name}
                            </p>
                            <p className={styles.time}>
                              <FontAwesomeIcon icon={faClock} />{" "}
                              {new Date(request.created_at).toLocaleTimeString(
                                "en-US",
                                {
                                  timeZone: "UTC",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </p>
                          </div>

                          <div className={styles.dateLocation}>
                            <p className={styles.date}>
                              <FontAwesomeIcon icon={faCalendarDays} />{" "}
                              {new Date(request.created_at).toLocaleString(
                                "en-US",
                                {
                                  timeZone: "UTC",
                                  month: "long",
                                  day: "2-digit",
                                  year: "numeric",
                                }
                              )}
                            </p>
                            <p className={styles.location}>
                              <FontAwesomeIcon icon={faMapPin} />{" "}
                              {request.d_address}
                            </p>
                          </div>
                        </div>

                        <div className={styles.buttons}>
                          <button
                            className={styles.acceptBtn}
                            onClick={() => {
                              handleSubmitAccept(request.booking_id);
                            }}
                            disabled={serviceLocation === null}
                            style={{
                              cursor:
                                serviceLocation === null
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                          >
                            <FontAwesomeIcon icon={faCheck} /> Accept Service
                          </button>
                          <button
                            className={styles.rejectBtn}
                            onClick={() =>
                              handleRejectService(request.booking_id)
                            }
                          >
                            <FontAwesomeIcon icon={faTimes} /> Reject Service
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={styles.noRequests}>
                      {serviceRequestsData.length === 0 ? (
                        <>
                          <FontAwesomeIcon icon={faCircleExclamation} /> No
                          service available
                        </>
                      ) : statusAndService.length === 0 ? (
                        <>
                          <FontAwesomeIcon icon={faTriangleExclamation} />{" "}
                          Service is not allocated, Please Contact Administrator
                        </>
                      ) : !statusAndService.some(
                          (service) => service.provider_status === "Approved"
                        ) ? (
                        <>
                          <FontAwesomeIcon icon={faTriangleExclamation} /> Your
                          are Banned.
                        </>
                      ) : !statusAndService.some(
                          (service) => service.status === "active"
                        ) ? (
                        <>
                          <FontAwesomeIcon icon={faTriangleExclamation} /> Your
                          are Offline.
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faMagnifyingGlass} /> No
                          matching service requests available
                        </>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
