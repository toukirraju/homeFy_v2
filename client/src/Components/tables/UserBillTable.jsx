import "./TableStyle.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef } from "react";

const UserBillTable = ({ data }) => {
  const gridRef = useRef();
  const autoSizeAll = useCallback((skipHeader) => {
    const allColumnIds = [];
    gridRef.current.columnApi.getColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });
    gridRef.current.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  }, []);
  const dateFormatter = (params) => {
    return new Date(params.value).toDateString();
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  };
  const tableColumns = [
    {
      headerName: "Payable Amount",
      field: "payableAmount",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Paid Amount",
      field: "paidAmount",
      resizable: true,
      width: 100,
      cellStyle: function (params) {
        if (params.data.paidAmount) {
          return {
            color: "white",
            backgroundColor: "#5bc8ab",
            fontWeight: 900,
          };
        } else {
          return null;
        }
      },
    },
    {
      headerName: "Electricity Bill",
      field: "e_bill",
      resizable: true,
      width: 100,
    },
    { headerName: "Others Bill", field: "o_bill", resizable: true, width: 100 },

    {
      headerName: "Due",
      field: "due",
      resizable: true,
      width: 100,
      cellStyle: function (params) {
        if (params.data.due) {
          return {
            color: "white",
            backgroundColor: "#5bc887",
            fontWeight: 900,
          };
        } else {
          return null;
        }
      },
    },
    {
      headerName: "Date",
      field: "createdAt",
      valueFormatter: dateFormatter,
      resizable: true,
      width: 150,
    },
  ];

  return (
    <>
      <div className="card table_container">
        <div className="table__header">
          <h3 className="title">User Bills</h3>
        </div>
        <div className="ag-theme-alpine" style={{ height: 300, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={data}
            columnDefs={tableColumns}
            defaultColDef={defaultColDef}
          />
        </div>
        <span className="subtitle " style={{ marginLeft: "15px" }}>
          <i
            className="uil uil-arrows-h-alt button"
            onClick={() => {
              autoSizeAll(false);
            }}
          ></i>
          click here to resize table
        </span>
      </div>
    </>
  );
};

export default UserBillTable;
