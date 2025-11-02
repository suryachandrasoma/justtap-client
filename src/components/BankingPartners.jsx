import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/bankingPartners.css";

const bankPartners = [
  { name: "HDFC Bank", logo: "/assets/HDFC.png" },
  { name: "ICICI Bank", logo: "/assets/ICICI.jpg" },
  { name: "YES Bank", logo: "/assets/YES.jpeg" },
  { name: "SBI Bank", logo: "/assets/SBI.jpg" },
  { name: "PNB Bank", logo: "/assets/PNB.jpg" },
  { name: "Canara Bank", logo: "/assets/Canara.jpg" },
  { name: "Union Bank", logo: "/assets/Union.png" },
  { name: "Bank of Baroda", logo: "/assets/BOB.png" },
];

export default function BankingPartners() {
  return (
    <section id="partners" className="partners-section py-5">
      <Container>
        <h2 className="partners-heading mb-5 text-center">
          Our Banking Partners
        </h2>
        <Row className="justify-content-center g-4">
          {bankPartners.map((bank, index) => (
            <Col md={3} sm={6} xs={12} key={index}>
              <div className="partner-card text-center">
                <div className="partner-image-wrapper">
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="partner-logo img-fluid"
                  />
                </div>
                <h6 className="partner-name mt-3">{bank.name}</h6>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
