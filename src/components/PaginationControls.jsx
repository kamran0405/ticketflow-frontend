import { Pagination } from 'react-bootstrap';

function PaginationControls({ currentPage, totalItems, pageSize, onPageChange }) {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  if (totalPages <= 1) return null;

  const items = [];
  for (let number = 1; number <= totalPages; number += 1) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return <Pagination className="justify-content-center">{items}</Pagination>;
}

export default PaginationControls;