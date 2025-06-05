import React from 'react'
import { NavbarComp } from '../Components/Navbar'

import bgImage from "../Assets/login_background_image.png";
import { Footer } from './Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from "../Styles/ResetPasswordProvider.module.css"
import resetPageImage from "../Assets/reset_password_img.png"
import ResetPasswordProvider from '../Components/ResetPassCompProvider';

export const ResetPassProvider = () => {
  const backgroundStyle={
    backgroundImage:`url(${bgImage})`,
    backgroundPosition:"center center",
    backgroundRepeat:"no-repeat",
    width:"100%",
    minHeight:"100vh",
    backgroundSize:"cover",
    paddingTop:"100px",
    paddingBottom:"30px"
}
  return (
    <div >
      <NavbarComp />
      <div style={backgroundStyle} >
       
      <Container fluid>
            <Row  xs = "1" sm="1" md="1" lg="2" id={styles.topbodyContainer} fluid>
                  <Col className={styles.col1} xxl="7"> 
                           <p className={styles.firstParaService}><span>Xuber</span> Services needs partners <span>like you.</span> </p>
                           <p className={styles.secondParaDriveXuber}>Drive with Xuber Services and earn great money as an independent contractor.
                            Get paid weekly just for helping our community of riders get rides around town. 
                           Be your own boss and get paid in fares for driving on your own schedule.</p>
                            <img src={resetPageImage} className={styles.first_div_col1_image} alt="login_page_logo"/>
                  </Col>
                  <Col className={styles.col2} xxl="5">
                        <div ><ResetPasswordProvider /></div>
                  </Col>
            </Row>
      </Container>

        {/* <Footer /> */}
      </div>
     
    </div>
  )
}
