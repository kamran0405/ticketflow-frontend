import { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { login as loginApi } from '../services/authService';
import useAuth from '../hooks/useAuth';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const data = await loginApi(email, password); // { token, user }
      login(data.token, data.user);
      const redirectTo = location.state?.from?.pathname || '/bookings';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <Card.Title className="mb-3">Login</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" disabled={isSubmitting} className="w-100">
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <small>
            No account? <Link to="/register">Register</Link>
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LoginPage;