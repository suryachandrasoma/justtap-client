import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaSearch,
  FaFileAlt,
  FaHandshake,
  FaMoneyBillWave,
} from "react-icons/fa";
import "../styles/process.css";

export default function LoanProcess() {
  const steps = [
    {
      title: "Check Eligibility Instantly",
      icon: <FaSearch />,
      desc: "Find out your education loan eligibility in seconds.",
    },
    {
      title: "Submit Documents",
      icon: <FaFileAlt />,
      desc: "Easily upload your academic and financial documents securely.",
    },
    {
      title: "Get Personalized Offers",
      icon: <FaHandshake />,
      desc: "Receive curated offers that suit your university and profile.",
    },
    {
      title: "Loan Approval & Disbursal",
      icon: <FaMoneyBillWave />,
      desc: "Sit back while we get your funds approved and transferred.",
    },
  ];

  return (
    <section className="loan-process-section py-5" id="loan-journey">
      <Container>
        <h2 className="process-heading text-center mb-5">
          Your Loan Journey Simplified
        </h2>
        <div className="process-wrapper">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-icon">{step.icon}</div>
              <div className="step-content">
                <h5>{step.title}</h5>
                <p>{step.desc}</p>
              </div>
              {index !== steps.length - 1 && <div className="step-line" />}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
