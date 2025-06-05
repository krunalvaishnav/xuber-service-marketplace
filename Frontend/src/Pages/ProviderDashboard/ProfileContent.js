import React, { useEffect, useState } from "react";
import { USER_API } from "../Url";
import axios from "axios";
import Cookies from "js-cookie";
import { Col, Row } from "react-bootstrap";
import styles from "../../Styles/ProviderDashboardStyle/ProfileContentProvider.module.css";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";
import NavbarUserDashboardProvider from "./NavbarProvider";
import { DashboardProvider } from "./Dashboard";
import ProfileNavbar from "./ProfileNavbar";

export const ProfileContent = () => {
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    avatar: "",
    description: "",
    language: "",
    address: "",
  });
  const [fileName, setFileName] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [serviceName, setServiceName] = useState("");

  // const navigate = useNavigate();

  useEffect(() => {
    const getApi = async () => {
      let token = Cookies.get("providerToken");
      // console.log(token);

      const headers = {
        authorization: `Bearer ${token}`,
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/provider/profile`,
          {
            headers,
          }
        );

        // console.log(response);

        if (response.status === 200) {
          const providerData = response.data.providerData;
          setFormValues({
            first_name: providerData.first_name || "",
            last_name: providerData.last_name || "",
            mobile: providerData.mobile || "",
            description: providerData.description || "",
            language: providerData.language || "",
            address: providerData.address || "",
          });
          if (providerData.avatar) {
            setFileName(providerData.avatar);
          }
        }
      } catch (error) {
        setError("Failed to get user data.");
      }
    };
    getApi();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormValues((prev) => ({ ...prev, avatar: file }));
      setFileName(file.name);
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }

    setFormErrors(validate({ ...formValues, [name]: value }));

  };

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

    return errors;
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

    let token = Cookies.get("providerToken");
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    try {
      const formData = new FormData();
      formData.append("first_name", formValues.first_name);
      formData.append("last_name", formValues.last_name);
      formData.append("mobile", formValues.mobile);
      if (formValues.avatar instanceof File) {
        formData.append("avatar", formValues.avatar);
      }
      formData.append("description", formValues.description);
      formData.append("language", formValues.language);
      formData.append("address", formValues.address);

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/provider/profile`,
        formData,
        {
          headers,
        }
      );
      if (response.status == 200) {
        toast.success("Profile update successfully!");

        setError(null);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setError("Error updating profile");
      console.error("Error fatching data", error);
    }
  };

  const get_service_providing_by_id = async () => {
    let token = Cookies.get("providerToken");

    const headers = {
      authorization: `Bearer ${token}`,
    };

    // console.log(response.data.service);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/service`,
        {
          headers,
        }
      );
      if (response.status === 200) {
        const serviceData = response.data.service;
        if (serviceData && serviceData.length > 0) {
          const name = serviceData.map((service) => service.name);
          setServiceName(name);
          // console.log(name);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    get_service_providing_by_id();
  }, []);

  return (
    <>
      <Toast />
      <div className={styles.fullComponent}>
        <div>
          <NavbarUserDashboardProvider />
        </div>
        <div className={styles.nav}>
          <Row
            // style={{
            //   // paddingTop: "10px",
            //   // width: "100%",

            //   padding: "150px 0px",
            //   gap: "20px",
            //   alignItems: "top",
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

            <Col
              md="8"
              lg="8"
              xl="8"
              xxl="7"
              style={{
                border: "1px solid #e2e2e2",
                padding: "20px 20px 0px 20px",
              }}
            >
              <ProfileNavbar />
              <hr />
              {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
              <form onSubmit={handleSubmit}>
                {/* First Name and Last Name */}

                <div className={styles.row}>
                  <div className={styles.form_group}>
                    <span>
                      First Name<span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      value={formValues.first_name}
                      onChange={handleChange}
                      className={styles.boxImageUserName}
                      autoComplete="off"
                    />
                    <p className={styles.blank_message}>
                      {formErrors.first_name}
                    </p>
                  </div>

                  <div className={styles.form_group}>
                    <span>
                      Last Name<span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      value={formValues.last_name}
                      onChange={handleChange}
                      className={styles.boxImageUserName}
                      autoComplete="off"
                    />

                    <p className={styles.blank_message}>
                      {formErrors.last_name}
                    </p>
                  </div>
                </div>

                {/* Avatar Field */}
                <div className={styles.row}>
                  <div className={styles.form_group}>
                    <span>Change Profile Picture</span>
                    <input
                      type="file"
                      id="image-input"
                      accept="image/*"
                      name="avatar"
                      onChange={handleChange}
                      className={styles.hidden_input}
                    />

                    {!formValues.avatar && fileName && (
                      <p className={styles.file_name}>
                        Current Picture {fileName}
                      </p>
                    )}

                    {formValues.avatar instanceof File && fileName && (
                      <p className={styles.file_name}> {null}</p>
                    )}
                  </div>
                </div>

                {/* Phone and Language */}
                <div className={styles.row}>
                  <div className={styles.form_group}>
                    <span className={styles.label}>
                      Mobile<span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                      type="number"
                      name="mobile"
                      placeholder="Mobile"
                      value={formValues.mobile}
                      onChange={handleChange}
                      className={styles.boxImagePassword}
                      autoComplete="off"
                      maxLength="10"
                    />

                    <p className={styles.blank_message}>{formErrors.mobile}</p>
                  </div>
                  <div className={styles.form_group}>
                    <span className={styles.label}>Language</span>
                    <select
                      id="language-select"
                      name="language"
                      value={formValues.language}
                      onChange={handleChange}
                      className={styles.boxImagePassword}
                    >
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div className={styles.form_group}>
                  <span>Address</span>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formValues.address}
                    onChange={handleChange}
                    className={styles.boxImagePassword}
                    autoComplete="off"
                  />
                </div>

                {/* Service Provider  */}
                <div className={styles.form_group}>
                  <span className={styles.label}>Service Providing:</span>
                  <input
                    type="text"
                    name="serviceProvide"
                    placeholder="Provided Service"
                    value={serviceName}
                    onChange={handleChange}
                    className={styles.boxImagePassword}
                    style={{ pointerEvents: "none" }}
                  />
                </div>

                {/* Description */}
                <div className={styles.form_group}>
                  <span className={styles.label}>Description</span>
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={formValues.description}
                    onChange={handleChange}
                    className={styles.boxImagePassword}
                    autoComplete="off"
                    rows="4"
                  />
                </div>
                <input
                  type="submit"
                  className={styles.buttonEdit}
                  value="Update"
                  style={{ width: "46%" }}
                />
              </form>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
