import React from "react";
import { NavbarComp } from "../Components/Navbar";
import { Footer } from "./Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../Styles/SignUpProvider.module.css";

import loginpageImage from "../Assets/login_asset1.png";
import bgImage from "../Assets/login_background_image.png";
import SignUpFormProvider from "../Components/SignUpCompProvider";

export const SignUpProvider = () => {
  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    minHeight: "100vh",
    backgroundSize: "cover",
    paddingTop: "100px",
    paddingBottom: "30px",
  };
  return (
    <div>
      <NavbarComp />
      <div>
        <div style={backgroundStyle}>
          <Container fluid>
            <Row xs="1" sm="1" md="1" lg="2" id={styles.topbodyContainer} fluid>
              <Col className={styles.col1} xxl="7">
                <p className={styles.firstParaService}>
                  Welcome <span> to </span> Xuber Services
                  <span> Empowering Your Business!</span>{" "}
                </p>
                <p className={styles.secondParaDriveXuber}>
                  Start offering your services to thousands of customers. Get
                  more bookings, grow your business, and work on your own terms!
                </p>
                <img
                  src={loginpageImage}
                  className={styles.first_div_col1_image}
                  alt="login_page_logo"
                />
              </Col>
              <Col className={styles.col2} xxl="5">
                <div>
                  <SignUpFormProvider />
                </div>
              </Col>
            </Row>
          </Container>

          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};
