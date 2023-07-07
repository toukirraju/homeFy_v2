import { BiLeftArrowCircle, BiRightArrowCircle } from "react-icons/bi";

const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
  rowsPerPage,
  handleRowsPerPageChange,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 4; // Maximum number of page numbers to display

    if (totalPages <= maxPageNumbersToShow) {
      // If total pages are less than or equal to the maximum to display, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={
              currentPage === i ? "h-7 w-7 rounded-full primaryButton" : ""
            }
          >
            {i}
          </button>
        );
      }
    } else {
      // If total pages are more than the maximum to display, show ellipsis (...) and last two page numbers
      const firstPage = Math.max(1, currentPage - 1);
      const lastPage = Math.min(currentPage + 1, totalPages);

      if (firstPage > 1) {
        pageNumbers.push(
          <button key={1} onClick={() => handlePageChange(1)}>
            1
          </button>
        );
      }

      for (let i = firstPage; i <= lastPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={
              currentPage === i ? "h-7 w-7 rounded-full primaryButton" : ""
            }
          >
            {i}
          </button>
        );
      }

      if (lastPage < totalPages) {
        pageNumbers.push(
          <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-around items-center shadow-lg w-full ">
      <div>
        <span>{currentPage}/</span>
        <span>{totalPages}</span>
      </div>
      <div className="flex gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="disabled:bg-transparent disabled:text-gray-500 text-2xl text-[var(--btnHoverColor)]"
        >
          <BiLeftArrowCircle />
        </button>
        {renderPageNumbers()}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="disabled:bg-transparent disabled:text-gray-500 text-2xl text-[var(--btnHoverColor)]"
        >
          <BiRightArrowCircle />
        </button>
      </div>

      <div>
        <select
          value={rowsPerPage}
          className="bg-transparent"
          onChange={handleRowsPerPageChange}
        >
          <option value="5">5 </option>
          <option value="10">10 </option>
          <option value="20">20 </option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
