import React, { useEffect, useState } from "react";
import { USER_API } from "../Url";
import axios from "axios";
import Cookies from "js-cookie";
import NavbarUserDashboard from "./NavbarUserDashboard";
import { Col, Row } from "react-bootstrap";
import { Dashboard } from "./Dashboard";
import styles from "../../Styles/UserDashboardStyle/Profile.module.css";
import { Footer } from "../Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";

export const ProfileEdit = () => {
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    picture: "",
  });
  const [fileName, setFileName] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getApi = async () => {
      let token = Cookies.get("loginToken");
      // console.log(token);

      const headers = {
        authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/user/profile`,
          {
            headers,
          }
        );

        // console.log(response);

        if (response.status === 200) {
          const userData = response.data.userData;
          setFormValues({
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            email: userData.email || "",
            mobile: userData.mobile || "",
            picture: userData.picture || "",
          });
          if (userData.picture) {
            setFileName(userData.picture);
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
      setFormValues((prev) => ({ ...prev, picture: file }));
      setFileName(file.name);
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
    setFormErrors(validate({ ...formValues, [name]: value }));
  };
  const validate = (values) => {
    const errors = {};
    if (!values.first_name.trim()) {
      errors.first_name = "First Name is required!";
    }
    if (!values.last_name.trim()) {
      errors.last_name = "Last Name is required!";
    }
    if (!values.mobile.trim()) {
      errors.mobile = "Mobile number is required!";
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

    let token = Cookies.get("loginToken");
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    try {
      const formData = new FormData();
      formData.append("first_name", formValues.first_name);
      formData.append("last_name", formValues.last_name);
      formData.append("email", formValues.email);
      formData.append("mobile", formValues.mobile);

      if (formValues.picture instanceof File) {
        formData.append("picture", formValues.picture);
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/user/profile/edit`,
        formData,
        {
          headers,
        }
      );
      if (response.status === 200) {
        // setSuccess("Profile update successfully!");
        toast.success("Profile update successfully!");
        setError(null);

        setTimeout(() => {
          navigate("/user/profile");
        }, 2000);
      }
    } catch (error) {
      setSuccess(null);
      setError("Error updating profile");
      console.error("Error fatching data", error);
    }
  };
  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;

  //   setFormValues((prev) => ({
  //     ...prev,
  //     [name]: files ? files[0] : value,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // setFormErrors(validate(formValues));
  //   setFormErrors(formValues);
  //   setIsSubmit(true);
  //   //   let token=Cookies.get("loginToken");
  //   //       console.log(token)
  //   //       const headers = {
  //   //       'Content-Type': 'multipart/form-data'
  //   //       'authorization': token,
  //   //       };
  //   //   try {
  //   //       const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/edit/profile`, formValues,{headers});
  //   //       console.log(response)
  //   //     if (response.status === 200) {
  //   //       console.log(response)
  //   //       setSuccess('Edit successfully !');
  //   //       setError(null);

  //   //       // if(Object.keys(formErrors).length===0 && isSubmit){
  //   //         setTimeout(()=>{

  //   //           navigate("/user/profile")
  //   //         },2000)

  //   //         // }
  //   //     }
  //   //   } catch (err) {
  //   //     //setError(err.response);
  //   //     setSuccess(null);
  //   //    console.log(err.response)
  //   //   }
  // };

  // // const validate = (values) => {
  // //   const errors = {};

  // //   if (values.first_name === "") {
  // //     errors.first_name = "First Name is required !";
  // //   }
  // //   // else if(values.first_name.length<2){
  // //   //   errors.first_name="First Name should be more than 1 character!";
  // //   // }
  // //   if (values.last_name === "") {
  // //     errors.last_name = "Last Name is required !";
  // //   }
  // //   // else if(values.last_name.length<2){
  // //   //   errors.last_name="Last Name should be more than 1 character!";
  // //   // }
  // //   // if(values.email===""){
  // //   //   errors.email="Email is required !";
  // //   // }
  // //   if (values.mobile === "") {
  // //     errors.mobile = "Mobile is required !";
  // //   }

  // //   return errors;
  // // };

  // const getApi = async () => {
  //   let token = Cookies.get("loginToken");
  //   // console.log(token)
  //   const headers = {
  //     authorization: `bearer ${token}`,
  //   };

  //   await axios
  //     .get(`${process.env.REACT_APP_BACKEND_URL}/user/profile`, { headers })
  //     .then((response) => {
  //       console.log(response.data.userData);
  //       setFormValues(response.data.userData);
  //     })
  //     .catch((error) => {
  //       //console.log(error)
  //       setError(error);
  //     });
  // };

  // //console.log("Data",data)

  // useEffect(() => {
  //   getApi();
  // }, []);

  // document.title = "Profile Edit";

  return (
    <>
      <Toast />
      <div className={styles.fullComponent}>
        <NavbarUserDashboard />
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
              <Dashboard />
            </Col>

            <Col
              md="8"
              lg="8"
              xl="8"
              xxl="7"
              style={{ border: "1px solid #e2e2e2", padding: "20px" }}
            >
              <p className={styles.generalInfo}>Edit Information</p>

              {error && <p style={{ color: "red" }}>{error}</p>}
              {/* {success && <p style={{ color: "green" }}>{success}</p>} */}
              <form onSubmit={handleSubmit}>
                <div className="image-upload-container">
                  <label htmlFor="image-input" className={styles.upload_label}>
                    <span>Change Profile Picture</span>
                  </label>
                  <input
                    type="file"
                    id="image-input"
                    accept="image/*"
                    name="picture"
                    onChange={handleChange}
                    className={styles.hidden_input}
                  />
                  {!(formValues.picture instanceof File) && fileName && (
                    <p className={styles.file_name}>
                      Current Picture: {fileName}
                    </p>
                  )}{" "}
                  {formValues.picture instanceof File && fileName && (
                    <p className={styles.file_name}>New Picture: {fileName}</p>
                  )}
                </div>
                <div className={styles.formContainer}>
                  <div className={styles.form_group}>
                    <span>First Name : </span>
                    <br />
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      value={formValues.first_name}
                      onChange={handleChange}
                      className={styles.boxImageUserName}
                      autoComplete="off"
                    />
                    {formErrors.first_name && (
                      <p className={styles.blank_message}>
                        {formErrors.first_name}
                      </p>
                    )}
                  </div>

                  {/* <p className={styles.blank_message}>{formErrors.first_name}</p> */}
                  <div className={styles.form_group}>
                    <span> Last Name :</span> <br />
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      value={formValues.last_name}
                      onChange={handleChange}
                      className={styles.boxImageUserName}
                      autoComplete="off"
                    />
                    {formErrors.last_name && (
                      <p className={styles.blank_message}>
                        {formErrors.last_name}
                      </p>
                    )}
                  </div>

                  {/* <p className={styles.blank_message}>{formErrors.last_name}</p> */}

                  <div className={styles.form_group}>
                    <span> Email :</span> <br />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formValues.email}
                      onChange={handleChange}
                      className={styles.boxImageEmail}
                      // style={styleEmail}
                      autoComplete="off"
                      disabled
                      style={{ cursor: "not-allowed" }}
                    />
                  </div>
                  {/* <p className={styles.blank_message}>{formErrors.email}</p> */}
                  <div className={styles.form_group}>
                    <span> Mobile :</span> <br />
                    <input
                      type="number"
                      name="mobile"
                      placeholder="Mobile"
                      value={formValues.mobile}
                      onChange={handleChange}
                      className={styles.boxImagePassword}
                      autoComplete="off"
                    />
                    {formErrors.mobile && (
                      <p className={styles.blank_message}>
                        {formErrors.mobile}
                      </p>
                    )}
                  </div>
                  {/* <p className={styles.blank_message}>{formErrors.mobile}</p> */}
                </div>
                <input
                  type="submit"
                  className={styles.buttonEdit}
                  value="Save"
                  style={{ width: "48%" }}
                />
              </form>
            </Col>
          </Row>
        </div>

        {/*   <div className={styles.offCanvas}>
          <Row
            style={{
              margin: "70px auto",
              gap: "20px",
              alignItems: "top",
              border: "1px solid #e2e2e2",
              width: "90%",
            }}
            className="justify-content-md-center"
          >
            <p className={styles.generalInfo}>Edit Information</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
              <div className="image-upload-container">
                <label htmlFor="image-input" className={styles.upload_label}>
                  <span>Change Profile Picture</span>
                </label>
                <input
                  type="file"
                  id="image-input"
                  accept="image/*"
                  name="picture"
                  onChange={handleChange}
                  className={styles.hidden_input}
                />
                {!(formValues.picture instanceof File) && fileName && (
                  <p className={styles.file_name}>
                    Current Picture: {fileName}
                  </p>
                )}
                {formValues.picture instanceof File && fileName && (
                  <p className={styles.file_name}>New Picture: {fileName}</p>
                )}
              </div>
              <div className={styles.formContainer}>
                <div className={styles.form_group}>
                  <span>First Name : </span>
                  <br />
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formValues.first_name}
                    onChange={handleChange}
                    className={styles.boxImageUserName}
                    autoComplete="off"
                  />
                  {formErrors.first_name && (
                    <p className={styles.blank_message}>
                      {formErrors.first_name}
                    </p>
                  )}
                </div>

                <div className={styles.form_group}>
                  <span> Last Name :</span> <br />
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formValues.last_name}
                    onChange={handleChange}
                    className={styles.boxImageUserName}
                    autoComplete="off"
                  />
                  {formErrors.last_name && (
                    <p className={styles.blank_message}>
                      {formErrors.last_name}
                    </p>
                  )}
                </div>

                <div className={styles.form_group}>
                  <span> Email :</span> <br />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formValues.email}
                    onChange={handleChange}
                    className={styles.boxImageEmail}
                    // style={styleEmail}
                    autoComplete="off"
                    disabled
                    style={{ cursor: "not-allowed" }}
                  />
                </div>

                <div className={styles.form_group}>
                  <span> Mobile :</span> <br />
                  <input
                    type="number"
                    name="mobile"
                    placeholder="Mobile"
                    value={formValues.mobile}
                    onChange={handleChange}
                    className={styles.boxImagePassword}
                    autoComplete="off"
                  />
                  {formErrors.mobile && (
                    <p className={styles.blank_message}>{formErrors.mobile}</p>
                  )}
                </div>
              </div>
              <input type="submit" className={styles.buttonEdit} value="Save" />
            </form>
          </Row>
        </div>
        {/* <div className={styles.footer}>
          <Footer />
        </div> */}
      </div>
    </>
  );
};
