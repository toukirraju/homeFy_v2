import Style from "../../../../Styles/TableStyle.module.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef } from "react";
import { useState } from "react";

const AdminTable = ({ data }) => {
  const [adminData, setAdminData] = useState({});
  const [removeId, setRemoveId] = useState();
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [updateAdminModalOpened, setUpdateAdminModalOpened] = useState(false);
  const gridRef = useRef();

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
  const dateFormatter = (params) => {
    return new Date(params.value).toDateString();
  };

  const handleUpdate = (value) => {
    setAdminData(value);
    setUpdateAdminModalOpened(true);
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
  const columns = [
    {
      headerName: "Name",
      field: "name",
      resizable: true,
      width: 150,
    },
    {
      headerName: "Phone",
      field: "phone",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Role",
      field: "role",
      resizable: true,
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

    { headerName: "Email", field: "email", resizable: true, width: 100 },
    { headerName: "Address", field: "address", resizable: true, width: 100 },
    { headerName: "City", field: "city", resizable: true, width: 100 },
    { headerName: "Area", field: "area", resizable: true, width: 100 },
    { headerName: "Postcode", field: "postCode", resizable: true, width: 100 },
    { headerName: "Nid", field: "nid", resizable: true, width: 100 },
    {
      headerName: "Actions",
      field: "_id",
      resizable: true,
      pinned: "right",
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
      <div className={`card ${Style.table_container}`}>
        <div className={Style.table__header}>
          <h3 className="title">Admins</h3>
        </div>
        <div className="ag-theme-alpine" style={{ height: 350, width: "100%" }}>
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

export default AdminTable;
