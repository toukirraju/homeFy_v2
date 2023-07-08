import { useRef } from "react";
import { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import {
  useDeleteAdminMutation,
  useGetAdminsQuery,
} from "../../../../redux/features/profile/profileApi";
import { useSelector } from "react-redux";
import UpdateSubAdminModal from "../../modals/UpdateSubAdminModal";
import { Box, Button, Group, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";

const AdminTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [username, setUsername] = useState("");
  const [updateAdminModalOpened, setUpdateAdminModalOpened] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({});

  const { admins, pagination } = useSelector((state) => state.profile);

  const { data, isLoading, isError } = useGetAdminsQuery({
    page,
    limit,
    username,
  });

  const [deleteAdmin, { isSuccess }] = useDeleteAdminMutation();

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
    deleteAdmin(admin._id);
  };

  const columns = [
    {
      Header: "Name",
      accessor: "fullName",
      render: (row) => <CustomCell value={row.fullName} accessor="fullName" />,
    },
    {
      Header: "Phone",
      accessor: "phone",
      render: (row) => <CustomCell value={row.phone} accessor="phone" />,
    },

    {
      Header: "Email",
      accessor: "username",
      render: (row) => <CustomCell value={row.username} accessor="username" />,
    },

    {
      Header: "Nid",
      accessor: "nid",
      render: (row) => <CustomCell value={row.nid} accessor="nid" />,
    },
    {
      accessor: "address",
      render: (row) => <CustomCell value={row.address} accessor="address" />,
    },
    {
      Header: "Country",
      accessor: "country",
      render: (row) => <CustomCell value={row.country} accessor="country" />,
    },
    {
      Header: "state",
      accessor: "state",
      render: (row) => <CustomCell value={row.state} accessor="state" />,
    },
    {
      Header: "state_district",
      accessor: "state_district",
      render: (row) => (
        <CustomCell value={row.state_district} accessor="state_district" />
      ),
    },
    {
      Header: "Postcode",
      accessor: "postcode",
      render: (row) => <CustomCell value={row.postcode} accessor="postcode" />,
    },
    {
      Header: "Role",
      accessor: "role.name",
      render: (row) => <CustomCell value={row.role.name} accessor="role" />,
    },
    {
      accessor: "actions",
      render: (row) => (
        <td data-cell="actions">
          <div className="flex w-full justify-center gap-2 text-2xl">
            <BiEdit
              className="text-blue-500 hover:bg-slate-300/90 hover:rounded"
              onClick={() => handleUpdate(row)}
            />
            <BiTrash
              className="text-red-500 hover:bg-red-200/90 hover:rounded"
              onClick={() => handleRemove(row)}
            />
          </div>
        </td>
      ),
    },
  ];

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isError) {
    content = <div>Error: </div>;
  }

  if (!isLoading && !isError && data?.admins.length > 0) {
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
            records={admins}
            columns={columns}
            textSelectionDisabled
            classNames={{
              root: "bg-transparent",
              pagination: "bg-transparent text-gray-300",
            }}
            // rowStyle={{ background: "transparent" }}
            totalRecords={admins.length}
            fetching={isLoading}
            onScrollToBottom={loadMoreRecords}
            scrollViewportRef={scrollViewportRef}
          />
        </Box>

        <Group mt="sm" mx="xs" position="apart">
          <Text size="sm">
            Showing {admins.length} records of {pagination.totalRecords}
            {admins.length < pagination.totalRecords &&
              ", scroll to bottom to load more"}
          </Text>
          <Button variant="light" onClick={reset}>
            Go To Top
          </Button>
        </Group>

        <UpdateSubAdminModal
          updateAdminModalOpened={updateAdminModalOpened}
          setUpdateAdminModalOpened={setUpdateAdminModalOpened}
          data={selectedAdmin}
        />
      </>
    );
  }

  return <div className="my-3">{content}</div>;
};

export default AdminTable;
const CustomCell = ({ value, accessor }) => {
  return <td data-cell={accessor}>{value}</td>;
};
