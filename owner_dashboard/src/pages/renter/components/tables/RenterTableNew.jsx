import React, { useEffect, useState } from "react";
import { Box, Badge } from "@mantine/core";
import { DataTable } from "mantine-datatable";

import Style from "../../../../Styles/TableStyle.module.css";
import AssignRenter from "../../../../Components/modals/renterModal/AssignRenter";
import UnAssignRenter from "../../../../Components/modals/renterModal/UnAssignRenter";
import { useDispatch, useSelector } from "react-redux";
import UpdateRenter from "../../modals/UpdateRenter";
import ConfirmationModal from "../../../../Components/modals/ConfirmationModal";
import PopUpWindow from "../../modals/PopUpWindow";
import { getAllQueryrenters } from "../../../../redux/slices/renterSlice";
import { clearMessage } from "../../../../redux/slices/message";

const RenterTableNew = ({ data }) => {
  const dispatch = useDispatch();
  const [clickCount, setClickCount] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const { isPending } = useSelector((state) => state.renterInfo);
  const { profileData } = useSelector((state) => state.owner);
  // console.log(profileData.role);

  const PAGE_SIZES = [6, 10, 15, 20];

  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(data.slice(0, pageSize));

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [page, pageSize]);

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
      Header: "Username",
      accessor: "username",
      textAlignment: "center",
      width: 150,
    },
    {
      accessor: "name",
      textAlignment: "center",
      width: 150,
      render: ({ firstname, lastname }) => `${firstname} ${lastname}`,
    },
    { Header: "Phone No", accessor: "phone" },
    {
      Header: "Address",
      accessor: "address",
      textAlignment: "center",
      width: 200,
    },
    {
      Header: "Apartment number",
      accessor: "apartment_number",
      width: 100,
    },

    {
      Header: "Room number",
      accessor: "roomNumber",
    },

    {
      Header: "Area",
      accessor: "area",
    },
    {
      Header: "City/town",
      accessor: "city",
    },
    {
      Header: "Postcode",
      accessor: "postCode",
    },
    {
      title: "National ID / Passport",
      accessor: "National_ID_Passport_no",
    },

    {
      Header: "Advance Rent",
      accessor: "advanceRent",
    },

    {
      Header: "Assigned Date",
      accessor: "assignedDate",

      customCellAttributes: (row) => ({
        style: {
          textAlign: "center",
        },
      }),
    },
  ];
  // new table end

  // old table start
  const [assignModalOpened, setAssignModalOpened] = useState(false);
  const [unAssignModalOpened, setUnAssignModalOpened] = useState(false);

  const [popUpModalOpened, setPopUpModalOpened] = useState(false);
  const [popUpData, setPopUpData] = useState({});

  const handlePopUpOn = (rowData) => {
    setPopUpModalOpened(true);
    setPopUpData(rowData);
  };

  return (
    <>
      <>
        <div className={`card ${Style.table_container}`}>
          {profileData.role === "owner" && (
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
                apartmentPopUp={false}
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
          )}

          <Box
            sx={(theme) => ({
              height: 440,
              width: "calc(100vw - 270px)",
              // Media query with value from theme
              [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
                height: 450,
                width: "calc(100vw - 20px)",
              },
            })}
          >
            <DataTable
              withColumnBorders
              striped
              highlightOnHover
              records={records}
              columns={columns}
              textSelectionDisabled
              totalRecords={data.length}
              recordsPerPage={pageSize}
              page={page}
              onPageChange={(p) => setPage(p)}
              recordsPerPageOptions={PAGE_SIZES}
              onRecordsPerPageChange={setPageSize}
              onRowClick={handleRowDoubleClick}
              defaultColumnRender={(row, _, accessor) => {
                const data = row[accessor];
                if (accessor === "assignedDate") {
                  const date = new Date(data);
                  const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  };
                  return date.toLocaleDateString("en-US", options);
                }
                if (accessor === "username") {
                  const assignDate = new Date(row.assignedDate);
                  const currentDate = new Date();
                  if (assignDate.getMonth() === currentDate.getMonth()) {
                    return (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: "600",
                          }}
                        >
                          <span>{data}</span>
                          <Badge
                            variant="gradient"
                            gradient={{ from: "teal", to: "blue", deg: 60 }}
                          >
                            New
                          </Badge>
                        </div>
                      </>
                    );
                  }
                }
                return data;
              }}
            />
          </Box>
        </div>
        {Object.keys(popUpData) != 0 && (
          <PopUpWindow
            popUpModalOpened={popUpModalOpened}
            setPopUpModalOpened={setPopUpModalOpened}
            data={popUpData}
          />
        )}
      </>
    </>
  );
};

export default RenterTableNew;
