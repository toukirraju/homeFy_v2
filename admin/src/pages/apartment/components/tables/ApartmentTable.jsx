import Style from "../../../../Styles/TableStyle.module.css";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { createMultiApartment } from "../../../../redux/slices/apartmentSlice";
import { setReload } from "../../../../redux/slices/reloadSlice";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import ConfirmationModal from "../../../../Components/modals/ConfirmationModal";
import UpdateApartment from "../../modals/UpdateApartment";
import CreatePost from "../../../../Components/modals/postModal/CreatePost";
import PostShare from "../../../../Components/postComponents/postShare/PostShare";

const ApartmentTable = ({ data }) => {
  const gridRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isAssignData, setIsAssignData] = useState();
  const [removeId, setRemoveId] = useState();
  const [updateModalOpened, setUpdateModalOpened] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [postModalOpened, setPostModalOpened] = useState(false);
  const [postData, setPostData] = useState({});
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);

  const { user } = useSelector((state) => state.auth.user);

  const addApartment = (floor) => {
    const formData = {
      ownerId: user._id,
      ownerName: user.firstname + " " + user.lastname,
      numOfFloors: floor,
    };
    setLoading(true);
    dispatch(createMultiApartment(formData))
      .unwrap()
      .then(() => {
        setLoading(false);
        dispatch(setReload());
        // toast.success("Successfully registered!");

        // dispatch(clearMessage());
      })
      .catch(() => {
        setLoading(false);
      });
  };

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
      width: 100,
    },
    {
      headerName: "Apartment No",
      field: "apartNo",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Room No",
      field: "roomNo",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Rent",
      field: "rent",
      resizable: true,
      width: 100,
    },
    { headerName: "Gas bill", field: "gasbill", resizable: true, width: 100 },
    {
      headerName: "Water bill",
      field: "waterbill",
      resizable: true,
      width: 150,
    },
    { headerName: "Fridge bill", field: "f_bill", resizable: true, width: 100 },
    {
      headerName: "Service charge",
      field: "c_service",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Total Rent",
      field: "totalRent",
      resizable: true,
      width: 100,
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
      let p = arr[i][property];
      if (!grouped[p]) {
        grouped[p] = [];
      }
      grouped[p].push(arr[i]);
    }
    return grouped;
  };

  const numberOfApartments = groupByApartments(data, "apartNo");

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
      <ConfirmationModal
        confirmationPopUp={confirmationPopUp}
        setConfirmationPopUp={setConfirmationPopUp}
        data={removeId}
        popUp_type="Remove_Apartment"
        isAssignData={isAssignData}
      />

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
      <div className={`card ${Style.table_container}`}>
        <div className={Style.table__header}>
          <h3 className="title">
            Floor : {data.length === 0 ? 0 : data[0].level}
          </h3>
          <h4 className="subtitle">
            Apartments : {Object.keys(numberOfApartments).length}
          </h4>
          <h4 className="subtitle">Number of Room : {data.length}</h4>
        </div>
        <div
          className="ag-theme-alpine"
          style={{ height: "55vh", width: "100%" }}
        >
          {data.length === 0 ? (
            <h1>Please select floor</h1>
          ) : (
            <AgGridReact
              ref={gridRef}
              rowData={data}
              columnDefs={tableColumns}
              defaultColDef={defaultColDef}
            />
          )}
        </div>
        <button
          className={`button ${Style.table__btn}`}
          disabled={loading}
          onClick={() => addApartment(data[0].level)}
        >
          {loading ? <LoadingSpinner /> : "ADD"}
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
    </>
  );
};

export default ApartmentTable;
