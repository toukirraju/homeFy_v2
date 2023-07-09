import { useRef } from "react";
import { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Box, Button, Group, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useFetchOwnersQuery } from "../../../../redux/features/owner/ownerApi";

const OwnerListTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [updateAdminModalOpened, setUpdateAdminModalOpened] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({});

  const { owners, pagination } = useSelector((state) => state.owners);

  const { data, isLoading, isError } = useFetchOwnersQuery({
    page,
    limit,
    search,
  });

  //   const [deleteAdmin, { isSuccess }] = useDeleteAdminMutation();

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
      Header: "House Name",
      accessor: "houseName",
      render: (row) => (
        <CustomCell value={row.houseName} accessor="houseName" />
      ),
    },

    {
      Header: "Phone",
      accessor: "phone",
      render: (row) => <CustomCell value={row.phone} accessor="phone" />,
    },

    {
      Header: "Role",
      accessor: "role",
      render: (row) => <CustomCell value={row.role} accessor="role" />,
    },

    {
      Header: "defaultHomeID",
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
      Header: "isHomifyPlus",
      accessor: "isHomifyPlus",
      render: (row) => (
        <CustomCell value={row.isHomifyPlus} accessor="isHomifyPlus" />
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

  if (!isLoading && !isError && data?.owners.length > 0) {
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
            records={owners}
            columns={columns}
            textSelectionDisabled
            classNames={{
              root: "bg-transparent",
              pagination: "bg-transparent text-gray-300",
            }}
            // rowStyle={{ background: "transparent" }}
            totalRecords={owners.length}
            fetching={isLoading}
            onScrollToBottom={loadMoreRecords}
            scrollViewportRef={scrollViewportRef}
          />
        </Box>

        <Group mt="sm" mx="xs" position="apart">
          <Text size="sm">
            Showing {owners.length} records of {pagination.totalRecords}
            {owners.length < pagination.totalRecords &&
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

export default OwnerListTable;
const CustomCell = ({ value, accessor }) => {
  return <td data-cell={accessor}>{value}</td>;
};
