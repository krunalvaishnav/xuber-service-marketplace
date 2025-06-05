import styles from "../Styles/Navbar.module.css";
import logo from "../Assets/xuber_logo1.jpg";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export const NavbarComp = () => {
  const [data, setData] = useState({});

  const getApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/setting`
      );
      if (response.status === 200) {
        const settingsArray = response.data.siteSettings;

        // console.log("Settings:", settingsArray);

        const settingsMap = Object.fromEntries(
          settingsArray.map((setting) => [setting.key, setting.value])
        );
        setData(settingsMap);
        // console.log(settingsMap);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(data.site_logo);

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div>
      <Navbar collapseOnSelect expand="md" className={styles.customContainer}>
        <Container fluid className={styles.navBarDiv}>
          <div className={styles.div_navbar}>
            <Navbar.Brand href="/" className={styles.navbar_image}>
              <img
                src={`${process.env.REACT_APP_IMAGE_URL}/${data.site_logo}`}
                alt="logo"
                style={{ maxWidth: "150px", height: "30px", marginLeft:"30px" }}
              />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className={styles.responsive_hemburger}
            />
          </div>

          <div className={styles.collapseNavbar}>
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className={styles.resNav}
            >
              <Nav className={styles.rightNavbar}>
                <Nav.Link href="/user/signin">Sign in</Nav.Link>
                <Nav.Link
                  href="/provider/signup"
                  className={styles.became_a_provider}
                >
                  Become a Provider
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};
