import Style from "../../../../Styles/TableStyle.module.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ConfirmationModal from "../../../../Components/modals/ConfirmationModal";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const BillTable = ({ data }) => {
  const gridRef = useRef();
  const { pathname } = useLocation();

  const [month, setMonth] = useState(new Date());

  const { profileData } = useSelector((state) => state.owner);
  // console.log(profileData.role);

  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [removeId, setRemoveId] = useState();
  const dateFormatter = (params) => {
    setMonth(params.value);
    return new Date(params.value).toDateString();
  };

  const sizeToFit = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);
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
      toast.error("you can't remove this bill");
      // console.log("you can't remove this bill");
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
      cellRenderer: (params) =>
        pathname !== "/" && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              className="button btns"
              // onClick={() => handleRemove(params.data)}
            >
              Print
            </button>
            {profileData.role === "owner" && (
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
            )}
          </div>
        ),
    },
  ];
  useEffect(() => {}, [data]);
  return (
    <>
      <ConfirmationModal
        confirmationPopUp={confirmationPopUp}
        setConfirmationPopUp={setConfirmationPopUp}
        data={removeId}
        popUp_type="Remove_Bill"
      />
      <div className={`card ${Style.table_container}`}>
        <div className={Style.table__header}>
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

        <div className={Style.table_resize_buttons}>
          <i
            className={`${"uil uil-arrows-h-alt"} ${Style.button}`}
            onClick={() => {
              autoSizeAll(false);
            }}
          ></i>
          <i
            className={`${"uil uil-arrows-merge"} ${Style.button}`}
            onClick={() => {
              autoSizeAll(true);
            }}
          ></i>
          <i
            className={`${"uil uil-arrows-shrink-h"} ${Style.button}`}
            onClick={() => {
              sizeToFit();
            }}
          ></i>
        </div>
      </div>
    </>
  );
};

export default BillTable;
