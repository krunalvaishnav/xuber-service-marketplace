import Dashboard from "../../Dashboard";
import styles from "../../../Styles/Members/User/ListUser.module.css";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import "datatables.net-responsive";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import "datatables.net-buttons/js/dataTables.buttons.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faPen,
  faTrashCan,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Footer } from "../../../Components/Footer";
import { toast } from "react-toastify";
import Toast from "../../../Components/Toast";
import { useNavigate } from "react-router-dom";

export const ListUser = () => {
  const [data, setData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const getApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/user`
      );
      // console.log(response);
      if ($.fn.DataTable.isDataTable("#userTable")) {
        $("#userTable").DataTable().destroy();
      }
      setData(response.data.user);
    } catch (error) {
      console.error("data fetching error", error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  // Datatable
  // useEffect(() => {
  //   if (window.jQuery && data.length > 0) {
  //     setTimeout(() => {
  //       if (!$.fn.DataTable.isDataTable("#userTable")) {
  //         $("#userTable").DataTable({
  //           layout: {
  //             topStart: "buttons",
  //           },
  //           responsive: false,
  //           // dom: "Bfrtip",
  //           buttons: ["copy", "csv", "excel", "pdf", "print"],
  //         });
  //       }
  //     });
  //   }
  // }, [data]);
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

  const handleDeleteClick = (user) => {
    setUserId(user);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/admin/user/${userId.id}/delete`
      );

      if (response.status === 200) {
        toast.success("Users Deleted Successfully");
        setShowDeleteModal(false);
        setUserId(null);

        if ($.fn.DataTable.isDataTable("#userTable")) {
          $("#userTable").DataTable().destroy();
        }
        // setTimeout(() => {
        getApi();
        // }, 1500);
      }
    } catch (error) {
      console.error("Error deleting user", error);
      toast.error("Failed to delete user");
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setUserId(null);
  };
  return (
    <>
      <Toast />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Dashboard />
        </div>
        <div className={styles.mainContent}>
          <div className={styles.tableDiv}>
            <div className={styles.table}>
              <div className={styles.topStart}>
                <h5>Users</h5>
                <p
                  className={styles.backBtn}
                  onClick={() => navigate("/admin/user/create")}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  Add Service Type
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
                    <th className="text-left">First Name</th>
                    <th className="text-left">Last Name</th>
                    <th className="text-left">Email</th>
                    <th className="text-left">Mobile</th>
                    <th className="text-left">Rating</th>
                    <th className="text-left">Wallet Amount</th>
                    <th className="text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    [...data].reverse().map((user, index) => (
                      <tr key={index}>
                        <td className="text-left">{index + 1}</td>
                        <td className="text-left">{user.first_name}</td>
                        <td className="text-left">{user.last_name}</td>
                        <td className="text-left">{user.email}</td>
                        <td className="text-left">{user.mobile}</td>
                        <td className="text-left">{user.rating}</td>
                        <td className="text-left">{user.wallet_balance}</td>
                        <td className={"text-left"}>
                          <div className={styles.actionButton}>
                            <a href={`/admin/user/${user.id}/request`}>
                              <button className={styles.historyBtn}>
                                <FontAwesomeIcon icon={faClockRotateLeft} />{" "}
                                History
                              </button>
                            </a>
                            <a href={`/admin/user/${user.id}/edit`}>
                              <button className={styles.editBtn}>
                                <FontAwesomeIcon icon={faPen} />
                                Edit
                              </button>
                            </a>
                            <button
                              className={styles.deleteBtn}
                              onClick={() => handleDeleteClick(user)}
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

      <Modal
        show={showDeleteModal}
        backdrop="static"
        centered
        className={styles.cancelModal}
      >
        <Modal.Header className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <p className={styles.confirmationText}>
            Are you sure you want to delete this User?
          </p>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button
            className={styles.closeButton}
            onClick={handleCloseDeleteModal}
          >
            No, Keep User
          </Button>
          <Button className={styles.cancelButton} onClick={handleDelete}>
            Yes, Delete User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
