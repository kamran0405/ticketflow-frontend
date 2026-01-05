import { useEffect, useState } from 'react';
import { Alert, Button, Card, Spinner } from 'react-bootstrap';
import {
  getMyBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from '../services/bookingsService';
import BookingForm from '../components/BookingForm';
import BookingTable from '../components/BookingTable';
import SearchFilter from '../components/SearchFilter';

function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingBooking, setEditingBooking] = useState(null);
  const [filters, setFilters] = useState({ searchText: '', date: '' });
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      if (editingBooking) {
        const updated = await updateBooking(editingBooking.id, formData);
        setBookings((prev) =>
          prev.map((b) => (b.id === editingBooking.id ? updated : b))
        );
        setEditingBooking(null);
      } else {
        const created = await createBooking(formData);
        setBookings((prev) => [...prev, created]);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (booking) => {
    if (!window.confirm(`Delete booking "${booking.title}"?`)) return;
    try {
      await deleteBooking(booking.id);
      setBookings((prev) => prev.filter((b) => b.id !== booking.id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const filtered = bookings.filter((b) => {
    const matchesTitle =
      !filters.searchText ||
      b.title.toLowerCase().includes(filters.searchText.toLowerCase());
    const matchesDate = !filters.date || b.date === filters.date;
    return matchesTitle && matchesDate;
  });

  return (
    <>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{editingBooking ? 'Edit Booking' : 'New Booking'}</Card.Title>
          <BookingForm
            initialValues={editingBooking}
            onSubmit={handleSubmit}
            submitLabel={editingBooking ? 'Update Booking' : 'Create Booking'}
            isSubmitting={saving}
          />
          {editingBooking && (
            <Button
              variant="link"
              className="mt-2 p-0"
              onClick={() => setEditingBooking(null)}
            >
              Cancel edit
            </Button>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Card.Title>My Bookings</Card.Title>
            {loading && <Spinner animation="border" size="sm" />}
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <SearchFilter
            searchText={filters.searchText}
            date={filters.date}
            onChange={setFilters}
          />
          <BookingTable
            bookings={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Card.Body>
      </Card>
    </>
  );
}

export default MyBookingsPage;