import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer-section position-relative overflow-hidden">
      <div className="footer-glow"></div>

      <Container>
        <Row className="gy-4 justify-content-between align-items-start">
          {/* Logo and Description */}
          <Col md={3}>
            <h5 className="footer-logo">JustTap</h5>
            <p className="footer-desc">
              Empowering students to achieve their global education dreams
              through fast, transparent, and simple loan solutions.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={3}>
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="footer-links">
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#partners">Partners</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={3}>
            <h6 className="footer-heading">Contact</h6>
            <p>📍 123 JustTap Street, Hyderabad, India</p>
            <p>📞 +91 123 456 7890</p>
            <p>✉️ support@justtap.com</p>
          </Col>

          {/* Social Icons */}
          <Col md={3}>
            <h6 className="footer-heading">Follow Us</h6>
            <div className="social-icons">
              <a href="#" className="social-icon facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon linkedin">
                <FaLinkedinIn />
              </a>
              <a href="#" className="social-icon instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon twitter">
                <FaTwitter />
              </a>
            </div>
          </Col>
        </Row>

        <hr />
        <p className="text-center copyright">
          © {new Date().getFullYear()} <strong>JustTap</strong>. All rights
          reserved.
        </p>
      </Container>
    </footer>
  );
}
