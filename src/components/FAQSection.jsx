import React from "react";
import { Accordion, Button, Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaQuestionCircle, FaComments, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "../styles/faq.css";

export default function FAQSection() {
  const faqs = [
    {
      q: "What is the maximum loan amount I can get for studying abroad?",
      a: "The loan amount varies based on the country, university, and course you choose. Typically, you can get loans ranging from ₹10 lakhs to ₹1.5 crores.",
      tag: "Loan Amount",
    },
    {
      q: "Do I need collateral for an education loan?",
      a: "It depends on the loan amount. For loans up to ₹7.5 lakhs, most banks don't require collateral. For higher amounts, property or assets may be required.",
      tag: "Collateral",
    },
    {
      q: "What is the interest rate for education loans?",
      a: "Interest rates typically range from 8% to 15% per annum, depending on the bank and your profile.",
      tag: "Interest Rate",
    },
    {
      q: "How long does it take to get loan approval?",
      a: "Once documents are submitted, the approval process typically takes 7-15 business days.",
      tag: "Timeline",
    },
    {
      q: "Can I get a loan for any country or university?",
      a: "Most banks provide loans for recognized universities in countries like USA, UK, Canada, and Australia.",
      tag: "Eligibility",
    },
    {
      q: "What documents are required for loan application?",
      a: "You’ll need admission letter, cost of study, academic records, income proof, and ID proof.",
      tag: "Documentation",
    },
    {
      q: "Is there a moratorium period for repayment?",
      a: "Yes, most education loans have a moratorium covering your study period plus 6–12 months.",
      tag: "Repayment",
    },
  ];

  return (
    <section id="faq" className="faq-modern position-relative py-5 overflow-hidden">
      {/* Background Animated Orbs */}
      <motion.div
        className="faq-orb orb1"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="faq-orb orb2"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="position-relative">
        {/* Header */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="d-inline-block mb-3 px-3 py-1 rounded-pill bg-primary-subtle text-primary fw-semibold small">
            <FaQuestionCircle className="me-2" /> FAQs
          </div>
          <h2 className="fw-bold mb-2 text-dark">Got Questions? We've Got Answers</h2>
          <p className="text-muted">
            Everything you need to know about education loans and our services
          </p>
        </motion.div>

        <Row className="g-4 align-items-start">
          {/* FAQ List */}
          <Col lg={8}>
            <Accordion alwaysOpen className="faq-accordion">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Accordion.Item eventKey={String(index)} className="faq-item border-0 mb-3">
                    <Accordion.Header>
                      <span className="faq-tag me-2">{faq.tag}</span>
                      {faq.q}
                    </Accordion.Header>
                    <Accordion.Body>{faq.a}</Accordion.Body>
                  </Accordion.Item>
                </motion.div>
              ))}
            </Accordion>
          </Col>

          {/* Side Cards */}
          <Col lg={4}>
            <motion.div
              className="faq-side sticky-top"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Still Have Questions */}
              <div className="faq-card gradient-card text-white p-4 rounded-4 mb-4">
                <div className="icon-circle mb-3">
                  <FaComments size={22} />
                </div>
                <h5>Still Have Questions?</h5>
                <p className="small text-light">
                  Our expert team is here to help with any education loan queries.
                </p>
                <Button variant="light" className="rounded-pill px-3 text-primary fw-semibold">
                  Talk to Expert
                </Button>
              </div>

              {/* Quick Contact */}
              <div className="faq-card bg-white p-4 rounded-4 shadow-sm mb-4">
                <h6 className="mb-3 fw-bold text-dark">Quick Contact</h6>
                <div className="d-flex align-items-center mb-3">
                  <div className="icon-box me-3">
                    <FaPhoneAlt className="text-primary" />
                  </div>
                  <div>
                    <small className="text-muted d-block">Call Us</small>
                    <span className="fw-semibold">+91 123 456 7890</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="icon-box me-3">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <div>
                    <small className="text-muted d-block">Email Us</small>
                    <span className="fw-semibold">support@justtap.com</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="faq-card bg-white p-4 rounded-4 shadow-sm text-center">
                <Row>
                  <Col>
                    <h4 className="text-primary fw-bold">24/7</h4>
                    <small className="text-muted">Support Available</small>
                  </Col>
                  <Col>
                    <h4 className="text-primary fw-bold">&lt;2hrs</h4>
                    <small className="text-muted">Response Time</small>
                  </Col>
                </Row>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
