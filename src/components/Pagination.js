import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function Paginate({ meta, setCurrentPage, currentPage}) {
  const handlePagination = (currentPage) => {
    setCurrentPage(currentPage);
  };

  return (
    <Pagination aria-label="pagination">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink previous />
      </PaginationItem>
      {[...Array(meta.total_pages)].map((_, i) => (
        <PaginationItem active={i + 1 === currentPage} key={i}>
          <PaginationLink onClick={() => handlePagination(i + 1)}>
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={currentPage === meta.total_pages}>
        <PaginationLink
          onClick={() => handlePagination(currentPage + 1)}
          next
        />
      </PaginationItem>
    </Pagination>
  );
}
