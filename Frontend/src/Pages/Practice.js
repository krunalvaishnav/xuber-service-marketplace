import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/js/dist/dropdown'

import 'bootstrap/js/dist/collapse'

export const Practice = () => {
  return (<>
    {/* <Navbar bg="dark" data-bs-theme="dark" fixed='top'  fluid>
    <Container>
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
<Container fluid>
<Row style={{height:"120px",border:"1px solid red",paddingTop:"70px"}}>
        <Col>1 of 1</Col>
      </Row>
</Container> */}
   
   {/* <nav className="navbar navbar-expand-sm navbar-dark">
        <i
          className="navbar-brand bi bi-justify-left fs-4"
          
        ></i>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-justify"></i>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                id="dropdownId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                Yousof
              </a>

              <div className="dropdown-menu" aria-labelledby="dropdownId">
                <a className="dropdown-item" href="#">
                  Profile
                </a>
                <a className="dropdown-item" href="#">
                  Setting
                </a>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav> */}

<div className='container'>
   <nav className="navbar navbar-expand-sm" style={{backgroundColor: "gray"}}>
       <i className="navbar-brand bi bi-justify-left"></i>
       <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
           aria-expanded="false" aria-label="Toggle navigation"></button>
       <div className="collapse navbar-collapse" id="collapsibleNavId">
           <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
               {/* <li className="nav-item">
                   <a className="nav-link active" href="#" aria-current="page">Home <span className="visually-hidden">(current)</span></a>
               </li>
               <li className="nav-item">
                   <a className="nav-link" href="#">Link</a>
               </li> */}
               <li className="nav-item dropdown">
                   <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">TaxiTime</a>
                   <div className="dropdown-menu" aria-labelledby="dropdownId">
                       <a className="dropdown-item" href="#">Profile</a>
                       <a className="dropdown-item" href="#">Setting</a>
                       <a className="dropdown-item" href="#">Logout</a>
                   </div>
               </li>
           </ul>
       </div>
   </nav>
   </div>
  
  </>
  )
}
