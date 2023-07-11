import { useRef } from "react";
import { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Box, Button, Group, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useFetchTemporaryBillsQuery } from "../../../../redux/features/bills/billApi";

const TemporaryBillListTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [updateAdminModalOpened, setUpdateAdminModalOpened] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({});

  const { temporaryBills, pagination } = useSelector((state) => state.bills);

  const { data, isLoading, isError } = useFetchTemporaryBillsQuery({
    page,
    limit,
    search,
  });

  const scrollViewportRef = useRef(null);

  const loadMoreRecords = () => {
    if (pagination.totalPages !== page) {
      setPage(page + 1);
    }
  };
  const reset = () => {
    // Make sure to scroll to top after resetting records
    scrollViewportRef.current?.scrollTo(0, 0);
  };

  const handleUpdate = (value) => {
    setSelectedAdmin(value);
    setUpdateAdminModalOpened(true);
  };

  const handleRemove = (admin) => {
    // deleteAdmin(admin._id);
  };

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isError) {
    content = <div>Error: </div>;
  }

  if (!isLoading && !isError && data?.tempBills.length > 0) {
    content = (
      <>
        <Box
          sx={(theme) => ({
            height: "calc(100vh - 270px)",
            width: "calc(100vw - 270px)",
            // Media query with value from theme
            [`@media (max-width: 758px)`]: {
              height: "100vh - 200px",
              width: "calc(100vw)",
            },
          })}
        >
          <DataTable
            withColumnBorders
            striped
            records={temporaryBills}
            groups={[
              {
                id: "User Info",
                columns: [
                  {
                    Header: "renterName",
                    accessor: "renterName",
                    render: (row) => (
                      <CustomCell
                        value={row.renterName}
                        accessor="renterName"
                      />
                    ),
                  },
                  {
                    Header: "Owner Id",
                    accessor: "ownerId",
                    render: (row) => (
                      <CustomCell value={row.ownerId} accessor="ownerId" />
                    ),
                  },
                  {
                    Header: "House ID",
                    accessor: "defaultHomeID",
                    render: (row) => (
                      <CustomCell
                        value={row.defaultHomeID}
                        accessor="defaultHomeID"
                      />
                    ),
                  },
                ],
              },
              {
                id: "bill-info",
                title: <i>bill info</i>,
                columns: [
                  {
                    Header: "tempDue",
                    accessor: "tempDue",
                    render: (row) => (
                      <CustomCell value={row.tempDue} accessor="tempDue" />
                    ),
                  },

                  {
                    Header: "electricity_bill",
                    accessor: "electricity_bill",
                    render: (row) => (
                      <CustomCell
                        value={row.electricity_bill}
                        accessor="electricity_bill"
                      />
                    ),
                  },
                  {
                    Header: "others",
                    accessor: "others",
                    render: (row) => (
                      <CustomCell value={row.others} accessor="others" />
                    ),
                  },
                ],
              },
            ]}
            textSelectionDisabled
            classNames={{
              root: "bg-transparent",
              pagination: "bg-transparent text-gray-300",
            }}
            // rowStyle={{ background: "transparent" }}
            totalRecords={temporaryBills.length}
            fetching={isLoading}
            onScrollToBottom={loadMoreRecords}
            scrollViewportRef={scrollViewportRef}
          />
        </Box>

        <Group mt="sm" mx="xs" position="apart">
          <Text size="sm">
            Showing {temporaryBills.length} records of {pagination.totalRecords}
            {temporaryBills.length < pagination.totalRecords &&
              ", scroll to bottom to load more"}
          </Text>
          <Button variant="light" onClick={reset}>
            Go To Top
          </Button>
        </Group>

        {/* <UpdateSubAdminModal
          updateAdminModalOpened={updateAdminModalOpened}
          setUpdateAdminModalOpened={setUpdateAdminModalOpened}
          data={selectedAdmin}
        /> */}
      </>
    );
  }

  return <div className="my-3">{content}</div>;
};

export default TemporaryBillListTable;
const CustomCell = ({ value, accessor }) => {
  return <td data-cell={accessor}>{value}</td>;
};
