import React, { useState } from "react";
import { DashboardProvider } from "./Dashboard";
import { Alert, Col, Row } from "react-bootstrap";
import { Footer } from "../Footer";
import axios from "axios";
import Cookies from "js-cookie";
import { USER_API } from "../Url";
import styles from "../../Styles/ProviderDashboardStyle/ChangePassword.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";
import NavbarUserDashboardProvider from "./NavbarProvider";

export const ChangePasswordProvider = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    old_password: "",
    password: "",
    confirm_password: "",
  });

  // const cookieData = Cookies.get("loginToken");
  // console.log("cookies",cookieData);

  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors(validate({ ...formValues, [name]: value }));

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
      setSuccess(null);
      toast.error("Old password and new password should not be the same!");
      return;
    }

    setLoading(true);
    const token = Cookies.get("providerToken");
    const providerId = Cookies.get("providerId");
    if (!token) {
      toast.error("No token found! Please login again.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/provider/changepassword`,
        { id: providerId, ...formValues },
        { headers: { authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success("Password changed successfully!");
        setError(null);
        setTimeout(() => navigate("/provider/dashboard"), 2000);
      }
    } catch (err) {
      toast.error("Old password is incorrect !");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast />
      <div className={styles.fullComponent}>
        <NavbarUserDashboardProvider />
        <div className={styles.nav}>
          <Row
            // style={{
            //   paddingTop: "150px",
            //   gap: "20px",
            //   paddingBottom: "100px",
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

            <Col md="8" lg="8" xl="8" xxl="7">
              <div className={styles.signin_form_container}>
                {success && (
                  <Alert variant="success" style={{ fontSize: "20px" }}>
                    {success}
                  </Alert>
                )}
                {(error === "Old password is incorrect !" ||
                  error ===
                    "Old password and new password should not be the same!") && (
                  <Alert variant="danger" style={{ fontSize: "20px" }}>
                    {error}
                  </Alert>
                )}

                <p> Change Password </p>
                <form onSubmit={handleSubmit}>
                  <div className={styles.form_group}>
                    <input
                      type="password"
                      name="old_password"
                      placeholder="Old Password"
                      value={formValues.old_password}
                      onChange={handleChange}
                      className={styles.boxImagePassword}
                      // style={styleEmail}
                      autoComplete="off"
                    />
                  </div>
                  <p className={styles.blank_message}>
                    {formErrors.old_password}
                  </p>
                  <div className={styles.form_group}>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formValues.password}
                      onChange={handleChange}
                      className={styles.boxImagePassword}
                      autoComplete="off"
                    />
                  </div>
                  <p className={styles.blank_message}>{formErrors.password}</p>
                  <p className={styles.note_password}>
                    <span>NOTE :</span> Password at least one number, one
                    uppercase letter, one lowercase letter, and one character
                    that is NOT alphanumeric.Password should be between 4 - 32
                    characters long.
                  </p>

                  <div className={styles.form_group}>
                    <input
                      type="password"
                      name="confirm_password"
                      placeholder="Confirm Password"
                      value={formValues.confirm_password}
                      onChange={handleChange}
                      className={styles.boxImagePassword}
                      autoComplete="off"
                    />
                  </div>

                  <p className={styles.blank_message}>
                    {formErrors.confirm_password}
                  </p>
                  <div className="buttons">
                    <button type="submit" className={styles.buttonRegister}>
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
