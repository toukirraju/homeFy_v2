import "./TableStyle.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef, useState } from "react";
import ConfirmationModal from "../modals/ConfirmationModal";

const BillTable = ({ data }) => {
  const gridRef = useRef();
  const [month, setMonth] = useState(new Date());
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [removeId, setRemoveId] = useState();
  const dateFormatter = (params) => {
    setMonth(params.value);
    return new Date(params.value).toDateString();
  };
  const autoSizeAll = useCallback((skipHeader) => {
    const allColumnIds = [];
    gridRef.current.columnApi.getColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });
    gridRef.current.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  }, []);

  const handleRemove = (bill) => {
    if (new Date(bill.createdAt).getMonth() + 1 === new Date().getMonth() + 1) {
      setConfirmationPopUp(true);
      setRemoveId(bill._id);
    } else {
      // toast.error("you can't remove this bill");
      console.log("you can't remove this bill");
    }
  };
  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  };
  const transColumns = [
    {
      headerName: "Renter Name",
      field: "renterName",
      resizable: true,
      width: 150,
    },
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
    {
      headerName: "Actions",
      field: "_id",
      resizable: true,
      width: 160,
      cellRenderer: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            className="button btns"
            // onClick={() => handleRemove(params.data)}
          >
            Print
          </button>
          <button
            className="removeButton btns"
            disabled={
              new Date(params.data.createdAt).getMonth() + 1 !==
              new Date().getMonth() + 1
            }
            onClick={() => handleRemove(params.data)}
          >
            Remove
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <ConfirmationModal
        confirmationPopUp={confirmationPopUp}
        setConfirmationPopUp={setConfirmationPopUp}
        data={removeId}
        popUp_type="Remove_Bill"
      />
      <div className="card table_container">
        <div className="table__header">
          <h1 className="title">Bills</h1>
          <h4 className="subtitle">
            {new Date(month).toLocaleString("default", { month: "long" })}
          </h4>
        </div>
        <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={data}
            columnDefs={transColumns}
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

export default BillTable;
