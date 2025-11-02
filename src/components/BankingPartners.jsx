import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/bankingPartners.css';

const sampleBanks = ['Bank A','Bank B','Bank C','Bank D','Bank E','Bank F','Bank G','Bank H'];

export default function BankingPartners(){
  return (
    <section id="partners" className="py-5">
      <Container>
        <h2 className="mb-4">Our Banking Partners</h2>
        <Row>
          {sampleBanks.map((b,i)=>(
            <Col md={3} key={i}>
              <Card className="partner-card text-center p-3 mb-3">
                <Card.Body>{b}</Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
