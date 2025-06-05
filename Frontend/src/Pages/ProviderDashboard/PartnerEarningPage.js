import React, { useState, useEffect } from "react";
import styles from "../../Styles/ProviderDashboardStyle/PartnerEarningPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Footer } from "../Footer";
import PartnerEarningNavbar from "./PartnerEarningNavbar";
import NavbarUserDashboardProvider from "./NavbarProvider";
import { Col, Row, Form } from "react-bootstrap";
import { DashboardProvider } from "./Dashboard";
import axios from "axios";
import Cookies from "js-cookie";

export const PartnerEarningPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [totalEarning, setTotalEarning] = useState([]);
  const [serviceCount, setServiceCount] = useState({
    services_completed_today: 0,
    total_complated_services: 0,
    provider_cancellation: 0,
    total_services: 0,
  });
  const [weeklyServiceCount, setWeeklyServiceCount] = useState({
    total_provider_earnings: 0,
    total_services: 0,
    total_completed_services: 0,
  });
  const [dailyServiceData, setDailyServiceData] = useState({});
  const [earningsData, setEarningsData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [settingData, setSettingData] = useState({ daily_target: "0" });
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  const getProviderTotalEarning = async () => {
    let token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/total-earning`,
        { headers }
      );

      const earnings =
        response.data?.totalEarning?.[0]?.total_provider_earnings;
      setTotalEarning(earnings || 0);
    } catch (error) {
      console.error("Error fetching provider earning:", error);
      setTotalEarning(0);
    }
  };

  const getProviderServiceCount = async () => {
    let token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/total-service-count`,
        { headers }
      );

      const data = response.data?.serviceCount?.[0] || {
        services_completed_today: 0,
        total_complated_services: 0,
        provider_cancellation: 0,
        total_services: 0,
      };

      const acceptanceRate =
        data.total_services > 0
          ? (
              (data.total_complated_services / data.total_services) *
              100
            ).toFixed(2)
          : "0";

      setServiceCount({
        ...data,
        acceptance_rate: acceptanceRate,
      });
    } catch (error) {
      console.error("Error fetching provider earning:", error);
      setServiceCount({
        services_completed_today: 0,
        total_complated_services: 0,
        provider_cancellation: 0,
        total_services: 0,
        acceptance_rate: "0",
      });
    }
  };

  const getDailyServiceData = async () => {
    let token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/daily-service`,
        { headers }
      );
      // console.log(response);

      let requestData = response.data.DailyServiceData;

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
      setDailyServiceData(updatedData);
    } catch (error) {
      console.error("Error fetching provider earning:", error);
    }
  };

  const getWeeklyServiceCount = async () => {
    let token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/weekly-service-count`,
        { headers }
      );

      if (
        response.data &&
        response.data.weeklyServiceCount &&
        response.data.weeklyServiceCount[0]
      ) {
        setWeeklyServiceCount(response.data.weeklyServiceCount[0]);
      } else {
        setWeeklyServiceCount({
          total_provider_earnings: 0,
          total_services: 0,
          total_completed_services: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching provider earning:", error);
      setWeeklyServiceCount({
        total_provider_earnings: 0,
        total_services: 0,
        total_completed_services: 0,
      });
    }
  };
  const getWeeklyServiceEarningData = async () => {
    let token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/weekly-service`,
        { headers }
      );

      setEarningsData(response.data.weeklyServiceEarningData);
    } catch (error) {
      console.error("Error fetching provider earning:", error);
    }
  };

  const maxEarnings =
    earningsData && earningsData.length > 0
      ? Math.max(
          ...earningsData.map((data) => data.total_provider_earnings || 0)
        )
      : 0;
  // console.log(maxEarnings);
  const getSettingData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/setting`
      );

      // console.log("Full API response:", response);
      // console.log("response.data:", response.data);
      // console.log("siteSettings:", response.data?.siteSetting);

      const dailyTarget =
        response.data.siteSettings.find((s) => s.key === "daily_target")
          ?.value || "0";
      // console.log("dailyTarget", dailyTarget);

      setSettingData({ daily_target: dailyTarget });
    } catch (error) {
      console.error("Error in getSettingData:", error);
      setSettingData({ daily_target: "0" });
    }
  };
  // console.log(settingData.daily_target);

  useEffect(() => {
    getProviderTotalEarning();
    getProviderServiceCount();
    getDailyServiceData();
    getWeeklyServiceCount();
    getWeeklyServiceEarningData();
    getSettingData();
  }, []);

  return (
    <div className={styles.fullComponent}>
      <div>
        <NavbarUserDashboardProvider />
      </div>

      <div className={styles.nav}>
        <Row
          // style={{
          //   // paddingTop: "10px",
          //   // width: "100%",

          //   padding: "150px 0px",
          //   gap: "20px",
          //   alignItems: "top",
          //   width: "100%",
          //   margin: "auto",
          // }}
          // className="justify-content-md-center"
          className={styles.mainDiv}
        >
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
            <PartnerEarningNavbar />
            <div className={styles.container}>
              <div className={styles.totalEarningsSection}>
                <h5>Total Earnings:</h5>
                <p>₹{Number(totalEarning || 0).toFixed(2)}</p>
              </div>
              <hr />
              <div className={styles.statsSection}>
                <div className={styles.statsItem}>
                  <p>
                    {serviceCount.services_completed_today
                      ? serviceCount.services_completed_today
                      : "0"}
                  </p>
                  <span>SERVICES COMPLETED TODAY</span>
                </div>

                <div className={styles.statsItem}>
                  <p>{settingData.daily_target}</p>
                  <span>DAILY SERVICES TARGET</span>
                </div>

                <div className={styles.statsItem}>
                  <p>
                    {serviceCount.total_complated_services
                      ? serviceCount.total_complated_services
                      : "0"}
                  </p>
                  <span>TOTAL COMPLETED SERVICES</span>
                </div>

                <div className={styles.statsItem}>
                  <p>{serviceCount.acceptance_rate}%</p>
                  <span>COMPLETION RATE</span>
                </div>

                <div className={styles.statsItem}>
                  <p>
                    {serviceCount.provider_cancellation
                      ? serviceCount.provider_cancellation
                      : "0"}
                  </p>
                  <span>PROVIDER CANCELLATIONS</span>
                </div>
              </div>

              <div className={styles.weeklyEarning}>
                <p className={styles.generalInfo}>Weekly Earnings</p>
                <div className={styles.weeklyEarnings}>
                  <div
                    className={styles.serviceEarnings}
                    onClick={toggleDropdown}
                  >
                    <span
                      className={
                        isExpanded ? styles.arrowDown : styles.arrowRight
                      }
                    >
                      <FontAwesomeIcon icon={faAngleRight} />
                    </span>
                    <span>Service Earnings</span>
                  </div>
                  {isExpanded && (
                    <div className={styles.dropdownContent}>
                      <div className={styles.statsContainer}>
                        <div className={styles.statBox}>
                          <p className={styles.statLabel}>Total Earnings</p>
                          <p className={styles.statValue}>
                            ₹
                            {weeklyServiceCount
                              ? Number(
                                  weeklyServiceCount.total_provider_earnings ||
                                    0
                                ).toFixed(2)
                              : "0.00"}
                          </p>
                        </div>

                        <div className={styles.statBox}>
                          <p className={styles.statLabel}>Total Services</p>
                          <p className={styles.statValue}>
                            {weeklyServiceCount
                              ? weeklyServiceCount.total_services || 0
                              : 0}
                          </p>
                        </div>

                        <div className={styles.statBox}>
                          <p className={styles.statLabel}>Completed Services</p>
                          <p className={styles.statValue}>
                            {weeklyServiceCount
                              ? weeklyServiceCount.total_completed_services || 0
                              : 0}
                          </p>
                        </div>
                      </div>

                      <div className={styles.dailyBreakdown}>
                        <strong>Daily Breakdown</strong>
                        {earningsData && earningsData.length > 0 ? (
                          earningsData.map((data) => (
                            <div key={data.day} className={styles.dayContainer}>
                              <p className={styles.dayLabel}>
                                {new Date(data.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                  }
                                )}{" "}
                                <span>
                                  ₹{data.total_provider_earnings || 0}
                                </span>
                              </p>
                              <div className={styles.progressBar}>
                                <div
                                  className={styles.progressFill}
                                  style={{
                                    width: `${
                                      maxEarnings > 0
                                        ? ((data.total_provider_earnings || 0) /
                                            maxEarnings) *
                                          100
                                        : 0
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div>No earnings data available</div>
                        )}
                      </div>
                    </div>
                  )}
                  {/* <hr /> */}
                  {/* <div>
                    <p className={styles.estimatedPayout}>
                      Estimated Payout: $0
                    </p>
                  </div> */}
                </div>
              </div>
              <hr />

              <div className={styles.dailyEarnings}>
                <p className={styles.generalInfo}>Daily Earnings</p>
                <div className={styles.filter}>
                  <span>Status </span>
                  <Form.Select
                    style={{
                      padding: "5px 35px 5px 10px",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option>All </option>
                    <option>Accepted </option>
                    <option>Completed</option>
                  </Form.Select>
                </div>
              </div>

              <div className={styles.tableContainer}>
                <table className={styles.earningsTable}>
                  <thead>
                    <tr>
                      <th>Booking Id</th>
                      <th>Start Time</th>
                      <th>Service Name</th>
                      <th>Duration</th>
                      <th>Status</th>
                      <th>Distance(KM)</th>
                      <th>Cash Collected</th>
                      <th>Total Earnings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyServiceData.length > 0 ? (
                      [...dailyServiceData]
                        .reverse()
                        .filter(
                          (request) =>
                            filter === "All" ||
                            request.status.toUpperCase() ===
                              filter.toUpperCase()
                        )

                        .map((service, index) => (
                          <tr key={index}>
                            <td>{service.booking_id}</td>
                            <td>
                              {new Date(service.started_at).toLocaleString(
                                "en-US",
                                {
                                  timeZone: "UTC",
                                  month: "long",
                                  day: "2-digit",
                                }
                              )}
                              ,
                              {new Date(service.started_at).toLocaleTimeString(
                                "en-US",
                                {
                                  timeZone: "UTC",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </td>
                            <td className="text-left">
                              {service.service_type_name}
                            </td>
                            <td className="text-left">
                              {service.duration ? service.duration : "00:00:00"}
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
                            <td className="text-left">
                              {service.distance ? service.distance : "0.00"}
                            </td>
                            <td className="text-left">
                              {service.total ? service.total : "0.00"}
                            </td>
                            <td className="text-left">
                              {service.provider_earnings
                                ? service.provider_earnings
                                : "0.00"}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          You haven't do any service today.
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
  );
};
