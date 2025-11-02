import React, { useState, useEffect } from 'react';
import { Modal, Container, ProgressBar, Row, Col, Button, Form } from 'react-bootstrap';
import { COUNTRIES, UNIVERSITIES } from '../utils/sampleData';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/modal.css';

export default function EligibilityModal({ show, onHide }) {
  const totalSteps = 5;
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState({
    country: null, status: null, intake: null,
    university: null, approachedBank: null,
    name: '', city: '', email: '', phone: ''
  });

  useEffect(() => {
    if (!show) {
      setStep(1);
      setSelected({
        country: null, status: null, intake: null,
        university: null, approachedBank: null,
        name: '', city: '', email: '', phone: ''
      });
    }
  }, [show]);

  const advance = (data) => {
    setSelected(prev => ({ ...prev, ...data }));
    if (step < totalSteps) setStep(s => s + 1);
  };
  const back = () => setStep(s => Math.max(1, s - 1));

  return (
    <Modal show={show} onHide={onHide} dialogClassName="modal-lg" centered backdrop="static">
      <Modal.Header closeButton className="border-0 pb-0">
        <div>
          <h4 className="fw-semibold mb-1 text-primary">Check Your Loan Eligibility</h4>
          <p className="text-muted small mb-0">Answer a few quick questions to get started</p>
        </div>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <div className="step-progress mb-4">
            <ProgressBar now={(step / totalSteps) * 100} className="rounded-pill shadow-sm" />
            <div className="text-center mt-2 text-muted small">Step {step} of {totalSteps}</div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <h5 className="fw-semibold mb-3">Where do you plan to study?</h5>
                <Row>
                  {COUNTRIES.slice(0, 6).map(c => (
                    <Col md={4} sm={6} key={c} className="mb-3">
                      <div className={`modern-option ${selected.country === c ? 'active' : ''}`} onClick={() => advance({ country: c })}>
                        {c}
                      </div>
                    </Col>
                  ))}
                  <Col md={12}><Form.Control placeholder="Search other countries..." className="modern-input" /></Col>
                </Row>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <h5 className="fw-semibold mb-3">What's your admission status?</h5>
                <Row>
                  {['Applied', 'Confirmed', 'Not Applied yet'].map(s => (
                    <Col md={4} sm={6} key={s} className="mb-3">
                      <div className={`modern-option ${selected.status === s ? 'active' : ''}`} onClick={() => advance({ status: s })}>
                        {s}
                      </div>
                    </Col>
                  ))}
                </Row>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <h5 className="fw-semibold mb-3">Select your intake</h5>
                <Row>
                  {['Jan 2026', 'Sep 2026'].map(i => (
                    <Col md={4} sm={6} key={i} className="mb-3">
                      <div className={`modern-option ${selected.intake === i ? 'active' : ''}`} onClick={() => advance({ intake: i })}>
                        {i}
                      </div>
                    </Col>
                  ))}
                </Row>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <h5 className="fw-semibold mb-3">Select your university</h5>
                <Form.Control placeholder="Search universities..." className="modern-input mb-3" />
                <Row>
                  {(UNIVERSITIES[selected.country] || []).slice(0, 6).map(u => (
                    <Col md={6} sm={12} key={u} className="mb-3">
                      <div className={`modern-option ${selected.university === u ? 'active' : ''}`} onClick={() => advance({ university: u })}>
                        {u}
                      </div>
                    </Col>
                  ))}
                </Row>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <h5 className="fw-semibold mb-3">Have you approached any bank?</h5>
                <Row className="mb-4">
                  <Col md={6}><div className={`modern-option ${selected.approachedBank === true ? 'active' : ''}`} onClick={() => setSelected(prev => ({ ...prev, approachedBank: true }))}>Yes</div></Col>
                  <Col md={6}><div className={`modern-option ${selected.approachedBank === false ? 'active' : ''}`} onClick={() => setSelected(prev => ({ ...prev, approachedBank: false }))}>No</div></Col>
                </Row>

                <Form>
                  <Row className="g-3">
                    <Col md={6}><Form.Control placeholder="Full Name" value={selected.name} onChange={e => setSelected(prev => ({ ...prev, name: e.target.value }))} className="modern-input" /></Col>
                    <Col md={6}><Form.Control placeholder="Permanent City" value={selected.city} onChange={e => setSelected(prev => ({ ...prev, city: e.target.value }))} className="modern-input" /></Col>
                    <Col md={6}><Form.Control placeholder="Email" value={selected.email} onChange={e => setSelected(prev => ({ ...prev, email: e.target.value }))} className="modern-input" /></Col>
                    <Col md={6}><Form.Control placeholder="Phone" value={selected.phone} onChange={e => setSelected(prev => ({ ...prev, phone: e.target.value }))} className="modern-input" /></Col>
                  </Row>
                  <div className="mt-4 text-end">
                    <Button variant="primary" className="px-4 rounded-pill shadow-sm" onClick={() => { alert('Mock submit (backend in Phase 3)'); onHide(); }}>
                      Submit
                    </Button>
                  </div>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0 justify-content-between">
        <Button variant="outline-secondary" onClick={back} disabled={step === 1} className="rounded-pill px-4">Back</Button>
        <Button variant="outline-dark" onClick={onHide} className="rounded-pill px-4">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
