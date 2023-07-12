import { useRef } from "react";
import { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Box, Button, Group, Text, TextInput } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useFetchOwnersQuery } from "../../../../redux/features/owner/ownerApi";
import { useFetchRentersQuery } from "../../../../redux/features/renter/renterApi";

const RenterListTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [updateAdminModalOpened, setUpdateAdminModalOpened] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({});

  const { renters, pagination } = useSelector((state) => state.renters);

  const { data, isLoading, isError } = useFetchRentersQuery({
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

  const columns = [
    {
      Header: "Username",
      accessor: "username",
      render: (row) => <CustomCell value={row.username} accessor="username" />,
    },
    {
      Header: " Name",
      accessor: "fullname",
      render: (row) => <CustomCell value={row.fullname} accessor="fullname" />,
    },

    {
      Header: "Phone",
      accessor: "phone",
      render: (row) => <CustomCell value={row.phone} accessor="phone" />,
    },

    {
      Header: "House owner Id",
      accessor: "ownerId",
      render: (row) => <CustomCell value={row.ownerId} accessor="ownerId" />,
    },
    {
      Header: "House ID",
      accessor: "defaultHomeID",
      render: (row) => (
        <CustomCell value={row.defaultHomeID} accessor="defaultHomeID" />
      ),
    },
    {
      Header: "isBlocked",
      accessor: "isBlocked",
      render: (row) => (
        <CustomCell value={row.isBlocked} accessor="isBlocked" />
      ),
    },
    {
      Header: "apartment",
      accessor: "apartment",
      render: (row) => (
        <CustomCell value={row.apartment} accessor="apartment" />
      ),
    },
    {
      Header: "_id",
      accessor: "_id",
      render: (row) => <CustomCell value={row._id} accessor="_id" />,
    },
    {
      Header: "createdAt",
      accessor: "createdAt",
      render: (row) => (
        <CustomCell value={row.createdAt} accessor="createdAt" />
      ),
    },
    // {
    //   accessor: "actions",
    //   render: (row) => (
    //     <td data-cell="actions">
    //       <div className="flex w-full justify-center gap-2 text-2xl">
    //         <BiEdit
    //           className="text-blue-500 hover:bg-slate-300/90 hover:rounded"
    //           onClick={() => handleUpdate(row)}
    //         />
    //         <BiTrash
    //           className="text-red-500 hover:bg-red-200/90 hover:rounded"
    //           onClick={() => handleRemove(row)}
    //         />
    //       </div>
    //     </td>
    //   ),
    // },
  ];

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isError) {
    content = <div>Error: </div>;
  }

  if (!isLoading && !isError && data?.renters.length > 0) {
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
            records={renters}
            columns={columns}
            textSelectionDisabled
            classNames={{
              root: "bg-transparent",
              pagination: "bg-transparent text-gray-300",
            }}
            // rowStyle={{ background: "transparent" }}
            totalRecords={renters.length}
            fetching={isLoading}
            onScrollToBottom={loadMoreRecords}
            scrollViewportRef={scrollViewportRef}
          />
        </Box>

        <Group mt="sm" mx="xs" position="apart">
          <Text size="sm">
            Showing {renters.length} records of {pagination.totalRecords}
            {renters.length < pagination.totalRecords &&
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

export default RenterListTable;
const CustomCell = ({ value, accessor }) => {
  return <td data-cell={accessor}>{value}</td>;
};
