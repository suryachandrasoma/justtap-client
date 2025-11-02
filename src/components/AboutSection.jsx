import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/about.css";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="about-section py-5 position-relative overflow-hidden">
      {/* Background gradient and floating circles */}
      <div className="floating-bg"></div>
      <div className="floating-circle circle1"></div>
      <div className="floating-circle circle2"></div>

      <Container className="position-relative">
        <Row className="align-items-center">
          <Col
            md={6}
            className="text-center text-md-start mb-4 mb-md-0"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="about-title mb-3">About JustTap</h2>
              <p className="about-desc mb-4">
                At <strong>JustTap</strong>, we bridge the gap between students and financial
                institutions to make studying abroad stress-free. From loan
                eligibility checks to document assistance and quick approvals,
                we make every step seamless and transparent.
              </p>
              <Button className="about-btn px-4 py-2" variant="primary">
                Learn More
              </Button>
            </motion.div>
          </Col>

          <Col md={6}>
            <motion.div
              className="about-image-box mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* ✅ Public path for image */}
              <img
                src="/assets/about-image.jpg"
                alt="About JustTap"
                className="img-fluid rounded-4 shadow-sm"
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
