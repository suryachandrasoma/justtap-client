import React, { useState, useEffect } from "react";
import {
  Modal,
  ProgressBar,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/modal.css";
import { COUNTRIES, UNIVERSITIES } from "../utils/sampleData";
import {
  initiateSignup,
  verifyOtp,
  fetchUniversities,
  patchSignupToLead,
} from "../services/authServices";
import { useNavigate } from 'react-router-dom';

export default function EligibilityModal({ show, onHide }) {
  const totalSteps = 5;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [tempId, setTempId] = useState(null);
  const [signupPayload, setSignupPayload] = useState(null);
  const [ttlSeconds, setTtlSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const [selected, setSelected] = useState({
    country: "",
    status: "",
    intake: "",
    university: "",
    approachedBank: null,
    name: "",
    city: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!show) {
      setStep(1);
      setOtpStep(false);
      setOtp("");
      setTempId(null);
      setSelected({
        country: "",
        status: "",
        intake: "",
        university: "",
        approachedBank: null,
        name: "",
        city: "",
        email: "",
        phone: "",
      });
    }
  }, [show]);

  // 🆕 State to hold search input for countries
const [searchQuery, setSearchQuery] = useState("");

// 🆕 Filter countries dynamically based on what user types
const filteredCountries = COUNTRIES.filter((country) =>
  country.toLowerCase().includes(searchQuery.toLowerCase())
);


  const advance = (data) => {
    setSelected((prev) => ({ ...prev, ...data }));
    if (step < totalSteps) setStep((s) => s + 1);
  };

  const back = () => setStep((s) => Math.max(1, s - 1));

  const stepLabels = ["Country", "Admission", "Intake", "University", "Details"];

  const handleUniversitySearch = async (query) => {
    if (!selected.country) return;
    try {
      const res = await fetchUniversities(selected.country, query);
      if (res.ok && res.data.length > 0) {
        setUniversities(res.data);
      } else {
        // fallback to local universities if API returns none
        setUniversities(UNIVERSITIES[selected.country] || []);
      }
    } catch (err) {
      console.error("Error fetching universities:", err);
      setUniversities(UNIVERSITIES[selected.country] || []);
    }
  };

  const handleFinalSubmit = async () => {
    try {
      setLoading(true);
      const body = {
        fullName: selected.name,
        city: selected.city,
        email: selected.email,
        phone: selected.phone,
        country: selected.country,
        admissionStatus: selected.status,
        intake: selected.intake,
        university: selected.university,
        approachedBank: selected.approachedBank === true,
      };
      // normalize before sending
      const normalizedBody = Object.assign({}, body);
      if (normalizedBody.email) normalizedBody.email = String(normalizedBody.email).trim().toLowerCase();
      if (normalizedBody.phone) normalizedBody.phone = String(normalizedBody.phone).replace(/\D/g, '');

      const res = await initiateSignup(normalizedBody);
      // store payload so we can resend OTP if needed
      setSignupPayload(normalizedBody);
      // Backend may return an action instructing frontend to patch into an existing callback lead
      if (res && res.ok && res.action === 'patch') {
        // ask user for confirmation to patch existing callback lead
        const confirmPatch = window.confirm(res.message || 'Patch signup to existing callback lead?');
        if (confirmPatch) {
          try {
            const patchRes = await patchSignupToLead({ leadID: res.leadID, payload: normalizedBody });
            if (patchRes && patchRes.ok && patchRes.token) {
              localStorage.setItem('token', patchRes.token);
              alert('✅ Signup updated and verified!');
              onHide();
              // navigate to dashboard after successful patch
              navigate('/dashboard');
              return;
            } else {
              alert(patchRes.message || 'Failed to patch signup.');
            }
          } catch (err) {
            alert('Patch failed: ' + (err?.response?.data?.message || err.message));
          }
        } else {
          // user cancelled patch - do nothing
          return;
        }
      }

      if (res.ok) {
        setTempId(res.tempId);
        setTtlSeconds(res.ttlSeconds || 120);
        setRemaining(res.ttlSeconds || 120);
        setOtpStep(true);
      } else {
        alert(res.message || 'Failed to initiate signup. Please try again.');
      }
    } catch (err) {
      alert("Error: " + (err?.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const res = await verifyOtp({ tempId, otp });
      if (res.ok) {
        localStorage.setItem("token", res.token);
        alert("✅ Signup verified successfully!");
        onHide();
        // navigate to dashboard after signup
        navigate('/dashboard');
      } else {
        alert(res.message || "Invalid OTP. Try again.");
      }
    } catch (err) {
      alert("Verification failed: " + (err?.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  // countdown for signup OTP
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

  const resendSignupOtp = async () => {
    if (!signupPayload) return alert('No signup session to resend for');
    try {
      setLoading(true);
      const res = await initiateSignup(signupPayload);
      if (res && res.ok) {
        setTempId(res.tempId);
        setTtlSeconds(res.ttlSeconds || 120);
        setRemaining(res.ttlSeconds || 120);
        alert('OTP resent to your email');
      } else {
        alert(res.message || 'Failed to resend OTP');
      }
    } catch (err) {
      alert('Resend failed: ' + (err?.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="modal-xl modern-modal"
      centered
      backdrop="static"
    >
      <Modal.Header className="border-0 bg-transparent px-5 pt-4">
        <div>
          <h3 className="fw-semibold text-dark mb-1">
            🎓 Check Your Loan Eligibility
          </h3>
          <p className="text-muted mb-0">
            Answer a few questions to discover your best options
          </p>
        </div>
        <Button variant="link" onClick={onHide} className="fs-4 text-dark">
          ×
        </Button>
      </Modal.Header>

      <Modal.Body className="px-5">
        {!otpStep && (
          <>
            <div className="step-indicator mb-4">
              {stepLabels.map((label, index) => (
                <div
                  key={label}
                  className={`step-item ${index + 1 <= step ? "active" : ""}`}
                >
                  <div className="circle">{index + 1}</div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="step-progress mb-4">
              <ProgressBar
                now={(step / totalSteps) * 100}
                className="rounded-pill elegant-progress"
              />
            </div>
          </>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1 - Country */}
{!otpStep && step === 1 && (
  <motion.div
    key="step1"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    <h5 className="fw-semibold mb-3">Where do you plan to study?</h5>

    {/* 🆕 Country Search Bar */}
    <Form.Control
      placeholder="Search countries..."
      className="modern-input mb-3"
      onChange={(e) => setSearchQuery(e.target.value)}
    />

    <Row>
      {filteredCountries.slice(0, 6).map((c) => (
        <Col md={4} sm={6} key={c} className="mb-3">
          <div
            className={`modern-option ${
              selected.country === c ? "active" : ""
            }`}
            onClick={() => advance({ country: c })}
          >
            {c}
          </div>
        </Col>
      ))}
    </Row>
  </motion.div>
)}

          {/* Step 2 - Admission */}
          {!otpStep && step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h5 className="fw-semibold mb-3">
                What's your admission status?
              </h5>
              <Row>
                {["Applied", "Confirmed", "Not Applied yet"].map((s) => (
                  <Col md={4} sm={6} key={s} className="mb-3">
                    <div
                      className={`modern-option ${
                        selected.status === s ? "active" : ""
                      }`}
                      onClick={() => advance({ status: s })}
                    >
                      {s}
                    </div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          )}

          {/* Step 3 - Intake */}
          {!otpStep && step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h5 className="fw-semibold mb-3">Select your intake</h5>
              <Row>
                {["Jan 2026", "Sep 2026"].map((i) => (
                  <Col md={4} sm={6} key={i} className="mb-3">
                    <div
                      className={`modern-option ${
                        selected.intake === i ? "active" : ""
                      }`}
                      onClick={() => advance({ intake: i })}
                    >
                      {i}
                    </div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          )}

          {/* Step 4 - University */}
          {!otpStep && step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h5 className="fw-semibold mb-3">Select your university</h5>
              <Form.Control
                placeholder="Search universities..."
                className="modern-input mb-3"
                onChange={(e) => handleUniversitySearch(e.target.value)}
              />
              <Row>
                {(universities.length
                  ? universities
                  : UNIVERSITIES[selected.country] || []
                )
                  .slice(0, 6)
                  .map((u) => (
                    <Col md={6} sm={12} key={u} className="mb-3">
                      <div
                        className={`modern-option ${
                          selected.university === u ? "active" : ""
                        }`}
                        onClick={() => advance({ university: u })}
                      >
                        {u}
                      </div>
                    </Col>
                  ))}
              </Row>
            </motion.div>
          )}

          {/* Step 5 - Details + Approached Bank */}
          {!otpStep && step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h5 className="fw-semibold mb-3">Final Step: Your Details</h5>
              <p className="text-muted small mb-3">
                Have you already approached a bank?
              </p>
              <Row className="mb-4">
                <Col md={6}>
                  <div
                    className={`modern-option ${
                      selected.approachedBank === true ? "active" : ""
                    }`}
                    onClick={() =>
                      setSelected((prev) => ({ ...prev, approachedBank: true }))
                    }
                  >
                    Yes, I’ve approached a bank
                  </div>
                </Col>
                <Col md={6}>
                  <div
                    className={`modern-option ${
                      selected.approachedBank === false ? "active" : ""
                    }`}
                    onClick={() =>
                      setSelected((prev) => ({ ...prev, approachedBank: false }))
                    }
                  >
                    No, not yet
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Control
                    placeholder="Full Name"
                    className="modern-input mb-3"
                    value={selected.name}
                    onChange={(e) =>
                      setSelected({ ...selected, name: e.target.value })
                    }
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    placeholder="City"
                    className="modern-input mb-3"
                    value={selected.city}
                    onChange={(e) =>
                      setSelected({ ...selected, city: e.target.value })
                    }
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    placeholder="Email"
                    className="modern-input mb-3"
                    value={selected.email}
                    onChange={(e) =>
                      setSelected({ ...selected, email: e.target.value })
                    }
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    placeholder="Phone Number"
                    className="modern-input mb-3"
                    value={selected.phone}
                    onChange={(e) =>
                      setSelected({ ...selected, phone: e.target.value })
                    }
                  />
                </Col>
                <Col md={12} className="text-end">
                  <Button
                    variant="success"
                    className="px-4 py-2 rounded-pill"
                    disabled={loading}
                    onClick={handleFinalSubmit}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </Col>
              </Row>
            </motion.div>
          )}

          {/* OTP Step */}
          {otpStep && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h5 className="fw-semibold mb-3">Enter OTP sent to your email</h5>
              <Form.Control
                type="text"
                placeholder="Enter 6-digit OTP"
                className="modern-input mb-3"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <div className="text-end">
                <Button
                  variant="success"
                  className="px-4 py-2 rounded-pill"
                  disabled={loading}
                  onClick={handleVerifyOtp}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal.Body>

      {!otpStep && (
        <Modal.Footer className="border-0 px-5 pb-4 justify-content-between">
          <Button
            variant="outline-secondary"
            onClick={back}
            disabled={step === 1}
            className="rounded-pill px-4"
          >
            Back
          </Button>
          <Button
            variant="outline-dark"
            onClick={onHide}
            className="rounded-pill px-4"
          >
            Close
          </Button>
        </Modal.Footer>
      )}
    </Modal> ); }