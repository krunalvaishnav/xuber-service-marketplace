// ProviderNavLinks.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../Styles/ProviderDashboardStyle/ProfileNavbar.module.css";

const ProfileNavbar = () => {
  const navLinks = [
    { path: "/provider/profile", label: "PROFILE" },
    { path: "/provider/document", label: "MANAGE DOCUMENTS" },
    { path: "/provider/location", label: "UPDATE LOCATION" },
  ];

  return (
    <>
      {/* Full-screen navigation */}
      <div className={styles.nav}>
        <div className={styles.mainDiv}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                borderBottom: isActive ? "3px solid #37b38b" : "",
                textDecoration: "none",
                color: isActive ? "#37b38b" : "black",
                // fontSize: isActive ? "17px" : "16px",

              })}
            >
              <div>{link.label}</div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Off-canvas navigation for small screens */}
      {/* <div className={styles.offCanvas}>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                borderBottom: isActive ? "3px solid #37b38b" : "",
                textDecoration: "none",
                color: isActive ? "#37b38b" : "black",
                fontSize: isActive ? "17px" : "16px",

              })}
            >
              <div>{link.label}</div>
            </NavLink>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default ProfileNavbar;
