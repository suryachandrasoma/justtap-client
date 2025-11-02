import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../styles/hero.css';
import { THEME } from '../utils/constants';

export default function HeroSection({ onCheckEligibility, onRequestCallback }) {
  return (
    <section
      id="home"
      className="hero-section"
      style={{
        backgroundImage: "url('/assets/banner.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: THEME.primary,
        marginTop: '65px', // ✅ pushes banner down just below fixed navbar
      }}
    >
      <div className="hero-overlay">
        <Container>
          <Row className="align-items-center min-vh-85">
            <Col md={7} className="text-white">
              <h1 className="hero-title">Make your study abroad dream come true</h1>
              <p className="lead">
                Expert guidance, loans, and end-to-end support to get you studying abroad.
              </p>
              <div className="mt-4">
                <Button
                  variant="light"
                  className="me-3 hero-cta"
                  onClick={onCheckEligibility}
                >
                  Check Loan Eligibility
                </Button>
                <Button
                  variant="outline-light"
                  className="hero-cta"
                  onClick={onRequestCallback}
                >
                  Request Callback
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}
