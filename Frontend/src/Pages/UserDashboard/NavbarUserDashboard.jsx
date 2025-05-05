import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Offcanvas,
  Stack,
} from "react-bootstrap";
import navbarImage from "../../Assets/xuber_logo1.jpg";
import axios from "axios";
import { USER_API } from "../Url";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import styles from "../../Styles/UserDashboardStyle/Navbar.module.css";
import { Dashboard } from "./Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function NavbarUserDashboard() {
  const [data, setData] = useState(null);
  const [settingData, setSettingData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const getApi = async () => {
    let token = Cookies.get("loginToken");
    const headers = {
      authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/profile`,
        { headers }
      );
      // console.log("Get_Response", response);
      setData(response.data.userData);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    getApi();
    getSettingData();
  }, []);

  const getSettingData = async () => {
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
        setSettingData(settingsMap);
        // console.log(settingsMap);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = () => {
    navigate("/");
    Cookies.remove("loginToken");
  };

  if (data === null) return;
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  return (
    <>
      <Navbar
        expand="md"
        bg="white"
        fixed="top"
        style={{ borderBottom: "1px solid #e2e2e2", padding: "20px 0px" }}
        className={styles.nav}
      >
        <Container>
          <Navbar.Brand href="/user/dashboard">
            <div>
              <img
                src={`${process.env.REACT_APP_IMAGE_URL}/${settingData.site_logo}`}
                style={{ maxWidth: "130px", height: "25px" }}
                alt="Xuber"
              />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              {/* <NavDropdown
                title={`${data.first_name} ${data.last_name}`}
                id="basic-nav-dropdown"
                style={{ fontSize: "18px", color: "black" }}
                variant="secondary"
                className="mt-2"
                data-bs-theme="dark"
              >
                <NavDropdown.Item href="/user/myrequest">
                  My Requests
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/user/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/user/password">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown> */}

              <div className={styles.dropdown}>
                <div
                  className={styles.dropdownToggle}
                  onClick={toggleDropdown}
                  style={{ fontSize: "18px", color: "black" }}
                >
                  {`${capitalizeFirstLetter(
                    data.first_name
                  )} ${capitalizeFirstLetter(data.last_name)}`}{" "}
                  <span
                    className={
                      isDropdownOpen ? styles.arrowDown : styles.arrowRight
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                  </span>
                </div>
                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <div
                      className={styles.dropdownItem}
                      onClick={() => navigate("/user/myrequest")}
                    >
                      My Requests
                    </div>
                    <div className={styles.border}></div>

                    <div
                      className={styles.dropdownItem}
                      onClick={() => navigate("/user/profile")}
                    >
                      Profile
                    </div>
                    <div className={styles.border}></div>

                    <div
                      className={styles.dropdownItem}
                      onClick={() => navigate("/user/password")}
                    >
                      Change Password
                    </div>
                    <div className={styles.border}></div>

                    <div className={styles.dropdownItem} onClick={handleLogout}>
                      Logout
                    </div>
                  </div>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className={styles.offCanvas}>
        <Stack className="">
          <Navbar
            expand="md"
            fixed="top"
            className="px-4 "
            style={{
              borderBottom: "1px solid #e2e2e2",
              padding: "20px 0px",
              marginTop: "0px",
              background: "white",
            }}
          >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  <div>
                    <img
                      src={navbarImage}
                      style={{ maxWidth: "130px" }}
                      alt="logo1"
                    />
                  </div>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Dashboard />
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            {/* <NavDropdown
              title={`${data.first_name} ${data.last_name}`}
              id="basic-nav-dropdown"
              style={{ fontSize: "18px", color: "black", marginRight: "7%" }}
              variant="secondary"
              className="mt-1"
              data-bs-theme="dark"
            >
              <NavDropdown.Item href="/user/myrequest">
                My Requests
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/user/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/user/password">
                Change Password
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown> */}
            <div className={styles.dropdown}>
              <div
                className={styles.dropdownToggle}
                onClick={toggleDropdown}
                style={{
                  fontSize: "18px",
                  color: "black",
                  marginRight: "30px",
                }}
              >
                {`${capitalizeFirstLetter(
                  data.first_name
                )} ${capitalizeFirstLetter(data.last_name)}`}{" "}
                <span
                  className={
                    isDropdownOpen ? styles.arrowDown : styles.arrowRight
                  }
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </span>
              </div>
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <div
                    className={styles.dropdownItem}
                    onClick={() => navigate("/user/myrequest")}
                  >
                    My Requests
                  </div>
                  <div className={styles.border}></div>

                  <div
                    className={styles.dropdownItem}
                    onClick={() => navigate("/user/profile")}
                  >
                    Profile{" "}
                  </div>
                  <div className={styles.border}></div>

                  <div
                    className={styles.dropdownItem}
                    onClick={() => navigate("/user/password")}
                  >
                    Change Password
                  </div>
                  <div className={styles.border}></div>

                  <div className={styles.dropdownItem} onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              )}
            </div>
          </Navbar>
        </Stack>
      </div>
    </>
  );
}

export default NavbarUserDashboard;
