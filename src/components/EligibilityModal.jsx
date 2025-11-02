import React, { useState, useEffect } from 'react';
import { Modal, Container, ProgressBar, Row, Col, Button, Form } from 'react-bootstrap';
import { COUNTRIES, UNIVERSITIES } from '../utils/sampleData';
import '../styles/modal.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function EligibilityModal({ show, onHide }) {
  const totalSteps = 5;
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState({ country: null, status: null, intake: null, university: null, approachedBank: null, name:'', city:'', email:'', phone:'' });

  useEffect(()=> {
    if (!show) {
      setStep(1);
      setSelected({ country: null, status: null, intake: null, university: null, approachedBank: null, name:'', city:'', email:'', phone:'' });
    }
  },[show]);

  const advance = (data) => {
    setSelected(prev=>({...prev,...data}));
    if (step < totalSteps) setStep(s=>s+1);
  };
  const back = () => setStep(s=>Math.max(1,s-1));

  return (
    <Modal show={show} onHide={onHide} dialogClassName="modal-fullscreen" centered>
      <Modal.Header>
        <Modal.Title>Check Your Loan Eligibility</Modal.Title>
        <Button variant="link" onClick={onHide}>X</Button>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <div className="mb-3 d-flex align-items-center">
            <div className="me-3" style={{minWidth:120}}>{step}/{totalSteps}</div>
            <ProgressBar now={(step/totalSteps)*100} style={{flex:1}} />
          </div>

          <AnimatePresence mode="wait">
            {step===1 && (
              <motion.div key="s1" initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-50}}>
                <h5>Where do you plan to study?</h5>
                <Row className="mt-3">
                  {COUNTRIES.slice(0,6).map(c=>(
                    <Col md={4} key={c} className="mb-3">
                      <div className={`option-card ${selected.country===c ? 'selected': ''}`} onClick={()=>advance({country:c})}>{c}</div>
                    </Col>
                  ))}
                  <Col md={12}><Form.Control placeholder="Search other countries..." /></Col>
                </Row>
              </motion.div>
            )}

            {step===2 && (
              <motion.div key="s2" initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-50}}>
                <h5>What's your admission status?</h5>
                <Row className="mt-3">
                  {['Applied','Confirmed','Not Applied yet'].map(s=>(
                    <Col md={4} key={s}><div className={`option-card ${selected.status===s ? 'selected':''}`} onClick={()=>advance({status:s})}>{s}</div></Col>
                  ))}
                </Row>
              </motion.div>
            )}

            {step===3 && (
              <motion.div key="s3" initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-50}}>
                <h5>Select your intake</h5>
                <Row className="mt-3">
                  {['Jan 2026','Sep 2026'].map(i=>(
                    <Col md={4} key={i}><div className={`option-card ${selected.intake===i ? 'selected':''}`} onClick={()=>advance({intake:i})}>{i}</div></Col>
                  ))}
                </Row>
              </motion.div>
            )}

            {step===4 && (
              <motion.div key="s4" initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-50}}>
                <h5>Select your university</h5>
                <Row className="mt-3">
                  <Col md={12}><Form.Control placeholder="Search universities..." /></Col>
                  {(UNIVERSITIES[selected.country] || []).slice(0,6).map(u=>(
                    <Col md={6} key={u}><div className={`option-card ${selected.university===u ? 'selected':''}`} onClick={()=>advance({university:u})}>{u}</div></Col>
                  ))}
                </Row>
              </motion.div>
            )}

            {step===5 && (
              <motion.div key="s5" initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-50}}>
                <h5>Have you approached any bank? & Fill details</h5>
                <Row className="mt-3">
                  <Col md={6}><div className={`option-card ${selected.approachedBank===true ? 'selected':''}`} onClick={()=>setSelected(prev=>({...prev,approachedBank:true}))}>Yes</div></Col>
                  <Col md={6}><div className={`option-card ${selected.approachedBank===false ? 'selected':''}`} onClick={()=>setSelected(prev=>({...prev,approachedBank:false}))}>No</div></Col>
                </Row>
                <Form className="mt-3">
                  <Row>
                    <Col md={6}><Form.Control placeholder="Full name" value={selected.name} onChange={e=>setSelected(prev=>({...prev,name:e.target.value}))} /></Col>
                    <Col md={6}><Form.Control placeholder="Permanent City" value={selected.city} onChange={e=>setSelected(prev=>({...prev,city:e.target.value}))} /></Col>
                    <Col md={6}><Form.Control placeholder="Email" value={selected.email} onChange={e=>setSelected(prev=>({...prev,email:e.target.value}))} /></Col>
                    <Col md={6}><Form.Control placeholder="Phone" value={selected.phone} onChange={e=>setSelected(prev=>({...prev,phone:e.target.value}))} /></Col>
                  </Row>
                  <div className="mt-3 text-end">
                    <small className="text-muted">(Submit triggers OTP in Phase 3)</small>
                    <Button variant="primary" className="ms-2" onClick={()=>{alert('Mock submit (backend in Phase 3)'); onHide();}}>Submit</Button>
                  </div>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>

        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={back} disabled={step===1}>Back</Button>
        <Button variant="light" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
