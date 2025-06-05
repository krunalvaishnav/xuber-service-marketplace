import Dashboard from "../../Dashboard";
import styles from "../../../Styles/General/Documents/AddDocuments.module.css";
import React, { useState } from "react";
import { Footer } from "../../../Components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Toast from "../../../Components/Toast";

function AddDocuments() {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    type: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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
    setFormErrors({ ...formErrors, [name]: validate({ [name]: value })[name] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setIsSubmit(false);
      return;
    }
    setIsSubmit(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/documents/create`,
        formValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message || "Successfully created");

        setTimeout(() => {
          navigate("/admin/documents");
        }, 1500);
      }
    } catch (error) {
      toast.error(error.response.data.error || "Something went wrong");
      console.error(error);
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
          <div className={styles.addDiv}>
            <div className={styles.add}>
              <h5>Add Service</h5>

              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className={styles.form}
              >
                <div className={styles.formGroup}>
                  <label>
                    Document Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Document Name"
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
                    value="Add Document"
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

export default AddDocuments;
