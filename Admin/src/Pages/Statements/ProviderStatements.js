import Dashboard from "../Dashboard";
import styles from "../../Styles/Statements/ProviderStatements.module.css";
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
import { formatDistanceToNow } from "date-fns";
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

function ProviderStatements() {
  const [data, setData] = useState([]);

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

  const getProviderStatementsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/providerstatement-data`
      );

      setData(response.data.providerStatementsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProviderStatementsData();
  }, []);

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
              <h5>Provider Statements</h5>

              <div className={styles.tableDiv}>
                <table
                  className="table table-bordered"
                  id="userTable"
                  // class="display"
                  //  className={styles.earningsTable}
                >
                  <thead>
                    <tr>
                      <th className="text-left">Sr. No.</th>
                      <th className="text-left">Provider Name</th>
                      <th className="text-left">Mobile Number</th>
                      <th className="text-left">Total Services</th>
                      <th className="text-left">Completed Services</th>
                      <th className="text-left">Current Pending Services</th>
                      <th className="text-left">Total Earnings (₹)</th>
                      <th className="text-left">Current Rating</th>
                      <th className="text-left">Member Since</th>
                      <th className="text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      [...data].reverse().map((service, index) => (
                        <tr>
                          <td className="text-left">{index + 1}</td>
                          <td className="text-left">
                            {" "}
                            {service.first_name} {service.last_name}
                          </td>
                          <td className="text-left">{service.mobile}</td>
                          <td className="text-left">
                            {service.total_services}
                          </td>
                          <td className="text-left">
                            {service.total_completed_services}
                          </td>
                          <td className="text-left">
                            {service.total_pending_services}
                          </td>
                          <td className="text-left">
                            ₹ {(service.total_earnings || 0).toFixed(2)}
                          </td>
                          <td className="text-left">
                            {" "}
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "#fabd12" }}
                            />{" "}
                            {service.rating
                              ? Math.floor(service.rating)
                              : "Not Rated"}
                          </td>
                          <td className="text-left" style={{ color: "gray" }}>
                            {formatDistanceToNow(
                              new Date(service.member_since),
                              { addSuffix: true }
                            )}
                          </td>
                          <td className="text-left">
                            <div className={styles.actionButton}>
                              <a
                                href={`/admin/provider/${service.provider_id}/request`}
                              >
                                <button
                                  className={styles.detailsButton}
                                  // onClick={() => handleDetails(request)}
                                >
                                  <FontAwesomeIcon icon={faInfoCircle} />
                                  More Detail
                                </button>
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="text-center">
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
    </>
  );
}

export default ProviderStatements;
