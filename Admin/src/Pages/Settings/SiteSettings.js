import Dashboard from "../Dashboard";
import styles from "../../Styles/Settings/SiteSettings.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Footer } from "../../Components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../../Components/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export const SiteSettings = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  //   console.log(id);

  const [formValues, setFormValues] = useState({
    site_title: "",
    site_logo: "",
    site_icon: "",
    play_store_link: "",
    app_store_link: "",
    // provider_select_timeout: "",
    tax_percentage:"",
    commission_percentage:"",
    daily_target:"",
    booking_prefix: "",
    search_radius: "",
    contact_email: "",
    contact_number: "",
    contact_text: "",
    contact_title: "",
  });

  const [logoFileName, setLogoFileName] = useState("");
  const [iconFileName, setIconFileName] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (values) => {
    const errors = [];
    if (values.site_title === "") {
      errors.site_title = "Site Name is required !";
    } else if (values.site_title && values.site_title.length < 2) {
      errors.site_title = "Site Name should be more than 1 character!";
    }

    return errors;
  };

  const getApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/admin/setting`
      );

      if (response.status === 200) {
        const settingsArray = response.data.siteSettings;

        // console.log("Settings:", settingsArray);

        const settingsMap = Object.fromEntries(
          settingsArray.map((setting) => [setting.key, setting.value])
        );

        // console.log("Settings Map:", settingsMap);

        // console.log("Site Title:", settingsMap.site_title);

        setFormValues({
          site_title: settingsMap.site_title || "",
          site_logo: settingsMap.site_logo || "",
          site_icon: settingsMap.site_icon || "",
          //   copyright_content: "",
          play_store_link: settingsMap.play_store_link || "",
          app_store_link: settingsMap.app_store_link || "",
          // provider_select_timeout: settingsMap.provider_select_timeout || "",
          tax_percentage: settingsMap.tax_percentage || "",
          commission_percentage: settingsMap.commission_percentage || "",
          daily_target: settingsMap.daily_target || "",
          booking_prefix: settingsMap.booking_prefix || "",
          search_radius: settingsMap.search_radius || "",
          contact_email: settingsMap.contact_email || "",
          contact_number: settingsMap.contact_number || "",
          contact_text: settingsMap.contact_text || "",
          contact_title: settingsMap.contact_title || "",
        });
        if (settingsMap.site_logo) {
          setLogoFileName(settingsMap.site_logo);
        }
        if (settingsMap.site_icon) {
          setIconFileName(settingsMap.site_icon);
        }
      }
    } catch (error) {
      console.error("Error fetching site settings:", error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];
      //   console.log("Selected File:", file);

      if (name === "site_logo") {
        setLogoFileName(file.name);
        setFormValues((prev) => ({ ...prev, site_logo: file }));
      } else if (name === "site_icon") {
        setIconFileName(file.name);
        setFormValues((prev) => ({ ...prev, site_icon: file }));
      }
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      if (key !== "site_logo" && key !== "site_icon") {
        formData.append(key, value);
      }
    });

    if (formValues.site_logo && formValues.site_logo instanceof File) {
      formData.append("site_logo", formValues.site_logo);
    }
    if (formValues.site_icon && formValues.site_icon instanceof File) {
      formData.append("site_icon", formValues.site_icon);
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/editSetting`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        toast.success(
          response.data.message || "Settings updated successfully!"
        );
        setTimeout(() => {
          window.location.reload();
        }, 2300);
      }
    } catch (error) {
      console.error("Error updating settings:", error);

      if (error.response) {
        console.error("Response Data:", error.response.data);
        toast.error(error.response.data.error || "Something went wrong!");
      } else {
        toast.error("Failed to update settings!");
      }
    }
  };

  const handleDrop = (e, fieldName) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (!file) return;

    if (fieldName === "site_logo") {
      setLogoFileName(file.name);
      setFormValues((prev) => ({ ...prev, site_logo: file }));
    } else if (fieldName === "site_icon") {
      setIconFileName(file.name);
      setFormValues((prev) => ({ ...prev, site_icon: file }));
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
              <h5>Site Settings</h5>
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className={styles.form}
              >
                <div className={styles.formGroup}>
                  <label>
                    Site Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="site_title"
                    placeholder="Site Title"
                    value={formValues.site_title}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>
                    {formErrors.site_title}
                  </p>
                </div>

                <div className={styles.formGroup}>
                  <label>
                    Site Logo{" "}
                    <span>( Drag and drop a file here or click )</span>
                  </label>
                  <div
                    className={styles.fileUpload}
                    onDragOver={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, "site_logo")}
                  >
                    <input
                      type="file"
                      name="site_logo"
                      className={styles.fileInput}
                      onChange={handleChange}
                      accept="image/*"
                    />
                    <div className={styles.filePlaceholder}>
                      {logoFileName ? (
                        <img
                          src={
                            formValues.site_logo instanceof File
                              ? URL.createObjectURL(formValues.site_logo)
                              : `${process.env.REACT_APP_IMAGE_URL}/${formValues.site_logo}`
                          }
                          style={{
                            width: "auto",
                            maxHeight: "100px",
                          }}
                        />
                      ) : (
                        "Drag and drop a file here or click"
                      )}
                      <br />
                    </div>
                  </div>
                  <br />
                </div>

                <div className={styles.formGroup}>
                  <label>
                    Site Icon{" "}
                    <span>( Drag and drop a file here or click )</span>
                  </label>
                  <div
                    className={styles.fileUpload}
                    onDragOver={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, "site_icon")}
                  >
                    <input
                      type="file"
                      name="site_icon"
                      className={styles.fileInput}
                      onChange={handleChange}
                      accept="image/*"
                    />
                    <div className={styles.filePlaceholder}>
                      {iconFileName ? (
                        <img
                          src={
                            formValues.site_icon instanceof File
                              ? URL.createObjectURL(formValues.site_icon)
                              : `${process.env.REACT_APP_IMAGE_URL}/${formValues.site_icon}`
                          }
                          style={{
                            width: "auto",
                            maxHeight: "100px",
                          }}
                        />
                      ) : (
                        "Drag and drop a file here or click"
                      )}
                      <br />
                    </div>
                  </div>
                  <br />
                </div>

                {/* <div className={styles.formGroup}>
                  <label>Playstore link</label>
                  <input
                    type="text"
                    name="play_store_link"
                    placeholder="Playstore Link"
                    value={formValues.play_store_link}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>
                    {formErrors.play_store_link}
                  </p>
                </div> */}

                {/* <div className={styles.formGroup}>
                  <label>Appstore Link</label>
                  <input
                    type="text"
                    name="app_store_link"
                    placeholder="App Store Link"
                    value={formValues.app_store_link}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>
                    {formErrors.app_store_link}
                  </p>
                </div> */}

                {/* <div className={styles.formGroup}>
                  <label>Provider Timout</label>
                  <input
                    type="text"
                    name="provider_select_timeout"
                    placeholder="First Name"
                    value={formValues.provider_select_timeout}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>
                    {formErrors.provider_select_timeout}
                  </p>
                </div> */}

                <div className={styles.formGroup}>
                  <label>Tax Percentage (%)</label>
                  <input
                    type="text"
                    name="tax_percentage"
                    placeholder="Tax Percentage"
                    value={formValues.tax_percentage}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>
                    {formErrors.app_store_link}
                  </p>
                </div>

                <div className={styles.formGroup}>
                  <label>Commission Percentage (%)</label>
                  <input
                    type="text"
                    name="commission_percentage"
                    placeholder="Commission Percentage"
                    value={formValues.commission_percentage}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>
                    {formErrors.app_store_link}
                  </p>
                </div>

                <div className={styles.formGroup}>
                  <label>Daily Service Target</label>
                  <input
                    type="text"
                    name="daily_target"
                    placeholder="Daily Service Target"
                    value={formValues.daily_target}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>
                    {formErrors.app_store_link}
                  </p>
                </div>

                <div className={styles.formGroup}>
                  <label>Booking Prefix</label>
                  <input
                    type="text"
                    name="booking_prefix"
                    placeholder="Booking Prefix"
                    value={formValues.booking_prefix}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>
                    {formErrors.booking_prefix}
                  </p>
                </div>

                <div className={styles.formGroup}>
                  <label>Search Radius</label>
                  <input
                    type="text"
                    name="search_radius"
                    placeholder="Searching Area"
                    value={formValues.search_radius}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>
                    {formErrors.search_radius}
                  </p>
                </div>

                <div className={styles.formGroup}>
                  <label>Contact Email</label>
                  <input
                    type="text"
                    name="contact_email"
                    placeholder="Contact Email"
                    value={formValues.contact_email}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>
                    {formErrors.contact_email}
                  </p>
                </div>

                <div className={styles.formGroup}>
                  <label>Contact Number</label>
                  <input
                    type="number"
                    name="contact_number"
                    placeholder="Contact Number"
                    value={formValues.contact_number}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>
                    {formErrors.contact_number}
                  </p>
                </div>

                <div className={styles.formGroup}>
                  <label>Contact Text</label>
                  <input
                    type="text"
                    name="contact_text"
                    placeholder="Contact Text"
                    value={formValues.contact_text}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>
                    {formErrors.contact_text}
                  </p>
                </div>

                <div className={styles.formGroup}>
                  <label>Contact Title</label>
                  <input
                    type="text"
                    name="contact_title"
                    placeholder="Contact Title"
                    value={formValues.contact_title}
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                  />
                  <p className={styles.blank_message}>
                    {formErrors.contact_title}
                  </p>
                </div>

                <div className={styles.actions}>
                  <input
                    type="submit"
                    className={styles.updateButton}
                    value="Update Site"
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
};
