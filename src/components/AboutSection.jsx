import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/about.css';

export default function AboutSection(){
  return (
    <section className="about-section py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <div style={{width:'100%',height:260,background:'#e6f0ff',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center'}}>About Image</div>
          </Col>
          <Col md={6}>
            <h2 className="section-title">About JustTap</h2>
            <p>At JustTap, we connect students with leading financial institutions to simplify studying abroad. We assist with eligibility, documentation and loan approvals.</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
