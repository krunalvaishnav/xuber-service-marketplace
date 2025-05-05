import React, { useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import { useParams } from "react-router-dom";

import styles from "../../../Styles/Members/Provider/DocumentsAndServiceAllocation.module.css";
import { Footer } from "../../../Components/Footer";
import { toast } from "react-toastify";
import Toast from "../../../Components/Toast";
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
  faCheck,
  faHourglassHalf,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";

function DocumentsAndServiceAllocation() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [allServices, setAllServices] = useState([]);
  const [uploadedDocument, setUploadedDocument] = useState([]);

  const { id } = useParams();

  const getServices = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/services`
      );
      setAllServices(response.data.services);
      //   console.log(response.data.services);
    } catch (error) {
      console.error("Error fetching services", error);
    }
  };

  useEffect(() => {
    getServices();
    getSingleService();
    getUploadedDocument();
  }, []);

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const service = allServices.find((s) => s.name === selectedService);
      const selectedServiceId = service ? service.id : undefined;

      const data = {
        provider_id: id,
        service_type_id: selectedServiceId,
      };
      //   console.log(data);
      if (!selectedServiceId) {
        toast.error("Please select a valid service");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/service-Allocation`,
        data
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Allocated Successfully");

        // setTimeout(() => {
        //   window.location.reload();
        // }, 1500);
        getSingleService();
        setSelectedService("");
      }
    } catch (error) {
      console.error("Error in service allocation", error);
      toast.error("Failed to Allocate Service");
    }
  };

  // Table Related Apis hear
  const getSingleService = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/services/${id}`
      );
      setServices(response.data.services);
    } catch (error) {
      console.error("Error fetching services", error);
    }
  };

  const assignServiceIds = services.map(
    (assignService) => assignService.service_type_id
  );

  //   console.log(assignServiceIds);
  const availableServices = allServices.filter(
    (service) => !assignServiceIds.includes(service.id)
  );

  const handleDeleteService = async (service) => {
    try {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete ${service.name}?`
      );
      if (!confirmDelete) return;

      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/admin/service-allocation/${id}/${service.service_type_id}`
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Service Deleted Successfully");
        getSingleService();
      }
    } catch (error) {
      console.error("Error deleting service", error);
      toast.error("Failed to Delete Service");
    }
  };

  // DOCUMENTS

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
    if (uploadedDocument.length > 0) {
      initializeDataTable();
    }
  }, [uploadedDocument]);

  const getUploadedDocument = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/get-upload-document/${id}`
      );
      if ($.fn.DataTable.isDataTable("#userTable")) {
        $("#userTable").DataTable().destroy();
      }
      console.log(response);
      setUploadedDocument(response.data.uploadDocument);
    } catch (error) {
      console.error("Data fetching error", error);
    }
  };

  const handleToggleDocumentStatus = async (
    providerId,
    documentId,
    currentStatus
  ) => {
    const newStatus = currentStatus === "ASSESSING" ? "ACTIVE" : "ASSESSING";

    // if (!isProviderAllocated(id)) {
    //   navigate(`/admin/provider/${id}/document`);

    //   setTimeout(() => {
    //     toast.error("Provider has not been assigned a service type!");
    //   }, 200);
    //   return;
    // }

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/document-status/${providerId}`,
        {
          document_id: documentId,
          status: newStatus,
        }
      );
      toast.success(`Document ${newStatus} successfully`);

      getUploadedDocument();
    } catch (error) {
      console.error("Failed to update your status", error);
    }
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
              <h6>Provider Service Type Allocation</h6>
              <div className={styles.formGroup}>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="">Select Service</option>
                  {availableServices.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
                <button className={styles.addButton} onClick={handleAddService}>
                  Add Service
                </button>
              </div>

              {services.length > 0 ? (
                <table className={styles.serviceTable}>
                  <thead>
                    <tr>
                      <th>Service Name</th>
                      <th>Action</th>
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service, index) => (
                      <tr key={index}>
                        <td>{service.name}</td>
                        {/* <td>{service.service_type_id}</td> */}
                        <td>
                          <button
                            className={styles.deleteButton}
                            onClick={() => handleDeleteService(service)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </div>

            {/* ---------------------------------------------------------------------------------- */}
            <div className={styles.table}>
              <h6>Provider Documents</h6>
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
                    <th className="text-left">Status</th>
                    <th className="text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {uploadedDocument.length > 0 ? (
                    uploadedDocument.map((document, index) => (
                      <tr>
                        <td className="text-left">{index + 1}</td>
                        <td>{document.document_name}</td>
                        <td>{document.document_type}</td>
                        <td>
                          {document ? (
                            <div
                              className={
                                document.status === "ASSESSING"
                                  ? styles.ASSESSING
                                  : styles.ACTIVE
                              }
                            >
                              {document.status === "ASSESSING" ? (
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
                            <span className={styles.naStatus}>N/A</span>
                          )}
                        </td>

                        <td className={styles.tdaction}>
                          <div className={styles.actionButton}>
                            <button
                              onClick={() =>
                                window.open(
                                  `${process.env.REACT_APP_IMAGE_URL}/${document.url}`,
                                  "_blank"
                                )
                              }
                              className={styles.viewButton}
                            >
                              View
                            </button>

                            <button
                              onClick={() =>
                                handleToggleDocumentStatus(
                                  document.provider_id,
                                  document.document_id,
                                  document.status
                                )
                              }
                              className={
                                document.status === "ASSESSING"
                                  ? styles.ACTIVE
                                  : styles.ASSESSING
                              }
                            >
                              {document.status === "ASSESSING" ? (
                                <>
                                  <FontAwesomeIcon icon={faCheck} />
                                  Approved
                                </>
                              ) : (
                                <>
                                  <FontAwesomeIcon icon={faHourglassHalf} />
                                  Assessing
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
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

export default DocumentsAndServiceAllocation;
