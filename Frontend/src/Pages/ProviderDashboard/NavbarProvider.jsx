import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import navbarImage from "../../Assets/xuber_logo1.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { USER_API } from "../Url";
import { Offcanvas, Stack } from "react-bootstrap";
import { DashboardProvider } from "./Dashboard";
import styles from "../../Styles/ProviderDashboardStyle/NavbarProvider.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function NavbarUserDashboardProvider() {
  const [data, setData] = useState([]);
  const [settingData, setSettingData] = useState({});

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getApi = async () => {
    let token = Cookies.get("providerToken");
    //console.log(token)
    const headers = {
      authorization: `Bearer ${token}`,
    };

    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/provider/profile`, { headers })
      .then((response) => {
        //console.log(response)
        setData(response.data.providerData);
      })
      .catch((error) => {
        // console.log(error)
        setError(error);
      });
  };

  useEffect(() => {
    getApi();
    getSettingData();
  }, []);

  const getSettingData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/provider/setting`
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

  // console.log(settingData.site_logo);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    // console.log("123")
    navigate("/");
    Cookies.remove("providerToken");
  };
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
          <Navbar.Brand href="/provider/dashboard">
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
              {/* <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link> */}
              {/* <NavDropdown
                  onClick={toggleDropdown}
                  title={
                    <>
                      {`${data.first_name} ${data.last_name}`}{" "}
                      <span
                        className={
                          isExpanded ? styles.arrowDown : styles.arrowRight
                        }
                      >
                        <FontAwesomeIcon icon={faAngleRight} />
                      </span>
                    </>
                  }
                  id="basic-nav-dropdown"
                  style={{ fontSize: "18px", color: "black" }}
                  variant="secondary"
                  className="mt-2"
                  data-bs-theme="dark"
                >
                  <NavDropdown.Item href="/provider/changepassword">
                    Change Password
                  </NavDropdown.Item>{" "}
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
                      onClick={() => navigate("/provider/changepassword")}
                    >
                      Change Password
                    </div>
                    <div className={styles.border}></div>
                    {/* <hr /> */}
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

      {/* --------------------------------------------------- */}

      <div className={styles.offCanvas}>
        <Stack className="">
          <Navbar
            expand="md"
            fixed="top"
            className="px-4"
            style={{
              borderBottom: "1px solid #e2e2e2",
              padding: "20px 0px",
              marginTop: "0px",
              background: "white",
            }}
          >
            {/* <Navbar.Brand href="/user/dashboard"> <img src={navbarImage} style={{maxWidth:"130px"}} alt="logo1"/></Navbar.Brand> */}
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
                <DashboardProvider />
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
                <NavDropdown.Item href="/provider/changepassword">
                  Change Password
                </NavDropdown.Item>{" "}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown> */}
            <div className={styles.dropdown}>
              <div
                className={styles.dropdownToggle}
                onClick={toggleDropdown}
                style={{ fontSize: "18px", color: "black", marginRight: "5px" }}
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
                    onClick={() => navigate("/provider/changepassword")}
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
          {/* <Stack direction="horizontal" className="flex-grow-1 align-items-stretch">
          <div className="bg-info flex-fill w-50 d-flex justify-content-center align-items-center">
            Content 1
          </div>
          
        </Stack> */}
          {/* <DashboardPage /> */}
        </Stack>
      </div>
    </>
  );
}

export default NavbarUserDashboardProvider;
