import React from 'react'
import { Dashboard } from './Dashboard'
import NavbarUserDashboard from './NavbarUserDashboard'
import { Col, Row } from 'react-bootstrap'
import { Footer } from '../Footer'
import styles from "../../Styles/UserDashboardStyle/Navbar.module.css" 
export const Promotion = () => {
  return (
    <>
      <NavbarUserDashboard />
      <div className={styles.nav}>
          <Row  style={{paddingTop:"150px",gap:"20px",paddingBottom:"100px",width:"100%",margin:"auto"}} className="justify-content-md-center">
              {/* <NavbarComp /> */}
              <Col md="3" lg="3" xl='3' xxl="2"><Dashboard /></Col>
              
            <Col md="8" lg='8' xl='8'xxl='7' style={{border:"1px solid #e2e2e2",paddingTop:"30px",paddingLeft:"30px"}}>Promotion Page : <span style={{color:"#ffc107"}}>Work under process</span> </Col>
          </Row>
          </div>
          <div className={styles.offCanvas}>Promotion Page : <span style={{color:"#ffc107"}}>Work under process</span></div>
          <Footer />
    </>
  )
}
