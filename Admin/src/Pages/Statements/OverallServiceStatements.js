import Dashboard from "../Dashboard";
import styles from "../../Styles/Statements/OverallServiceStatements.module.css";
import React, { useState, useEffect } from "react";
import { Footer } from "../../Components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";
import $ from "jquery";

import "datatables.net";
import "datatables.net-responsive";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import "datatables.net-buttons/js/dataTables.buttons.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "daterangepicker";
import "daterangepicker/daterangepicker.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faCalendar,
  faCalendarCheck,
  faCalendarWeek,
  faInfoCircle,
  faMapMarkerAlt,
  faStar,
  faRoute,
  faClock,
  faCalendarDays,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";

window.$ = window.jQuery = $;
function OverallServiceStatements() {
  const [data, setData] = useState([]);
  const [totalCounts, setTotalCounts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: moment().subtract(29, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
  });

  const getApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/overallstatement-count`,
        {
          params: {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          },
        }
      );
      // setTimeout(() => {
      setTotalCounts(response.data.overallStatementsCount[0]);
      // }, 1000);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log("totalCounts", totalCounts);

  // const initializeDataTable = () => {
  //   if ($.fn.DataTable.isDataTable("#userTable")) {
  //     $("#userTable").DataTable().destroy();
  //   }

  //   $("#userTable").DataTable({
  //     dom: "Bfrtip",
  //     buttons: ["copy", "csv", "excel", "pdf", "print"],
  //     responsive: true,
  //     destroy: true,
  //   });
  // };

  const initializeDataTable = () => {
    if (!$.fn.DataTable.isDataTable("#userTable")) {
      $("#userTable").DataTable({
        layout: {
          topStart: "buttons",
        },
        responsive: false,
        buttons: ["copy", "csv", "excel", "pdf", "print"],
        destroy: true,
      });
    }
  };

  const initializeDateRange = () => {
    $("#reportrange").daterangepicker(
      {
        startDate: moment(dateRange.startDate),
        endDate: moment(dateRange.endDate),
        ranges: {
          Today: [moment(), moment()],
          Yesterday: [
            moment().subtract(1, "days"),
            moment().subtract(1, "days"),
          ],
          "Last 7 Days": [moment().subtract(6, "days"), moment()],
          "Last 30 Days": [moment().subtract(29, "days"), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
          "Last Month": [
            moment().subtract(1, "month").startOf("month"),
            moment().subtract(1, "month").endOf("month"),
          ],
        },
        opens: "right",
        locale: {
          format: "YYYY-MM-DD",
        },
      },
      (start, end) => {
        setDateRange({
          startDate: start.format("YYYY-MM-DD"),
          endDate: end.format("YYYY-MM-DD"),
        });
      }
    );
  };

  // console.log(dateRange);

  useEffect(() => {
    if (data.length > 0) {
      initializeDataTable();
    }
  }, [data]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const getOverallStatementsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/overallstatement-data`,
        {
          params: {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          },
        }
      );

      let requestData = response.data.overallStatementsData;

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

          const distance =
            request.s_latitude &&
            request.s_longitude &&
            request.d_latitude &&
            request.d_longitude
              ? calculateDistance(
                  request.s_latitude,
                  request.s_longitude,
                  request.d_latitude,
                  request.d_longitude
                ).toFixed(2)
              : 0;

          return {
            ...request,
            duration: formattedTime,
            distance,
          };
        }
        return request;
      });

      setData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };
  //   console.log(data);
  const handleDetails = (service) => {
    setSelectedRequest(service);
    setShowModal(true);
  };

  useEffect(() => {
    getApi();
    getOverallStatementsData();
    initializeDateRange();

    return () => {
      if ($.fn.DataTable.isDataTable("#userTable")) {
        $("#userTable").DataTable().destroy();
      }
    };
  }, [dateRange]);

  return (
    <>
      <Toast />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Dashboard />
        </div>

        <div className={styles.mainContent}>
          <div className={styles.addDiv}>
            <div className={styles.add}>
              <div className={styles.top}>
                <h5>Overall Service Statements</h5>

                <div id="reportrange" className={styles.dateRangePicker}>
                  <FontAwesomeIcon icon={faCalendarWeek} />
                  <span>
                    {moment(dateRange.startDate).format("MMMM D, YYYY")} -{" "}
                    {moment(dateRange.endDate).format("MMMM D, YYYY")}
                  </span>
                </div>
              </div>
              {/* <span>
                The data is show for <strong>{dateRange.startDate}</strong> to{" "}
                <strong> {dateRange.endDate}</strong>
              </span> */}
              <div className={styles.cardContainer}>
                <div
                  className={styles.card}
                  style={{ borderTop: "4px solid #007bff" }}
                >
                  <h6>Total No. of Request</h6>
                  <p className={styles.value}>
                    {totalCounts.total_request || 0}
                  </p>
                </div>
                <div
                  className={styles.card}
                  style={{ borderTop: "4px solid #28a745" }}
                >
                  <h6>Completed Request</h6>
                  <p className={styles.value}>
                    {totalCounts.total_completed_request || 0}
                  </p>
                </div>
                <div
                  className={styles.card}
                  style={{ borderTop: "4px solid #dc3545" }}
                >
                  <h6>Cancelled Request</h6>
                  <p className={styles.value}>
                    {totalCounts.total_cancelled_request || 0}
                  </p>
                </div>

                <div
                  className={styles.card}
                  style={{ borderTop: "4px solid #fd7e14" }}
                >
                  <h6>Overall Earning</h6>
                  <p className={styles.value}>
                    ₹ {(totalCounts.total_revenue || 0).toFixed(2)}
                  </p>
                </div>
                <div
                  className={styles.card}
                  style={{ borderTop: "4px solid #6f42c1" }}
                >
                  <h6>Overall Provider Earning </h6>
                  <p className={styles.value}>
                    ₹ {(totalCounts.provider_earnings || 0).toFixed(2)}
                  </p>
                </div>
                <div
                  className={styles.card}
                  style={{ borderTop: "4px solid  #ffc107" }}
                >
                  <h6>Overall Commission</h6>
                  <p className={styles.value}>
                    ₹ {(totalCounts.admin_commision || 0).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className={styles.tableDiv}>
                <h5>Earnings</h5>
                <table
                  className="table table-bordered"
                  id="userTable"
                  // class="display"
                  //  className={styles.earningsTable}
                >
                  <thead>
                    <tr>
                      <th className="text-left">Sr. No.</th>
                      <th className="text-left">Booking ID</th>
                      <th className="text-left">Service Type</th>
                      <th className="text-left">Provider Name</th>
                      <th className="text-left">Date</th>
                      <th className="text-left">Total (₹)</th>
                      <th className="text-left">Commision (₹)</th>
                      <th className="text-left">Status</th>
                      <th className="text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      [...data].reverse().map((service, index) => (
                        <tr>
                          <td className="text-left">{index + 1}</td>
                          <td className="text-left">{service.booking_id}</td>
                          <td className="text-left">{service.service_name}</td>
                          <td>
                            {service.provider_first_name ? (
                              <>
                                {service.provider_first_name}{" "}
                                {service.provider_last_name}
                              </>
                            ) : (
                              <>Not Accepted</>
                            )}
                          </td>
                          <td>
                            {new Date(service.created_at).toLocaleString(
                              "en-US",
                              {
                                timeZone: "UTC",
                              }
                            )}
                          </td>
                          <td className="text-left">{service.total || 0}</td>
                          <td className="text-left">
                            {service.admin_commision || 0}
                          </td>
                          <td
                            style={{
                              color:
                                service.status === "COMPLETED"
                                  ? "green"
                                  : service.status === "CANCELLED"
                                  ? "red"
                                  : service.status === "ACCEPTED"
                                  ? "blue"
                                  : service.status === "PENDING"
                                  ? "orange"
                                  : "black",
                              fontWeight: "bold",
                            }}
                          >
                            {service.status}
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
                          No Data Available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <Footer />
          </div>
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
              <div className={styles.profileDetails}>
                <h5>User & Provider Details</h5>
                <div className={styles.profileinfo}>
                  <div className={styles.user}>
                    <p className={styles.name}>
                      <div>
                        <p>User Name</p>
                        {selectedRequest.user_first_name}{" "}
                        {selectedRequest.user_last_name}
                      </div>
                    </p>
                    <p className={styles.email}>
                      <div>
                        <p>Email</p>
                        {selectedRequest.user_email}
                      </div>
                    </p>
                    <p className={styles.number}>
                      <div>
                        <p>Number</p>
                        {selectedRequest.user_mobile_number}
                      </div>
                    </p>
                  </div>

                  <div className={styles.provider}>
                    <p className={styles.name}>
                      <div>
                        <p> Provider Name</p>
                        {selectedRequest.provider_first_name}
                        {selectedRequest.provider_last_name}
                      </div>
                    </p>
                    <p className={styles.email}>
                      <div>
                        <p>Email</p>
                        {selectedRequest.provider_email}
                      </div>
                    </p>
                    <p className={styles.number}>
                      <div>
                        <p>Number</p>
                        {selectedRequest.provider_mobile_number}
                      </div>
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Information */}
              <div className={styles.serviceDetails}>
                <h5>Service Details</h5>
                <div className={styles.serviceInfo}>
                  <div className={styles.serviceTime}>
                    <p className={styles.service}>
                      <FontAwesomeIcon icon={faGear} />{" "}
                      <div>
                        <p>Service</p>
                        {selectedRequest.service_name}
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
                        {selectedRequest.duration || "00:00:00"}
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

              {/* Admin Commision  */}
              <div className={styles.yourDetails}>
                <h5>Your Commision From This Ride</h5>
                <div className={styles.earningInfo2}>
                  <div className={styles.commision}>
                    <span>Commision:</span>
                    <span>
                      ₹ {(selectedRequest.admin_commision || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Your Earning  */}
              <div className={styles.yourDetails}>
                <h5>Provider Earning</h5>
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
}

export default OverallServiceStatements;
