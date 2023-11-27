import React from "react";
import { getPagesArray } from "../../utils/pages"
import "./Pagination.css"


interface Ipages {
    totalPages: number
    page: number
    changePage(page: number): void 
}

function Pagination({ totalPages, page, changePage }: Ipages ) {
  let pagesArray = getPagesArray(totalPages);

  return (
    <div className="page-component">
      {pagesArray.map((p) => (
        <span
          key={p}
          onClick={() => changePage(p)}
          className={page === p ? "page page-current" : "page"}
        >
          {p}
        </span>
      ))}
    </div>
  );
}

export default Pagination;
