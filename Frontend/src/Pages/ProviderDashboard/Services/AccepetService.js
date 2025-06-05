import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { DashboardProvider } from "../Dashboard";
import NavbarUserDashboardProvider from "../NavbarProvider";
import { Footer } from "../../Footer";
import styles from "../../../Styles/ProviderDashboardStyle/Services/AccepetService.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faClock,
  faStopwatch,
  faMapMarkerAlt,
  faPlay,
  faCheckCircle,
  faTimesCircle,
  faCalendarDays,
  faGear,
  faChevronDown,
  faChevronUp,
  faRoute,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import UpcomingServiceNavbar from "./UpcomingServiceNavbar";
import MapComponent from "../../../Components/MapComponent";
import { toast } from "react-toastify";
import Toast from "../../../Components/Toast";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";

export const AccepetService = () => {
  const [location, setLocation] = useState({
    lat: 23.0225,
    lon: 72.5714,
    city: "",
    providerLat: null,
    providerLon: null,
  });
  const [settingData, setSettingData] = useState({});

  const [acceptedRequestData, setAcceptedRequestData] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [timers, setTimers] = useState({});
  const [isRunning, setIsRunning] = useState({});
  const [totalTime, setTotalTime] = useState({});
  const [serviceStatus, setServiceStatus] = useState({});
  const [anyTimerRunning, setAnyTimerRunning] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelRequestId, setCancelRequestId] = useState(null);
  const [canStartServices, setCanStartServices] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpBookingId, setOtpBookingId] = useState(null);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [currentRequest, setCurrentRequest] = useState(null);
  const otpInputRefs = useRef([]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState({});
  const navigate = useNavigate();

  const getSettingData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/setting`
      );
      if (response.status === 200) {
        const settingsArray = response.data.siteSettings;

        // console.log("Settings:", settingsArray);

        const settingsMap = Object.fromEntries(
          settingsArray.map((setting) => [setting.key, setting.value])
        );
        setSettingData(settingsMap);
        // console.log(settingsMap);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  // Timer effect
  useEffect(() => {
    const intervalIds = {};

    Object.keys(isRunning).forEach((bookingId) => {
      if (isRunning[bookingId]) {
        intervalIds[bookingId] = setInterval(() => {
          setTimers((prev) => ({
            ...prev,
            [bookingId]: (prev[bookingId] || 0) + 1,
          }));
        }, 1000);
      }
    });

    return () => {
      Object.values(intervalIds).forEach(clearInterval);
    };
  }, [isRunning]);

  const formatTime = (seconds) => {
    // const getCurrentTime =  getCurrentDateTime();
    // console.log("Second",seconds,getCurrentTime);

    if (!seconds || seconds < 0) return "00:00:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getLocalTimeInISOFormat = () => {
    const now = new Date();

    const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    return localTime.toISOString();
  };

  const getServiceRequests = async () => {
    let token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/accepted-request`,
        { headers }
      );

      if (response.data.acceptedRequestData.length > 0) {
        const firstRequest = response.data.acceptedRequestData[0];
        setLocation((prev) => ({
          ...prev,
          providerLat: firstRequest.s_latitude,
          providerLon: firstRequest.s_longitude,
        }));
      }

      let anyRunning = false;
      const currentTime = new Date(getLocalTimeInISOFormat());

      const requestData = response.data.acceptedRequestData.map((request) => {
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

        let status = "Not Started";
        let totalTime = 0;
        const canStart = request.schedule_at
          ? currentTime >= new Date(request.schedule_at)
          : true;

        // console.log(currentTime);
        // console.log(new Date(request.schedule_at));

        if (request.started_at && request.finished_at) {
          const startTime = new Date(request.started_at).getTime();
          const finishTime = new Date(request.finished_at).getTime();
          totalTime = Math.floor((finishTime - startTime) / 1000);
          status = "Ready for Payment";
        } else if (request.started_at) {
          status = "In Progress";
          const startTime = new Date(request.started_at);
          const endTime = new Date(getLocalTimeInISOFormat());
          totalTime = Math.floor((endTime - startTime) / 1000);
          // console.log("Start Time (UTC):", startTime.toISOString());
          // console.log("End Time (UTC):", endTime.toISOString());
          // console.log("Time difference (seconds):", totalTime);
          // console.log("totalTime", totalTime);
          // console.log("currrentTime", new Date(Date.now()).toISOString());
          // console.log(getLocalTimeInISOFormat());
          anyRunning = true;
        }

        return { ...request, totalTime, status, canStart, distance };
      });

      const initialTimers = {};
      const initialTotalTimes = {};
      const initialStatuses = {};
      const initialRunningStates = {};
      const initialCanStart = {};
      const initialOtpVerified = {};

      requestData.forEach((req) => {
        initialTotalTimes[req.booking_id] = req.totalTime;
        initialStatuses[req.booking_id] = req.status;
        initialCanStart[req.booking_id] = req.canStart;
        initialOtpVerified[req.booking_id] = req.otp_status === 1;

        if (req.status === "In Progress" && req.started_at) {
          // console.log(req);
          initialTimers[req.booking_id] = req.totalTime;
          initialRunningStates[req.booking_id] = true;
        } else {
          initialTimers[req.booking_id] = 0;
          initialRunningStates[req.booking_id] = false;
        }
      });

      setAnyTimerRunning(anyRunning);
      setTotalTime(initialTotalTimes);
      setServiceStatus(initialStatuses);
      setTimers(initialTimers);
      setIsRunning(initialRunningStates);
      setCanStartServices(initialCanStart);
      setOtpVerified(initialOtpVerified);
      setAcceptedRequestData(requestData);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

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
  // console.log(calculateDistance());

  // useEffect(() => {
  //   console.log("CanStart state updated:");
  //   // getServiceRequests();
  // }, [canStartServices]);
  // console.log("totalTime", totalTime);
  // console.log("serviceStatus", serviceStatus);
  // console.log("timers", timers);
  // console.log("isRunning", isRunning);
  // console.log("acceptedRequestData", acceptedRequestData);
  // console.log("canStartServices", canStartServices);

  useEffect(() => {
    getServiceRequests();
    getSettingData();
  }, []);
  // console.log(otpVerified);

  const startService = async (bookingId) => {
    if (anyTimerRunning) {
      toast.info(
        "Please complete the current service before starting another one"
      );
      return;
    }

    let token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/provider/start-service`,
        { booking_id: bookingId },
        { headers }
      );

      setIsRunning((prev) => ({
        ...prev,
        [bookingId]: true,
      }));

      setTimers((prev) => ({
        ...prev,
        [bookingId]: 0,
      }));

      setServiceStatus((prev) => ({
        ...prev,
        [bookingId]: "In Progress",
      }));

      setAnyTimerRunning(true);
      toast.success(response.data.message || `Service started!`);
      getServiceRequests();
    } catch (error) {
      console.error("Error starting service:", error);
      toast.error("Failed to start service.");
    }
  };

  const endService = async (bookingId) => {
    let token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/provider/end-service`,
        { booking_id: bookingId },
        { headers }
      );

      // Calculate final time
      const elapsedTime = timers[bookingId] || 0;

      setIsRunning((prev) => ({
        ...prev,
        [bookingId]: false,
      }));

      setTotalTime((prev) => ({
        ...prev,
        [bookingId]: elapsedTime,
      }));

      setServiceStatus((prev) => ({
        ...prev,
        [bookingId]: "Ready for Payment",
      }));

      setAnyTimerRunning(false);
      toast.success(response.data.message || "Service ended!");
      getServiceRequests();
    } catch (error) {
      console.error("Error completing service:", error);
      toast.error("Failed to complete service.");
    }
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
    let token = Cookies.get("providerToken");

    const headers = {
      authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/provider/service-cancel/${cancelRequestId}`,
        {},
        { headers }
      );
      toast.success(response.data.message || "Request canceled successfully!");
      getServiceRequests();
      handleCloseCancelModal();
      setOpenDropdown(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel the request!");
    }
  };

  const complateService = async (request) => {
    let token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    if (!rememberMe) {
      toast.warning(
        "Please confirm that the payment was collected successfully before completing the service."
      );
      return;
    }

    try {
      const totalTimeInSeconds = totalTime[request.booking_id];

      const time_price = (totalTimeInSeconds * request.hourly_rate) / 3600;

      const total_before_tax = request.base_price + time_price;

      const tax = (total_before_tax * settingData.tax_percentage) / 100;

      const user_pay_amount = total_before_tax + tax;

      const user_pay_amount_without_tax = user_pay_amount - tax;

      const admin_commision =
        (user_pay_amount_without_tax * settingData.commission_percentage) / 100;

      const provider_earnings = user_pay_amount - admin_commision - tax;

      const serviceData = {
        request_id: request.id,
        payment_mode: request.payment_mode,
        fixed: request.base_price.toFixed(2),
        time_price: time_price.toFixed(2),
        tax: tax.toFixed(2),
        total: user_pay_amount.toFixed(2),
        distance: request.distance,
        commision: admin_commision.toFixed(2),
        provider_earnings: provider_earnings.toFixed(2),
      };

      // console.log("Service Data :", serviceData);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/provider/service-complate`,
        serviceData,
        { headers }
      );

      if (response.status === 200) {
        toast.success(
          response.data.message || "Service Completed Successfully"
        );
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  //OTP MODEL

  const handleCloseOTPModal = () => {
    setShowOTPModal(false);
    setOtpBookingId(null);
    setCurrentRequest(null);
    setOtp(new Array(6).fill(""));
    setIsOtpSent(false);
  };

  useEffect(() => {
    otpInputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (index, event) => {
    const value = event.target.value;
    if (isNaN(value)) return;

    const newValue = value.trim();
    const newOtp = [...otp];
    newOtp[index] = newValue.slice(-1);
    setOtp(newOtp);

    newValue && otpInputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      !event.target.value && otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    setIsOtpSent(true);

    let token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    // console.log("entered-otp", otpValue);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/provider/otp-verify`,
        {
          request_id: currentRequest.id,
          user_id: currentRequest.user_id,
          otp: otp.join(""),
        },
        { headers }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "OTP verified successfully!");

        setOtpVerified((prev) => ({
          ...prev,
          [currentRequest.otpBookingId]: true,
        }));
        handleCloseOTPModal();
        getServiceRequests();
      } else {
        toast.error(response.data.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error(error.response.data.error || "Failed to verify OTP");
    } finally {
      setIsOtpSent(false);
    }
  };

  // console.log(otpVerified);

  const handleSendOtp = async (request) => {
    setIsOtpSent(true);
    let token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/provider/otp-send`,
        {
          request_id: request.id,
          user_email: request.user_email,
          user_id: request.user_id,
        },
        { headers }
      );

      if (response.status === 200) {
        toast.success(
          response.data.message || "OTP sent to customer successfully!"
        );

        setCurrentRequest(request);
        setOtpBookingId(request.booking_id);
        setShowOTPModal(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP to customer");
    } finally {
      setIsOtpSent(false);
    }
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
                padding: "20px",
              }}
            >
              <UpcomingServiceNavbar />
              <hr />
              <div className={styles.container}>
                {acceptedRequestData.map((request, index) => (
                  <div className={styles.mainContiner} key={request.booking_id}>
                    <div className={styles.topCard}>
                      <div className={styles.bookingID}>
                        <span>Booking ID: </span>{" "}
                        <span>{request.booking_id}</span>
                      </div>

                      <div className={styles.topRightSide}>
                        <div className={styles.cardHeaderRightSide}>
                          <p
                            className={`${
                              serviceStatus[request.booking_id] ===
                              "Not Started"
                                ? styles.status
                                : serviceStatus[request.booking_id] ===
                                  "In Progress"
                                ? styles.inProgress
                                : styles.completed
                            }`}
                          >
                            {serviceStatus[request.booking_id]}
                          </p>
                        </div>
                        <div
                          className={styles.dropdownButton}
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === index ? null : index
                            )
                          }
                        >
                          <FontAwesomeIcon
                            icon={
                              openDropdown === index
                                ? faChevronUp
                                : faChevronDown
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {openDropdown === index && (
                      <div className={styles.serviceInfoMainDiv}>
                        <div className={styles.cardHeader}>
                          <h3 className={styles.name}>
                            {request.user_first_name} {request.user_last_name}
                          </h3>
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

                          <div className={styles.datePhone}>
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
                            <p className={styles.phone}>
                              <FontAwesomeIcon icon={faPhone} />{" "}
                              <a href={`tel:${request.user_mobile_number}`}>
                                Call Customer
                              </a>
                            </p>
                          </div>
                        </div>

                        <div className={styles.mapContainer}>
                          <div className={styles.mapWrapper}>
                            <MapComponent
                              location={{
                                lat: request.d_latitude,
                                lon: request.d_longitude,
                              }}
                            />
                          </div>

                          <div className={styles.locationDetails}>
                            <p>
                              <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                              {request.d_address}
                            </p>
                            <p>
                              {request.s_latitude &&
                              request.s_longitude &&
                              request.d_latitude &&
                              request.d_longitude ? (
                                <p>
                                  <FontAwesomeIcon icon={faRoute} /> Distance:{" "}
                                  {calculateDistance(
                                    request.s_latitude,
                                    request.s_longitude,
                                    request.d_latitude,
                                    request.d_longitude
                                  ).toFixed(2)}{" "}
                                  km
                                </p>
                              ) : (
                                <p>Distance: Calculating...</p>
                              )}
                            </p>
                          </div>
                        </div>

                        <div className={styles.timerSection}>
                          <div className={styles.nameTimeDiv}>
                            <h3 className={styles.name}>
                              <FontAwesomeIcon icon={faStopwatch} />{" "}
                              {serviceStatus[request.booking_id] ===
                              "Ready for Payment"
                                ? "Total Time"
                                : "Service Timer"}
                            </h3>
                            <p className={styles.timer}>
                              {serviceStatus[request.booking_id] ===
                              "Ready for Payment"
                                ? formatTime(totalTime[request.booking_id])
                                : formatTime(timers[request.booking_id])}
                            </p>
                          </div>

                          {/* OTP Verification Box */}
                          {
                            <div className={styles.otpVerificationBox}>
                              <p className={styles.otpTitle}>
                                <FontAwesomeIcon icon={faShieldAlt} /> OTP
                                Verification
                              </p>
                              {otpVerified[request.booking_id] ? (
                                <p className={styles.otpMessageSuccess}>
                                  OTP verified successfully! You can now start
                                  the service.
                                </p>
                              ) : (
                                <>
                                  <p className={styles.otpMessage}>
                                    <span>
                                      Send OTP first to start the service.
                                    </span>
                                    <br />
                                    <span>
                                      Ask customer for the 6-digit OTP sent to
                                      their email address.
                                    </span>
                                  </p>

                                  {(!request.schedule_at ||
                                    canStartServices[request.booking_id]) && (
                                    <button
                                      className={styles.enterOtpBtn}
                                      onClick={() => handleSendOtp(request)}
                                      disabled={isOtpSent}
                                    >
                                      {isOtpSent ? (
                                        <>
                                          <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                          ></span>
                                          Sending...
                                        </>
                                      ) : (
                                        "Send OTP"
                                      )}
                                    </button>
                                  )}

                                  {request.schedule_at &&
                                    !canStartServices[request.booking_id] && (
                                      <p className={styles.otpMessage}>
                                        OTP can be sent only after the scheduled
                                        time:{" "}
                                        {new Date(
                                          request.schedule_at
                                        ).toLocaleString("en-US", {
                                          timeZone: "UTC",
                                        })}
                                      </p>
                                    )}
                                </>
                              )}
                            </div>
                          }

                          {serviceStatus[request.booking_id] ===
                            "Not Started" && (
                            <button
                              className={styles.startBtn}
                              onClick={() => startService(request.booking_id)}
                              disabled={
                                !otpVerified[request.booking_id] ||
                                (request.schedule_at &&
                                  !canStartServices[request.booking_id])
                              }
                              style={{
                                display:
                                  serviceStatus[request.booking_id] !==
                                  "Not Started"
                                    ? "none"
                                    : "block",
                                opacity:
                                  (request.schedule_at &&
                                    !canStartServices[request.booking_id]) ||
                                  !otpVerified[request.booking_id]
                                    ? 0.6
                                    : 1,
                                cursor:
                                  (request.schedule_at &&
                                    !canStartServices[request.booking_id]) ||
                                  !otpVerified[request.booking_id]
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                            >
                              <FontAwesomeIcon icon={faPlay} /> Start Service
                              {request.schedule_at &&
                                !canStartServices[request.booking_id] && (
                                  <span className={styles.scheduledInfo}>
                                    (Available at{" "}
                                    {new Date(
                                      request.schedule_at
                                    ).toLocaleString("en-US", {
                                      timeZone: "UTC",
                                    })}
                                    )
                                  </span>
                                )}
                            </button>
                          )}

                          {serviceStatus[request.booking_id] ===
                            "In Progress" && (
                            <button
                              className={styles.completeBtn}
                              onClick={() => endService(request.booking_id)}
                            >
                              <FontAwesomeIcon icon={faCheckCircle} /> End
                              Service
                            </button>
                          )}
                        </div>

                        <div className={styles.pricingDetails}>
                          <h3 className={styles.name}>₹ Pricing Details</h3>
                          <div className={styles.firstPricePart}>
                            <span className={styles.priceLable}>
                              Service Rate
                            </span>
                            <div className={styles.row}>
                              <span>Hourly Rate:</span>
                              <span>₹ {request.hourly_rate}/hr</span>
                            </div>

                            <div className={styles.row}>
                              <span>Fixed Price:</span>
                              <span>₹ {request.base_price.toFixed(2)}</span>
                            </div>
                          </div>

                          <div className={styles.secondsPricePart}>
                            <span className={styles.priceLable}>
                              Bill Details
                            </span>

                            <div className={styles.row}>
                              <span>Total Working Hour:</span>
                              <span>
                                {serviceStatus[request.booking_id] ===
                                "Ready for Payment"
                                  ? formatTime(totalTime[request.booking_id])
                                  : "00:00:00"}
                              </span>
                            </div>
                            <div className={styles.row}>
                              <span>Fixed Price:</span>
                              <span>
                                ₹{" "}
                                {serviceStatus[request.booking_id] ===
                                "Ready for Payment"
                                  ? request.base_price.toFixed(2)
                                  : "0.00  "}
                              </span>
                            </div>
                            <div className={styles.row}>
                              <span>Hourly Rate:</span>
                              <span>
                                ₹{" "}
                                {/* {(
                                  ((serviceStatus[request.booking_id] ===
                                  "In Progress"
                                    ? timers[request.booking_id] || 0
                                    : totalTime[request.booking_id] || 0) *
                                    request.hourly_rate) /
                                  3600
                                ).toFixed(2)} */}
                                {(
                                  ((serviceStatus[request.booking_id] ===
                                  "Ready for Payment"
                                    ? totalTime[request.booking_id]
                                    : 0) *
                                    request.hourly_rate) /
                                  3600
                                ).toFixed(2)}
                              </span>
                            </div>
                            <div className={styles.priceBorder}></div>
                            <div className={styles.row}>
                              <span>Sub Total:</span>
                              <span>
                                ₹{" "}
                                {serviceStatus[request.booking_id] ===
                                "Ready for Payment"
                                  ? (
                                      request.base_price +
                                      (totalTime[request.booking_id] *
                                        request.hourly_rate) /
                                        3600
                                    ).toFixed(2)
                                  : "0.00"}
                              </span>
                            </div>

                            <div className={styles.row}>
                              <span>TAX (18%):</span>
                              <span>
                                ₹{" "}
                                {serviceStatus[request.booking_id] ===
                                "Ready for Payment"
                                  ? (
                                      ((request.base_price +
                                        ((serviceStatus[request.booking_id] ===
                                        "Ready for Payment"
                                          ? totalTime[request.booking_id]
                                          : 0) *
                                          request.hourly_rate) /
                                          3600) *
                                        settingData.tax_percentage) /
                                      100
                                    ).toFixed(2)
                                  : "0.00"}
                              </span>
                            </div>
                            <div className={styles.priceBorder}></div>

                            {/* <div className={styles.rowDiscount}>
                              <span>Discount:</span>
                              <span>₹ 0</span>
                            </div> */}

                            <div className={styles.rowSubTotal}>
                              <strong>Total:</strong>
                              <strong>
                                ₹
                                {serviceStatus[request.booking_id] ===
                                "Ready for Payment"
                                  ? (
                                      request.base_price +
                                      (totalTime[request.booking_id] *
                                        request.hourly_rate) /
                                        3600 +
                                      ((request.base_price +
                                        ((serviceStatus[request.booking_id] ===
                                        "Ready for Payment"
                                          ? totalTime[request.booking_id]
                                          : 0) *
                                          request.hourly_rate) /
                                          3600) *
                                        settingData.tax_percentage) /
                                        100
                                    ).toFixed(2)
                                  : "0.00"}
                              </strong>
                            </div>
                          </div>

                          <label className={styles.checkbox_container}>
                            <input
                              type="checkbox"
                              checked={rememberMe}
                              onChange={handleRememberMe}
                              required
                            />
                            <strong>
                              I confirm payment was collected successfully
                            </strong>
                          </label>

                          <div className={styles.totalDiv}>
                            <div className={styles.rowTotalAmount}>
                              <strong>Amount To Pay:</strong>
                              <strong>
                                ₹
                                {serviceStatus[request.booking_id] ===
                                "Ready for Payment"
                                  ? Math.floor(
                                      request.base_price +
                                        (totalTime[request.booking_id] *
                                          request.hourly_rate) /
                                          3600 +
                                        ((request.base_price +
                                          (totalTime[request.booking_id] *
                                            request.hourly_rate) /
                                            3600) *
                                          18) /
                                          100
                                    )
                                  : 0}
                              </strong>
                            </div>
                          </div>
                        </div>

                        <div className={styles.actionButtons}>
                          {serviceStatus[request.booking_id] ===
                          "Not Started" ? (
                            <>
                              <button
                                className={styles.completeBtn}
                                onClick={() =>
                                  toast.info(
                                    "You cannot complete the service now! The service timer has not started yet."
                                  )
                                }
                                style={{
                                  opacity: 0.6,
                                  cursor: "not-allowed",
                                }}
                              >
                                <FontAwesomeIcon icon={faCheckCircle} />{" "}
                                Complete Service
                              </button>
                              <button
                                className={styles.cancelBtn}
                                onClick={() =>
                                  handleOpenCancelModal(request.booking_id)
                                }
                              >
                                <FontAwesomeIcon icon={faTimesCircle} /> Cancel
                                Service
                              </button>
                            </>
                          ) : serviceStatus[request.booking_id] ===
                            "In Progress" ? (
                            <>
                              <button
                                className={styles.completeBtn}
                                onClick={() =>
                                  toast.info(
                                    "You cannot complete the service now! Please stop the service time first before completing it."
                                  )
                                }
                                style={{
                                  opacity: 0.6,
                                  cursor: "not-allowed",
                                }}
                              >
                                <FontAwesomeIcon icon={faCheckCircle} />{" "}
                                Complete Service
                              </button>
                              <button
                                className={styles.cancelBtn}
                                onClick={() =>
                                  toast.info(
                                    "You cannot cancel the service now! If you have any issues, please contact the administrator."
                                  )
                                }
                                style={{
                                  opacity: 0.6,
                                  cursor: "not-allowed",
                                }}
                              >
                                <FontAwesomeIcon icon={faTimesCircle} /> Cancel
                                Service
                              </button>
                            </>
                          ) : serviceStatus[request.booking_id] ===
                            "Ready for Payment" ? (
                            <>
                              <button
                                className={styles.completeBtn}
                                onClick={() => complateService(request)}
                              >
                                <FontAwesomeIcon icon={faCheckCircle} />{" "}
                                Completed Service
                              </button>
                              <button
                                className={styles.cancelBtn}
                                onClick={() =>
                                  toast.info(
                                    "You cannot cancel the service now! If you have any issues, please contact the administrator."
                                  )
                                }
                                style={{
                                  opacity: 0.6,
                                  cursor: "not-allowed",
                                }}
                              >
                                <FontAwesomeIcon icon={faTimesCircle} /> Cancel
                                Service
                              </button>
                            </>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </div>

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
            Frequent cancellations may affect your eligibility for future
            bookings and premium services.
          </p>
          <p className={styles.ratingWarning}>
            This will affect your Rating also
          </p>
          <p className={styles.confirmationText}>
            Are you sure you want to cancel this request?
          </p>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button
            variant="secondary"
            className={styles.closeButton}
            onClick={handleCloseCancelModal}
          >
            No, Go Back
          </Button>
          <Button
            variant="danger"
            className={styles.cancelButton}
            onClick={handleCancelRequest}
          >
            Yes, Cancel Request
          </Button>
        </Modal.Footer>
      </Modal>

      {/* OTP modal  */}

      <Modal show={showOTPModal} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>OTP Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please enter the 6-digit OTP send to the customer's email address:
          </p>
          <div className={styles.otpVerificationBox}>
            <p className={styles.otpMessage}>
              <p className={styles.otpTitle}> Why OTP Verification?</p>
              <span className={styles.otpMessage}>
                OTP verification ensures you're at the correct location and
                interacting with the actual customer. You must verify the OTP
                before you can start the service.
              </span>
            </p>
          </div>

          <div className="d-flex justify-content-center gap-2 mb-3">
            {otp.map((digit, index) => (
              <Form.Control
                key={index}
                ref={(e) => (otpInputRefs.current[index] = e)}
                type="text"
                maxLength="1"
                className="text-center"
                value={digit}
                onChange={(e) => handleOtpChange(index, e)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className={styles.closeButton} onClick={handleCloseOTPModal}>
            Cancel
          </Button>
          <Button
            className={styles.modalVerifyButton}
            onClick={handleVerifyOTP}
            disabled={isOtpSent}
          >
            {isOtpSent ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
