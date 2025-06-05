import React from "react";
import styles from "../Styles/Body.module.css";
import penLogo from "../Assets/penImage.png";
import appleStore from "../Assets/applePlayStore.png";
import googleStore from "../Assets/googlePlayStore.png";
import bannerImageRightDiv from "../Assets/banner_right_div_image.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useNavigate } from "react-router-dom";

export const Body = () => {
  const img_style = {
    width: "831",
    height: "639",
  };
  const navigate = useNavigate();

  const handleSignUpGetter = () => {
    navigate("/user/signup");
  };

  const handleSignUpProvider = () => {
    navigate("/provider/signup");
  };
  return (
    <div className={styles.bodyContainer}>
      <Container fluid>
        <Row className="justify-content-md-center" sm="1" md="1" lg="1">
          <Row
            className="justify-content-md-center"
            xs="1"
            sm="1" 
            md="1"
            lg="2"
            id={styles.topbodyContainer}
          >
            <Col className={styles.col1}>
              <div className={styles.leftBox}>
                <p className={styles.get_there}>Get there</p>
                <p className={styles.belongs_to_you}>Your day belongs to you</p>
                <div className={styles.horizontal_line}></div>
                <div className={styles.signUpDivContainer}>
                  <div className={styles.signUpDiv}>
                    <img
                      className={styles.pen_logo_Image}
                      src={penLogo}
                      alt="pen_logo"
                    />
                    <p className={styles.get_a_service}>Get a Service</p>
                    <div
                      className={styles.signUpGetter}
                      onClick={handleSignUpGetter}
                    >
                      Sign Up
                    </div>
                  </div>
                  <div className={styles.signUpDiv}>
                    <img
                      className={styles.pen_logo_Image}
                      src={penLogo}
                      alt="pen_logo"
                    />
                    <p className={styles.provide_a_service}>
                      Provide a Service
                    </p>
                    <div
                      className={styles.signUpProvider}
                      onClick={handleSignUpProvider}
                    >
                      Sign Up
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col className={styles.col2}>
              <img
                src={bannerImageRightDiv}
                style={img_style}
                alt="logo"
                className={styles.rightDivImage}
              />
            </Col>
          </Row>

          <Row
            className="justify-content-md-center"
            xs="1"
            sm="1"
            md="1"
            lg="2"
            id={styles.playstore}
          >
            <Col>
              <div>
                <p className={styles.download_the_app}>
                  Download the app to enjoy the services
                </p>
                <div className={styles.playStore_div}>
                  <img
                    src={appleStore}
                    className={styles.storeImage}
                    onClick={() => {
                      navigate("#");
                    }}
                    alt="appleStore"
                  />
                  <img
                    src={googleStore}
                    className={styles.storeImage}
                    onClick={() => navigate("#")}
                    alt="googlePlayStore"
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div className={styles.provider_store}>
                <p className={styles.download_the_app_right}>
                  Download the app to become a service provider
                </p>
                <div className={styles.playStore_div_right}>
                  <img
                    src={appleStore}
                    className={styles.storeImage}
                    onClick={() => {
                      navigate("#");
                    }}
                    alt="appleStore"
                  />
                  <img
                    src={googleStore}
                    className={styles.storeImage}
                    onClick={() => navigate("#")}
                    alt="googlePlayStore"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
};
