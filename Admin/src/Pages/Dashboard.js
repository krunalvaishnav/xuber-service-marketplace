import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "../Styles/Dashboard.module.css";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnchor,
  faUsers,
  faMapLocationDot,
  faUserCog,
  faClockRotateLeft,
  faClock,
  faThList,
  faFolder,
  faMoneyCheckDollar,
  faTags,
  faShieldAlt,
  faCog,
  faQuestionCircle,
  faGlobeAmericas,
  faUser,
  faRightLeft,
  faPowerOff,
  faStarHalfAlt,
  faCircleChevronRight,
  faCircleChevronLeft,
  faCompress,
  faExpand,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../Assets/imageedit_2_7944020326.png";
import axios from "axios";

function Dashboard() {
  const [settingData, setSettingData] = useState({});

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 767);
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 767);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleDropdown = (menu) => {
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
    }
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  useEffect(() => {
    menuItems.forEach((section) => {
      section.items.forEach((item) => {
        if (item.dropdown) {
          item.dropdown.forEach((dropdownItem) => {
            if (location.pathname === dropdownItem.link) {
              setOpenDropdown(item.text);
            }
          });
        }
      });
    });
  }, [location.pathname]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsSmallScreen(window.innerWidth <= 767);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  useEffect(() => {
    const handleResize = () => {
      const small = window.innerWidth >= 767;
      setIsSmallScreen(false);
      if (small) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const handleLinkClick = () => {
  //   if (window.innerWidth <= 767) {
  //     setIsSidebarOpen(true);
  //   }
  // };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleBar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
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
  const menuItems = [
    {
      title: "Main",
      items: [
        {
          icon: faAnchor,
          text: "Dashboard",
          link: "/admin/dashboard",
        },
      ],
    },
    {
      title: "Members",
      items: [
        {
          icon: faUsers,
          text: "Users",
          dropdown: [
            { text: "List Users", link: "/admin/user" },
            { text: "Add New Users", link: "/admin/user/create" },
          ],
        },
        {
          icon: faUserCog,
          text: "Providers",
          dropdown: [
            { text: "List Providers", link: "/admin/provider" },
            { text: "Add Providers", link: "/admin/provider/create" },
          ],
        },
      ],
    },
    {
      title: "Details",
      items: [
        {
          icon: faMapLocationDot,
          text: "Provider Location",
          link: "/admin/location",
        },
        {
          icon: faStarHalfAlt,
          text: "Ratings & Reviews",
          link: "/admin/ratings",
        },
      ],
    },
    {
      title: "Services",
      items: [
        {
          icon: faClockRotateLeft,
          text: "Services History",
          link: "/admin/request",
        },
        {
          icon: faClock,
          text: "Scheduled Services",
          link: "/admin/scheduled/request",
        },
      ],
    },
    {
      title: "General",
      items: [
        {
          icon: faThList,
          text: "Service Type",
          dropdown: [
            { text: "List Services Type", link: "/admin/service" },
            { text: "Add New Services Type", link: "/admin/service/create" },
          ],
        },
        {
          icon: faFolder,
          text: "Documents",
          dropdown: [
            { text: "List Documents", link: "/admin/documents" },
            { text: "Add New Documents", link: "/admin/documents/create" },
          ],
        },
      ],
    },
    {
      title: "Accounts",
      items: [
        {
          icon: faMoneyCheckDollar,
          text: "Statements",
          dropdown: [
            { text: "Service Statements", link: "/admin/statement" },
            { text: "Provider Statement", link: "/admin/statement/provider" },
            // { text: "Daily Statement", link: "/admin/statement/today" },
            // { text: "Monthly Statement", link: "/admin/statement/monthly" },
            // { text: "Yearly Statement", link: "/admin/statement/yearly" },
          ],
        },
        {
          icon: faTags,
          text: "Promocodes",
          dropdown: [
            { text: "List Promocodes", link: "/user/details/map" },
            { text: "Add New Promocodes", link: "/user/details/ratings" },
          ],
        },
      ],
    },
    {
      title: "Payment Details",
      items: [
        {
          icon: faClockRotateLeft,
          text: "Payment History",
          link: "/user/payment/history",
        },
        {
          icon: faShieldAlt,
          text: "Payment Settings",
          link: "/user/payment/settings",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          icon: faCog,
          text: "Site Settings",
          link: "/admin/setting",
        },
      ],
    },
    {
      title: "Others",
      items: [
        {
          icon: faQuestionCircle,
          text: "Help",
          link: "/user/payment/history",
        },
        {
          icon: faGlobeAmericas,
          text: "Translations",
          link: "/user/payment/history",
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          icon: faUser,
          text: "Account Settings",
          link: "/admin/profile/edit",
        },
        {
          icon: faRightLeft,
          text: "Change Password",
          link: "/admin/password",
        },
        {
          icon: faPowerOff,
          text: "Logout",
          link: "/admin/logout",
        },
      ],
    },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.nav}>
          <Navbar
            expand="md"
            bg="white"
            fixed="top"
            style={{
              borderBottom: "1px solid rgb(81, 81, 85)",
              padding: "0px",
            }}
          >
            <button className={styles.hamburger_btn} onClick={toggleBar}>
              <FontAwesomeIcon icon={faBars} />
            </button>

            {/* small screen logo  */}
            <div className={styles.hamburger_btn_logo}>
              <img
                src={`${process.env.REACT_APP_IMAGE_URL}/${settingData.site_logo}`}
                alt="Company Logo"
                className={styles.company_img}
              />
            </div>

            <button
              onClick={toggleFullScreen}
              className={styles.fullscreen_toggle_btn}
              style={{
                left: isSidebarOpen ? "250px" : "60px",
              }}
            >
              <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
            </button>

            <button
              className={styles.nav_btn}
              onClick={toggleSidebar}
              style={{
                left: isSidebarOpen ? "205px" : "10px",
                fontSize: isSidebarOpen ? "25px" : "30px",
                background: isSidebarOpen ? "none" : "#1d2339",
              }}
            >
              {isSidebarOpen ? (
                <FontAwesomeIcon icon={faCircleChevronLeft} />
              ) : (
                <FontAwesomeIcon icon={faCircleChevronRight} />
              )}
            </button>
            <div
              className={styles.company_logo_container}
              style={{
                width: isSidebarOpen ? "240px" : "57px",
                height: isSidebarOpen ? "60px" : "60px",
                padding: isSidebarOpen ? "15px 23px" : "27px 10px",
              }}
            >
              <img
                src={`${process.env.REACT_APP_IMAGE_URL}/${settingData.site_logo}`}
                alt="Company Logo"
                className={styles.company_logo}
              />
              {/* <img
                src={Logo}
                alt="Company Logo"
                className={styles.company_logo}
              /> */}
            </div>
          </Navbar>
        </div>
      </header>

      <div
        className={`${styles.sidebar_container} ${
          !isSidebarOpen ? styles.closed : ""
        }`}
        style={{ width: isSidebarOpen ? "240px" : "57px" }}
      >
        <div className={styles.sidebar_navigation}>
          {menuItems.map((section, index) => (
            <div key={index}>
              <span className={styles.menu_title}>{section.title}</span>
              {section.items.map((item, idx) => (
                <div key={idx}>
                  {item.dropdown ? (
                    <div className={styles.dropdown_section}>
                      <div
                        className={styles.nav_item}
                        onClick={() => toggleDropdown(item.text)}
                      >
                        <FontAwesomeIcon icon={item.icon} />
                        <span>{item.text}</span>
                        {openDropdown === item.text ? (
                          <FaAngleDown className={styles.angle} />
                        ) : (
                          <FaAngleRight className={styles.angle} />
                        )}
                      </div>
                      {openDropdown === item.text && (
                        <div className={styles.dropdown_content}>
                          {item.dropdown.map((dropdownItem, i) => (
                            <a
                              key={i}
                              href={dropdownItem.link}
                              className={
                                location.pathname === dropdownItem.link
                                  ? `${styles.active} ${styles.dropdown_active}`
                                  : ""
                              }
                              // onClick={handleLinkClick}
                            >
                              {dropdownItem.text}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.link}
                      className={
                        location.pathname === item.link
                          ? `${styles.nav_link} ${styles.active}`
                          : styles.nav_link
                      }
                      // onClick={handleLinkClick}
                    >
                      <div className={styles.nav_item}>
                        <FontAwesomeIcon icon={item.icon} />
                        <span>{item.text}</span>
                      </div>
                    </a>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
