import Dashboard from "../../Dashboard";
import { Button, Modal } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "../../../Styles/Members/User/UserRequestHistory.module.css";
import React, { useEffect, useState } from "react";
import { Footer } from "../../../Components/Footer";
import { toast } from "react-toastify";
import Toast from "../../../Components/Toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import $ from "jquery";
import "datatables.net";
import "datatables.net-responsive";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import "datatables.net-buttons/js/dataTables.buttons.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
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

function UserRequestHistory() {
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState({
    first_name: "",
    last_name: "",
  });
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const navigate = useNavigate();
  const getApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/user/${id}/request`
      );
      if ($.fn.DataTable.isDataTable("#userTable")) {
        $("#userTable").DataTable().destroy();
      }
      //   console.log(response.data.userRequest);
      // setData(response.data.userRequest);
      let requestData = response.data.userRequest;
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
      if (response.data.userRequest.length > 0) {
        setUserName({
          first_name: response.data.userRequest[0].user_first_name,
          last_name: response.data.userRequest[0].user_last_name,
        });
      }
    } catch (error) {
      console.error("Data fetching error", error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const initializeDataTable = () => {
    if (!$.fn.DataTable.isDataTable("#userTable")) {
      $("#userTable").DataTable({
        layout: {
          topStart: "buttons",
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

  const handleDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

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
                <h5>
                  Request History For
                  <strong>
                    {" "}
                    {userName.first_name || userName.last_name
                      ? `${userName.first_name} ${userName.last_name}`
                      : "User"}
                  </strong>
                </h5>
                <p
                  className={styles.backBtn}
                  onClick={() => navigate("/admin/user")}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                  Back
                </p>
              </div>

              <table
                className="table table-striped table-bordered"
                id="userTable"
                // class="display"
              >
                <thead>
                  <tr>
                    <th className="text-left">Sr. No.</th>
                    <th className="text-left">Booking Id</th>
                    {/* <th className="text-left">User Name</th> */}
                    <th className="text-left">Provider Name</th>
                    <th className="text-left">Service Type</th>
                    <th className="text-left">Total Payment (₹)</th>
                    <th className="text-left">Status</th>
                    <th className="text-left">Action </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((request, index) => (
                      <tr key={index}>
                        <td className="text-left">{index + 1}</td>
                        <td className="text-left">{request.booking_id}</td>
                        {/* <td>
                          {request.user_first_name} {request.user_last_name}
                        </td> */}
                        <td>
                          {request.provider_first_name}{" "}
                          {request.provider_last_name}
                        </td>
                        <td>{request.service_name}</td>
                        <td className="text-left">{request.total || "0.00"}</td>
                        <td
                          style={{
                            color:
                              request.status === "COMPLETED"
                                ? "green"
                                : request.status === "CANCELLED"
                                ? "red"
                                : request.status === "ACCEPTED"
                                ? "blue"
                                : request.status === "PENDING"
                                ? "orange"
                                : "black",
                            fontWeight: "bold",
                          }}
                        >
                          {request.status}
                        </td>
                        <td>
                          <div className={styles.actionButton}>
                            <button
                              className={styles.detailsButton}
                              onClick={() => handleDetails(request)}
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
                      <td colSpan="7" className="text-center">
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
              {selectedRequest.cancelled_by ? (
                <div className={styles.userInfo}>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <strong>Cancelled By: </strong>{" "}
                    {selectedRequest.cancelled_by}
                  </div>
                </div>
              ) : (
                ""
              )}
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
                        {selectedRequest.duration
                          ? selectedRequest.duration
                          : "Not Completed"}
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

              {selectedRequest.paid === 1 ? (
                <>
                  {" "}
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
                      <span>
                        {selectedRequest.paid === 0 ? "Unpaid" : "Paid"}
                      </span>
                    </div>
                    <div className={styles.row}>
                      <span>Base Price:</span>
                      <span>
                        ₹ {(selectedRequest.base_price || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className={styles.row}>
                      <span>Tax:</span>
                      <span>₹ {(selectedRequest.tax || 0).toFixed(2)}</span>
                    </div>
                    <div className={styles.row}>
                      <span>Discount:</span>
                      <span>
                        -₹ {(selectedRequest.discount || 0).toFixed(2)}
                      </span>
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
                            <p className={styles.earningLabel}>
                              Total Duration
                            </p>
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
                  {/* Commission Admin  */}
                  <div className={styles.yourDetails}>
                    <h5>Your Commision</h5>
                    <div className={styles.earningInfo}>
                      <div className={styles.hourTime}>
                        <p className={styles.hourRate}>
                          {/* <FontAwesomeIcon icon={faGear} />{" "} */}
                          <div>
                            <p className={styles.earningLabel}>
                              Service Commission Rate
                            </p>
                            <p className={styles.earningValue}>
                              ₹{selectedRequest.admin_commision}
                            </p>
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

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

export default UserRequestHistory;
