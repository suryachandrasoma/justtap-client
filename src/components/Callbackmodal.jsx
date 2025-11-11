import React, { useState } from 'react';
import { Modal, Container, Form, Button } from 'react-bootstrap';
import api from '../services/api';

export default function CallbackModal({ show, onHide }) {
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submit = async () => {
    setSubmitted(true);
    try {
const res = await api.post('http://localhost:4000/api/auth/request-callback', { phone });
      if (res.data.ok) {
        alert('✅ Thank you — our FO will shortly reach out to you.');
        setPhone('');
        onHide();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header><Modal.Title>Request Callback</Modal.Title></Modal.Header>
      <Modal.Body>
        <Container>
          <Form>
            <Form.Group>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Enter phone number"
              />
            </Form.Group>
            <div className="mt-3 text-end">
              <Button
                variant="primary"
                onClick={submit}
                disabled={!phone || submitted}
              >
                {submitted ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
