import React, { useEffect, useState } from 'react'
import { Dashboard } from './Dashboard'
import NavbarUserDashboard from './NavbarUserDashboard'
import { Col, Row } from 'react-bootstrap'
import { Footer } from '../Footer'
import { USER_API } from '../Url'
import axios from 'axios'
import Cookies from 'js-cookie'
import styles from "../../Styles/UserDashboardStyle/Navbar.module.css" 

export const MyWallet = () => {

  const [dataWallet, setDataWallet] = useState([]);
    const [errorWallet, setErrorWallet] = useState(null);


  const getApiWallet =async()=>{
    let token=Cookies.get("loginToken");
    //console.log(token)
    const headers = {
      'authorization': token,
    };

    
    
     await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/wallet`,{headers})
     .then((response) => {
         console.log(response)
        setDataWallet(response.data.wallet_balance);
      })
      .catch((error) => {
        // console.log(error)
        setErrorWallet(error);
      });
      
    

  }



  useEffect(()=>{
        getApiWallet();
  },[])

  return (
    <>
            <NavbarUserDashboard />
            <div className={styles.nav}>
            <Row  style={{paddingTop:"150px",gap:"20px",paddingBottom:"100px",width:"100%",margin:"auto"}}className="justify-content-md-center">
              {/* <NavbarComp /> */}
              <Col md="3" lg="3" xl='3' xxl="2"><Dashboard /></Col>
              
            <Col md="8" lg='8' xl='8' xxl='7' style={{border:"1px solid #e2e2e2",paddingTop:"30px",paddingLeft:"30px"}}>
              
              
              <p style={{marginBottom:"20px",fontWeight: "500",fontSize:"20px"}}>MY Wallet</p>
              
              <div style={{marginLeft:"10%"}}>
              <p style={{fontSize:"100px",fontWeight:"200",marginBottom:"0px"}}>${dataWallet}</p> 
              <p style={{fontSize:"20px",lineHeight:"0px",color:"#999"}}>in your wallet</p>
              </div>
              </Col>
          </Row>
          </div>
          <div className={styles.offCanvas}>
                <p style={{marginBottom:"20px",fontWeight: "500",fontSize:"20px"}}>MY Wallet</p>
              
              <div style={{marginLeft:"10%"}}>
              <p style={{fontSize:"100px",fontWeight:"200",marginBottom:"0px"}}>${dataWallet}</p> 
              <p style={{fontSize:"20px",lineHeight:"0px",color:"#999"}}>in your wallet</p>
              </div>
          </div>
          <Footer />
    </>
  )
}
