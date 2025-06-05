import React, { useEffect, useState } from "react";
import { Dashboard } from "./Dashboard";
import NavbarUserDashboard from "./NavbarUserDashboard";
import { Col, Row } from "react-bootstrap";
import { Footer } from "../Footer";
import axios from "axios";
import { USER_API } from "../Url";
import Cookies from "js-cookie";
import styles from "../../Styles/UserDashboardStyle/Profile.module.css";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [dataWallet, setDataWallet] = useState([]);
  const [errorWallet, setErrorWallet] = useState(null);
  const navigate = useNavigate();

  // const cookieData = Cookies.get("loginToken");
  // console.log("cookies",cookieData);

  const getApi = async () => {
    let token = Cookies.get("loginToken");
    // console.log(token)
    const headers = {
      authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/profile`,
        { headers }
      );
      // console.log("Get_Response",response);
      setData(response.data.userData);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  //wallet API
  // const getApiWallet = async () => {
  //   let token = Cookies.get("loginToken");
  //   //console.log(token)
  //   const headers = {
  //     authorization: token,
  //   };

  //   await axios
  //     .get(`${process.env.REACT_APP_BACKEND_URL}/user/wallet`, { headers })
  //     .then((response) => {
  //       console.log(response);
  //       setDataWallet(response.data.wallet_balance);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setErrorWallet(error);
  //     });
  // };

  useEffect(() => {
    getApi();
    // getApiWallet();
  }, [dataWallet]);

  // document.title = "Profile";


  return (
    <div className={styles.fullComponent}>
      <NavbarUserDashboard />
      <div className={styles.nav}>
        <Row
          // style={{
          //   paddingTop: "150px",
          //   gap: "20px",
          //   paddingBottom: "100px",
          //   width: "100%",
          //   margin: "auto",
          // }}
          // className="justify-content-md-center"
          className={styles.mainDiv}
        >
          {/* <NavbarComp /> */}
          <Col md="3" lg="3" xl="3" xxl="2" className={styles.dashboard}>
            <Dashboard />
          </Col>

          <Col
            md="8"
            lg="8"
            xl="8"
            xxl="7"
            style={{
              border: "1px solid #e2e2e2",
              padding:"20px"
            }}
          >
            <p className={styles.generalInfo}>General Information</p>
            <div className={styles.divClass}>
              <div>
                <p>
                  <span className={styles.boldName}>First Name : </span>
                  {data.first_name}
                </p>
              </div>

              <div>
                <p>
                  <span className={styles.boldName}>Last Name : </span>
                  {data.last_name}
                </p>
              </div>
            </div>
            <div className={styles.divClass}>
              <p>
                <span className={styles.boldName}>Email Id : </span>
                {data.email}
              </p>
              <p>
                <span className={styles.boldName}>Mobile : </span>
                {data.mobile}
              </p>
            </div>
            <div className={styles.divClass}>
              <p>
                <span className={styles.boldName}>Wallet : </span> ${dataWallet}
              </p>
              <button
                className={styles.buttonEdit}
                onClick={() => navigate("/user/profile/edit")}
              >
                Edit
              </button>
            </div>
          </Col>
        </Row>
      </div>

      {/*  <div className={styles.offCanvas}>
        <Row
          style={{
            margin: "70px auto",
            gap: "20px",
            alignItems: "top",
            border: "1px solid #e2e2e2",
            width: "90%",
          }}
          className="justify-content-md-center"
        >
          <p className={styles.generalInfo}>General Information</p>
          <div className={styles.divClass}>
            <div>
              <p>
                <span className={styles.boldName}>First Name : </span>
                {data.first_name}
              </p>
            </div>

            <div>
              <p>
                <span className={styles.boldName}>Last Name : </span>
                {data.last_name}
              </p>
            </div>
          </div>
          <div className={styles.divClass}>
            <p>
              <span className={styles.boldName}>Email Id : </span>
              {data.email}
            </p>
            <p>
              <span className={styles.boldName}>Mobile : </span>
              {data.mobile}
            </p>
          </div>
          <div className={styles.divClass}>
            <p>
              <span className={styles.boldName}>Wallet : </span> ${dataWallet}
            </p>
            <button
              className={styles.buttonEdit}
              onClick={() => navigate("/user/profile/edit")}
            >
              Edit
            </button>
          </div>
        </Row>
      </div>
      {/* <div className={styles.footer}>
        <Footer />
      </div> */}
    </div>
  );
};
