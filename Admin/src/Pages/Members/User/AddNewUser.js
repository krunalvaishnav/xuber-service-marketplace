import Dashboard from "../../Dashboard";
import styles from "../../../Styles/Members/User/AddNewUser.module.css";
import React, { useState } from "react";
import { Footer } from "../../../Components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Toast from "../../../Components/Toast";

export const AddNewUser = () => {
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [fileName, setFileName] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value, type, files } = e.target;

  //   if (type === "file") {
  //     setFormValues({ ...formValues, [name]: files[0] });
  //   } else {
  //     setFormValues({ ...formValues, [name]: value });
  //   }
  // };

  const validate = (values) => {
    const errors = [];
    if (values.first_name === "") {
      errors.first_name = "First Name is required !";
    } else if (values.first_name && values.first_name.length < 2) {
      errors.first_name = "First Name should be more than 1 character!";
    }

    if (values.last_name === "") {
      errors.last_name = "Last Name is required !";
    } else if (values.last_name && values.last_name.length < 2) {
      errors.last_name = "Last Name should be more than 1 character!";
    }

    if (values.mobile === "") {
      errors.mobile = "Mobile number is required!";
    } else if (values.mobile && values.mobile.length < 10) {
      errors.mobile = `Mobile number is too short! It must be 10 digits, but you entered .`;
    } else if (values.mobile && values.mobile.length > 10) {
      errors.mobile = `Mobile number is too long! It must be 10 digits, but you entered .`;
    }

    const regexPattern =
      /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{4,32}$/;
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFileName(file.name);
      setFormValues((prev) => ({ ...prev, picture: file }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
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

    const formData = new FormData();

    for (let key in formValues) {
      formData.append(key, formValues[key]);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/user/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response)
      if (response.status === 201) {
        toast.success("User Created Successfully ");
        // console.log(response);

        setTimeout(() => {
          navigate("/admin/user");
        }, 1500);
      }
    } catch (err) {
      toast.error(err.response.data.error || "Something went wrong");
      console.error(err);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      setFormValues((prev) => ({ ...prev, picture: file }));
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
              <h5>Add User</h5>

              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className={styles.form}
              >
                <div className={styles.formGroup}>
                  <label>
                    First Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formValues.first_name}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>
                    {formErrors.first_name}
                  </p>
                </div>
                <div className={styles.formGroup}>
                  <label>
                    Last Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formValues.last_name}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>{formErrors.last_name}</p>
                </div>
                <div className={styles.formGroup}>
                  <label>
                    Email<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formValues.email}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>{formErrors.email}</p>
                </div>
                <div className={styles.formGroup}>
                  <label>
                    Password<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formValues.password}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>{formErrors.password}</p>
                </div>
                <div className={styles.formGroup}>
                  <label>
                    Password Confirmation<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    placeholder="Re-type Password"
                    value={formValues.confirm_password}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>
                    {formErrors.confirm_password}
                  </p>
                </div>
                <div className={styles.formGroup}>
                  <label>
                    Picture <span>( Drag and drop a file here or click )</span>
                  </label>
                  <div
                    className={styles.fileUpload}
                    onDragOver={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      name="picture"
                      className={styles.fileInput}
                      onChange={handleChange}
                      accept="image/*"
                    />
                    <div className={styles.filePlaceholder}>
                      {fileName ? (
                        <img
                          src={
                            formValues.picture instanceof File
                              ? URL.createObjectURL(formValues.picture)
                              : `${process.env.REACT_APP_IMAGE_URL}/${formValues.picture}`
                          }
                          style={{
                            width: "100px",
                            height: "100px",
                          }}
                        />
                      ) : (
                        "Drag and drop a file here or click"
                      )}
                      <br />
                    </div>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <div className={styles.mobile}>
                    <label>
                      Mobile<span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="mobile"
                      placeholder="Mobile"
                      value={formValues.mobile}
                      onChange={handleChange}
                      autoComplete="off"
                      className={styles.input}
                    />
                    <p className={styles.blank_message}>{formErrors.mobile}</p>
                  </div>
                </div>
                <div className={styles.actions}>
                  <input
                    type="submit"
                    className={styles.updateButton}
                    value="Add User"
                    // style={{ width: "10%" }}
                  />
                  <input
                    type="submit"
                    className={styles.cancelButton}
                    value="Cancel "
                    // style={{ width: "10%" }}
                    onClick={() => navigate("/admin/user")}
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
};
