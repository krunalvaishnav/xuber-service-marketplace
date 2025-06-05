import React, { useEffect, useState } from "react";
import { Footer } from "../Footer";
import { NavLink } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Cookies from "js-cookie";
import NavbarUserDashboardProvider from "./NavbarProvider";
import { DashboardProvider } from "./Dashboard";
import styles from "../../Styles/ProviderDashboardStyle/ManageDocument.module.css";
import ProfileNavbar from "./ProfileNavbar";
import $ from "jquery";
import "datatables.net";
import "datatables.net-responsive";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import "datatables.net-buttons/js/dataTables.buttons.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faHourglassHalf,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";

export const ManageDocument = () => {
  const [data, setData] = useState([]);
  const [uploadedDocument, setUploadedDocument] = useState([]);

  const getApi = async () => {
    let token = Cookies.get("providerToken");
    // console.log(token);

    const headers = {
      authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/list-documents`,
        {
          headers,
        }
      );

      // console.log(response);
      setData(response.data.documents);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getApi();
    getUploadedDocument();
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
      });
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      initializeDataTable();
    }
  }, [data]);

  const getUploadedDocument = async () => {
    const token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/get-upload-document`,
        { headers }
      );
      if ($.fn.DataTable.isDataTable("#userTable")) {
        $("#userTable").DataTable().destroy();
      }
      // console.log(response);

      setUploadedDocument(response.data.uploadDocument);
      // console.log(response.data.uploadDocument);
    } catch (error) {
      console.error(error);
    }
  };

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
                border: "1px solid #e2e2e2",
                padding: "20px",
              }}
            >
              <ProfileNavbar />
              <hr />
              <div className={styles.uploadBtnContainer}>
                <a href="/provider/upload-document">
                  <button>
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                    Upload Document
                  </button>
                </a>
              </div>

              <div className={styles.tableContainer}>
                <table
                  className={`${styles.table} table table-bordered table-hover`}
                  id="userTable"
                  // class="display"
                >
                  <thead>
                    <tr>
                      <th className="text-left">Sr. No.</th>
                      <th className="text-left">Document Name</th>
                      <th className="text-left">Type</th>
                      <th className="text-left">Status</th>
                      <th className="text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((document, index) => {
                        const uploadDoc = uploadedDocument.find(
                          (doc) =>
                            String(doc.document_id) === String(document.id)
                        );
                        console.log("uploddoc", uploadDoc);

                        return (
                          <tr>
                            <td className="text-left">{index + 1}</td>
                            <td>{document.name}</td>
                            <td>{document.type}</td>
                            <td>
                              {uploadDoc ? (
                                <div
                                  className={
                                    uploadDoc.status === "ASSESSING"
                                      ? styles.ASSESSING
                                      : styles.ACTIVE
                                  }
                                >
                                  {uploadDoc.status === "ASSESSING" ? (
                                    <>
                                      <FontAwesomeIcon icon={faHourglassHalf} />
                                      Assessing
                                    </>
                                  ) : (
                                    <>
                                      <FontAwesomeIcon icon={faCheck} />
                                      Approved
                                    </>
                                  )}
                                </div>
                              ) : (
                                <span className={styles.naStatus}>
                                  N/A
                                </span>
                              )}
                            </td>

                            <td >
                              <div className={styles.actionButton}>
                                {uploadDoc?.url ? (
                                  <button
                                    onClick={() =>
                                      window.open(
                                        `${process.env.REACT_APP_IMAGE_URL}/${uploadDoc.url}`,
                                        "_blank"
                                      )
                                    }
                                    className={styles.viewButton}
                                  >
                                    View
                                  </button>
                                ) : (
                                  <span className={styles.noFile}>
                                    No file uploaded
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No Data Available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </div>

        {/* <div className={styles.offCanvas}>
          <Col
            md="8"
            lg="8"
            xl="8"
            xxl="7"
            style={{
              paddingTop: "10px",
              paddingLeft: "16px",
              fontSize: "13px",
            }}
          >
            
              <ProfileNavbar />
            
            <Row>
         Work in process
            </Row>
          </Col>
        </div> */}
      </div>
      {/* <Footer /> */}
    </>
  );
};
