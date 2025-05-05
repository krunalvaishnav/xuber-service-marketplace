import React, { useState } from "react";
import styles from "../Styles/ResetPassword.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API } from "../Pages/Url";
import { Alert, Spinner } from "react-bootstrap";

function ResetPassword() {
  const initialValues = { email: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      setError("Please enter a email address!");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/password/reset/email`,
        formValues
      );

      if (response.status === 200) {
        setError(null);
        setSuccess("Mail sent successfully! Check your inbox.");
        setTimeout(() => {
          navigate("/user/signin");
        }, 3000);
      }
    } catch (err) {
      setError("Email address is not exist!");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email.trim()) {
      errors.email = "";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
      errors.email = "Invalid email format!";
    }
    return errors;
  };

  return (
    <div className={styles.signin_form_container}>
      {success && (<Alert variant="success">{success}</Alert>)}
      {error && <Alert variant="danger">{error}</Alert>}

      <h2 className={styles.signInPara}>RESET YOUR PASSWORD</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className={styles.boxImageEmail}
            autoComplete="off"
          />
          {formErrors.email && (
            <p className={styles.error_text}>{formErrors.email}</p>
          )}
        </div>

        <div className="buttons">
          <button
            type="submit"
            className={styles.buttonReset}
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "SEND PASSWORD RESET LINK"
            )}
          </button>
          <p className={styles.orOption}>OR</p>
          <button
            type="button"
            className={styles.buttonCreateAccount}
            onClick={() => navigate("/user/signup")}
          >
            ALREADY HAVE AN ACCOUNT
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
