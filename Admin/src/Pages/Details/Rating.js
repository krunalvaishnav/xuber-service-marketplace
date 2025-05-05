import React from "react";
import Dashboard from "../Dashboard";
import { Footer } from "../../Components/Footer";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";
import axios from "axios";
import styles from "../../Styles/Details/Rating.module.css";
import { useState } from "react";
import { useEffect } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-responsive";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import "datatables.net-buttons/js/dataTables.buttons.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Rating() {
  const [data, setData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const navigate = useNavigate();

  const getApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/ratings`
      );
      if ($.fn.DataTable.isDataTable("#userTable")) {
        $("#userTable").DataTable().destroy();
      }
      setData(response.data.ratingsData);
    } catch (error) {
      console.error(error);
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
        columnDefs: [
          {
            width: "20%",
            targets: 5, // Comment column
            className: "commentCell", // Apply our custom class
          },
        ],
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
      <Toast />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Dashboard />
        </div>

        <div
          className={`${styles.mainContent} ${
            showDeleteModal ? styles.blurBackground : ""
          }`}
        >
          <div className={styles.tableDiv}>
            <div className={styles.table}>
              <div className={styles.topStart}>
                <h5>Ratings</h5>
              </div>

              <table
                className="table table-striped table-bordered"
                id="userTable"
                // class="display"
              >
                <thead>
                  <tr>
                    <th className="text-left">Sr. No.</th>
                    <th className="text-left">Booking ID</th>
                    <th className="text-left">User Name</th>
                    <th className="text-left">Provider Name</th>
                    <th className="text-left">Rating</th>
                    <th className="text-left">Comment</th>
                    <th className="text-left">Date </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    [...data].reverse().map((service, index) => (
                      <tr>
                        <td className="text-left">{index + 1}</td>
                        <td className="text-left">{service.booking_id}</td>

                        <td>
                          {service.user_first_name} {service.user_last_name}
                        </td>
                        <td>
                          {service.provider_first_name}{" "}
                          {service.provider_last_name}
                        </td>
                        <td className="text-left">
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "#fabd12" }}
                          />{" "}
                          {service.user_rating
                            ? Math.floor(service.user_rating)
                            : "Not Rated"}
                        </td>
                        <td className="text-warp">{service.user_comment}</td>

                        <td className="text-left">
                          {new Date(service.rating_date).toLocaleString(
                            "en-US",
                            {
                              timeZone: "UTC",
                              month: "long",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )}
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
    </>
  );
}

export default Rating;
