import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import { Footer } from "../../Components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "../../Styles/General/EditService.module.css";
import { faTry } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function EditService() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formValues, setFormValues] = useState({
    name: "",
    provider_name: "",
    image: "",
    fixed: "",
    price: "",
    status: "",
  });
  const [fileName, setFileName] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const getApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/services`
      );

      if (response.status === 200) {
        const service = response.data.services;
        const filteredService = service.find((service) => service.id == id);
        // console.log(filteredService);

        if (filteredService) {
          setFormValues({
            name: filteredService.name,
            provider_name: filteredService.provider_name,
            image: filteredService.image,
            fixed: filteredService.fixed,
            price: filteredService.price,
            status: filteredService.status,
          });
          if (filteredService.image) {
            setFileName(filteredService.image);
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

  const validate = (values) => {
    const errors = [];
    if (values.name === "") {
      errors.name = "Service Name is required !";
    } else if (values.name && values.name.length < 4) {
      errors.name = "Service Name should be more than 5 character!";
    }
    if (values.provider_name === "") {
      errors.provider_name = "Provider Name is required !";
    } else if (values.provider_name && values.provider_name.length < 4) {
      errors.provider_name = "Provider Name should be more than 5 character!";
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
    setFormErrors(validate({ ...formValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate(formValues);
    setFormErrors(error);

    if (Object.keys(error).length > 0) {
      setIsSubmit(false);
      return;
    }
    setIsSubmit(true);

    const formData = new FormData();

    for (let key in formValues) {
      formData.append(key, formValues[key]);
    }
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/service/${id}/edit`,
        formData
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/admin/service");
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
          <div className={styles.editDiv}>
            <div className={styles.edit}>
              <div className={styles.topStart}>
                <h5>Update Service</h5>
                <p
                  className={styles.backBtn}
                  onClick={() => navigate("/admin/service")}
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
                  <label>
                    Provider Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="provider_name"
                    placeholder="Provider Name"
                    value={formValues.provider_name}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>
                    {formErrors.provider_name}
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
                  <div>
                    <label className={styles.mobile}>Status</label>
                  </div>
                  <div>
                    <select
                      name="status"
                      value={formValues.status}
                      onChange={handleChange}
                      className={styles.input}
                    >
                      <option value="1">Enable</option>
                      <option value="0">Disable</option>
                    </select>
                    <p className={styles.blank_message}>{formErrors.status}</p>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <div>
                    <label className={styles.mobile}>
                      Fixed Base Price<span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="fixed"
                      placeholder="Fixed"
                      value={formValues.fixed}
                      onChange={handleChange}
                      autoComplete="off"
                      className={styles.input}
                    />
                    <p className={styles.blank_message}>{formErrors.fixed}</p>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <div>
                    <label className={styles.mobile}>
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
                    value="Update Service"
                    // style={{ width: "10%" }}
                  />
                  <input
                    type="submit"
                    className={styles.cancelButton}
                    value="Cancel Service"
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

export default EditService;
