import React, { useState } from "react";
import axios from "axios";
import { USER_API } from "./Url";
import styles from "../Styles/EmailForgotPage.module.css";
import { Alert } from "react-bootstrap";
import company_logo from "../Assets/xuber_logo1.jpg";
import { Footer } from "./Footer";
import { useNavigate, useParams } from "react-router-dom";

export const EmailForgotPage = () => {
  const initialValues = { password: "", confirm_password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const { id } = params;
  //console.log(id)
  const handleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(formValues);
    const headers = {
      authorization: id,
    };
    //console.log(window.location.href)
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/user/password/reset`,
        formValues,
        { headers }
      );
      // console.log(response)

      if (response.status === 200) {
        setError(null);
        setSuccess("Password changed Successfully!");
        setTimeout(() => {
          navigate("/user/signin");
        }, 2000);
      }
    } catch (err) {
      setError(err.response.data.error);
      setSuccess(null);
      console.log(err);
    }
  };

  // useEffect(()=>{
  //   // console.log(formErrors)
  //     if(Object.keys(formErrors).length===0 && isSubmit){
  //       console.log(formValues)
  //     }
  // },[formErrors])

  const validate = (values) => {
    const errors = {};
    const regexPattern =
      /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{4,32}$/;

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
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        }}
      >
        <img src={company_logo} alt="Company_logo" />
      </div>
      <div className={styles.container}>
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

        <h2 className={styles.signInPara}>Reset Password</h2>
        <form onSubmit={handleSubmit}>
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
              className={styles.boxImagePassword}
              autoComplete="off"
            />
          </div>
          <p className={styles.blank_message}>{formErrors.confirm_password}</p>
          <div className="buttons">
            <button type="submit" className={styles.buttonLogin}>
              Confirm
            </button>
          </div>
        </form>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
