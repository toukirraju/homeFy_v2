import Style from "../../../../Styles/TableStyle.module.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef, useState } from "react";
import ConfirmationModal from "../../../../Components/modals/ConfirmationModal";
import { useLocation } from "react-router-dom";

const HouseInfoTable = ({ data }) => {
  const gridRef = useRef();
  const { pathname } = useLocation();
  const [verifyReq, setVerifyReq] = useState(0);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [removeId, setRemoveId] = useState();
  // const dateFormatter = (params) => {
  //   setMonth(params.value);
  //   return new Date(params.value).toDateString();
  // };

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
      // toast.error("you can't remove this bill");
      console.log("you can't remove this bill");
    }
  };
  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  };
  const Columns = [
    {
      headerName: "Owner name",
      field: "owner_name",
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
      headerName: "Phone",
      field: "phone",
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
      headerName: "House Name",
      field: "houseName",
      resizable: true,
      width: 150,
    },
    {
      headerName: "House no",
      field: "houseNo",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Village/Town",
      field: "villageTown",
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
    { headerName: "Division", field: "division", resizable: true, width: 100 },
    {
      headerName: "District",
      field: "district",
      resizable: true,
      width: 100,
    },

    {
      headerName: "Number of floors",
      field: "number_of_floors",
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
      headerName: "Number of apartments",
      field: "number_of_apartments",
      // valueFormatter: dateFormatter,
      resizable: true,
      width: 150,
    },
    {
      headerName: "Tax receipt",
      field: "documents.tax_receipt",
      // valueFormatter: dateFormatter,
      resizable: true,
      width: 150,
      cellStyle: function (params) {
        if (params.data.documents.tax_receipt) {
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
      headerName: "National_ID/Passport",
      field: "documents.National_ID__Passport",
      // valueFormatter: dateFormatter,
      resizable: true,
      width: 150,
      cellStyle: function (params) {
        if (params.data.documents.National_ID__Passport) {
          return {
            color: "white",
            backgroundColor: "#687e71",
            fontWeight: 900,
          };
        } else {
          return null;
        }
      },
    },
    {
      headerName: "Electricity Bill / Others Doc",
      field: "documents.othersDoc",
      // valueFormatter: dateFormatter,
      resizable: true,
      width: 150,
      cellStyle: function (params) {
        if (params.data.documents.othersDoc) {
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
      headerName: "Verification",
      field: "verification",
      // valueFormatter: dateFormatter,
      resizable: true,
      width: 150,
    },
    {
      headerName: "Actions",
      field: "_id",
      pinned: "right",
      resizable: true,
      width: 160,
      cellRenderer: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            className="button btns"
            disabled={params.data.verification}
            // onClick={() => handleRemove(params.data)}
          >
            Verify
          </button>
          <button
            className="warningButton btns"
            // onClick={() => handleRemove(params.data)}
          >
            Block
          </button>
          {/* <button
              className="removeButton btns"
              disabled={
                new Date(params.data.createdAt).getMonth() + 1 !==
                new Date().getMonth() + 1
              }
              onClick={() => handleRemove(params.data)}
            >
              Remove
            </button> */}
        </div>
      ),
    },
  ];

  const postSortRows = (params) => {
    let rowNodes = params.nodes;

    let nextInsertPos = 0;
    for (let i = 0; i < rowNodes.length; i++) {
      const documents = rowNodes[i].data.documents;
      if (
        documents.National_ID__Passport !== "" ||
        documents.tax_receipt !== "" ||
        documents.othersDoc !== ""
      ) {
        rowNodes.splice(nextInsertPos, 0, rowNodes.splice(i, 1)[0]);
        nextInsertPos++;
      }
    }
    setVerifyReq(nextInsertPos);
  };
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
          <h1 className="title">All Houses</h1>
          <h4 className="subtitle">Total verify request: {verifyReq}</h4>
        </div>
        <div className="ag-theme-alpine" style={{ height: 365, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={data}
            columnDefs={Columns}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={5}
            postSortRows={postSortRows}
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

export default HouseInfoTable;
