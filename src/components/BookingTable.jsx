import { Button, Table } from 'react-bootstrap';

function BookingTable({ bookings, onEdit, onDelete, showUserColumn = false }) {
  const colSpan = showUserColumn ? 10 : 9;

  return (
    <Table bordered hover responsive size="sm" className="main-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Time</th>
          <th>Event Type</th>
          <th>Location</th>
          <th>Tickets</th>
          <th>Status</th>
          {showUserColumn && <th>Email</th>}
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.length === 0 && (
          <tr>
            <td colSpan={colSpan} className="text-center">
              No bookings found.
            </td>
          </tr>
        )}
        {bookings.map((b) => (
          <tr key={b.id}>
            <td>{b.title}</td>
            <td>{b.date}</td>
            <td>{b.time}</td>
            <td>{b.event_type || '-'}</td>
            <td>{b.location || '-'}</td>
            <td>{b.number_of_tickets}</td>
            <td>{b.status}</td>
            {showUserColumn && <td>{b.email}</td>}
            <td>{b.phone_number}</td>
            <td>
              <Button
                size="sm"
                variant="outline-primary"
                className="me-2"
                onClick={() => onEdit(b)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => onDelete(b)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default BookingTable;