import React, { useEffect, useState } from "react";

import { container, active } from "./style.css";

const Paginator = ({ pages, visiblesPages, currentPage, setCurrentPage }) => {
  const pageItems = [...Array(pages).keys()];
  const halfVisblePages = Math.floor(visiblesPages / 2);
  const [startVisiblePage, setStartVisiblePage] = useState(1);
  const [endVisiblePage, setEndVisiblePage] = useState(pages);

  useEffect(() => {
    if (pages === 0) return;
    setStartVisiblePage(
      currentPage - halfVisblePages <= 1 ? 1 : currentPage - halfVisblePages
    );

    setEndVisiblePage(
      currentPage + halfVisblePages >= pages
        ? pages
        : currentPage + halfVisblePages
    );
  }, [currentPage, halfVisblePages, pages]);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={container}>
      {currentPage !== 1 && (
        <button onClick={() => handleClick(currentPage - 1)}>Anterior</button>
      )}
      {pageItems.map(
        (x) =>
          x + 1 >= startVisiblePage &&
          x + 1 <= endVisiblePage && (
            <button
              key={x}
              className={currentPage === x + 1 ? active : ""}
              onClick={() => handleClick(x + 1)}
            >
              {x + 1}
            </button>
          )
      )}

      {currentPage !== pages && (
        <button onClick={() => handleClick(currentPage + 1)}>Siguiente</button>
      )}
    </div>
  );
};

export default Paginator;
