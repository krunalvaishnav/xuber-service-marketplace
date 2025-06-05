import React, { useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import { Footer } from "../../../Components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../../../Components/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../Styles/General/Documents/EditDocuments.module.css";
import { faTry } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function EditDocuments() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formValues, setFormValues] = useState({
    name: "",
    type: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const getApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/documents`
      );

      if (response.status === 200) {
        const document = response.data.documents;
        const filteredDocument = document.find((document) => document.id == id);
        // console.log(filteredDocument);

        if (filteredDocument) {
          setFormValues({
            name: filteredDocument.name,
            type: filteredDocument.type,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const validate = (values) => {
    const errors = [];
    if (values.name === "") {
      errors.name = "Document Name is required !";
    } else if (values.name && values.name.length < 5) {
      errors.name = "Document Name should be more than 5 character!";
    }
    if (values.type === "") {
      errors.type = "Document Type is required !";
    }

    return errors;
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors(validate({ ...formValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate(formValues);
    setFormErrors(error);

    if (Object.keys(error).length > 0) {
      setIsSubmit(false);
      return;
    }
    setIsSubmit(true);

    // const formData = new FormData();

    // for (let key in formValues) {
    //   formData.append(key, formValues[key]);
    // }
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/documents/${id}/edit`,
        formValues
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/admin/documents");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error("Error fatching data", error);
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
          <div className={styles.editDiv}>
            <div className={styles.edit}>
              <div className={styles.topStart}>
                <h5>Update Service</h5>
                <p
                  className={styles.backBtn}
                  onClick={() => navigate("/admin/documents")}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                  Back
                </p>
              </div>
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className={styles.form}
              >
                <div className={styles.formGroup}>
                  <label>
                    Service Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Service Name"
                    value={formValues.name}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>{formErrors.name}</p>
                </div>

                <div className={styles.formGroup}>
                  <div>
                    <label className={styles.mobile}>
                      Document Type<span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div>
                    <select
                      name="type"
                      value={formValues.type}
                      onChange={handleChange}
                      className={styles.input}
                    >
                      <option value="">Select Document Type</option>
                      <option value="Personal">Personal</option>
                      <option value="Address Proof">Address Proof</option>
                      <option value="Medical">Medical</option>
                      <option value="Vehicle">Vehicle</option>
                      <option value="Bank">Bank</option>
                    </select>
                    <p className={styles.blank_message}>{formErrors.type}</p>
                  </div>
                </div>

                <div className={styles.actions}>
                  <input
                    type="submit"
                    className={styles.updateButton}
                    value="Update Document"
                    // style={{ width: "10%" }}
                  />
                </div>
              </form>
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

export default EditDocuments;
