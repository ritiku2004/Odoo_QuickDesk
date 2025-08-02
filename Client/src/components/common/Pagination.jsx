import React from 'react';
import Button from '../ui/Button';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4">
      <Button onClick={handlePrev} disabled={currentPage === 1}>
        &larr; Previous
      </Button>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Button onClick={handleNext} disabled={currentPage === totalPages}>
        Next &rarr;
      </Button>
    </div>
  );
};

export default Pagination;