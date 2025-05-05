import React from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export const NoPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        color: "#343a40",
      }}
    >
      <h1 style={{ fontSize: "4rem", fontWeight: "bold" }}>404</h1>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        Page Not Found
      </h2>
      <p
        style={{
          color: "#6c757d",
          textAlign: "center",
          maxWidth: "400px",
          marginBottom: "1.5rem",
        }}
      >
        Oops! The page you're looking for doesn't exist. It might have been
        moved or deleted.
      </p>
      <Button variant="primary" as={Link} to="/">
        Return to Home
      </Button>
    </div>
  );
};

// export default function NotFound() {
//   return (
//     <div style={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       minHeight: "100vh",
//       backgroundColor: "#f8f9fa",
//       color: "#343a40"
//     }}>
//       <h1 style={{ fontSize: "4rem", fontWeight: "bold" }}>404</h1>
//       <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Page Not Found</h2>
//       <p style={{ color: "#6c757d", textAlign: "center", maxWidth: "400px", marginBottom: "1.5rem" }}>
//         Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
//       </p>
//       <Button variant="primary" as={Link} href="/">
//         Return to Home
//       </Button>
//     </div>
//   );
// }
