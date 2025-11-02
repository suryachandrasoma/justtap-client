import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Dashboard(){
  const navigate = useNavigate();
  const logout = () => {
    navigate('/');
  };
  return (
    <Container className="py-5 text-center">
      <h2>Student Dashboard</h2>
      <p>Placeholder dashboard. Logout to return to homepage.</p>
      <Button variant="primary" onClick={logout}>Logout</Button>
    </Container>
  );
}
