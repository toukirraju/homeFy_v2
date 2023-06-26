import React from "react";

const TableRow = ({ rowData, headers }) => {
  return (
    <>
      {rowData?.map((row, index) => (
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

      {/* <tr>

      <td data-cell="name">
        Max Verstappen 241/1, Laxmipura, Joydebpur, Gazipur
      </td>
      <td data-cell="poles">22</td>
      <td data-cell="podiums">43</td>
      <td data-cell="wins">54</td>
      <td data-cell="career point">57454</td>
      <td data-cell="championships">234</td>
      <td data-cell="wins">54</td>
      <td data-cell="career point">57454</td>
      <td data-cell="championships">234</td>
      <td data-cell="actions">
        <button>Edit</button>
      </td>
    </tr> */}
    </>
  );
};

export default TableRow;
