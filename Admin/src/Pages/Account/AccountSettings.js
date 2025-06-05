import Dashboard from "../Dashboard";
import styles from "../../Styles/Account/AccountSettings.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Footer } from "../../Components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function AccountSettings() {
  const navigate = useNavigate();
  const { id } = useParams();
  //   console.log(id);
  const [isHovered, setIsHovered] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    gender: "",
    mobile: "",
    picture: "",
  });
  const [fileName, setFileName] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (values) => {
    const errors = [];
    if (values.name === "") {
      errors.name = "First Name is required !";
    } else if (values.name && values.name.length < 2) {
      errors.name = "First Name should be more than 1 character!";
    }

    if (values.email === "") {
      errors.email = "Last Name is required !";
    } else if (values.email && values.email.length < 2) {
      errors.email = "Last Name should be more than 1 character!";
    }

    if (values.mobile === "") {
      errors.mobile = "Mobile number is required!";
    } else if (values.mobile && values.mobile.length < 10) {
      errors.mobile = `Mobile number is too short! It must be 10 digits, but you entered .`;
    } else if (values.mobile && values.mobile.length > 10) {
      errors.mobile = `Mobile number is too long! It must be 10 digits, but you entered .`;
    }

    return errors;
  };

  const getApi = async () => {
    let token = Cookies.get("adminToken");
    // console.log(token);

    const headers = {
      authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/profile`,
        {
          headers,
        }
      );
      // console.log(response);

      if (response.status === 200) {
        const adminData = response.data.adminData;

        setFormValues({
          name: adminData.name || "",
          email: adminData.email || "",
          gender: adminData.gender || "",
          mobile: adminData.mobile || "",
          picture: adminData.picture || "",
        });
        if (adminData.picture) {
          setFileName(adminData.picture);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getApi();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFileName(file.name);
      setFormValues((prev) => ({ ...prev, [name]: file }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }

    setFormErrors(validate({ ...formValues, [name]: value }));
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
    let token = Cookies.get("adminToken");
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
    try {
      const formData = new FormData();

      formData.append("name", formValues.name);
      formData.append("email", formValues.email);
      formData.append("gender", formValues.gender);
      formData.append("mobile", formValues.mobile);

      if (formValues.picture instanceof File) {
        formData.append("picture", formValues.picture);
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/profile/edit`,
        formData,
        {
          headers,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message || "Profile Edit Successfully");
        setTimeout(() => {
          navigate("/admin/profile/edit");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error("Error fatching data", error);
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
          <div className={styles.editDiv}>
            <div className={styles.edit}>
              <h5>Update Profile</h5>

              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className={styles.form}
              >
                <div className={styles.formGroup}>
                  <label>
                    Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="First Name"
                    value={formValues.name}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>
                    {/* {formErrors.name} */}
                  </p>
                </div>

                <div className={styles.formGroup}>
                  <label>Gender</label>
                  <div className={styles.genderDiv}>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formValues.gender === "male"}
                        onChange={handleChange}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formValues.gender === "female"}
                        onChange={handleChange}
                      />
                      Female
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="others"
                        checked={formValues.gender === "others"}
                        onChange={handleChange}
                      />
                      Others
                    </label>
                  </div>

                  <p className={styles.blank_message}>
                    {/* {formErrors.name} */}
                  </p>
                </div>

                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Last Name"
                    value={formValues.email}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                    disabled
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.image}>
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
                    </div>
                  </div>
                </div>
                <div className={styles.form_group}>
                  <label className={styles.mobile}>Mobile</label>
                  <input
                    type="number"
                    name="mobile"
                    placeholder="Mobile"
                    value={formValues.mobile}
                    onChange={handleChange}
                    className={styles.input}
                    autoComplete="off"
                  />
                  {formErrors.mobile && (
                    <p className={styles.blank_message}>{formErrors.mobile}</p>
                  )}
                </div>
                <div className={styles.actions}>
                  <input
                    type="submit"
                    className={styles.updateButton}
                    value="Update Admin"
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

export default AccountSettings;
