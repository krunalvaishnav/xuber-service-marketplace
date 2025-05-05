import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../../Styles/../Styles/UserDashboardStyle/Dashboard.module.css";
import { USER_API, IMAGE_URL } from "../Url";
import axios from "axios";
import Cookies from "js-cookie";

export const Dashboard = () => {
  const [dataWallet, setDataWallet] = useState([]);
  // const [errorWallet, setErrorWallet] = useState(null);
  const [user, setUser] = useState({});
  const [userError, setUserError] = useState(null);
  const navigate = useNavigate();

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  const getApiUser = async () => {
    let token = Cookies.get("loginToken");
    // console.log("DASHBOARD TOKEN:",token)
    const headers = {
      authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/profile`, { headers });
      // console.log("dashboard:", response.data.userData.picture);
      setUser(response.data.userData);
    } catch (error) {
      console.log(error);
      setUserError(error);
    }
  };
  // console.log("agjs:",user.picture);

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
  //       // console.log(response)
  //       setDataWallet(response.data.wallet_balance);
  //     })
  //     .catch((error) => {
  //       // console.log(error)
  //       setErrorWallet(error);
  //     });
  // };

  useEffect(() => {
    getApiUser();
    // getApiWallet();
  }, [dataWallet]);

  const handleLogout = () => {
    //  console.log("123")
    //  navigate("/");
    Cookies.remove("loginToken");
  };
  return (
    <div>
      <div
        // style={{
        //   height: "250px",
        //   border: "1px solid #e2e2e2",
        //   display: "flex",
        //   flexDirection: "column",
        //   alignItems: "center",
        //   justifyContent: "center",
        // }}
        className={styles.dashboard_container}
      >
        <div className={styles.avater}>
          <img
            src={
              user.picture
                ? `${process.env.REACT_APP_IMAGE_URL}/${user.picture}`
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbEnZMy6gxOu8jsQLx__K94qH2FhKQgvc4fg&s"
            }
            alt="user_logo"
            // style={{
            //   width: "180px",
            //   height: "180px",
            //   borderRadius: "10%",
            //   marginTop: "20px",
            //   objectFit: "cover",
            // }}
          />
        </div>
        <br />
        <div className={styles.name}>
          <p>
            {" "}
            {`${capitalizeFirstLetter(user.first_name)} ${capitalizeFirstLetter(
              user.last_name
            )}`}
          </p>{" "}
        </div>
      </div>

      <div
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   borderLeft: "1px solid #e2e2e2",
        //   borderRight: "1px solid #e2e2e2",
        //   color: "black",
        // }}
        className={styles.dashboard_navigation}
      >
        <NavLink
          to="/user/dashboard"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#37b38b" : "",
            textDecoration: isActive ? "none" : "none",
            color: isActive ? "white" : "black",
            fontSize: isActive ? "18px" : "16px",
          })}
        >
          <div className={styles.div_border}>Dashboard</div>
        </NavLink>
        {/* <Link to="/user/dashboard">Dashboard</Link>  */}
        <NavLink
          to="/user/myrequest"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#37b38b" : "",
            textDecoration: isActive ? "none" : "none",
            color: isActive ? "white" : "black",
            fontSize: isActive ? "18px" : "16px",
          })}
        >
          <div className={styles.div_border}>My Requests</div>
        </NavLink>
        <NavLink
          to="/user/profile"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#37b38b" : "",
            textDecoration: isActive ? "none" : "none",
            color: isActive ? "white" : "black",
            fontSize: isActive ? "18px" : "16px",
          })}
        >
          {" "}
          <div className={styles.div_border}>Profile</div>
        </NavLink>
        <NavLink
          to="/user/password"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#37b38b" : "",
            textDecoration: isActive ? "none" : "none",
            color: isActive ? "white" : "black",
            fontSize: isActive ? "18px" : "16px",
          })}
        >
          <div className={styles.div_border}>Change Password</div>
        </NavLink>
        <NavLink
          to="/user/payment"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#37b38b" : "",
            textDecoration: isActive ? "none" : "none",
            color: isActive ? "white" : "black",
            fontSize: isActive ? "18px" : "16px",
          })}
        >
          <div className={styles.div_border}>Payment</div>
        </NavLink>
        <NavLink
          to="/user/promotion"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#37b38b" : "",
            textDecoration: isActive ? "none" : "none",
            color: isActive ? "white" : "black",
            fontSize: isActive ? "18px" : "16px",
          })}
        >
          <div className={styles.div_border}>Promotions</div>
        </NavLink>
        {/* <NavLink
          to="/user/request"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#37b38b" : "",
            textDecoration: isActive ? "none" : "none",
            color: isActive ? "white" : "black",
            fontSize: isActive ? "18px" : "16px",
          })}
        >
          <div className={styles.div_border}>Upcoming Requests</div>
        </NavLink> */}
        <NavLink
          to="/user/wallet"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#37b38b" : "",
            textDecoration: isActive ? "none" : "none",
            color: isActive ? "white" : "black",
            fontSize: isActive ? "18px" : "16px",
          })}
        >
          <div
            className={styles.div_border}
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "10px",
            }}
          >
            <span>My Wallet </span>${dataWallet}
          </div>
        </NavLink>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#37b38b" : "",
            textDecoration: isActive ? "none" : "none",
            color: isActive ? "white" : "black",
            fontSize: isActive ? "18px" : "16px",
          })}
        >
          <div className={styles.div_border} onClick={handleLogout}>
            Logout
          </div>
        </NavLink>
      </div>
    </div>
    //
  );
};
