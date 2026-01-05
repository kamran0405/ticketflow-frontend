import { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerApi } from '../services/authService';

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    setIsSubmitting(true);
    try {
      await registerApi(email, password);
      setSuccess('Registered successfully. You can now log in.');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <Card.Title className="mb-3">Register</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="regEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="regPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="regPassword2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              minLength={6}
            />
          </Form.Group>
          <Button type="submit" disabled={isSubmitting} className="w-100">
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <small>
            Already have an account? <Link to="/login">Login</Link>
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RegisterPage;