import { useEffect, useState } from "react";

const getTotalPages = (list, quantity) => {
  if (list.length === 0) return 0;

  return list.length <= quantity ? 1 : Math.ceil(list.length / quantity);
};

const usePaginate = (list, page, quantity) => {
  const totalPages = getTotalPages(list, quantity);

  const totalItems = list.length;

  const [paginatedList, setPaginatedList] = useState([]);

  useEffect(() => {
    const startIndex = (page - 1) * quantity;
    const endIndex =
      startIndex + quantity > totalItems ? totalItems : startIndex + quantity;

    const pageList =
      totalItems <= quantity ? list : list.slice(startIndex, endIndex);

    setPaginatedList(pageList);
  }, [page, quantity, list, totalItems]);

  return { paginatedList, page, totalPages, totalItems };
};

export default usePaginate;
