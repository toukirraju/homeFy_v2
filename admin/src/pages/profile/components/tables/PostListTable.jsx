import Style from "../../../../Styles/TableStyle.module.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef } from "react";
import { useState } from "react";
import UpdateTempBill from "../../../../Components/modals/billModal/UpdateTempBill";
import ConfirmationModal from "../../../../Components/modals/ConfirmationModal";

const PostListTable = ({ data }) => {
  const [tempData, setTempData] = useState({});
  const [removeId, setRemoveId] = useState();
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [updateTempBillModalOpened, setUpdateTempBillModalOpened] =
    useState(false);
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
  const columns = [
    // owner Details
    {
      headerName: "Owner Name",
      field: "ownerDetails.ownerName",
      resizable: true,
      width: 150,
    },
    {
      headerName: "Phone",
      field: "ownerDetails.phone",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Email",
      field: "ownerDetails.email",
      resizable: true,
      width: 100,
    },

    // house details
    {
      headerName: "House Name",
      field: "houseDetails.houseName",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Holding No",
      field: "houseDetails.holdingNo",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Address",
      field: "houseDetails.address",
      resizable: true,
      width: 100,
    },
    {
      headerName: "City",
      field: "houseDetails.city",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Area",
      field: "houseDetails.area",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Postcode",
      field: "houseDetails.postCode",
      resizable: true,
      width: 100,
    },

    // apartment details
    {
      headerName: "Apartment Name",
      field: "apartmentDetails.apartmentName",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Apartment Number",
      field: "apartmentDetails.apartment_number",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Apartment Type",
      field: "apartmentDetails.apartmentType",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Floor",
      field: "apartmentDetails.floor",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Bed Room",
      field: "apartmentDetails.number_of_bed_room",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Kitchen",
      field: "apartmentDetails.number_of_kitchen",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Baths",
      field: "apartmentDetails.number_of_baths",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Balcony",
      field: "apartmentDetails.number_of_balcony",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Apartment Length",
      field: "apartmentDetails.apartment_length",
      resizable: true,
      width: 100,
    },

    // bill details
    {
      headerName: "rent",
      field: "billDetails.rent",
      resizable: true,
      width: 100,
    },
    {
      headerName: "gas_bill",
      field: "billDetails.gas_bill",
      resizable: true,
      width: 100,
    },
    {
      headerName: "water_bill",
      field: "billDetails.water_bill",
      resizable: true,
      width: 100,
    },
    {
      headerName: "electricity_bill",
      field: "billDetails.electricity_bill",
      resizable: true,
      width: 100,
    },
    {
      headerName: "service_charge",
      field: "billDetails.service_charge",
      resizable: true,
      width: 100,
    },
    {
      headerName: "others",
      field: "billDetails.others",
      resizable: true,
      width: 100,
    },

    {
      headerName: "Actions",
      field: "_id",
      resizable: true,
      pinned: "right",
      width: 100,
      cellRenderer: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            className="updateButton btns"
            onClick={() => handleUpdate(params.data)}
          >
            Block
          </button>
          {/* <button
            className="removeButton btns"
            onClick={() => handleRemove(params.data)}
          >
            Remove
          </button> */}
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
      <div className={`card ${Style.table_container}`}>
        <div className={Style.table__header}>
          <h3 className="title">All Post</h3>
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

export default PostListTable;
