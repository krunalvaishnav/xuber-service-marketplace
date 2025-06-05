import React from "react";
import Dashboard from "../../Dashboard";
import { Footer } from "../../../Components/Footer";
import { toast } from "react-toastify";
import Toast from "../../../Components/Toast";
import axios from "axios";
import styles from "../../../Styles/General/Documents/ListDocuments.module.css";
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
import { faPlus, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function ListDocuments() {
  const [data, setData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const navigate = useNavigate();

  const getApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/documents`
      );
      if ($.fn.DataTable.isDataTable("#userTable")) {
        $("#userTable").DataTable().destroy();
      }
      setData(response.data.documents);
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
      });
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      initializeDataTable();
    }
  }, [data]);

  const handleDeleteClick = async (document) => {
    setServiceId(document);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/admin/documents/${serviceId.id}/delete`
      );
      if (response.status === 200) {
        toast.success(response.data.message || "Successfully Deleted");
        setShowDeleteModal(false);
        setServiceId(null);

        if ($.fn.DataTable.isDataTable("#userTable")) {
          $("#userTable").DataTable().destroy();
        }

        getApi();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error || "Something went wrong");
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setServiceId(null);
  };

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
                <h5>Documents</h5>
                <p
                  className={styles.backBtn}
                  onClick={() => navigate("/admin/documents/create")}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  Add New Documents
                </p>
              </div>
              <table
                className="table table-striped table-bordered"
                id="userTable"
                // class="display"
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
                    data.map((document, index) => (
                      <tr>
                        <td className="text-left">{index + 1}</td>
                        <td>{document.name}</td>
                        <td>{document.type}</td>

                        <td>
                          <div className={styles.actionButton}>
                            <a href={`/admin/documents/${document.id}/edit`}>
                              <button className={styles.editBtn}>
                                <FontAwesomeIcon icon={faPen} />
                                Edit
                              </button>
                            </a>
                            <button
                              className={styles.deleteBtn}
                              onClick={() => handleDeleteClick(document)}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
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
          </div>
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
      </div>

      {/* cancle request modal  */}
      <Modal show={showDeleteModal} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>Cancel Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={styles.closeButton}
            onClick={handleCloseDeleteModal}
          >
            No, Keep Service
          </Button>
          <Button className={styles.modalCancelButton} onClick={handleDelete}>
            Yes, Delete Service
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ListDocuments;
