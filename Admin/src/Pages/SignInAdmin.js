import React from "react";
import bgImage from "../Assets/login_background_image.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../Styles/SignInAdmin.module.css";
import LoginForm from "../Components/SignInCompAdmin";
import Logo from "../Assets/xuber_logo-removebg-preview.png";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export const SignIn = () => {
  const [settingData, setSettingData] = useState({});
  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    minHeight: "100vh",
    backgroundSize: "cover",
    paddingTop: "130px",
    paddingBottom: "20px",
  };

  const getSettingData = async () => {
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
        setSettingData(settingsMap);
        // console.log(settingsMap);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSettingData();
  }, []);

  return (
    <div style={backgroundStyle}>
      <div className={styles.logo_wrapper}>
        {/* <img src={Logo} alt="Company Logo" className={styles.company_logo} /> */}
        <img
          src={`${process.env.REACT_APP_IMAGE_URL}/${settingData.site_logo}`}
          className={styles.company_logo}
          alt="Xuber"
        />
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <div className={styles.signin_form_wrapper}>
              {/* Company Logo */}

              {/* Login Form */}
              <LoginForm />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
