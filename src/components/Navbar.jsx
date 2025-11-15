// src/components/Navbar.jsx
import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaGraduationCap, FaBars, FaTimes } from "react-icons/fa";
import "../styles/navbar.css";
import SigninModal from './SigninModal';

export default function NavbarSection({ onCheckEligibility }) {
  const [expanded, setExpanded] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 70; // navbar height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setExpanded(false);
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      className="shadow-sm"
      style={{
        backgroundColor: "#ffffff",
        transition: "background-color 0.3s ease",
      }}
    >
      <Container>
        {/* Brand / Logo */}
        <Navbar.Brand
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="d-flex align-items-center gap-2"
          style={{ cursor: "pointer" }}
        >
          <div
            style={{
              backgroundColor: "#004391",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaGraduationCap color="#fff" size={18} />
          </div>
          <span
            style={{
              color: "#004391",
              fontWeight: 600,
              fontSize: "1.25rem",
            }}
          >
            JustTap
          </span>
        </Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : true)}
          style={{ border: "none" }}
        >
          {expanded ? (
            <FaTimes color="#004391" size={22} />
          ) : (
            <FaBars color="#004391" size={22} />
          )}
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              onClick={() => scrollToSection("why-choose")}
              className="text-dark fw-semibold mx-2 nav-hover"
            >
              Why Choose Us
            </Nav.Link>
            <Nav.Link
              onClick={() => scrollToSection("loan-journey")}
              className="text-dark fw-semibold mx-2 nav-hover"
            >
              Loan Journey
            </Nav.Link>
            <Nav.Link
              onClick={() => scrollToSection("partners")}
              className="text-dark fw-semibold mx-2 nav-hover"
            >
              Partners
            </Nav.Link>
            <Nav.Link
              onClick={() => scrollToSection("faqs")}
              className="text-dark fw-semibold mx-2 nav-hover"
            >
              FAQs
            </Nav.Link>

            {/* Buttons (Desktop) */}
            <div className="d-none d-lg-flex gap-2 ms-3">
              <Button
                variant="outline-primary"
                style={{
                  borderColor: "#004391",
                  color: "#004391",
                  fontWeight: "500",
                }}
              >
                Call Back
              </Button>
              <Button
                variant="outline-secondary"
                style={{ borderColor: '#004391', color: '#004391', fontWeight: '500' }}
                onClick={() => setShowSignin(true)}
              >
                Sign In
              </Button>
              <Button
                style={{
                  backgroundColor: "#004391",
                  border: "none",
                  fontWeight: "500",
                }}
                onClick={onCheckEligibility}
              >
                Check Eligibility
              </Button>
            </div>
            <SigninModal show={showSignin} onHide={() => setShowSignin(false)} onSuccess={() => setShowSignin(false)} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
