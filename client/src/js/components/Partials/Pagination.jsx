import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

const Pagination = ({ handlePageClick, pageCount }) => (
  <ReactPaginate
    previousLabel={'previous'}
    nextLabel={'next'}
    breakLabel={<a href="">...</a>}
    breakClassName={'break-me'}
    pageCount={pageCount / 2}
    marginPagesDisplayed={2}
    pageRangeDisplayed={2}
    onPageChange={handlePageClick}
    containerClassName={'pagination'}
    subContainerClassName={'pages pagination'}
    activeClassName={'active'}
  />
);

Pagination.propTypes = {
  handlePageClick: PropTypes.func.isRequired,
  pageCount: PropTypes.number
};

Pagination.defaultProps = {
  pageCount: 1
};

export default Pagination;
