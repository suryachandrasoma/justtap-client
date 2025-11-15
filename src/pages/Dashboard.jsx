import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner, ProgressBar, Button, Alert, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBook, FaCheckCircle, FaClock, FaGraduationCap, FaSignOutAlt, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSchool } from 'react-icons/fa';
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    loadStudentProfile();
  }, []);

  const loadStudentProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/profile");
      if (res.data.ok && res.data.profile) {
        setStudent(res.data.profile);
      } else {
        setError(res.data.message || "Failed to load profile");
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // Application status stages
  const getStatusStages = () => {
    if (!student) return [];
    return [
      { stage: "Application Started", status: true, icon: <FaBook /> },
      { stage: "Documents Uploaded", status: student.payload?.documentsUploaded || false, icon: <FaCheckCircle /> },
      { stage: "Under Review", status: student.payload?.underReview || false, icon: <FaClock /> },
      { stage: "Approved", status: student.payload?.approved || false, icon: <FaCheckCircle /> },
    ];
  };

  const stages = getStatusStages();
  const completedStages = stages.filter(s => s.status).length;
  const progressPercent = stages.length > 0 ? (completedStages / stages.length) * 100 : 0;

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error || !student) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          {error || "Unable to load profile. Please sign in again."}
        </Alert>
        <Button variant="primary" onClick={logout}>
          Return to Home
        </Button>
      </Container>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", paddingTop: "80px", paddingBottom: "40px" }}>
      <Container>
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold text-dark mb-1">Welcome, {student.payload?.fullName || "Student"} 👋</h1>
            <p className="text-muted">Your application tracking dashboard</p>
          </div>
          <Button variant="outline-danger" onClick={logout} className="d-flex align-items-center gap-2">
            <FaSignOutAlt /> Logout
          </Button>
        </div>

        {/* Profile Summary & Status Cards */}
        <Row className="mb-4">
          <Col lg={8}>
            {/* Profile Card */}
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: "#004391",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <FaUser size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0">{student.payload?.fullName}</h5>
                    <p className="text-muted mb-0">{student.payload?.email}</p>
                  </div>
                </div>

                <Row>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <FaEnvelope color="#004391" />
                      <div>
                        <small className="text-muted d-block">Email</small>
                        <span className="fw-semibold">{student.payload?.email}</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <FaPhone color="#004391" />
                      <div>
                        <small className="text-muted d-block">Phone</small>
                        <span className="fw-semibold">{student.payload?.phone || "Not provided"}</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <FaMapMarkerAlt color="#004391" />
                      <div>
                        <small className="text-muted d-block">City</small>
                        <span className="fw-semibold">{student.payload?.city || "Not provided"}</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <FaGraduationCap color="#004391" />
                      <div>
                        <small className="text-muted d-block">Lead ID</small>
                        <span className="fw-semibold">{student.leadID || "N/A"}</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Academic Details Card */}
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-3">📚 Academic Details</h5>
                <Row>
                  <Col md={6} className="mb-3">
                    <p className="text-muted small mb-1">University</p>
                    <p className="fw-semibold">{student.payload?.university}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <p className="text-muted small mb-1">Country</p>
                    <p className="fw-semibold">{student.payload?.country}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <p className="text-muted small mb-1">Intake</p>
                    <p className="fw-semibold">{student.payload?.intake}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <p className="text-muted small mb-1">Admission Status</p>
                    <Badge bg={student.payload?.admissionStatus === "Confirmed" ? "success" : "warning"}>
                      {student.payload?.admissionStatus}
                    </Badge>
                  </Col>
                  <Col md={6} className="mb-0">
                    <p className="text-muted small mb-1">Approached Bank</p>
                    <Badge bg={student.payload?.approachedBank ? "info" : "secondary"}>
                      {student.payload?.approachedBank ? "Yes" : "No"}
                    </Badge>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Status Tracking Card */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm sticky-top" style={{ top: "100px" }}>
              <Card.Body>
                <h5 className="fw-bold mb-3">🎯 Application Status</h5>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <small className="text-muted">Progress</small>
                    <small className="fw-semibold">
                      {completedStages} of {stages.length}
                    </small>
                  </div>
                  <ProgressBar
                    now={progressPercent}
                    className="rounded-pill"
                    style={{ height: "8px", backgroundColor: "#e9ecef" }}
                  />
                </div>

                {/* Stages */}
                {stages.map((item, index) => (
                  <div key={index} className="d-flex align-items-center gap-2 mb-3">
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: item.status ? "#004391" : "#e9ecef",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: item.status ? "white" : "#999",
                        fontSize: "14px",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-grow-1">
                      <small className={item.status ? "fw-semibold text-dark" : "text-muted"}>
                        {item.stage}
                      </small>
                    </div>
                    {item.status && (
                      <Badge bg="success" className="ms-2">
                        ✓
                      </Badge>
                    )}
                  </div>
                ))}

                {/* Status Alert */}
                <Alert
                  variant={student.payload?.approved ? "success" : "info"}
                  className="mt-4 mb-0"
                >
                  <small>
                    {student.payload?.approved
                      ? "✅ Your application has been approved!"
                      : "⏳ Your application is being processed."}
                  </small>
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Next Steps Section */}
        <Row>
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h5 className="fw-bold mb-3">💡 Next Steps</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <strong>1. Complete Your Profile</strong> - Ensure all details are accurate and up-to-date.
                  </li>
                  <li className="mb-2">
                    <strong>2. Upload Documents</strong> - Submit required admission letters, identity proofs, and financial documents.
                  </li>
                  <li className="mb-2">
                    <strong>3. Review & Submit</strong> - Double-check everything before final submission.
                  </li>
                  <li>
                    <strong>4. Track Status</strong> - Monitor your application progress in the status tracker above.
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
