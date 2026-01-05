import { Col, Form, Row } from 'react-bootstrap';

function SearchFilter({ searchText, date, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      searchText: name === 'searchText' ? value : searchText,
      date: name === 'date' ? value : date,
    });
  };

  return (
    <Form className="mb-3">
      <Row>
        <Col md={6} className="mb-2">
          <Form.Control
            type="text"
            placeholder="Search by title..."
            name="searchText"
            value={searchText}
            onChange={handleChange}
          />
        </Col>
        <Col md={3} className="mb-2">
          <Form.Control
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default SearchFilter;