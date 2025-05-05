import React from "react";
import { NavbarComp } from "../Components/Navbar";
import LoginForm from "../Components/SignInComp";

import bgImage from "../Assets/login_background_image.png";
import { Footer } from "./Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../Styles/SignIn.module.css";
import loginpageImage from "../Assets/login_asset1.png";

export const SignIn = () => {
  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    minHeight: "100vh",
    backgroundSize: "cover",
    paddingTop: "100px",
    paddingBottom: "20px",
  };
  return (
    <div>
      <NavbarComp />
      <div style={backgroundStyle}>
        <Container fluid>
          <Row xs="1" sm="1" md="1" lg="2" id={styles.topbodyContainer} fluid>
            <Col className={styles.col1} xxl="7">
              <p className={styles.firstParaService}>
                <span>Expert </span> services at your doorstep{" "}
                <span>hassle-free and reliable!</span>{" "}
              </p>
              <p className={styles.secondParaDriveXuber}>
              Sign in to Xuber Services and book top-rated professionals for your home and personal needs. From repairs to beauty services, we’ve got you covered – anytime, anywhere!
              </p>
              <img
                src={loginpageImage}
                className={styles.first_div_col1_image}
                alt="login_page_logo"
              />
            </Col>
            <Col className={styles.col2} xxl="5">
              <div>
                <LoginForm />
              </div>
            </Col>
          </Row>
        </Container>

        {/* <Footer /> */}
      </div>
    </div>
  );
};
