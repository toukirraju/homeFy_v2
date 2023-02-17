import Style from "../../../../Styles/TableStyle.module.css";
import ModalStyle from "../../../../Styles/ModalStyle.module.css";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  allApartments,
  createMultiApartment,
} from "../../../../redux/slices/apartmentSlice";
import { setReload } from "../../../../redux/slices/reloadSlice";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import ConfirmationModal from "../../../../Components/modals/ConfirmationModal";
import UpdateApartment from "../../modals/UpdateApartment";
import PostShare from "../../../../Components/postComponents/postShare/PostShare";
import { toast } from "react-toastify";
import PopUpWindow from "../../modals/PopUpWindow";

const ApartmentTable = ({ data }) => {
  const gridRef = useRef();
  const dispatch = useDispatch();

  const [floorData, setFloorData] = useState([]);

  const [isAssignData, setIsAssignData] = useState();
  const [removeId, setRemoveId] = useState();

  const [updateModalOpened, setUpdateModalOpened] = useState(false);
  const [updateData, setUpdateData] = useState({});

  const [postModalOpened, setPostModalOpened] = useState(false);
  const [postData, setPostData] = useState({});

  const [confirmationPopUp, setConfirmationPopUp] = useState(false);

  const [popUpModalOpened, setPopUpModalOpened] = useState(false);
  const [popUpData, setPopUpData] = useState({});

  const { user } = useSelector((state) => state.auth.user);
  const { isPending } = useSelector((state) => state.apartmentInfo);

  //add single apartment
  const addApartment = (floor) => {
    const formData = {
      numOfFloors: floor,
    };
    dispatch(createMultiApartment(formData))
      .unwrap()
      .then(() => {
        dispatch(allApartments());
        toast.success("Successfully add new apartment");

        // dispatch(clearMessage());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //apartment remove function
  const handleRemove = (apartment) => {
    if (apartment.isAvailable === true) {
      setConfirmationPopUp(true);
      setRemoveId(apartment._id);
      setIsAssignData(null);
    } else {
      setConfirmationPopUp(true);
      setRemoveId(null);
      // console.log(apartment);
      setIsAssignData({
        ownerId: user._id,
        apartmentId: apartment._id,
        _id: apartment.renterId,
      });
      // const unAssignedData = {
      //   ownerId: user._id,
      //   apartmentId: renter.apartmentId,
      //   renterId: renter._id,
      // };
    }
  };

  const handleUpdate = (apartment) => {
    setUpdateData({ ...apartment, ownerId: user._id });
    setUpdateModalOpened(true);
  };

  const handlePost = (apartment) => {
    setPostData(apartment);
    setPostModalOpened(true);
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  };
  const tableColumns = [
    {
      headerName: "Renter Name",
      field: "renterName",
      resizable: true,
      pinned: true,
      width: 150,
    },
    // apartment details
    {
      headerName: "Apartment Name",
      field: "apartmentDetails.apartmentName",
      resizable: true,
    },
    {
      headerName: "Apartment No",
      field: "apartmentDetails.apartment_number",
      resizable: true,
    },
    {
      headerName: "Room No",
      field: "apartmentDetails.roomNumber",
      resizable: true,
    },
    {
      headerName: "Apartment Type",
      field: "apartmentDetails.apartmentType",
      resizable: true,
    },
    {
      headerName: "Beds",
      field: "apartmentDetails.number_of_bed_room",
      resizable: true,
    },
    {
      headerName: "Kitchen",
      field: "apartmentDetails.number_of_kitchen",
      resizable: true,
    },
    {
      headerName: "Balcony",
      field: "apartmentDetails.number_of_balcony",
      resizable: true,
    },
    {
      headerName: "Baths",
      field: "apartmentDetails.number_of_baths",
      resizable: true,
    },
    // bill details
    {
      headerName: "Rent",
      field: "billDetails.rent",
      resizable: true,
      // width: 100,
    },
    {
      headerName: "Gas bill",
      field: "billDetails.gas_bill",
      resizable: true,
      // width: 100,
    },
    {
      headerName: "Water bill",
      field: "billDetails.water_bill",
      resizable: true,
      // width: 150,
    },

    {
      headerName: "Service charge",
      field: "billDetails.service_charge",
      resizable: true,
      // width: 100,
    },
    {
      headerName: "Others",
      field: "billDetails.others",
      resizable: true,
      // width: 100,
    },
    {
      headerName: "Total Rent",
      field: "billDetails.totalRent",
      resizable: true,
      // width: 100,
    },
    {
      headerName: "Available",
      field: "isAvailable",
      resizable: true,
      width: 100,
      cellStyle: function (params) {
        if (params.data.isAvailable) {
          return {
            color: "black",
            backgroundColor: "#c4c85b",
            fontWeight: 900,
          };
        } else {
          return {
            color: "white",
            backgroundColor: "green",
            fontWeight: 900,
          };
        }
      },
    },
    {
      headerName: "Actions",
      field: "_id",
      resizable: true,
      width: 250,
      cellRenderer: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            disabled={!params.data.isAvailable}
            style={{ padding: "0 15px" }}
            className="button btns"
            onClick={() => handlePost(params.data)}
          >
            post
          </button>
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

  const groupByApartments = (arr, property) => {
    let grouped = [];
    for (let i = 0; i < arr.length; i++) {
      let p = arr[i].apartmentDetails[property];
      if (!grouped[p]) {
        grouped[p] = [];
      }
      grouped[p].push(arr[i]);
    }
    return grouped;
  };
  const numberOfApartments = groupByApartments(floorData, "apartment_number");

  //table resizing function start
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
  //table resizing function end

  //handle selected floor data
  function handlefloorChange(event) {
    setFloorData((data) => JSON.parse(event.target.value));
  }

  //floor selected data
  const floors = data.map((item, index) => (
    <option key={index} value={JSON.stringify(item)}>
      {item[0].apartmentDetails.floor}
    </option>
  ));
  const handlePopUpOn = (rowData) => {
    setPopUpModalOpened(true);
    setPopUpData(rowData);
  };

  return (
    <>
      <div className={`card ${Style.table_container}`}>
        <div className={``}>
          <label htmlFor="floor" className={ModalStyle.input__label}>
            Floor number{" "}
          </label>
          <select name="floor" onChange={handlefloorChange}>
            <option value={JSON.stringify(new Array())}>----select----</option>
            {floors}
          </select>
        </div>
        {/**********  Contain header section ***********/}
        <div className={Style.table__header}>
          <h3 className="title">
            Floor :{" "}
            {floorData.length === 0 ? 0 : floorData[0].apartmentDetails.floor}
          </h3>
          <h4 className="subtitle">
            Apartments : {Object.keys(numberOfApartments).length}
          </h4>
          <h4 className="subtitle">Number of Room : {floorData.length}</h4>
        </div>
        {/**********  table  section ***********/}
        <div
          className="ag-theme-alpine"
          style={{ height: "55vh", width: "100%" }}
        >
          {floorData.length === 0 ? (
            <h1 className={Style.table__alert}>Please select floor</h1>
          ) : (
            <AgGridReact
              ref={gridRef}
              rowData={floorData}
              columnDefs={tableColumns}
              defaultColDef={defaultColDef}
              gridOptions={{
                onRowDoubleClicked: (event) => handlePopUpOn(event.data),
                suppressCellFocus: true,
              }}
            />
          )}
        </div>
        <button
          className={`button ${Style.table__btn}`}
          disabled={isPending}
          onClick={() => addApartment(floorData[0].apartmentDetails.floor)}
        >
          {isPending ? <LoadingSpinner /> : "ADD"}
        </button>
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

      <ConfirmationModal
        confirmationPopUp={confirmationPopUp}
        setConfirmationPopUp={setConfirmationPopUp}
        data={removeId}
        popUp_type="Remove_Apartment"
        isAssignData={isAssignData}
      />

      {Object.keys(popUpData) != 0 && (
        <PopUpWindow
          popUpModalOpened={popUpModalOpened}
          setPopUpModalOpened={setPopUpModalOpened}
          data={popUpData}
        />
      )}

      <UpdateApartment
        updateModalOpened={updateModalOpened}
        setUpdateModalOpened={setUpdateModalOpened}
        data={updateData}
      />

      <PostShare
        postModalOpened={postModalOpened}
        setPostModalOpened={setPostModalOpened}
        data={postData}
      />
    </>
  );
};

export default ApartmentTable;
