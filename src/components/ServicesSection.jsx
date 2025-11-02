import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/services.css";
import {
  FaHandsHelping,
  FaUserGraduate,
  FaChartLine,
  FaBolt,
} from "react-icons/fa";

export default function ServicesSection() {
  const services = [
    {
      title: "Loan Assistance",
      desc: "Seamless end-to-end support for education loans — from eligibility check to approval.",
      icon: <FaHandsHelping size={36} color="#004391" />,
    },
    {
      title: "Expert Consultation",
      desc: "Personalized counseling to guide you through every step of your abroad journey.",
      icon: <FaUserGraduate size={36} color="#004391" />,
    },
    {
      title: "Financial Planning",
      desc: "Customized financial strategies to manage study costs and optimize resources.",
      icon: <FaChartLine size={36} color="#004391" />,
    },
    {
      title: "Quick Processing",
      desc: "Fast-track loan approvals with our efficient, tech-driven process.",
      icon: <FaBolt size={36} color="#004391" />,
    },
  ];

  return (
    <section id="why-choose" className="services-section py-5">
      <Container>
        <h2 className="text-center section-title mb-5">
          Why Choose <span className="highlight">JustTap</span>?
        </h2>
        <Row className="justify-content-center g-4">
          {services.map((service, index) => (
            <Col md={3} sm={6} xs={12} key={index}>
              <div className="service-card text-center p-4 h-100">
                <div className="service-icon mb-3">{service.icon}</div>
                <h5 className="service-title">{service.title}</h5>
                <p className="service-desc">{service.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
