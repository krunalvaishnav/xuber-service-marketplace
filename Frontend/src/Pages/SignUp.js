import React from "react";
import { NavbarComp } from "../Components/Navbar";
import { Footer } from "./Footer";
// import SignUpForm from '../Components/SignUpComp'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../Styles/SignUp.module.css";

import loginpageImage from "../Assets/login_asset1.png";
import bgImage from "../Assets/login_background_image.png";
import SignUpForm from "../Components/SignUpComp";

export const SignUp = () => {
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
      {/* <div> */}
      <div style={backgroundStyle}>
        <Container fluid>
          <Row xs="1" sm="1" md="1" lg="2" id={styles.topbodyContainer} fluid>
            <Col className={styles.col1} xxl="7">
              <p className={styles.firstParaService}>
                Create <span>your account</span> and get
                <span> Best services in minutes</span>{" "}
              </p>
              <p className={styles.secondParaDriveXuber}>
                Welcome to Xuber Services, the easiest way to get around at the
                tap of a button.
              </p>
              <img
                src={loginpageImage}
                className={styles.first_div_col1_image}
                alt="login_page_logo"
              />
            </Col>
            <Col className={styles.col2} xxl="5">
              <div>
                <SignUpForm />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <Footer /> */}
      {/* </div> */}
    </div>
  );
};
