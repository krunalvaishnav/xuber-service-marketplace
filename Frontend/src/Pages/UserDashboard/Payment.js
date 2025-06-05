import React, { useEffect, useState } from 'react'
import { Dashboard } from './Dashboard'
import NavbarUserDashboard from './NavbarUserDashboard'
import { Col, Row } from 'react-bootstrap'
import { Footer } from '../Footer'
import axios from 'axios'
import { USER_API } from '../Url'
import Cookies from 'js-cookie'
import cashImage from "../../Assets/cash-icon.png";
import styles from "../../Styles/UserDashboardStyle/Navbar.module.css" 
export const Payment = () => {

  const [user, setUser] = useState([]);
  const [userError, setUserError] = useState(null);



  const getApiUser =async()=>{
      let token=Cookies.get("loginToken");
      //console.log(token)
      const headers = {
        'authorization': token,
      };
  
      
      
       await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/payment`,{headers})
       .then((response) => {
           console.log(response.data)
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error)
          setUserError(error);
        });
        
      
  
    }
  





useEffect(()=>{
      getApiUser();
},[])
  return (
    <>
      <NavbarUserDashboard />
      <div className={styles.nav}>
          <Row  style={{paddingTop:"150px",gap:"20px",paddingBottom:"100px",width:"100%",margin:"auto"}} className="justify-content-md-center">
              {/* <NavbarComp /> */}
              <Col md="3" lg="3" xl='3' xxl="2"><Dashboard /></Col>
              
            <Col md="8" lg='8' xl='8' xxl='7'  style={{border:"1px solid #e2e2e2",paddingTop:"30px",paddingLeft:"30px"}}>


              <p style={{marginBottom:"20px",fontWeight:"570",fontSize:"22px",color:"black"}}>Payment</p>
              <p style={{borderBottom:"1px solid #eee",paddingBottom:"20px",fontWeight:"500",fontSize:"16px",color:"black"}}>Payment Methods</p>
              <p style={{borderBottom:"1px solid #eee",paddingBottom:"20px",fontSize:"18px"}}><img src={cashImage} alt="cash_image" style={{width:"25px"}}/>{" "}{ user.payment_mode}</p>
            </Col>
          </Row>
          </div>
          <div className={styles.offCanvas}>
          <p style={{marginBottom:"20px",fontWeight:"570",fontSize:"22px",color:"black"}}>Payment</p>
              <p style={{borderBottom:"1px solid #eee",paddingBottom:"20px",fontWeight:"500",fontSize:"16px",color:"black"}}>Payment Methods</p>
              <p style={{borderBottom:"1px solid #eee",paddingBottom:"20px",fontSize:"18px"}}><img src={cashImage} alt="cash_image" style={{width:"25px"}}/>{" "}{ user.payment_mode}</p>
            
          </div>
        <Footer />
    </>
  )
}
