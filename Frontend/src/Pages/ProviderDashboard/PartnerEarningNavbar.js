// import React from "react";
// import { Col, Row } from "react-bootstrap";

// import { DashboardProvider } from "./Dashboard";
// import NavbarUserDashboardProvider from "./NavbarProvider";
// import { Footer } from "../Footer";
// import { NavLink } from "react-router-dom";
// import { PaymentStatementPage } from "./PaymentStatementPage";
// import styles from "../../Styles/ProviderDashboardStyle/NavbarProvider.module.css";
// //import { USER_API } from '../Url'

// export const PartnerEarning = () => {
//   //console.log(USER_API)
//   return (
//     <>
//       <div>
//         <NavbarUserDashboardProvider />
//       </div>
//       <div className={styles.nav}>
//         <Row
//           style={{
//             padding: "150px 0px",
//             gap: "20px",
//             alignItems: "top",
//             width: "100%",
//             margin: "auto",
//           }}
//           className="justify-content-md-center"
//         >
//           {/* <NavbarComp /> */}
//           <Col md="3" lg="3" xl="3" xxl="2">
//             <DashboardProvider />
//           </Col>

//           <Col
//             md="8"
//             lg="8"
//             xl="8"
//             xxl="7"
//             style={{
//               border: "1px solid #e2e2e2",
//               paddingTop: "30px",
//               paddingLeft: "30px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 gap: "50px",
//               }}
//             >
//               <NavLink
//                 to="/provider/earning"
//                 style={({ isActive }) => ({
//                   borderBottom: isActive ? "3px solid #37b38b" : "",
//                   paddingBottom: isActive ? "10px" : "10px",
//                   textDecoration: isActive ? "none" : "none",
//                   color: isActive ? "#37b38b" : "black",
//                   fontSize: isActive ? "16px" : "16px",
//                 })}
//               >
//                 <div>PAYMENT STATEMENTS</div>
//               </NavLink>
//               <NavLink
//                 to="/provider/upcoming"
//                 style={({ isActive }) => ({
//                   borderBottom: isActive ? "3px solid #37b38b" : "",
//                   paddingBottom: isActive ? "10px" : "10px",
//                   textDecoration: isActive ? "none" : "none",
//                   color: isActive ? "#37b38b" : "black",
//                   fontSize: isActive ? "16px" : "16px",
//                 })}
//               >
//                 <div>UPCOMING</div>
//               </NavLink>
//             </div>
//             <PaymentStatementPage />
//           </Col>
//         </Row>
//       </div>
//       <div
//         className={styles.offCanvas}
//         style={{
//           border: "1px solid #e2e2e2",
//           margin: "48px 5px 5px 5px",
//           alignItems: "top",
//           // marginTop:"2px"
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems:"flex-start",
//             gap: "50px",
//             padding: "0px 20px",
//             fontSize: "12px",
//           }}
//         >
//           <NavLink
//             to="/provider/earning"
//             style={({ isActive }) => ({
//               borderBottom: isActive ? "3px solid #37b38b" : "",
//               paddingBottom: isActive ? "10px" : "10px",
//               textDecoration: isActive ? "none" : "none",
//               color: isActive ? "#37b38b" : "black",
//               fontSize: isActive ? "16px" : "16px",
//             })}
//           >
//             <div>PAYMENT STATEMENTS</div>
//           </NavLink>
//           {/* <Link to="/user/dashboard">Dashboard</Link>  */}
//           <NavLink
//             to="/provider/upcoming"
//             style={({ isActive }) => ({
//               borderBottom: isActive ? "3px solid #37b38b" : "",
//               paddingBottom: isActive ? "10px" : "10px",
//               textDecoration: isActive ? "none" : "none",
//               color: isActive ? "#37b38b" : "black",
//               fontSize: isActive ? "16px" : "16px",
//             })}
//           >
//             <div>UPCOMING</div>
//           </NavLink>
//         </div>
//         <PaymentStatementPage />
//       </div>
//       {/* <Footer /> */}
//     </>
//   );
// };

import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../Styles/ProviderDashboardStyle/PartnerEarningNavbar.module.css";

const navLinks = [
  { path: "/provider/earning", label: "PAYMENT STATEMENTS" },
  { path: "/provider/request", label: "UPCOMING" },
];
const PartnerEarningNavbar = () => {
  return (
    <>
      <div className={styles.nav}>
        <div style={{ display: "flex", gap: "20px" }}>
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              // style={({ isActive }) => ({
              //   borderBottom: isActive ? "3px solid #37b38b" : "",
              //   paddingBottom: "10px",
              //   textDecoration: "none",
              //   color: isActive ? "#37b38b" : "black",
              //   fontSize: "16px",
              // })}
              style={({ isActive }) => ({
                borderBottom: isActive ? "3px solid #37b38b" : "",
                textDecoration: "none",
                color: isActive ? "#37b38b" : "black",
              })}
            >
              <div>{link.label}</div>
            </NavLink>
          ))}
        </div>
      </div>
      <div className={styles.offCanvas}>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              // style={({ isActive }) => ({
              //   borderBottom: isActive ? "3px solid #37b38b" : "",
              //   paddingBottom: "10px",
              //   textDecoration: "none",
              //   color: isActive ? "#37b38b" : "black",
              //   fontSize: "16px",
              // })}
              style={({ isActive }) => ({
                borderBottom: isActive ? "3px solid #37b38b" : "",
                textDecoration: "none",
                color: isActive ? "#37b38b" : "black",
              })}
            >
              <div>{link.label}</div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default PartnerEarningNavbar;
