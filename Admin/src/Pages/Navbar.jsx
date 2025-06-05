// import { useState, useRef, useEffect } from "react";
// import { Navbar } from "react-bootstrap";
// import styles from "../Styles/Navbar.module.css";
// import { FaBars, FaTimes } from "react-icons/fa";
// import Logo from "../Assets/imageedit_2_7944020326.png";
// import { Dashboard } from "./Dashboard";

// function NavbarUserDashboard() {
//   const navRef = useRef();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 767);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth <= 767);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleNavbar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <header>
//       <div className={styles.nav}>
//         <Navbar
//           expand="md"
//           bg="white"
//           fixed="top"
//           style={{
//             borderBottom: "1px solid rgb(81, 81, 85)",
//             padding: "0px",
//           }}
//         >
//           {/* Hamburger Button */}
//           <button className={styles.nav_btn} onClick={toggleNavbar}>
//             {isOpen ? <FaTimes /> : <FaBars />}
//           </button>

//           {/* Company Logo */}
//           <div className={styles.company_logo_container}>
//             <img
//               src={Logo}
//               alt="Company Logo"
//               className={styles.company_logo}
//             />
//           </div>

//           {/* Sidebar Navigation */}
//           <nav
//             ref={navRef}
//             className={`${styles.nav_menu} ${isOpen ? styles.responsive_nav : ""}`} 
//             style={{ width: isSmallScreen && isOpen ? "100%" : isOpen ? "180px" : "260px" }}
//           >
//             <div className={styles.dashboard}>
//               <Dashboard />
//             </div>
//           </nav>
//         </Navbar>
//       </div>
//     </header>
//   );
// }

// export default NavbarUserDashboard;
