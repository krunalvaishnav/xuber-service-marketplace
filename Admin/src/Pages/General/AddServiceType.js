import Dashboard from "../Dashboard";
import styles from "../../Styles/General/AddServiceType.module.css";
import React, { useState } from "react";
import { Footer } from "../../Components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";

function AddServiceType() {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    provider_name: "",
    fixed: "",
    price: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [fileName, setFileName] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (values) => {
    const errors = [];
    if (values.name === "") {
      errors.name = "Service Name is required !";
    } else if (values.name && values.name.length < 4) {
      errors.name = "Service Name should be more than 5 character!";
    }

    if (values.fixed === "") {
      errors.fixed = "Fixed Price is required !";
    }
    if (values.price === "") {
      errors.price = "Unit price is required !";
    }

    return errors;
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFileName(file.name);
      setFormValues((prev) => ({ ...prev, image: file }));
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
        `${process.env.REACT_APP_BACKEND_URL}/admin/service/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message || "Successfully created");

        setTimeout(() => {
          navigate("/admin/service");
        }, 1500);
      }
    } catch (error) {
      toast.error(error.response.data.error || "Something went wrong");
      console.error(error);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      setFormValues((prev) => ({ ...prev, image: file }));
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
              <h5>Add Service Type</h5>

              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className={styles.form}
              >
                <div className={styles.formGroup}>
                  <label>
                    Service Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Service Name"
                    value={formValues.name}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>{formErrors.name}</p>
                </div>
                <div className={styles.formGroup}>
                  <label>Provider Name</label>
                  <input
                    type="text"
                    name="provider_name"
                    placeholder="Provider Name"
                    value={formValues.provider_name}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  {/* <p className={styles.blank_message}>{formErrors.provider_name}</p> */}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.serviceImageLable}>
                    Service Image{" "}
                    <span>( Drag and drop a file here or click )</span>
                  </label>
                  <div
                    className={styles.fileUpload}
                    onDragOver={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      name="image"
                      className={styles.fileInput}
                      onChange={handleChange}
                      accept="image/*"
                    />
                    <div className={styles.filePlaceholder}>
                      {fileName ? (
                        <img
                          src={
                            formValues.image instanceof File
                              ? URL.createObjectURL(formValues.image)
                              : `${process.env.REACT_APP_IMAGE_URL}/${formValues.image}`
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
                  <div className={styles.fixed}>
                    <label className={styles.serviceImageLable}>
                      Fixed Base Price<span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="fixed"
                      placeholder="Fixed "
                      value={formValues.fixed}
                      onChange={handleChange}
                      autoComplete="off"
                      className={styles.input}
                    />
                    <p className={styles.blank_message}>{formErrors.fixed}</p>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <div className={styles.price}>
                    <label>
                      Unit Price<span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={formValues.price}
                      onChange={handleChange}
                      autoComplete="off"
                      className={styles.input}
                    />
                    <p className={styles.blank_message}>{formErrors.price}</p>
                  </div>
                </div>

                <div className={styles.actions}>
                  <input
                    type="submit"
                    className={styles.updateButton}
                    value="Add Service Type"
                    // style={{ width: "10%" }}
                  />
                  <input
                    type="submit"
                    className={styles.cancelButton}
                    value="Cancel "
                    // style={{ width: "10%" }}
                    onClick={() => navigate("/admin/service")}
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

export default AddServiceType;
