import "./TableStyle.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef } from "react";
import { useState } from "react";
import UpdateTempBill from "../modals/billModal/UpdateTempBill";
import ConfirmationModal from "../modals/ConfirmationModal";

const TempBillTable = ({ data }) => {
  const [tempData, setTempData] = useState({});
  const [removeId, setRemoveId] = useState();
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [updateTempBillModalOpened, setUpdateTempBillModalOpened] =
    useState(false);
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

  const handleUpdate = (value) => {
    setTempData(value);
    setUpdateTempBillModalOpened(true);
  };

  const handleRemove = (bill) => {
    // if (new Date(bill.createdAt).getMonth() + 1 === new Date().getMonth() + 1) {
    setConfirmationPopUp(true);
    setRemoveId(bill._id);
    // } else {
    //   // toast.error("you can't remove this bill");
    //   console.log("you can't remove this bill");
    // }
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
      headerName: "Electricity Bill",
      field: "e_bill",
      resizable: true,
      width: 100,
    },
    { headerName: "Others Bill", field: "o_bill", resizable: true, width: 100 },

    {
      headerName: "Due",
      field: "tempDue",
      resizable: true,
      width: 100,
      cellStyle: function (params) {
        if (params.data.tempDue) {
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
      width: 180,
      cellRenderer: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            className="updateButton btns"
            onClick={() => handleUpdate(params.data)}
          >
            update
          </button>
          <button
            className="removeButton btns"
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
        popUp_type="Remove_Temporary_Bill"
      />
      <UpdateTempBill
        updateTempBillModalOpened={updateTempBillModalOpened}
        setUpdateTempBillModalOpened={setUpdateTempBillModalOpened}
        data={tempData}
      />
      <div className="card table_container">
        <div className="table__header">
          <h3 className="title">Temporary Bills</h3>
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

export default TempBillTable;
