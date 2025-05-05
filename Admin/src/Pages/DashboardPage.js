import Dashboard from "./Dashboard";
import { Col, Row } from "react-bootstrap";
import styles from "../Styles/DashboardPage.module.css";
import { Footer } from "../Components/Footer";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import {
  FaUsers,
  FaUserShield,
  FaBriefcase,
  FaMotorcycle,
  FaDollarSign,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";
import MapComponent from "../Components/MapComponent";

// Chart.js imports
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const DashboardPage = () => {
  const [totalCounts, setTotalCounts] = useState({});
  const [location, setLocation] = useState({
    lat: 20.5937,
    lon: 78.9629,
  });
  const [topUser, setTopUser] = useState([]);
  const [topProvider, setTopProvider] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [requestList, setRequestList] = useState([]);
  const [cancellationData, setCancellationData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState({});

  const getTotalCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/total-count`
      );
      // console.log(response.data);
      setTimeout(() => {
        setTotalCounts(response.data.totalCount[0]);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };
  const getTotalRevenue = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/total-revenue`
      );
      // console.log(response.data);
      setTimeout(() => {
        setTotalRevenue(response.data.totalRevenue[0]);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalCount();
    getTopUser();
    getTopProvider();
    getRequestPerMonthData();
    getRequestList();
    getRequestCancellationRate();
    getTotalRevenue();
  }, []);
  // console.log("totalcount", totalCounts);

  const getTopUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/top-user`
      );
      // console.log(response.data);

      setTopUser(response.data.topUser);
    } catch (error) {
      console.error(error);
    }
  };
  const getTopProvider = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/top-provider`
      );
      // console.log(response.data);

      setTopProvider(response.data.topProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const getRequestPerMonthData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/request-time`
      );
      // console.log(response);

      const data = response.data;

      const monthCounts = {};
      data.forEach((item) => {
        const month = new Date(item.created_at).toISOString().slice(0, 7);
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      });
      // console.log("monthCounts", monthCounts);

      const labels = Object.keys(monthCounts).sort();
      const values = labels.map((month) => monthCounts[month]);
      // console.log(labels);
      // console.log(values);

      setChartData({
        labels,
        datasets: [
          {
            label: "Total Requests per Month",
            data: values,
            backgroundColor: [
              "rgba(255, 99, 132, 0.3)",
              "rgba(255, 159, 64, 0.3)",
              "rgba(255, 205, 86, 0.3)",
              "rgba(75, 192, 192, 0.3)",
              "rgba(54, 162, 235, 0.3)",
              "rgba(153, 102, 255, 0.3)",
              "rgba(201, 203, 207, 0.3)",
            ],
            borderColor: [
              "rgb(252, 52, 95)",
              "rgb(246, 144, 42)",
              "rgb(225, 159, 4)",
              "rgb(37, 188, 188)",
              "rgb(32, 153, 233)",
              "rgb(113, 48, 243)",
              "rgb(161, 164, 169)",
            ],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // console.log("chartdata", chartData);

  const getRequestList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/latest-service`
      );
      // console.log(response.data);

      setRequestList(response.data.AllRequest);
    } catch (error) {
      console.error(error);
    }
  };

  const getRequestCancellationRate = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/cancellations-request`
      );
      // console.log(response);

      const cancellationRate = response.data.requestCancellationRate;

      const labels = cancellationRate.map((item) => item.month);
      const cancellation_values = cancellationRate.map(
        (item) => item.cancelled_count
      );
      const complation_values = cancellationRate.map(
        (item) => item.completed_count
      );
      const pending_values = cancellationRate.map((item) => item.pending_count);

      // console.log(labels);
      // console.log(values);

      setCancellationData({
        labels,
        datasets: [
          {
            label: "Cancellation Rate per Month",
            data: cancellation_values,
            fill: false,
            borderColor: "rgb(248, 22, 44)",
            backgroundColor: "rgba(255, 99, 132, 0.3)",
            pointBackgroundColor: "rgb(133, 37, 47)",
            pointBorderColor: "#fff",
            tension: 0.3,
          },
          {
            label: "Complation Rate per Month",
            data: complation_values,
            fill: false,
            borderColor: "rgb(29, 204, 70)",
            backgroundColor: "rgba(0, 255, 94, 0.3)",
            pointBackgroundColor: "rgb(7, 148, 40)",
            pointBorderColor: "#fff",
            tension: 0.3,
          },
          {
            label: "Pending Rate per Month",
            data: pending_values,
            fill: false,
            borderColor: "rgb(255, 193, 7)",
            backgroundColor: "rgba(255, 193, 7, 0.3)",
            pointBackgroundColor: "rgb(187, 154, 56)",
            pointBorderColor: "#fff",
            tension: 0.3,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // console.log(cancellationData);
  const pieChartData = {
    labels: [
      "Total Payments",
      "Admin Earnings",
      "Provider Earnings",
      "Tax Amount",
    ],
    datasets: [
      {
        data: [
          totalRevenue.total_earning || 0,
          totalRevenue.total_admin_earnings || 0,
          totalRevenue.provider_earning || 0,
          totalRevenue.total_tax || 0,
        ],
        backgroundColor: ["#36A2EB", "#FF6384", "#4BC0C0", "#FFCE56"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <Dashboard />
      </div>
      {/* <NavbarUserDashboard /> */}
      <div className={styles.mainContent}>
        <div className={styles.tableDiv}>
          {/* count card start */}
          <div className={styles.table}>
            <h5> Dashboard</h5>

            <div className={styles.statsContainer}>
              <div className={styles.statCard}>
                <div
                  className={styles.iconContainer}
                  style={{ backgroundColor: "#d1fae5" }}
                >
                  <FaUsers style={{ color: "#10b981" }} />
                </div>
                <div className={styles.textContainer}>
                  <span>Total Clients</span>
                  <span className={styles.value}>
                    {totalCounts.total_user || 0}
                  </span>
                </div>
              </div>

              <div className={styles.statCard}>
                <div
                  className={styles.iconContainer}
                  style={{ backgroundColor: "#dbeafe" }}
                >
                  <FaBriefcase style={{ color: "#3b82f6" }} />
                </div>
                <div className={styles.textContainer}>
                  <span>Total Provider</span>
                  <span className={styles.value}>
                    {totalCounts.total_provider || 0}
                  </span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div
                  className={styles.iconContainer}
                  style={{ backgroundColor: "#fef3c7 " }}
                >
                  <FontAwesomeIcon icon={faFire} style={{ color: "#f59e0b" }} />
                </div>
                <div className={styles.textContainer}>
                  <span>Most Popular Service</span>
                  <span className={styles.value}>
                    {totalCounts.most_popular_service || 0}
                  </span>
                </div>
              </div>

              <div className={styles.statCard}>
                <div
                  className={styles.iconContainer}
                  style={{ backgroundColor: "#d1fae5" }}
                >
                  <FaDollarSign style={{ color: "#10b981" }} />
                </div>
                <div className={styles.textContainer}>
                  <span>Total Earning</span>
                  <span className={styles.value}>
                    ₹{(totalCounts.total_admin_earnings || 0).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className={styles.statCard}>
                <div
                  className={styles.iconContainer}
                  style={{ backgroundColor: "#fef3c7" }}
                >
                  <FaMotorcycle style={{ color: "#f59e0b" }} />
                </div>
                <div className={styles.textContainer}>
                  <span>Total Requests</span>
                  <span className={styles.value}>
                    {totalCounts.total_request || 0}
                  </span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div
                  className={styles.iconContainer}
                  style={{ backgroundColor: "#dbeafe" }}
                >
                  <FaCheckCircle style={{ color: "#3b82f6" }} />
                </div>
                <div className={styles.textContainer}>
                  <span>Completed Requests</span>
                  <span className={styles.value}>
                    {totalCounts.total_completed_request || 0}
                  </span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div
                  className={styles.iconContainer}
                  style={{ backgroundColor: "#fef3c7" }}
                >
                  <FaTimesCircle style={{ color: "#f59e0b" }} />
                </div>
                <div className={styles.textContainer}>
                  <span>Cancelled Requests</span>
                  <span className={styles.value}>
                    {totalCounts.total_cancelled_request || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Active user and provider table start */}
          <div className={styles.manyTable}>
            <div className={styles.table2}>
              <h5> Top 5 Active Users</h5>
              <div className={styles.tableContainer}>
                <table className={styles.userTable}>
                  <thead>
                    <tr>
                      <th>Sr.no.</th>
                      <th>Name</th>
                      <th>Total Request</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topUser.map((provider, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {provider.first_name} {provider.last_name}
                        </td>
                        <td>{provider.total_request}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.table2}>
              <h5> Top 5 Active Provider</h5>
              <div className={styles.tableContainer}>
                <table className={styles.userTable}>
                  <thead>
                    <tr>
                      <th>Sr.no.</th>
                      <th>Name</th>
                      <th>Total Request</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProvider.map((provider, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {provider.first_name} {provider.last_name}
                        </td>
                        <td>{provider.total_request}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Revenue &  cancellation request chart div start  */}
          <div className={styles.manyTable5}>
            <div className={styles.table5}>
              <h5>Total Revenue</h5>
              {/* request chart start */}
              <div style={{ width: "100%" }} className={styles.requestChart}>
                {/* {chartData ? <Bar data={chartData} /> : <p>Loading...</p>} */}
                <div style={{ width: "100%", height: "400px" }}>
                  {" "}
                  {/* Adjust dimensions */}
                  <Pie data={pieChartData} options={options} />
                </div>
              </div>
              {/* request chart end */}
            </div>
            <div className={styles.table5}>
              <h5>Request Rate </h5>
              {/* request chart start */}
              {cancellationData && cancellationData.datasets ? (
                <Line data={cancellationData} />
              ) : (
                <p>Loading...</p>
              )}

              {/* request chart end */}
            </div>
          </div>

          {/* map div start  */}
          <div className={styles.table3}>
            <h5> Service Request Map</h5>

            {/* MAP start */}
            <div className={styles.mapContiner}>
              <MapComponent location={location} />
            </div>
            {/* MAP end */}
          </div>

          {/* Request Chart div start  */}
          <div className={styles.manyTable4}>
            <div className={styles.table4}>
              <h5> Request Map Per Month</h5>
              {/* request chart start */}
              <div style={{ width: "100%" }} className={styles.requestChart}>
                {chartData ? <Bar data={chartData} /> : <p>Loading...</p>}
              </div>
              {/* request chart end */}
            </div>
            <div className={styles.table4}>
              <h5> latest Requests </h5>
              <table className={styles.userTable4}>
                <thead>
                  <tr>
                    <th>Sr. no.</th>
                    <th>Booking Id</th>
                    <th>User Name</th>
                    <th>Service Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...requestList]
                    .reverse()
                    .slice(0, 8)
                    .map((service, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{service.booking_id}</td>
                        <td>
                          {service.user_first_name} {service.user_last_name}
                        </td>
                        <td>{service.service_name}</td>
                        <td>{service.status}</td>
                      </tr>
                    ))}
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
  );
};
