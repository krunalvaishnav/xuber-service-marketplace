import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { DashboardProvider } from "../Dashboard";
import NavbarUserDashboardProvider from "../NavbarProvider";
import { Footer } from "../../Footer";
import styles from "../../../Styles/ProviderDashboardStyle/Services/CancelledService.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faCalendarDays,
  faClock,
  faGear,
  faCheck,
  faTimes,
  faStar,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import UpcomingServiceNavbar from "./UpcomingServiceNavbar";
import $ from "jquery";
import "datatables.net";
import "datatables.net-responsive";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import "datatables.net-buttons/js/dataTables.buttons.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

export const CancelledService = () => {
  const [data, setData] = useState([]);

  const getProviderCancelledService = async () => {
    let token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/cancelled-request`,
        { headers }
      );

      let requestData = response.data.ComplatedRequestData;

      setData(requestData);
    } catch (error) {
      console.error("Error fetching provider status:", error);
    }
  };

  useEffect(() => {
    getProviderCancelledService();
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
                    className="table  table-bordered"
                    id="userTable"
                    // class="display"
                  >
                    <thead>
                      <tr>
                        <th className="text-left">Sr. No.</th>
                        <th className="text-left">Booking ID</th>
                        <th className="text-left">Customer</th>
                        <th className="text-left">Service</th>
                        <th className="text-left">Date & Time</th>
                        <th className="text-left">Reason </th>
                        <th className="text-left">Cancelled On </th>
                        <th className="text-left">Rating </th>
                        <th className="text-left">Feedback </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        [...data].reverse().map((service, index) => (
                          <tr>
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

                            <td className="text-left">Reason not specified</td>
                            <td className="text-left">
                              <div className={styles.dateTime}>
                                <div className={styles.date}>
                                  {new Date(service.updated_at).toLocaleString(
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
                                    service.updated_at
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
                            <td className="text-left">
                              {service.user_comment ? (
                                service.user_comment
                              ) : (
                                <span style={{ color: "#8c8c8c" }}>
                                  Not Given
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center">
                            You have not cancel any service yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>{" "}
            </Col>
          </Row>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};
