import React, { useState } from 'react';
import { Modal, Container, Form, Button, Alert } from 'react-bootstrap';
import { initiateSignin, verifySignin } from '../services/authServices';
import { useNavigate } from 'react-router-dom';

export default function SigninModal({ show, onHide, onSuccess }) {
  const [email, setEmail] = useState('');
  const [tempId, setTempId] = useState(null);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const startSignin = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const normalizedEmail = String(email).trim().toLowerCase();
      console.log('📤 Sending signin request for email:', normalizedEmail);
      const res = await initiateSignin(normalizedEmail);
      console.log('✅ Backend response:', res);
      setTempId(res.tempId);
      setMessage({ type: 'success', text: 'OTP sent to your email.' });
    } catch (err) {
      console.log('❌ Error response:', err.response?.data);
      setMessage({ type: 'danger', text: err.response?.data?.message || err.message || 'Failed to send OTP' });
    } finally {
      setLoading(false);
    }
  };

  const submitOtp = async () => {
    if (!tempId) return setMessage({ type: 'warning', text: 'Please request OTP first' });
    setLoading(true);
    setMessage(null);
    try {
      const res = await verifySignin({ tempId, otp });
      if (res.ok && res.token) {
        localStorage.setItem('token', res.token);
        setMessage({ type: 'success', text: 'Signed in successfully' });
        if (onSuccess) onSuccess(res);
        onHide();
        // navigate to dashboard after successful signin
        navigate('/dashboard');
      } else {
        setMessage({ type: 'danger', text: res.message || 'Signin failed' });
      }
    } catch (err) {
      const data = err.response?.data;
      if (data && data.code === 'no-lead') {
        setMessage({ type: 'warning', text: 'No account found for this email. Please sign up.' });
      } else {
        setMessage({ type: 'danger', text: err.response?.data?.message || err.message || 'OTP verification failed' });
      }
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setEmail('');
    setTempId(null);
    setOtp('');
    setMessage(null);
    onHide();
  };

  return (
    <Modal show={show} onHide={resetAndClose} centered>
      <Modal.Header>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {message && <Alert variant={message.type}>{message.text}</Alert>}

          {!tempId && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
              </Form.Group>
              <div className="text-end">
                <Button variant="primary" onClick={startSignin} disabled={!email || loading}>
                  {loading ? 'Sending...' : 'Send OTP'}
                </Button>
              </div>
            </Form>
          )}

          {tempId && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={() => { setTempId(null); setOtp(''); setMessage(null); }} disabled={loading}>Back</Button>
                <Button variant="primary" onClick={submitOtp} disabled={!otp || loading}>{loading ? 'Verifying...' : 'Verify & Sign In'}</Button>
              </div>
            </Form>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
}
