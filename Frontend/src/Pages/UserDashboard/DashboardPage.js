import React, { useEffect, useState } from "react";
import { Dashboard } from "./Dashboard";
import LocationSearch from "../../Components/LocationSearch";
import MapComponent from "../../Components/MapComponent";
import NavbarUserDashboard from "./NavbarUserDashboard";
import { Col, Row, Modal, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import { Footer } from "../Footer";
import axios from "axios";
import { USER_API } from "../Url";
import styles from "../../Styles/UserDashboardStyle/DashboardPage.module.css";
import { json, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";
import loading from "../../Assets/gears.gif";

export const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState({
    lat: 23.0225,
    lon: 72.5714,
    city: "",
  });
  const [baseFare, setBaseFare] = useState("");
  const [hourlyFare, setHourlyFare] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [paymentMode, setPaymentMode] = useState("cash");
  const [scheduleAt, setScheduleAt] = useState(null);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [settingData, setSettingData] = useState({});

  const [searchParams] = useSearchParams();

  const service = searchParams.get("service");
  const navigate = useNavigate();
  // console.log("service", service);

  const getApi = async () => {
    let token = Cookies.get("loginToken");

    const headers = {
      authorization: `Bearer ${token}`,
    };

    setIsLoading(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/services`,
        {
          headers,
        }
      );
      // console.log("frontendservices", response.data.services);
      setTimeout(() => {
        if (!response) {
          setIsLoading(true);
        }
      }, 1500);
      setData(response.data.services);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch services!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (service) {
      getSingleService();
    } else {
      getApi();
    }
  }, [service]);

  // handle a service click
  const handleClick = async (id) => {
    // console.log(id);
    navigate(`/user/dashboard?service=${id}`);
    // const selectServices = data.find((service) => service.id === id);
    // console.log(selectServices);
    // if (selectServices) {
    //   setBaseFare(selectServices.fixed);
    //   setHourlyFare(selectServices.price);
    //   setServiceName(selectServices.name);

    // localStorage.setItem(
    //   "selectServices",
    //   JSON.stringify({
    //     baseFare: selectServices.fixed,
    //     hourlyFare: selectServices.price,
    //     serviceName: selectServices.name,
    //   })
    // );
    // }
  };

  const getSettingData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/setting`
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

  useEffect(() => {
    getSettingData();
  }, []);
  // console.log(settingData.booking_prefix);

  // Generate rendom id
  const generateBookingId = () => {
    setBookingId(
      `${settingData.booking_prefix}${Math.floor(
        10000 + Math.random() * 90000
      )}`
    );
  };

  // console.log("bookingId",bookingId);

  // Request A Service Methods
  const handleRequestService = () => {
    if (!location.city) {
      toast.warning("Please enter a valid address before proceeding.");
      return;
    }
    generateBookingId();
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  // Schedule A Service Methods
  const handleScheduleService = () => {
    if (!location.city) {
      toast.warning("Please enter a valid address before proceeding.");
      return;
    }
    generateBookingId();
    setScheduleModal(true);
  };

  const handleScheduleConfirm = () => {
    if (!scheduleDate || !scheduleTime) {
      toast.warning("Please select both date and time.");
      return;
    }
    const combineDateTime = `${scheduleDate} ${scheduleTime}:00`;
    setScheduleAt(combineDateTime);
    setShowModal(true);
    setScheduleModal(false);
  };
  // console.log("scheduleAt", scheduleAt);

  // POST API
  const handleBookService = async () => {
    let token = Cookies.get("loginToken");

    if (!token) {
      toast.error("User not authenticated");
      return;
    }

    if (!service) {
      toast.error("Service ID is missing");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.userId;

      const requestData = {
        booking_id: bookingId,
        user_id: userId,
        provider_id: null,
        service_type_id: service,
        status: "PENDING",
        payment_mode: paymentMode,
        paid: 0,
        distance: 0,
        s_address: null,
        s_latitude: 23.0225,
        s_longitude: 72.5714,
        d_address: location.city,
        d_latitude: location.lat,
        d_longitude: location.lon,
        schedule_at: scheduleAt ? scheduleAt : null,
        started_at: null,
        finished_at: null,
        user_rated: 0,
        provider_rated: 0,
        use_wallet: 0,
      };

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/request`,
        requestData,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      // console.log(requestData);

      toast.success("Service Request Created Successfully!");
      setIsLoading(true);
      setShowModal(false);
      setTimeout(() => {
        navigate("/user/myrequest");
      }, 2000);
    } catch (error) {
      console.error("Error creating service request:", error);
      toast.error("Failed to create service request.");
      setIsLoading(false);
    }
  };

  const getSingleService = async () => {
    let token = Cookies.get("loginToken");

    const headers = {
      authorization: `Bearer ${token}`,
    };
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/services/${service}`,
        {
          headers,
        }
      );
      setTimeout(() => {
        if (!response) {
          setIsLoading(true);
        }
      }, 2000);
      // console.log("frontendservices", response.data[0]);
      if (response) {
        setBaseFare(response.data[0].fixed);
        setHourlyFare(response.data[0].price);
        setServiceName(response.data[0].name);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch services!");
      setIsLoading(false);
    }
  };

  // document.title = "Dashboard";

  return (
    <>
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
            {/* <NavbarComp /> */}
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
              {!service && (
                <>
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
                  <p className={styles.selectServices}>Select Any Services</p>
                  <div className={styles.main_container}>
                    {data.map((service, index) => (
                      <div
                        className={styles.image_container}
                        onClick={() => handleClick(service.id)}
                        key={index}
                      >
                        <img
                          src={
                            service.image?.includes("https")
                              ? service.image
                              : `${process.env.REACT_APP_IMAGE_URL}/${service.image}`
                          }
                          alt={service.name}
                          className={styles.service_image}
                        />
                        <p className={styles.service_name}>{service.name}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {service && (
                <>
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
                  <p className={styles.requestServices}>Request a Service</p>
                  <div className={styles.requestServiceContainer}>
                    <div className={styles.formSection}>
                      {}
                      <p className={styles.selectedServices}>
                        Service Type: <span>{serviceName}</span>
                      </p>

                      {/* Location Search */}
                      <div className={styles.inputGroup}>
                        <label htmlFor="location">
                          Enter Service Location: <br />
                          <span
                            style={{
                              color: "red",
                              fontSize: "13px",
                              paddingBottom: "2px",
                            }}
                          >
                            (Please select a location from the suggestions)
                          </span>
                        </label>
                        <LocationSearch setLocation={setLocation} />
                      </div>

                      {/* Fare Details */}
                      <div className={styles.fareDetails}>
                        <p>
                          {/* Base Fare: <span>${baseFare}</span> */}
                          {baseFare ? (
                            <>
                              Fixed Fare: <span>${baseFare}</span>
                            </>
                          ) : (
                            <>Fixed Fare:$0</>
                          )}
                        </p>
                        <p>
                          {/* Hourly Fare: <span>${hourlyFare}</span> */}
                          {hourlyFare ? (
                            <>
                              Hourly Fare:<span>${hourlyFare}</span>
                            </>
                          ) : (
                            <>Hourly Fare:$0</>
                          )}
                        </p>
                      </div>

                      {/* Payment Methods */}
                      <div className={styles.paymentMethods}>
                        <label htmlFor="payment">Payment Methods</label>
                        <select
                          id="payment"
                          value={paymentMode}
                          onChange={(e) => setPaymentMode(e.target.value)}
                          className={`${styles.select} ${
                            paymentMode ? styles.selected : ""
                          }`}
                        >
                          <option value="" disabled>
                            Select Payment Method
                          </option>
                          <option value="CASH">Cash</option>
                          {/* <option value="CARD">Card</option>
                          <option value="UPI">UPI</option>
                          <option value="PAYPAL">PayPal</option> */}
                        </select>
                      </div>

                      {/*  Buttons */}
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.requestButton}
                          onClick={handleRequestService}
                        >
                          Request a Service
                        </button>
                        <button
                          className={styles.scheduleButton}
                          onClick={handleScheduleService}
                        >
                          Schedule Later
                        </button>
                      </div>
                    </div>

                    {/*  Map */}
                    <div className={styles.mapSection}>
                      <MapComponent location={location} />
                    </div>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </div>

        {/*Request a  Service Modal*/}
        <Modal
          show={showModal}
          backdrop="static"
          style={{ paddingTop: "61px" }}
        >
          <Modal.Header>
            <Modal.Title>Confirm Booking</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <b>Booking ID:</b> {bookingId}
            </p>
            <p>
              <b>Service Type:</b> {serviceName}
            </p>
            <p>
              <b>Location:</b> {location.city}
            </p>
            <p>
              <b>Payment Mode:</b> {paymentMode}
            </p>
            <p>
              <b>Total Fare:</b> ${baseFare}
            </p>
            <p>
              <b>Total Hours:</b>{" "}
              {hourlyFare > 0 ? (baseFare / hourlyFare).toFixed(2) : "N/A"} hrs
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button className={styles.scheduleButton} onClick={handleClose}>
              Close
            </Button>
            <Button
              className={styles.requestButton}
              onClick={handleBookService}
            >
              Book Service
            </Button>
          </Modal.Footer>
        </Modal>

        {/*Schedule a Service Modal*/}
        <Modal
          show={scheduleModal}
          backdrop="static"
          style={{ paddingTop: "58px" }}
        >
          <Modal.Header>
            <Modal.Title>Schedule Service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <label>Select Date & Time</label>
            <input
              type="datetime-local"
              value={scheduleAt}
              onChange={(e) => setScheduleAt(e.target.value)}
              className={styles.dateTimePicker}
              min={new Date().toISOString().slice(0, 16)}
            /> */}
            <label>Select Date</label>
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className={styles.datePicker}
              min={new Date().toISOString().split("T")[0]}
            />

            <label>Select Time</label>
            <input
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className={styles.timePicker}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setScheduleModal(false)}
              className={styles.scheduleButton}
            >
              Cancel
            </Button>
            <Button
              onClick={handleScheduleConfirm}
              className={styles.requestButton}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        {/* <div className={styles.footer}>
          <Footer />
        </div> */}
      </div>
    </>
  );
};
