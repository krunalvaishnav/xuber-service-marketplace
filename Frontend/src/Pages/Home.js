import React from "react";
import { NavbarComp } from "../Components/Navbar";
import { BodyPart } from "../Components/BodyPart";
import background_image from "../Assets/body_background.png";
import styles from "../Styles/Home.module.css";
import { Footer } from "./Footer";

export const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${background_image})`,
        width: "100vw",
        minHeight: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className={styles.container}
    >
      <NavbarComp />
      <BodyPart />
      <div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};
