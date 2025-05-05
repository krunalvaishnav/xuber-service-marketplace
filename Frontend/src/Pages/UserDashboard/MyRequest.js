import React, { useEffect, useState } from "react";
import { Dashboard } from "./Dashboard";
import NavbarUserDashboard from "./NavbarUserDashboard";
import Cookies from "js-cookie";
import { Col, Row, Button, Form, Modal } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Footer } from "../Footer";
import styles from "../../Styles/UserDashboardStyle/MyRequest.module.css";
import axios from "axios";
import { USER_API } from "../Url";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";
import $ from "jquery";
import "datatables.net";
import "datatables.net-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faTimesCircle,
  faMapPin,
  faCalendar,
  faCalendarCheck,
  faCheckCircle,
  faMapMarkerAlt,
  faStar,
  faRoute,
  faClock,
  faCalendarDays,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

export const MyRequest = () => {
  const [data, setData] = useState([]);
  // const [filter, setFilter] = useState("All");
  // const [sort, setSort] = useState("Newest First");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelRequestId, setCancelRequestId] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [ratings, setRatings] = useState({});

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
  // console.log("selectedRequest", selectedRequest);

  const getApi = async () => {
    let token = Cookies.get("loginToken");
    // console.log(token);

    const headers = {
      authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/request`,
        {
          headers,
        }
      );

      let requestData = response.data.requests;
      const requestsWithRatings = await Promise.all(
        requestData.map(async (request) => {
          if (request.status === "COMPLETED") {
            const rating = await getUserRating(request.booking_id);
            return { ...request, rating };
          }
          return request;
        })
      );

      const updatedData = requestsWithRatings.map((request) => {
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
      // console.log("frontend_Data", response.data.requests);
      setData(updatedData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch services!");
    }
  };
  // console.log("data",data);

  useEffect(() => {
    getApi();
    getUserRating();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const table1 = $("#myDataTable1").DataTable({
        responsive: false,
      });

      const table2 = $("#myDataTable2").DataTable({
        responsive: false,
      });

      return () => {
        table1.destroy();
        table2.destroy();
      };
    }
  }, [data]);

  // Details open & close modal
  const handleDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };
  // Cancel open & close modal
  const handleOpenCancelModal = (bookingid) => {
    setCancelRequestId(bookingid);
    setShowCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setCancelRequestId(null);
  };
  // data send to cancel requset
  const handleCancelRequest = async () => {
    let token = Cookies.get("loginToken");

    const headers = {
      authorization: `Bearer ${token}`,
    };

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.userId;

      const ratingData = {};

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/request/cancel/${cancelRequestId}`,
        {},
        { headers }
      );
      toast.success("Request canceled successfully!");
      getApi();
      handleCloseCancelModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel the request!");
    }
  };

  // Rating open & close modal
  const handleOpenRatingModal = (bookingid) => {
    setCancelRequestId(bookingid);
    setShowRatingModal(true);
  };

  const handleCloseRatingModal = () => {
    setShowRatingModal(false);
    setUserRating(0);
    setUserComment("");
  };

  const handleStarClick = (index) => {
    setUserRating(index);
  };

  // console.log("userrating", userRating);

  const handleRatingRequest = async () => {
    if (selectedRequest?.rating) {
      toast.error("You've already rated this service!");
      return;
    }
    if (userRating === 0) {
      toast.error("Please select a rating before submitting.");
      return;
    }
    if (!userComment.trim()) {
      toast.error("Please provide a comment before submitting.");
      return;
    }

    let token = Cookies.get("loginToken");
    const headers = {
      authorization: `Bearer ${token}`,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/rating/${cancelRequestId}`,
        { user_rating: userRating, user_comment: userComment },
        {
          headers,
        }
      );
      toast.success(
        "Thank you for the feedback! We'll strive to improve and hope to impress you next time."
      );
      getApi();
      handleCloseRatingModal();
    } catch (error) {
      console.error("Failed to submit rating", error);
      toast.error("Failed to submit rating!");
    }
  };

  const getUserRating = async (bookingId) => {
    let token = Cookies.get("loginToken");
    const headers = {
      authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/rating/${bookingId}`,
        { headers }
      );
      return response.data.rating; // Assuming the API returns the rating data
    } catch (error) {
      console.error(error);
      return null; // Return null if no rating exists
    }
  };
  // document.title = "Requests";

  return (
    <div className={styles.fullComponent}>
      <Toast />
      <div>
        <NavbarUserDashboard />
      </div>
      <div className={styles.nav}>
        <Row
          // style={{
          //   paddingTop: "150px",
          //   gap: "20px",
          //   paddingBottom: "100px",
          //   width: "100%",
          //   margin: "auto",
          // }}
          // className="justify-content-md-center"
          className={styles.mainDiv}
        >
          <Col md="3" lg="3" xl="3" xxl="2" className={styles.dashboard}>
            <Dashboard />
          </Col>
          <Col
            md="8"
            lg="8"
            xl="8"
            xxl="7"
            style={{
              border: "1px solid #e2e2e2",
              padding: "20px",
            }}
          >
            <p className={styles.requestList}> Requests List</p>
            {/* <div className={styles.filterContainer}>
              <Form.Select
                className={styles.filterSelect}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>All</option>
                <option>PENDING</option>
                <option>CANCELLED</option>
                <option>ACCEPTED</option>
                <option>STARTED</option>
                <option>ARRIVED</option>
                <option>PICKEDUP</option>
                <option>DROPPED</option>
                <option>COMPLETED</option>
                <option>SCHEDULED</option>
              </Form.Select>
              <Form.Select
                className={styles.filterSelect}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option>Newest First</option>
                <option>Oldest First</option>
              </Form.Select>
            </div> */}
            <div className={styles.tableContainer}>
              <div className={styles.table}>
                <table id="myDataTable1" className="table table-bordered">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left" }}>Sr. no.</th>
                      <th style={{ textAlign: "left" }}>Booking ID</th>
                      <th>Service Type</th>
                      <th>Scheduled At</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan="6" className={styles.noRecordFound}>
                          No records found
                        </td>
                      </tr>
                    ) : (
                      [...data]
                        .reverse() //.filter(
                        //   (request) => filter === "All" || request.status === filter
                        // )
                        // .sort((a, b) => {
                        //   if (sort === "Newest First") {
                        //     return b.created_at.localeCompare(a.created_at);
                        //   } else {
                        //     return a.created_at.localeCompare(b.created_at);
                        //   }
                        // })
                        .map((request, index) => (
                          <tr key={index}>
                            <td style={{ textAlign: "left" }}>{index + 1}</td>
                            <td style={{ textAlign: "left" }}>
                              {request.booking_id}
                            </td>
                            <td>{request.service_name}</td>
                            <td>
                              {request.schedule_at
                                ? new Date(request.schedule_at).toLocaleString(
                                    "en-US",
                                    {
                                      timeZone: "UTC",
                                    }
                                  )
                                : "Not Scheduled"}
                            </td>
                            <td>{request.status}</td>

                            <td className={"text-left"}>
                              <div className={styles.actionButton}>
                                <button
                                  className={styles.historyBtn}
                                  onClick={() => handleDetails(request)}
                                >
                                  <FontAwesomeIcon icon={faInfoCircle} />
                                  Details
                                </button>

                                <button
                                  className={styles.deleteBtn}
                                  onClick={() =>
                                    handleOpenCancelModal(request.booking_id)
                                  }
                                  disabled={
                                    request.status === "COMPLETED" ||
                                    request.status === "CANCELLED"
                                  }
                                >
                                  <FontAwesomeIcon icon={faTimesCircle} />
                                  Cancel
                                </button>

                                <button
                                  className={styles.editBtn}
                                  onClick={() => {
                                    setSelectedRequest(request);
                                    handleOpenRatingModal(request.booking_id);
                                  }}
                                  disabled={
                                    !(
                                      request.status === "COMPLETED" ||
                                      request.status === "CANCELLED"
                                    ) ||
                                    (request.rating &&
                                      request.rating.user_rating)
                                  }
                                >
                                  <FontAwesomeIcon icon={faStar} />
                                  {request.user_rating ? "Rated" : "Rating"}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* request details show modal  */}
      {/* <Modal backdrop="static" show={showModal} centered>
        <Modal.Header>
          <Modal.Title>Request Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <div>
              <p>
                <strong>Booking ID:</strong> {selectedRequest.booking_id}
              </p>
              <p>
                <strong>Service Name:</strong> {selectedRequest.service_name}
              </p>
              <p>
                <strong>Service Status:</strong> {selectedRequest.status}
              </p>
              <p>
                <strong>Cancelled By:</strong> {selectedRequest.cancelled_by}
              </p>
              <p>
                <strong>Payment Mode:</strong> {selectedRequest.payment_mode}
              </p>
              <p>
                <strong>Paid:</strong> {selectedRequest.paid ? "Yes" : "No"}
              </p>
              <p>
                <strong>Distance:</strong> {selectedRequest.distance} km
              </p>
              <p>
                <strong>Provider Address:</strong> {selectedRequest.s_address}
              </p>
              <p>
                <strong>Destination Address:</strong>{" "}
                {selectedRequest.d_address}
              </p>
              <p>
                <strong>Scheduled At:</strong>{" "}
                {selectedRequest.schedule_at
                  ? new Date(selectedRequest.schedule_at).toLocaleString(
                      "en-US",
                      {
                        timeZone: "UTC",
                      }
                    )
                  : "Not Schedule"}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedRequest.created_at).toLocaleString("en-US", {
                  timeZone: "UTC",
                })}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={styles.closeButton}
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}

      {selectedRequest && (
        <Modal
          backdrop="static"
          show={showModal}
          className={styles.detailModal}
          centered
        >
          <Modal.Header className={styles.detailsmodalHeader}>
            <Modal.Title className={styles.detailsmodalTitle}>
              <span>Service Details </span>

              <div className={styles.bookingID}>
                {" "}
                <span>Booking ID:</span> {selectedRequest.booking_id}
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <div className={styles.modalContent}>
              <div className={styles.statusProgress}>
                {/* Created  */}
                <div className={`${styles.statusStep} ${styles.active}`}>
                  <div className={styles.stepDot}></div>
                  <div className={styles.stepLabel}>Created</div>
                </div>
                {selectedRequest.status === "CANCELLED" ? (
                  <div className={`${styles.statusStep} ${styles.cancelled}`}>
                    <div className={styles.stepConnector}></div>
                    <div className={styles.stepDot}></div>
                    <div className={styles.stepLabel}>Cancelled</div>
                  </div>
                ) : (
                  <>
                    {/* pending */}
                    <div
                      className={`${styles.statusStep} ${
                        [
                          "PENDING",
                          "ACCEPTED",
                          "STARTED",
                          "COMPLETED",
                        ].includes(selectedRequest.status)
                          ? styles.active
                          : ""
                      }`}
                    >
                      <div className={styles.stepConnector}></div>
                      <div className={styles.stepDot}></div>
                      <div className={styles.stepLabel}>
                        {selectedRequest.status === "PENDING"
                          ? "Not Accepted"
                          : "Accepted"}
                      </div>
                    </div>

                    {/* Started */}
                    <div
                      className={`${styles.statusStep} ${
                        selectedRequest.started_at ||
                        ["STARTED", "COMPLETED"].includes(
                          selectedRequest.status
                        )
                          ? styles.active
                          : ""
                      }`}
                    >
                      <div className={styles.stepConnector}></div>
                      <div className={styles.stepDot}></div>
                      <div className={styles.stepLabel}>Started</div>
                    </div>

                    {/* Completed */}
                    <div
                      className={`${styles.statusStep} ${
                        selectedRequest.status === "COMPLETED"
                          ? styles.active
                          : ""
                      }`}
                    >
                      <div className={styles.stepConnector}></div>
                      <div className={styles.stepDot}></div>
                      <div className={styles.stepLabel}>Completed</div>
                    </div>
                  </>
                )}
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
                <h5>Location Details</h5>
                <p>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                  <strong>Servide Address:</strong> {selectedRequest.d_address}
                </p>
              </div>

              {/* Payment Details */}
              {selectedRequest.paid === 1 ? (
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
                    <span>₹ {selectedRequest.base_price}</span>
                  </div>
                  <div className={styles.row}>
                    <span>Tax:</span>
                    <span>₹ {selectedRequest.tax}</span>
                  </div>
                  <div className={styles.row}>
                    <span>Discount:</span>
                    <span>-₹ {selectedRequest.discount}</span>
                  </div>
                  <div className={styles.row}>
                    <span>Wallet:</span>
                    <span>-₹ {selectedRequest.wallet}</span>
                  </div>
                  <div className={styles.row}>
                    <span>Amount Pay:</span>
                    <span>₹ {selectedRequest.total}</span>
                  </div>
                </div>
              ) : (
                ""
              )}
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

      {/* cancle request modal  */}

      <Modal
        show={showCancelModal}
        backdrop="static"
        centered
        className={styles.cancelModal}
      >
        <Modal.Header className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>
            Cancel Request
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <p className={styles.warningText}>
            We understand you've decided to cancel. Please let us know if
            there's anything we can do to improve your experience.
          </p>
          <p className={styles.ratingWarning}>We're sorry to see you go.</p>
          <p className={styles.confirmationText}>
            Are you sure you want to cancel this request?
          </p>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button
            className={styles.closeButton}
            onClick={handleCloseCancelModal}
          >
            No, Go Back
          </Button>
          <Button className={styles.cancelButton} onClick={handleCancelRequest}>
            Yes, Cancel Request
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Rating modal  */}
      <Modal
        show={showRatingModal}
        className={styles.ratingModal}
        backdrop="static"
        centered
      >
        <Modal.Header className={styles.ratingmodalHeader}>
          <Modal.Title className={styles.ratingmodalTitle}>
            {selectedRequest ? "Your Rating" : "Rate Your Experience"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {selectedRequest?.user_rating ? (
              <div className={styles.previousRating}>
                <p>You've already rated this service:</p>
                <div className={styles.ratingStars}>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      style={{
                        color:
                          index <= selectedRequest.user_rating
                            ? "#fabd12"
                            : "#CCC",
                      }}
                    />
                  ))}
                </div>
                <p className={styles.ratingComment}>
                  <strong>Your comment:</strong> {selectedRequest.user_comment}
                </p>
                <p className={styles.ratingNote}>
                  Thank you for your feedback! Ratings cannot be modified once
                  submitted.
                </p>
              </div>
            ) : (
              <>
                <Form.Group controlId="rating">
                  <p
                    style={{
                      marginBottom: "15px",
                      fontStyle: "italic",
                      color: "#4CAF50",
                    }}
                  >
                    We're glad you had a good experience with us! Please take a
                    moment to rate and share your feedback.
                  </p>
                  <div
                    className={styles.ratingStars}
                    style={{ display: "flex" }}
                  >
                    {[1, 2, 3, 4, 5].map((index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        style={{
                          color: index <= userRating ? "#fabd12 " : "#CCC ",
                          cursor: "pointer",
                        }}
                        onClick={() => handleStarClick(index)}
                      />
                    ))}
                  </div>
                </Form.Group>
                <Form.Group controlId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button
            className={styles.closeButton}
            onClick={handleCloseRatingModal}
          >
            Close
          </Button>
          {!selectedRequest?.user_rating && (
            <Button
              className={styles.submitRating}
              onClick={handleRatingRequest}
            >
              Submit Rating
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      {/* <div className={styles.footer}>
        <Footer />
      </div> */}
    </div>
  );
};
