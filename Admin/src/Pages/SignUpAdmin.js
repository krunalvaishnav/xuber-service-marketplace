import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../Styles/SignUpAdmin.module.css";

import bgImage from "../Assets/login_background_image.jpg";
import SignUpForm from "../Components/SignUpCompAdmin";

export const SignUp = () => {
  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    minHeight: "100vh",
    backgroundSize: "cover",
    paddingTop: "60px",
  };
  return (
    <div>
      {/* <div> */}
      <div style={backgroundStyle}>
        <Container fluid>
          <Row xs="1" sm="1" md="1" lg="2" id={styles.topbodyContainer} fluid>
            <Col className={styles.col1} xxl="12">
              <SignUpForm />
              {/* <img
                src={loginpageImage}
                className={styles.first_div_col1_image}
                alt="login_page_logo"
              /> */}
            </Col>
            {/* <Col className={styles.col2} xxl="5">
              <div></div>
            </Col> */}
          </Row>
        </Container>
      </div>
      {/* <Footer /> */}
      {/* </div> */}
    </div>
  );
};
