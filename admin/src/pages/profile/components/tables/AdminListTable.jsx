import React, { useState } from "react";
import { Box, Badge } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import AdminPopUp from "./AdminPopUp";

// import Style from "../../../../Styles/TableStyle.module.css";
// import AssignRenter from "../../../../Components/modals/renterModal/AssignRenter";
// import UnAssignRenter from "../../../../Components/modals/renterModal/UnAssignRenter";
// import { useSelector } from "react-redux";
// import PopUpWindow from "../../modals/PopUpWindow";

const AdminListTable = ({ data }) => {
  const [clickCount, setClickCount] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);

  const [popUpModalOpened, setPopUpModalOpened] = useState(false);
  const [popUpData, setPopUpData] = useState({});

  const handleRowDoubleClick = (rowData) => {
    setClickCount(clickCount + 1);
    setSelectedRow(rowData);
    setTimeout(() => {
      if (clickCount === 1) {
        console.log(
          "Double click event fired on row: "
          // selectedRow
        );
        handlePopUpOn(selectedRow);
        setClickCount(0);
        setSelectedRow(null);
      } else {
        setClickCount(0);
        setSelectedRow(null);
      }
    }, 300);
  };
  const columns = [
    {
      Header: "Name",
      accessor: "fullName",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },

    { Header: "Email", accessor: "username" },

    { Header: "Nid", accessor: "nid" },
    {
      Header: "Address",
      accessor: "address",
    },
    { Header: "Country", accessor: "country" },
    { Header: "state", accessor: "state" },
    { Header: "state_district", accessor: "state_district" },
    { Header: "Postcode", accessor: "postcode" },
    { Header: "Role", accessor: "role.name" },
  ];
  const handlePopUpOn = (rowData) => {
    setPopUpModalOpened(true);
    setPopUpData(rowData);
  };

  return (
    <>
      <>
        <div className={`card `}>
          <Box
            sx={(theme) => ({
              height: 440,
              width: "calc(100vw - 270px)",
              // Media query with value from theme
              [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                height: "100vh - 200px",
                width: "calc(100vw - 20px)",
              },
            })}
          >
            <DataTable
              withColumnBorders
              striped
              highlightOnHover
              records={data}
              columns={columns}
              textSelectionDisabled
              onRowClick={handleRowDoubleClick}
              classNames={{
                root: "bg-transparent",
                pagination: "bg-transparent text-gray-300",
              }}
              rowStyle={{ background: "transparent" }}
            />
          </Box>
        </div>
        {Object.keys(popUpData) != 0 && (
          <AdminPopUp
            popUpModalOpened={popUpModalOpened}
            setPopUpModalOpened={setPopUpModalOpened}
            data={popUpData}
          />
        )}
      </>
    </>
  );
};

export default AdminListTable;
