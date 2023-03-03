/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../../hooks/usePagination";
const Pagination: React.FC<any> = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li
          className={classnames("pagination__list-item", {
            disabled: currentPage === 1,
          })}
        >
          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className="pagination__list-prev"
          >
            Previous
          </button>
        </li>
        {paginationRange.map((pageNumber: any,index: number) => {
          if (pageNumber === DOTS) {
            return (
              <li className="pagination__list-item dots" key={index}>
                <button className="pagination__list-link">
                  <span className="dots"></span>
                  <span className="dots"></span>
                  <span className="dots"></span>
                </button>
              </li>
            );
          }

          return (
            <li
              role="button"
              className={`pagination__list-item ${
                pageNumber === currentPage ? "active" : ""
              }`}
              onClick={() => onPageChange(pageNumber)}
              key={index}
            >
              <button className={`pagination__list-link ${pageNumber.toString().length > 2 ? 'increase-width' : ''}`}>{pageNumber}</button>
            </li>
          );
        })}
        <li
          className={classnames("pagination__list-item previous-nav", {
            disabled: currentPage === lastPage,
          })}
        >
          <button
            onClick={onNext}
            disabled={currentPage === lastPage}
            className="pagination__list-next"
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
