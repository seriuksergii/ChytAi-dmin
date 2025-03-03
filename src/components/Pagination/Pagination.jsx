import PropTypes from 'prop-types';
import {
  MdArrowBack,
  MdArrowForward,
  MdFirstPage,
  MdLastPage,
} from 'react-icons/md';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  visiblePages = 5,
}) => {
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        <MdFirstPage />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdArrowBack />
      </button>
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ).map((page) => (
        <button
          key={page}
          className={`page-button ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <MdArrowForward />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <MdLastPage />
      </button>
      <span className="total-pages">з {totalPages}</span>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  visiblePages: PropTypes.number,
};

export default Pagination;
