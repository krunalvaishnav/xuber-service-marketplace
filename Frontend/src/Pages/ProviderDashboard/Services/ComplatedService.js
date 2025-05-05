import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { DashboardProvider } from "../Dashboard";
import NavbarUserDashboardProvider from "../NavbarProvider";
import { Footer } from "../../Footer";
import styles from "../../../Styles/ProviderDashboardStyle/Services/ComplatedService.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faCalendar,
  faCalendarCheck,
  faCheckCircle,
  faInfoCircle,
  faMapMarkerAlt,
  faStar,
  faRoute,
  faClock,
  faCalendarDays,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";
import $ from "jquery";
import "datatables.net";
import "datatables.net-responsive";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import "datatables.net-buttons/js/dataTables.buttons.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

import UpcomingServiceNavbar from "./UpcomingServiceNavbar";

export const ComplatedService = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const getProviderComplatedService = async () => {
    let token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/complated-request`,
        { headers }
      );

      let requestData = response.data.ComplatedRequestData;

      const updatedData = requestData.map((request) => {
        if (request.started_at && request.finished_at) {
          const startedAt = new Date(request.started_at);
          const finishedAt = new Date(request.finished_at);
          const diffInMs = finishedAt - startedAt;

          const hours = Math.floor(diffInMs / 3600000);
          const minutes = Math.floor((diffInMs % 3600000) / 60000);
          const seconds = Math.floor((diffInMs % 60000) / 1000);

          const formattedTime = `${String(hours).padStart(2, "0")}:${String(
            minutes
          ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

          return {
            ...request,
            duration: formattedTime,
          };
        }
        return request;
      });

      setData(updatedData);
    } catch (error) {
      console.error("Error fetching provider status:", error);
    }
  };

  useEffect(() => {
    getProviderComplatedService();
  }, []);

  const initializeDataTable = () => {
    if (!$.fn.DataTable.isDataTable("#userTable")) {
      $("#userTable").DataTable({
        layout: {
          topStart: null,
          topEnd: null,
          bottomStart: "info",
          bottomEnd: "paging",
        },
        responsive: false,
        buttons: ["copy", "csv", "excel", "pdf", "print"],
      });
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      initializeDataTable();
    }
  }, [data]);

  const handleDetails = (service) => {
    setSelectedRequest(service);
    setShowModal(true);
  };
  return (
    <>
      <div className={styles.fullComponent}>
        <div>
          <NavbarUserDashboardProvider />
        </div>

        <div className={styles.nav}>
          <Row
            // style={{
            //   padding: "150px 0px",
            //   gap: "20px",
            //   alignItems: "top",
            //   width: "100%",
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
              xl="8"
              xxl="7"
              style={{
                // border: "1px solid #e2e2e2",
                // paddingTop: "30px",
                // paddingLeft: "30px",
                border: "1px solid #e2e2e2",
                padding: "20px",
              }}
            >
              <UpcomingServiceNavbar />
              <hr />

              <div className={styles.container}>
                <div className={styles.table}>
                  <table
                    className="table table-bordered"
                    id="userTable"
                    // class="display"
                  >
                    <thead>
                      <tr>
                        <th className="text-left">Sr. No.</th>
                        <th className="text-left">Booking ID</th>
                        <th className="text-left">Customer Name</th>
                        <th className="text-left">Service</th>
                        <th className="text-left">Date & Time</th>
                        <th className="text-left">Payment </th>
                        <th className="text-left">Earning </th>
                        <th className="text-left">Rating </th>
                        <th className="text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        [...data].reverse().map((service, index) => (
                          <tr key={index}>
                            <td className="text-left">{index + 1}</td>
                            <td>{service.booking_id}</td>
                            <td>
                              {service.user_first_name} {service.user_last_name}
                            </td>
                            <td className="text-left">
                              {service.service_type_name}
                            </td>
                            <td className="text-left">
                              <div className={styles.dateTime}>
                                <div className={styles.date}>
                                  {new Date(service.created_at).toLocaleString(
                                    "en-US",
                                    {
                                      timeZone: "UTC",
                                      month: "long",
                                      day: "2-digit",
                                      year: "numeric",
                                    }
                                  )}
                                </div>

                                <div className={styles.time}>
                                  {" "}
                                  {new Date(
                                    service.created_at
                                  ).toLocaleTimeString("en-US", {
                                    timeZone: "UTC",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                </div>
                              </div>
                            </td>

                            <td className="text-left">
                              {service.payment_mode}
                            </td>
                            <td className="text-left">
                              {service.provider_earnings ? (
                                <span
                                  style={{ fontWeight: "bold", color: "green" }}
                                >
                                  ₹ {service.provider_earnings}
                                </span>
                              ) : (
                                <span style={{ color: "#8c8c8c" }}>N/A</span>
                              )}
                            </td>
                            <td className="text-left">
                              {service.user_rating ? (
                                <>
                                  {service.user_rating}
                                  <FontAwesomeIcon
                                    icon={faStar}
                                    style={{ color: "#fabd12" }}
                                  />
                                </>
                              ) : (
                                <span style={{ color: "#8c8c8c" }}>N/A</span>
                              )}
                            </td>

                            <td>
                              <div className={styles.actionButton}>
                                <button
                                  className={styles.detailsButton}
                                  onClick={() => handleDetails(service)}
                                >
                                  <FontAwesomeIcon icon={faInfoCircle} />
                                  View Details
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center">
                            You have not completed any service yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* request details show modal  */}
      {selectedRequest && (
        <Modal
          backdrop="static"
          show={showModal}
          className={styles.detailModal}
          centered
        >
          <Modal.Header className={styles.detailsmodalHeader}>
            <Modal.Title className={styles.detailsmodalTitle}>
              Service Details <br />{" "}
              <div className={styles.bookingID}>
                <span>Booking ID:</span> {selectedRequest.booking_id}
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <div className={styles.modalContent}>
              {/* User Details */}
              <div className={styles.userInfo}>
                <h4>
                  {selectedRequest.user_first_name}{" "}
                  {selectedRequest.user_last_name}
                </h4>
                <p>
                  <FontAwesomeIcon icon={faStar} style={{ color: "#fabd12" }} />{" "}
                  {selectedRequest.user_rating ?? "Not Rated"}
                </p>
              </div>
              <div className={styles.border}></div>

              {/* Service Information */}
              <div className={styles.serviceDetails}>
                <h5>Service Details</h5>
                <div className={styles.serviceInfo}>
                  <div className={styles.serviceTime}>
                    <p className={styles.service}>
                      <FontAwesomeIcon icon={faGear} />{" "}
                      <div>
                        <p>Service</p>
                        {selectedRequest.service_type_name}
                      </div>
                    </p>
                    <p className={styles.time}>
                      <FontAwesomeIcon icon={faClock} />{" "}
                      <div>
                        <p>Time</p>
                        {new Date(
                          selectedRequest.created_at
                        ).toLocaleTimeString("en-US", {
                          timeZone: "UTC",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </div>
                    </p>
                  </div>

                  <div className={styles.datePhone}>
                    <p className={styles.date}>
                      <FontAwesomeIcon icon={faCalendarDays} />{" "}
                      <div>
                        <p> Date</p>
                        {new Date(selectedRequest.created_at).toLocaleString(
                          "en-US",
                          {
                            timeZone: "UTC",
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </div>
                    </p>
                    <p className={styles.phone}>
                      <FontAwesomeIcon icon={faClock} />{" "}
                      <div>
                        <p>Duration</p>
                        {selectedRequest.duration}
                      </div>
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Timeline */}
              <div className={styles.serviceTime}>
                <div className={styles.timeline}>
                  <h5>Service Timeline</h5>
                  <p>
                    <FontAwesomeIcon icon={faCalendar} />{" "}
                    <strong>Started At:</strong>{" "}
                    {selectedRequest.started_at
                      ? new Date(selectedRequest.started_at).toLocaleString(
                          "en-US",
                          {
                            timeZone: "UTC",
                          }
                        )
                      : "Not Started"}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faCalendarCheck} />{" "}
                    <strong>Completed At:</strong>{" "}
                    {selectedRequest.finished_at
                      ? new Date(selectedRequest.finished_at).toLocaleString(
                          "en-US",
                          {
                            timeZone: "UTC",
                          }
                        )
                      : "Not Completed"}
                  </p>
                </div>
              </div>

              {/* Service Map  */}
              <div className={styles.mapContainer}>
                <h5>Location</h5>
                <p>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                  <strong>Servide Address:</strong> {selectedRequest.d_address}
                </p>
                <p>
                  <FontAwesomeIcon icon={faRoute} />{" "}
                  <strong>Total Distance:</strong> {selectedRequest.distance}
                </p>
              </div>

              {/* Payment Details */}
              <div className={styles.firstPricePart}>
                <h5>Payment Information</h5>

                <div className={styles.row}>
                  <span>Payment Method:</span>
                  <span>
                    {selectedRequest.payment_mode === "CASH"
                      ? "Cash Payment"
                      : "Online Payment"}
                  </span>
                </div>
                <div className={styles.row}>
                  <span>Payment Method:</span>
                  <span>{selectedRequest.paid === 0 ? "Unpaid" : "Paid"}</span>
                </div>
                <div className={styles.row}>
                  <span>Base Price:</span>
                  <span>₹ {(selectedRequest.base_price || 0).toFixed(2)}</span>
                </div>
                <div className={styles.row}>
                  <span>Tax:</span>
                  <span>₹ {(selectedRequest.tax || 0).toFixed(2)}</span>
                </div>
                <div className={styles.row}>
                  <span>Discount:</span>
                  <span>-₹ {(selectedRequest.discount || 0).toFixed(2)}</span>
                </div>
                <div className={styles.row}>
                  <span>Wallet:</span>
                  <span>-₹ {(selectedRequest.wallet || 0).toFixed(2)}</span>
                </div>

                <div className={styles.row}>
                  <span>Final Amount:</span>
                  <span>₹ {(selectedRequest.total || 0).toFixed(2)}</span>
                </div>
              </div>

              {/* Your Earning  */}
              <div className={styles.yourDetails}>
                <h5>Your Earning</h5>
                <div className={styles.earningInfo}>
                  <div className={styles.hourTime}>
                    <p className={styles.hourRate}>
                      {/* <FontAwesomeIcon icon={faGear} />{" "} */}
                      <div>
                        <p className={styles.earningLabel}>Hourly Rate</p>
                        <p className={styles.earningValue}>
                          ₹{selectedRequest.hourly_rate}/hr
                        </p>
                      </div>
                    </p>
                  </div>

                  <div className={styles.total}>
                    <p className={styles.totalDuration}>
                      {/* <FontAwesomeIcon icon={faClock} />{" "} */}
                      <div>
                        <p className={styles.earningLabel}>Total Duration</p>
                        <p className={styles.earningValue}>
                          ₹{selectedRequest.duration}
                        </p>
                      </div>
                    </p>
                  </div>
                  <div className={styles.yourEarning}>
                    <p className={styles.providerTotal}>
                      {/* <FontAwesomeIcon icon={faClock} />{" "} */}
                      <div>
                        <p className={styles.earningLabel}>Your Earning</p>
                        <p className={styles.earningValue}>
                          ₹{selectedRequest.provider_earnings}
                        </p>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className={styles.border}></div> */}

              {/* Customer Feedback  */}
              <div className={styles.serviceTime}>
                <div className={styles.timeline}>
                  <h5>Customer Feedback</h5>
                  <p>
                    <strong>Rating:</strong>
                    {[1, 2, 3, 4, 5].map((index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        style={{
                          color:
                            index <= selectedRequest.user_rating
                              ? "#fabd12 "
                              : "#CCC ",
                          cursor: "pointer",
                        }}
                        // onClick={() => handleStarClick(index)}
                      />
                    ))}
                  </p>
                  <p>
                    <strong>Comment:</strong>{" "}
                    {selectedRequest.user_comment
                      ? selectedRequest.user_comment
                      : "Not Given"}
                  </p>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className={styles.modalFooter}>
            <Button
              className={styles.closeButton}
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
