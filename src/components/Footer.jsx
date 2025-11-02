import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa';
import '../styles/footer.css';

export default function Footer(){
  return (
    <footer className="footer-section">
      <Container>
        <Row className="gy-4">
          <Col md={3}>
            <h5 className="footer-logo">JustTap</h5>
            <p className="footer-desc">Empowering students to achieve their global education dreams with simplified loan solutions.</p>
          </Col>
          <Col md={3}>
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="footer-links">
              <li><a href="#services">Services</a></li>
              <li><a href="#partners">Partners</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6 className="footer-heading">Contact Info</h6>
            <p>123 JustTap Street, Hyderabad, India</p>
            <p>📞 +91 123 456 7890</p>
            <p>✉️ support@justtap.com</p>
          </Col>
          <Col md={3}>
            <h6 className="footer-heading">Follow Us</h6>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </Col>
        </Row>
        <hr />
        <p className="text-center copyright">© {new Date().getFullYear()} JustTap. All rights reserved.</p>
      </Container>
    </footer>
  );
}
