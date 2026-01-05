import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { BOOKING_STATUSES, EVENT_TYPES } from '../config/constants';

const emptyForm = {
  title: '',
  description: '',
  event_type: '',
  location: '',
  date: '',
  time: '',
  phone_number: '',
  email: '',
  price: '',
  number_of_tickets: '',
  status: 'pending',
  notes: '',
};

function BookingForm({
  initialValues,
  onSubmit,
  submitLabel = 'Save',
  isSubmitting = false,
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setForm({ ...emptyForm, ...initialValues });
    } else {
      setForm(emptyForm);
    }
  }, [initialValues]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.time) newErrors.time = 'Time is required';
    if (!form.phone_number.trim()) newErrors.phone_number = 'Phone is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!form.number_of_tickets) newErrors.number_of_tickets = 'Tickets required';
    if (!form.status) newErrors.status = 'Status required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      ...form,
      price: form.price ? Number(form.price) : null,
      number_of_tickets: Number(form.number_of_tickets),
    };
    onSubmit(payload);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="title">
            <Form.Label>Title *</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="event_type">
            <Form.Label>Event Type</Form.Label>
            <Form.Select
              name="event_type"
              value={form.event_type}
              onChange={handleChange}
            >
              <option value="">Select type</option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="location">
            <Form.Label>Location / Venue</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="date">
            <Form.Label>Date *</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              isInvalid={!!errors.date}
            />
            <Form.Control.Feedback type="invalid">
              {errors.date}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="time">
            <Form.Label>Time *</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              isInvalid={!!errors.time}
            />
            <Form.Control.Feedback type="invalid">
              {errors.time}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="phone_number">
            <Form.Label>Phone Number *</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              isInvalid={!!errors.phone_number}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone_number}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="email">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="number_of_tickets">
            <Form.Label>Tickets *</Form.Label>
            <Form.Control
              type="number"
              min="1"
              name="number_of_tickets"
              value={form.number_of_tickets}
              onChange={handleChange}
              isInvalid={!!errors.number_of_tickets}
            />
            <Form.Control.Feedback type="invalid">
              {errors.number_of_tickets}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              min="0"
              step="0.01"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="status">
            <Form.Label>Status *</Form.Label>
            <Form.Select
              name="status"
              value={form.status}
              onChange={handleChange}
              isInvalid={!!errors.status}
            >
              {BOOKING_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.status}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={8}>
          <Form.Group controlId="notes">
            <Form.Label>Special Requests / Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="notes"
              value={form.notes}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </Form>
  );
}

export default BookingForm;