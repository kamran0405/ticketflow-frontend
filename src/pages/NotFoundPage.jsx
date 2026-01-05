import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="text-center mt-5">
      <h3>Page not found</h3>
      <p>The page you requested does not exist.</p>
      <Button as={Link} to="/bookings">
        Go to My Bookings
      </Button>
    </div>
  );
}

export default NotFoundPage;