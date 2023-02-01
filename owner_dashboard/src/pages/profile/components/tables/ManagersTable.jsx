import Style from "../../../../Styles/TableStyle.module.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef, useState } from "react";
import ConfirmationModal from "../../../../Components/modals/ConfirmationModal";
import { useLocation } from "react-router-dom";

const ManagersTable = ({ data }) => {
  // console.log(data);
  const gridRef = useRef();
  const { pathname } = useLocation();
  const [month, setMonth] = useState(new Date());
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

  const handleRemove = (value) => {
    console.log(value);
    // if (new Date(value.createdAt).getMonth() + 1 === new Date().getMonth() + 1) {
    setConfirmationPopUp(true);
    setRemoveId(value._id);
    // } else {
    //   // toast.error("you can't remove this value");
    //   console.log("you can't remove this value");
    // }
  };
  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  };
  const columns = [
    {
      headerName: "First Name",
      field: "firstname",
      resizable: true,
      // width: 150,
    },
    {
      headerName: "Last Name",
      field: "lastname",
      resizable: true,
      // width: 150,
    },
    {
      headerName: "Phone",
      field: "phone",
      resizable: true,
      // width: 100,
    },
    {
      headerName: "House name",
      field: "houseName",
      resizable: true,
      // width: 100,
      cellStyle: function (params) {
        if (params.data.houseName) {
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
      headerName: "Actions",
      field: "_id",
      resizable: true,
      width: 160,
      cellRenderer: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            className="removeButton btns"
            onClick={() => handleRemove(params.data)}
          >
            Delete manager
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
        popUp_type="Delete_manager"
      />
      <div className={`card ${Style.table_container}`}>
        <div className={Style.table__header}>
          <h1 className="title">Managers</h1>
          {/* <h4 className="subtitle">
            {new Date(month).toLocaleString("default", { month: "long" })}
          </h4> */}
        </div>
        <div className="ag-theme-alpine" style={{ height: 300, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={data}
            columnDefs={columns}
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

export default ManagersTable;
