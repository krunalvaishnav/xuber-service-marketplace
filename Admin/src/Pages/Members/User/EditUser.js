import Dashboard from "../../Dashboard";
import styles from "../../../Styles/Members/User/EditUser.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Footer } from "../../../Components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../../../Components/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  //   console.log(id);

  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    picture: "",
  });
  const [fileName, setFileName] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);

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

  const getApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/user`
      );
      //   console.log(response);

      if (response.status === 200) {
        const user = response.data.user;
        const filtereUser = user.find((user) => user.id == id);
        // console.log(user);
        // console.log(filteredUser);
        if (filtereUser) {
          setFormValues({
            first_name: filtereUser.first_name || "",
            last_name: filtereUser.last_name || "",
            mobile: filtereUser.mobile || "",
            picture: filtereUser.picture || "",
          });
          if (filtereUser.picture) {
            setFileName(filtereUser.picture);
          }
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
      setFormValues((prev) => ({ ...prev, picture: file }));
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
    try {
      const formData = new FormData();

      formData.append("first_name", formValues.first_name);
      formData.append("last_name", formValues.last_name);
      formData.append("mobile", formValues.mobile);

      if (formValues.picture instanceof File) {
        formData.append("picture", formValues.picture);
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/user/${id}/edit`,
        formData
      );
      if (response.status === 200) {
        toast.success(response.data.message || "Profile Edit Successfully");
        setTimeout(() => {
          navigate("/admin/user");
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
              <div className={styles.topStart}>
                <h5>Update User</h5>
                <p
                  className={styles.backBtn}
                  onClick={() => navigate("/admin/user")}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                  Back
                </p>
              </div>

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
                  <div>
                    <label className={styles.mobile}>
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
                  </div>
                  {formErrors.mobile && (
                    <p className={styles.blank_message}>{formErrors.mobile}</p>
                  )}
                </div>
                <div className={styles.actions}>
                  <input
                    type="submit"
                    className={styles.updateButton}
                    value="Update User"
                    // style={{ width: "10%" }}
                  />
                  <input
                    type="submit"
                    className={styles.cancelButton}
                    value="Cancel Update"
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
