import { useState } from "react";
import "../../Styles/TableStyle.css";
import TableRow from "./TableRow";
import Pagination from "./Pagination";

const CustomTable = ({
  title,
  headers,
  rowData,
  serverCurrentPage,
  serverTotalPages,
  setLimit,
  setPage,
}) => {
  const [currentPage, setCurrentPage] = useState(serverCurrentPage || 1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // Calculate the total number of pages based on the rows per page
  // const totalPages = Math.ceil(rowData.length / rowsPerPage);
  const totalPages = serverTotalPages;

  // Calculate the start and end indexes of the rows to display
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const displayRows = rowData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
    setCurrentPage(1); // Reset current page when rows per page changes
  };

  return (
    <div>
      <table>
        <caption>
          <div className="flex w-full shadow-lg rounded px-2 py-2 justify-between items-center">
            <span>{title}</span>
            <form>
              <input type="text" name="" placeholder="search..." />
            </form>
          </div>
        </caption>

        <thead>
          <tr>
            {headers?.map((header) => (
              <th key={header.header}>{header.header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <TableRow headers={headers} displayRows={displayRows} />
        </tbody>
      </table>

      {/* Pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};

export default CustomTable;
