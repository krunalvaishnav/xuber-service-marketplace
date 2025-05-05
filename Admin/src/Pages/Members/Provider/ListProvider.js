import Dashboard from "../../Dashboard";
import { Button, Modal } from "react-bootstrap";
import styles from "../../../Styles/Members/Provider/ListProvider.module.css";
import React, { useEffect, useState } from "react";
import { Footer } from "../../../Components/Footer";
import { toast } from "react-toastify";
import Toast from "../../../Components/Toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  faMoneyCheckDollar,
  faSortDown,
  faCaretRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export const ListProvider = () => {
  const [data, setData] = useState([]);
  const [actionDropdown, setActionDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [providerId, setProviderId] = useState(null);
  const [allocatedServices, setAllocatedServices] = useState([]);
  const [status, setStatus] = useState("banned");
  const navigate = useNavigate();

  const toggleDropdown = (index) => {
    setActionDropdown(actionDropdown === index ? null : index);
  };

  const getApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/provider`
      );

      if ($.fn.DataTable.isDataTable("#userTable")) {
        $("#userTable").DataTable().destroy();
      }

      setData(response.data.provider);
    } catch (error) {
      console.error("Data fetching error", error);
    }
  };

  useEffect(() => {
    getApi();
    getProviderAllocatedService();
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

  const handleDeleteClick = (provider) => {
    setProviderId(provider);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/admin/provider/${providerId.id}/delete`
      );
      if (response.status === 200) {
        toast.success(response.data.message || "Deleted Successfully");
        setShowDeleteModal(false);
        setProviderId(null);

        if ($.fn.DataTable.isDataTable("#userTable")) {
          $("#userTable").DataTable().destroy();
        }
        getApi();
      }
    } catch (error) {}
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProviderId(null);
  };

  // Document ans service button purpose

  const getProviderAllocatedService = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/allocated-service`
      );
      // console.log(response);

      if (response.status === 200) {
        // const allocatedId = response.data.serviceAllocation[0].provider_id;
        const allocatedId = response.data.serviceAllocation.map(
          (id) => id.provider_id
        );

        // console.log(allocatedId);
        setAllocatedServices(allocatedId);
      }
    } catch (error) {
      console.error("Allocated Service Fetch Error", error);
    }
  };

  const isProviderAllocated = (providerId) => {
    return allocatedServices.includes(providerId);
  };

  // handle provider status

  const handleToggleProviderStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Approved" ? "Banned" : "Approved";

    if (!isProviderAllocated(id) && currentStatus === "Banned") {
      navigate(`/admin/provider/${id}/document`);

      setTimeout(() => {
        toast.error("Provider has not been assigned a service type!");
      }, 200);
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/provider-status/${id}`,
        {
          status: newStatus,
        }
      );
      toast.success(`Provider ${newStatus} successfully`);

      getApi();
    } catch (error) {
      console.error("Failed to update your status", error);
    }
  };

  // useEffect(() => {
  //   handleToggleProviderStatus();
  // }, []);
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
                <h5>Providers</h5>
                <p
                  className={styles.backBtn}
                  onClick={() => navigate("/admin/provider/create")}
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
                    <th className="text-left">Full Name</th>
                    <th className="text-left">Email</th>
                    <th className="text-left">Mobile</th>
                    <th className="text-left">Accepted Requests</th>
                    <th className="text-left">Cancelled Requests</th>
                    <th className="text-left">Documents / Service Type</th>
                    <th className="text-left">Online </th>
                    <th className="text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {data.length > 0 ? (
                    [...data].reverse().map((provider, index) => (
                      <tr key={index}>
                        <td className="text-left">{index + 1}</td>
                        <td className="text-left">
                          {provider.first_name} {""}
                          {provider.last_name}
                        </td>
                        <td className="text-left">{provider.email}</td>
                        <td className="text-left">{provider.mobile}</td>
                        <td className="text-left">
                          {provider.accepted_requests
                            ? provider.accepted_requests
                            : 0}
                        </td>
                        <td className="text-left">
                          {provider.cancelled_requests
                            ? provider.cancelled_requests
                            : 0}
                        </td>
                        <td className={styles.documentServiceBtn}>
                          <a href={`/admin/provider/${provider.id}/document`}>
                            <button
                              className={
                                isProviderAllocated(provider.id)
                                  ? styles.allSetButton
                                  : styles.attentionButton
                              }
                            >
                              {isProviderAllocated(provider.id)
                                ? "All Set"
                                : "Attention!"}
                            </button>
                          </a>
                        </td>

                        <td className={styles.onOff}>
                          <button
                            className={
                              provider.status === "active"
                                ? styles.myActive
                                : styles.myOffline
                            }
                          >
                            {provider.status === "active" ? "YES" : "NO"}
                          </button>
                        </td>

                        <td>
                          <div className={styles.action_button}>
                            <div className={styles.statusButton}>
                              <button
                                onClick={() =>
                                  handleToggleProviderStatus(
                                    provider.id,
                                    provider.providerStatus
                                  )
                                }
                                className={
                                  provider.providerStatus === "Approved"
                                    ? styles.Disable
                                    : styles.Enable
                                }
                              >
                                {provider.providerStatus === "Approved"
                                  ? "Banned"
                                  : "Approved"}
                                {/* {provider.providerStatus === "Approved"
                              ? "Disable"
                              : "Enable"} */}
                              </button>
                            </div>

                            <div className={styles.dropdown}>
                              <button
                                onClick={() => toggleDropdown(index)}
                                className={styles.dropdown_button}
                              >
                                Action
                                {actionDropdown === index ? (
                                  <FontAwesomeIcon icon={faSortDown} />
                                ) : (
                                  <FontAwesomeIcon icon={faCaretRight} />
                                )}
                              </button>
                              {actionDropdown === index && (
                                <ul className={styles.dropdown_menu}>
                                  <li>
                                    <a
                                      href={`/admin/provider/${provider.id}/request`}
                                      onClick={() => {
                                        toggleDropdown(null);
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faClockRotateLeft}
                                        style={{ color: "#17a2b8" }}
                                      />
                                      History
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="/admin/statement/provider"
                                      onClick={() => {
                                        toggleDropdown(null);
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faMoneyCheckDollar}
                                        style={{ color: "#6C63FF " }}
                                      />
                                      Statements
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href={`/admin/provider/${provider.id}/edit`}
                                      onClick={() => {
                                        toggleDropdown(null);
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faPen}
                                        style={{ color: "#37b38b" }}
                                      />
                                      Edit
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() => {
                                        handleDeleteClick(provider);
                                        toggleDropdown(null);
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faTrashCan}
                                        style={{ color: "red" }}
                                      />
                                      Delete
                                    </a>
                                  </li>
                                </ul>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
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
          <Modal.Title className={styles.modalTitle}>
            Delete Provider
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <p className={styles.confirmationText}>
            Are you sure you want to delete this Provider?
          </p>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button
            className={styles.closeButton}
            onClick={handleCloseDeleteModal}
          >
            No, Keep Provider
          </Button>
          <Button className={styles.cancelButton} onClick={handleDelete}>
            Yes, Delete Provider
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
