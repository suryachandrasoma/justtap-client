import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/services.css';

export default function ServicesSection(){
  const services = [
    { title: 'Loan Assistance', desc: 'End-to-end loan support for your study abroad.' },
    { title: 'Consultation', desc: 'Expert counselors to guide you.' },
    { title: 'Financial Planning', desc: 'Personalized plans to manage expenses.' }
  ];
  return (
    <section id="services" className="services-section py-5">
      <Container>
        <h2 className="text-center section-title mb-4">Our Services</h2>
        <Row>
          {services.map((s,i)=>(
            <Col md={4} key={i}>
              <Card className="service-card p-3 mb-3">
                <Card.Body>
                  <Card.Title>{s.title}</Card.Title>
                  <Card.Text>{s.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
