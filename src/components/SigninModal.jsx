import React, { useState, useEffect } from 'react';
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
  const [ttlSeconds, setTtlSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const startSignin = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const normalizedEmail = String(email).trim().toLowerCase();
      console.log('📤 Sending signin request for email:', normalizedEmail);
      const res = await initiateSignin(normalizedEmail);
      console.log('✅ Backend response:', res);
      if (res && res.ok) {
        setTempId(res.tempId);
        setTtlSeconds(res.ttlSeconds || 120);
        setRemaining(res.ttlSeconds || 120);
        setMessage({ type: 'success', text: 'OTP sent to your email.' });
      } else {
        setMessage({ type: 'danger', text: res?.message || 'Failed to send OTP' });
      }
    } catch (err) {
      console.log('❌ Error response:', err.response?.data);
      setMessage({ type: 'danger', text: err.response?.data?.message || err.message || 'Failed to send OTP' });
    } finally {
      setLoading(false);
    }
  };

  // countdown timer for OTP expiry
  useEffect(() => {
    if (!tempId) return;
    setRemaining(prev => prev || ttlSeconds || 0);
  }, [tempId, ttlSeconds]);

  useEffect(() => {
    if (!tempId || !remaining) return;
    const iv = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) {
          clearInterval(iv);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [tempId, remaining]);

  const resendOtp = async () => {
    if (!email) return setMessage({ type: 'warning', text: 'Enter email first' });
    setLoading(true);
    setMessage(null);
    try {
      const normalizedEmail = String(email).trim().toLowerCase();
      const res = await initiateSignin(normalizedEmail);
      if (res && res.ok) {
        setTempId(res.tempId);
        setTtlSeconds(res.ttlSeconds || 120);
        setRemaining(res.ttlSeconds || 120);
        setMessage({ type: 'success', text: 'OTP resent to your email.' });
      } else {
        setMessage({ type: 'danger', text: res?.message || 'Failed to resend OTP' });
      }
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || err.message || 'Failed to resend OTP' });
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
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Button variant="secondary" onClick={() => { setTempId(null); setOtp(''); setMessage(null); setRemaining(0); }} disabled={loading}>Back</Button>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <small className="text-muted">{remaining > 0 ? `Expires in ${remaining}s` : 'OTP expired'}</small>
                  <Button variant="link" disabled={loading} onClick={resendOtp}>Resend OTP</Button>
                  <Button variant="primary" onClick={submitOtp} disabled={!otp || loading}>{loading ? 'Verifying...' : 'Verify & Sign In'}</Button>
                </div>
              </div>
            </Form>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
}
