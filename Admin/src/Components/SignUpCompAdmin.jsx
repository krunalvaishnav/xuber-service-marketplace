import React, { useEffect, useState } from "react";
import styles from "../Styles/SignUpAdmin.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

function SignUpForm() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

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

    if (Object.keys(errors) && Object.keys(errors).length > 0) {
      setError(null);
      setIsSubmit(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/register`,
        formValues
      );
      //console.log(response)
      if (response.status === 201) {
        // console.log(response);
        setSuccess("Signup successful! Please login to continue.");
        setError(null);

        setTimeout(() => {
          navigate("/admin/signin");
        }, 2000);
      }
    } catch (err) {
      setError(err.response.data.error);
      setSuccess(null);
      console.log(err.response.data.error);
    }
  };

  // console.log(formValues)

  const validate = (values) => {
    const errors = [];
    const regexPattern =
      /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{4,32}$/;

    if (values.name === "") {
      errors.name = "Name is required !";
    } else if (values.name && values.name.length < 2) {
      errors.name = "Name should be more than 1 character!";
    }
    
    if (values.email === "") {
      errors.email = "Email is required !";
    }
    if (values.password === "") {
      errors.password = "Password is required !";
    } else if (!regexPattern.test(values.password)) {
      errors.password = "Password must be strong !";
    }
    if (!values.confirm_password) {
      errors.confirm_password = "Confirm Password is required !";
    } else if (values.password !== values.confirm_password) {
      errors.confirm_password = "Password and Confirm password should be same.";
    }

    return errors;
  };

  const handleAlreadyAnAccount = () => {
    navigate("/user/signin");
  };
  return (
    <>
      <div className={styles.signup_form_wrapper}>
        <div className={styles.signin_form_container}>
          {success && (
            <Alert variant="success" style={{ fontSize: "20px" }}>
              {success}
            </Alert>
          )}
          {(error === "The email has already been taken." ||
            error == "All fields must be filled in correctly!") && (
            <Alert variant="danger" style={{ fontSize: "20px" }}>
              {error}
            </Alert>
          )}
          <h2 className={styles.signUpPara}>Take Control – Create Your Admin Account</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.form_group}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formValues.name}
                onChange={handleChange}
                className={styles.boxImageUserName}
                autoComplete="off"
              />
            </div>
            <p className={styles.blank_message}>{formErrors.name}</p>
         

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
            <p className={styles.note_password}>
              <span>NOTE :</span> Password at least one number, one uppercase
              letter, one lowercase letter, and one character that is NOT
              alphanumeric.Password should be between 4 - 32 characters long.
            </p>

            <div className={styles.form_group}>
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={formValues.confirm_password}
                onChange={handleChange}
                className={styles.boxImageConfirmPassword}
                autoComplete="off"
              />
            </div>

            <p className={styles.blank_message}>
              {formErrors.confirm_password}
            </p>
            <div className="buttons">
              <button type="submit" className={styles.buttonRegister}>
                REGISTER
              </button>
              <p className={styles.orOption}>OR</p>
              <button
                type="button"
                className={styles.buttonCreateAccount}
                onClick={handleAlreadyAnAccount}
              >
                ALREADY HAVE AN ACCOUNT?
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
