import React, { useState } from 'react';
import { Modal, Container, Form, Button } from 'react-bootstrap';

export default function CallbackModal({ show, onHide }){
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    setSubmitted(true);
    setTimeout(()=> {
      alert('Thank you — our FO will shortly reach out to you.');
      setSubmitted(false);
      setPhone('');
      onHide();
    }, 600);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header><Modal.Title>Request Callback</Modal.Title></Modal.Header>
      <Modal.Body>
        <Container>
          <Form>
            <Form.Group>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Enter phone number" />
            </Form.Group>
            <div className="mt-3 text-end">
              <Button variant="primary" onClick={submit} disabled={!phone || submitted}>Submit</Button>
            </div>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
