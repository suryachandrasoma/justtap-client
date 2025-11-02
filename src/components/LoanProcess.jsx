import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/process.css';

export default function LoanProcess(){
  const steps = [
    'Check eligibility instantly',
    'Submit required documents',
    'Get personalized offers',
    'Loan approval and disbursal'
  ];
  return (
    <section className="process-section py-5">
      <Container>
        <h2 className="section-title mb-4">How it Works</h2>
        <Row>
          {steps.map((st,i)=>(
            <Col md={3} key={i}>
              <div className="process-card p-3 mb-3">{st}</div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
