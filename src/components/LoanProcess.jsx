import React from "react";
import { Container } from "react-bootstrap";
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
      title: "Check Eligibility",
      icon: <FaSearch />,
      desc: "Instantly check your education loan eligibility using our AI-based system.",
    },
    {
      title: "Upload Documents",
      icon: <FaFileAlt />,
      desc: "Submit academic and financial documents securely for evaluation.",
    },
    {
      title: "Get Offers",
      icon: <FaHandshake />,
      desc: "Receive tailored loan offers matching your university and profile.",
    },
    {
      title: "Loan Disbursal",
      icon: <FaMoneyBillWave />,
      desc: "Sit back and relax — we handle the approval and disbursal.",
    },
  ];

  return (
    <section className="loan-process-section py-5" id="loan-journey">
      <Container>
        <h2 className="process-heading text-center mb-3">
          Your Loan Journey Simplified
        </h2>
        <p className="process-subtext text-center mb-5">
          Navigate through each step of your study loan process — clearly and confidently.
        </p>

        <div className="stepper-container">
          <div className="progress-line"></div>
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              <div className="step-icon">
                {step.icon}
                <div className="step-number">{index + 1}</div>
              </div>
              <h5>{step.title}</h5>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
