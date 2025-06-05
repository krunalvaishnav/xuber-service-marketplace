import React, { useState, useEffect } from "react";
import styles from "../Styles/SignInProvider.module.css"; // Add your CSS file for styling
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { USER_API } from "../Pages/Url";
import Cookies from "js-cookie";

function LoginFormProvider() {
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
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/provider/login`,
        formValues
      );
      let token = response.data.token;
      if (response.status === 200) {
        Cookies.set("providerToken", token);
        setSuccess("Sign In Successful!");
        setError(null);

        setTimeout(() => {
          navigate("/provider/dashboard");
        }, 2000);
      }
    } catch (err) {
      if (err.response) {
        if (
          err.response.data.error ===
          "Provider not found! Please create account"
        ) {
          setError("Provider not found! Please create account");
        } else if (err.response.data.error === "Wrong Password.") {
          setError("Wrong Password");
        } else {
          setError("Login failed. Please try again.");
        }
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unexpected error occurred.");
      }
      setSuccess(null);
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
    navigate("/provider/forgotpassword");
  };

  const handleSignUp = () => {
    navigate("/provider/signup");
  };

  return (
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

      <h2 className={styles.signInPara}>Login as a Provider</h2>

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
          <p className={styles.orOption}>OR</p>
          <button
            type="button"
            className={styles.buttonCreateAccount}
            onClick={handleSignUp}
          >
            CREATE NEW ACCOUNT
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormProvider;
