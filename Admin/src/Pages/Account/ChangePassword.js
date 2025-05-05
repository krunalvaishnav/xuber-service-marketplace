import Dashboard from "../Dashboard";
import styles from "../../Styles/Account/ChangePassword.module.css";
import React, { useState } from "react";
import { Footer } from "../../Components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";

function ChangePassword() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    old_password: "",
    password: "",
    confirm_password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  // const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // const handleChange = async (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  //   setFormErrors({ ...formErrors, [name]: validate({ [name]: value })[name] });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormValues = { ...formValues, [name]: value };
    setFormValues(updatedFormValues);

    const newErrors = validate(updatedFormValues);

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: newErrors[name] || "",
    }));
  };

  const validate = (values) => {
    const errors = [];
    const regexPattern =
      /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{4,32}$/;

    if (!values.old_password) {
      errors.old_password = "Old Password is required!";
    }
    if (!values.password) {
      errors.password = "New Password is required!";
    } else if (!regexPattern.test(values.password)) {
      errors.password = "Password must be strong!";
    }
    if (!values.confirm_password) {
      errors.confirm_password = "Confirm Password is required!";
    } else if (values.password !== values.confirm_password) {
      errors.confirm_password = "Passwords do not match!";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;
    if (formValues.old_password === formValues.password) {
      // setSuccess(null);
      toast.error("Old Password and New Password Should not be the same!");
      return;
    }
    setLoading(true);
    const token = Cookies.get("adminToken");
    const adminId = Cookies.get("userId");
    if (!token) {
      toast.error("No token found! Please login again.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/password`,
        {
          id: adminId,
          ...formValues,
        },
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        toast.success(response.data.message || "Changed successfully!");
        setError(null);
        setTimeout(navigate("/admin/password"), 2000);
      }
      setFormValues({
        old_password: "",
        password: "",
        confirm_password: "",
      });
    } catch (err) {
      toast.error("Old password is incorrect !");
      // setSuccess(null);
    } finally {
      setLoading(false);
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
              <h5>Change Password</h5>

              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className={styles.form}
              >
                <div className={styles.formGroup}>
                  <label>
                    Old Password<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="password"
                    name="old_password"
                    placeholder="Old Password"
                    value={formValues.old_password}
                    onChange={handleChange}
                    className={styles.input}
                    // style={styleEmail}
                    autoComplete="off"
                  />
                  <p className={styles.blank_message}>
                    {formErrors.old_password}
                  </p>
                </div>

                <div className={styles.formGroup}>
                  <label>
                    New Password<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={formValues.password}
                    onChange={handleChange}
                    className={styles.input}
                    autoComplete="off"
                  />
                  <p className={styles.blank_message}>{formErrors.password}</p>
                </div>
                <div className={styles.formGroup}>
                  <label>
                    Confirm New Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm New Password"
                    value={formValues.confirm_password}
                    onChange={handleChange}
                    className={styles.input}
                    autoComplete="off"
                  />
                  <p className={styles.blank_message}>
                    {formErrors.confirm_password}
                  </p>
                </div>
                <div className={styles.actions}>
                  <input
                    type="submit"
                    className={styles.updateButton}
                    value="Change Password"
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

export default ChangePassword;
