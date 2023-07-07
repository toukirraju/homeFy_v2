import React from "react";

const TableRow = ({ headers, displayRows }) => {
  return (
    <>
      {displayRows?.map((row, index) => (
        <tr key={index}>
          {headers?.map((header) => (
            <td
              data-cell={header.header}
              key={header.rowField || header.header}
            >
              {typeof header.rowField === "function"
                ? header.rowField(row)
                : row[header.rowField]}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableRow;
