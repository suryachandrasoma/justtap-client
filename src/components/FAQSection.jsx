import React from 'react';
import { Container, Row, Col, Accordion, Button } from 'react-bootstrap';
import '../styles/faq.css';

export default function FAQSection(){
  const faqs = [
    { q: 'How do I apply for a loan?', a: 'Use Check Loan Eligibility to start the process.' },
    { q: 'What documents are required?', a: 'Passport, admission offer, bank statements, ID proof.' },
    { q: 'How long does approval take?', a: 'Typically 1-3 weeks depending on bank.' }
  ];

  return (
    <section id="faq" className="py-5">
      <Container>
        <Row>
          <Col md={8}>
            <h2 className="mb-3">Frequently Asked Questions</h2>
            <Accordion>
              {faqs.map((f,i)=>(
                <Accordion.Item eventKey={String(i)} key={i}>
                  <Accordion.Header>{f.q}</Accordion.Header>
                  <Accordion.Body>{f.a}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
          <Col md={4}>
            <div className="info-box p-3 mb-3">
              <h6>Still have questions?</h6>
              <p className="small">Our expert team is here to help you with queries about education loans.</p>
              <Button size="sm" variant="primary">Talk to Expert</Button>
            </div>
            <div className="info-box p-3 mb-3">
              <h6>Quick Contact</h6>
              <p className="small">Call us: +91 123 456 7890<br/>Email: support@justtap.com</p>
            </div>
            <div className="info-box p-3 mb-3">
              <h6>24/7 Support</h6>
              <p className="small">Support Available<br/>&lt;2hrs Response Time</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
