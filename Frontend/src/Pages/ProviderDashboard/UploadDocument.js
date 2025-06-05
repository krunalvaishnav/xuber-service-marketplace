import React, { useEffect, useState } from "react";
import { Footer } from "../Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Cookies from "js-cookie";
import NavbarUserDashboardProvider from "./NavbarProvider";
import { DashboardProvider } from "./Dashboard";
import styles from "../../Styles/ProviderDashboardStyle/UploadDocument.module.css";
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
  faPlus,
  faPen,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";

export const UploadDocument = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedDocument, setUploadedDocument] = useState([]);

  const getApi = async () => {
    const token = Cookies.get("providerToken");
    const headers = { authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/list-documents`,
        { headers }
      );
      if ($.fn.DataTable.isDataTable("#userTable")) {
        $("#userTable").DataTable().destroy();
      }
      const documents = response.data.documents;
      setData(documents);
      // console.log(documents);
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

  const handleFileChange = (event, index) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => {
      const updatedFiles = { ...prevFiles, [index]: files };
      return updatedFiles;
    });
  };

  // Upload all files
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.warning("Please select files before uploading.");
      return;
    }

    const fd = new FormData();

    const generateUniqueId = () => Math.floor(10000 + Math.random() * 900000);
    // console.log("id", generateUniqueId());

    Object.entries(selectedFiles).forEach(([index, files]) => {
      if (files && files.length > 0) {
        files.forEach((file) => {
          fd.append("url", file);
        });
        fd.append("document_id", data[index]?.id || "");
        fd.append("unique_id", `UID_${generateUniqueId()}`);
      }
    });

    try {
      const token = Cookies.get("providerToken");
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/provider/upload-document`,
        fd,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message || "Upload successful!");
      setTimeout(() => {
        navigate("/provider/document");
        // getApi();
      }, 2000);
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error);
    }
  };

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
      setUploadedDocument(response.data.uploadDocument);
      // console.log(response.data.uploadDocument);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.fullComponent}>
        <Toast />
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
                padding: "20px ",
              }}
            >
              <ProfileNavbar />
              <hr />

              <div className={styles.topStart}>
                <h5 style={{ marginBottom: "10px" }}>
                  Upload documents (Only .pdf, .jpg, .jpeg, .png files are
                  allowed)
                </h5>
                <p
                  className={styles.backBtn}
                  onClick={() => navigate("/provider/document")}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                  Back
                </p>
              </div>
              <div className={styles.tableContainer}>
                <table
                  className={`${styles.table} table table-bordered table-hover`}
                  id="userTable"
                >
                  <thead>
                    <tr>
                      <th className="text-left">Sr. No.</th>
                      <th className="text-left">Document Name</th>
                      <th className="text-left">Type</th>
                      <th className="text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((document, index) => {
                        const uploadedDoc = uploadedDocument.find(
                          (doc) =>
                            String(doc.document_id) === String(document.id)
                        );

                        return (
                          <tr key={document.id || index}>
                            <td className="text-left">{index + 1}</td>
                            <td>{document.name}</td>
                            <td>{document.type}</td>
                            <td>
                              <div className={styles.action}>
                                <div className={styles.actionButton}>
                                  <input
                                    type="file"
                                    multiple
                                    className={styles.chooseFileInput}
                                    onChange={(event) =>
                                      handleFileChange(event, index)
                                    }
                                  />
                                  {uploadedDoc?.url ? (
                                    <button
                                      onClick={() =>
                                        window.open(
                                          `${process.env.REACT_APP_IMAGE_URL}/${uploadedDoc.url}`,
                                          "_blank"
                                        )
                                      }
                                      className={styles.viewButton}
                                    >
                                      View
                                    </button>
                                  ) : (
                                    <span className={styles.noFile}>
                                      {" "}
                                      No file uploaded
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No Data Available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className={styles.saveButtonWrapper}>
                <button onClick={handleUpload} className={styles.saveButton}>
                  Save
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};
