import React, { useState, useEffect } from "react";
import styles from "../Styles/SignInAdmin.module.css";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import axios from "axios";

import Cookies from "js-cookie";

function LoginForm() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  //  const style=; background-repeat: no-repeat; background-position: left center; padding-left: 20px;">

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: validate({ [name]: value })[name] });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setError(null);
      setIsSubmit(false);
      return;
    }

    setIsSubmit(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/login`,
        formValues
      );
      let token = response.data.token;

      if (response.status === 200) {
        Cookies.set("adminToken", token);
        setError(null);
        setSuccess("Sign In Successful!");

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000);
      }
    } catch (err) {
      setError("User not found! Please Create a account");
      setSuccess(null);
      console.log(err.response.data.error);
    }
  };

  const validate = (values) => {
    const errors = [];

    if (values.email === "") {
      errors.email = "Email is required !";
    }
    if (values.password === "") {
      errors.password = "Password is required !";
    }

    return errors;
  };

  const handleForgotPassword = () => {
    navigate("/*");
  };

  const handleSignUp = () => {
    navigate("/*");
  };

  return (
    <div className={styles.signup_form_wrapper}>
      <div className={styles.signin_form_container}>
        {success && (
          <Alert variant="success" style={{ fontSize: "20px" }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" style={{ fontSize: "20px" }}>
            {error}
          </Alert>
        )}

        <h2 className={styles.signInPara}>Welcome Back Admin </h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
              className={styles.boxImageEmail}
              autoComplete="off"
            />
          </div>
          <p className={styles.blank_message}>{formErrors.email}</p>
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
          <div className={styles.forgotPassword_section}>
            <div className={styles.remember_me}>
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                  required
                  className={styles.checkbox}
                />
                Remember me
              </label>
            </div>
            <div
              className={styles.forgot_password}
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </div>
          </div>
          <div className="buttons">
            <button type="submit" className={styles.buttonLogin}>
              Login
            </button>
            {/* <p className={styles.orOption}>OR</p>
            <button 
              type="button"
              className={styles.buttonCreateAccount}
              onClick={handleSignUp}
            >
              CREATE NEW ACCOUNT
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
