import { useEffect, useState } from 'react';
import { Alert, Card, Spinner } from 'react-bootstrap';
import {
  getAllBookings,
  updateBooking,
  deleteBooking,
} from '../services/bookingsService';
import BookingForm from '../components/BookingForm';
import BookingTable from '../components/BookingTable';
import SearchFilter from '../components/SearchFilter';
import PaginationControls from '../components/PaginationControls';
import { ADMIN_PAGE_SIZE } from '../config/constants';

function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ searchText: '', date: '' });
  const [editingBooking, setEditingBooking] = useState(null);
  const [saving, setSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllBookings();
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

  const handleSubmit = async (formData) => {
    if (!editingBooking) return;
    setSaving(true);
    try {
      const updated = await updateBooking(editingBooking.id, formData);
      setBookings((prev) =>
        prev.map((b) => (b.id === editingBooking.id ? updated : b))
      );
      setEditingBooking(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const filtered = bookings.filter((b) => {
    const matchesTitle =
      !filters.searchText ||
      b.title.toLowerCase().includes(filters.searchText.toLowerCase());
    const matchesDate = !filters.date || b.date === filters.date;
    return matchesTitle && matchesDate;
  });

  const startIndex = (currentPage - 1) * ADMIN_PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + ADMIN_PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.searchText, filters.date]);

  return (
    <>
      {editingBooking && (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Edit Booking (Admin)</Card.Title>
            <BookingForm
              initialValues={editingBooking}
              onSubmit={handleSubmit}
              submitLabel="Update Booking"
              isSubmitting={saving}
            />
          </Card.Body>
        </Card>
      )}

      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Card.Title>All Bookings (Admin)</Card.Title>
            {loading && <Spinner animation="border" size="sm" />}
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <SearchFilter
            searchText={filters.searchText}
            date={filters.date}
            onChange={setFilters}
          />
          <BookingTable
            bookings={pageItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
            showUserColumn
          />
          <PaginationControls
            currentPage={currentPage}
            totalItems={filtered.length}
            pageSize={ADMIN_PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </Card.Body>
      </Card>
    </>
  );
}

export default AdminBookingsPage;