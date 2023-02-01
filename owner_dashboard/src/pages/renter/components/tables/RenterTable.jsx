import Style from "../../../../Styles/TableStyle.module.css";
import { AgGridReact } from "ag-grid-react";
import AssignRenter from "../../../../Components/modals/renterModal/AssignRenter";
import { useCallback, useRef, useState } from "react";
import UnAssignRenter from "../../../../Components/modals/renterModal/UnAssignRenter";
import { useSelector } from "react-redux";
import UpdateRenter from "../../modals/UpdateRenter";
import ConfirmationModal from "../../../../Components/modals/ConfirmationModal";

const RenterTable = ({ data }) => {
  const gridRef = useRef();
  const [isAssignData, setIsAssignData] = useState();
  const [removeData, setRemoveData] = useState();
  const [updateModalOpened, setUpdateModalOpened] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [assignModalOpened, setAssignModalOpened] = useState(false);
  const [unAssignModalOpened, setUnAssignModalOpened] = useState(false);

  const { user } = useSelector((state) => state.auth.user);

  const handleRemove = (renter) => {
    if (
      (renter.apartmentId === "" || renter.apartmentId === undefined) &&
      (renter.apartment_number === "" ||
        renter.apartment_number === undefined) &&
      (renter.roomNo === "" || renter.roomNo === undefined)
    ) {
      setConfirmationPopUp(true);
      setRemoveData({ ownerId: user._id, renterId: renter._id });
      setIsAssignData(
        //   {
        //   ownerId: "",
        //   apartmentId: "",
        //   renterId: "",
        // }
        null
      );
    } else {
      setConfirmationPopUp(true);
      setRemoveData(
        // { ownerId: "", renterId: "" }
        null
      );
      setIsAssignData(renter);
      // const unAssignedData = {
      //   ownerId: user._id,
      //   apartmentId: renter.apartmentId,
      //   renterId: renter._id,
      // };
    }
  };

  const handleUpdate = (renter) => {
    setUpdateData({ ...renter, ownerId: user._id });
    setUpdateModalOpened(true);
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  };
  const renterColumns = [
    {
      headerName: "First name",
      field: "firstname",
      resizable: true,
      width: 150,
    },
    {
      headerName: "Last Name",
      field: "lastname",
      resizable: true,
      width: 100,
    },
    { headerName: "Phone No", field: "phone", resizable: true, width: 100 },
    { headerName: "Username", field: "username", resizable: true, width: 100 },
    {
      headerName: "Address",
      field: "address",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Area",
      field: "area",
      resizable: true,
      width: 100,
    },
    {
      headerName: "City/town",
      field: "city",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Postcode",
      field: "postCode",
      resizable: true,
      width: 100,
    },
    {
      headerName: "National ID /Passport",
      field: "National_ID_Passport_no",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Apartment number",
      field: "apartment_number",
      resizable: true,
      width: 100,
      cellStyle: function (params) {
        if (params.data.apartment_number) {
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
      headerName: "Room number",
      field: "roomNumber",
      // valueFormatter: dateFormatter,
      resizable: true,
      width: 150,
      cellStyle: function (params) {
        if (params.data.roomNo) {
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
      headerName: "Advance Rent",
      field: "advanceRent",
      resizable: true,
      width: 100,
      cellStyle: function (params) {
        if (params.data.advanceRent) {
          return {
            color: "black",
            backgroundColor: "#c4c85b",
            fontWeight: 900,
          };
        } else {
          return null;
        }
      },
    },

    {
      headerName: "Assigned Date",
      field: "assignedDate",
      valueFormatter: (params) => {
        return new Date(params.value).toDateString();
      },
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
            remove
          </button>
        </div>
      ),
    },
  ];

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
  return (
    <>
      <div className={`card ${Style.table_container}`}>
        <div className={Style.table__header}>
          <button
            className={`button  ${Style.table__btn}`}
            onClick={() => setAssignModalOpened(true)}
          >
            Assign
          </button>
          <AssignRenter
            assignModalOpened={assignModalOpened}
            setAssignModalOpened={setAssignModalOpened}
            renterData={data}
            searchPopUp={false}
          />
          <button
            className={`removeButton  ${Style.table__btn}`}
            onClick={() => setUnAssignModalOpened(true)}
          >
            Unassign
          </button>
          <UnAssignRenter
            unAssignModalOpened={unAssignModalOpened}
            setUnAssignModalOpened={setUnAssignModalOpened}
            renterData={data}
          />
        </div>
        <div
          className="ag-theme-alpine"
          style={{ height: "64vh", width: "100%" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={data}
            columnDefs={renterColumns}
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
      <UpdateRenter
        updateModalOpened={updateModalOpened}
        setUpdateModalOpened={setUpdateModalOpened}
        data={updateData}
      />
      <ConfirmationModal
        confirmationPopUp={confirmationPopUp}
        setConfirmationPopUp={setConfirmationPopUp}
        data={removeData}
        popUp_type="Remove_Renter"
        isAssignData={isAssignData}
      />
    </>
  );
};

export default RenterTable;
