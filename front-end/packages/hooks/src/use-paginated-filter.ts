"use client";

import { useState } from "react";

type FilterFn<T> = (item: T, selected: string) => boolean;

export function usePaginatedFilter<T>(
  items: T[],
  pageSize: number,
  allLabel: string,
  filterFn: FilterFn<T>,
) {
  const [selected, setSelected] = useState(allLabel);
  const [page, setPage] = useState(1);

  const filtered =
    selected === allLabel ? items : items.filter((item) => filterFn(item, selected));

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  function handleSelect(value: string) {
    setSelected(value);
    setPage(1);
  }

  return { selected, page, paged, totalPages, handleSelect, setPage };
}
