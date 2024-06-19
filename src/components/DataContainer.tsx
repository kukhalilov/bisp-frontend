import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Loading from "../components/Loading";
import { getData } from "../api/api";
import { debounce } from "lodash";
import "../styles/dataContainer.css";

interface DataContainerProps<T> {
  url: string;
  render: (data: T[]) => React.ReactNode;
  sortFields: { value: string; label: string }[];
}

interface ResponseData<T> {
  data: T[];
  totalPages: number;
}

const DataContainer = <T,>({
  url,
  render,
  sortFields,
}: DataContainerProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(sortFields[0]?.value || "");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchData = async () => {
    setLoading(true);
    const fullUrl = `${url}?page=${page}&pageSize=${pageSize}&sort=${sortField},${sortOrder}${
      search ? `&search=${search}` : ""
    }`;
    const response = await getData<ResponseData<T>>(fullUrl);
    console.log("Response data:", response);
    setData(response.data);
    setTotalPages(response.totalPages);
    setLoading(false);
  };

  const debouncedFetchData = debounce(fetchData, 500);

  useEffect(() => {
    debouncedFetchData();
    return () => {
      debouncedFetchData.cancel();
    };
  }, [page, pageSize, sortField, sortOrder, search]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <>
      <div className="controls-container">
        <label className="input-label">
          Search by name:
          <input
            className="search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
          />
        </label>
        <label className="input-label">
          Sort by:
          <select
            className="sort-field-select"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            {sortFields.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="input-label">
          Order:
          <select
            className="sort-order-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        <label className="input-label">
          Page Size:
          <select
            className="page-size-select"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </label>
      </div>
      {loading ? <Loading /> : render(data)}
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </>
  );
};

export default DataContainer;
