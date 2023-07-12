import { useRef } from "react";
import { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useFetchHousesQuery } from "../../../../redux/features/house/houseApi";

const HouseListTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [updateAdminModalOpened, setUpdateAdminModalOpened] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({});

  const [expandedCompanyIds, setExpandedCompanyIds] = useState([]);
  const [expandedDepartmentIds, setExpandedDepartmentIds] = useState([]);

  const { houses, pagination } = useSelector((state) => state.houses);

  const { data, isLoading, isError } = useFetchHousesQuery({
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
      Header: "House Name",
      accessor: "houseName",
      render: (row) => (
        <CustomCell value={row.houseName} accessor="houseName" />
      ),
    },
    {
      Header: "House Number",
      accessor: "houseNo",
      render: (row) => <CustomCell value={row.houseNo} accessor="houseNo" />,
    },

    {
      Header: "Owner Name",
      accessor: "ownerName",
      render: (row) => (
        <CustomCell value={row.ownerName} accessor="ownerName" />
      ),
    },

    {
      Header: "Phone",
      accessor: "ownerPhone",
      render: (row) => (
        <CustomCell value={row.ownerPhone} accessor="ownerPhone" />
      ),
    },
    {
      Header: "address",
      accessor: "address.address_display_name",
      render: (row) => (
        <CustomCell
          value={row.address.address_display_name}
          accessor="address"
        />
      ),
    },
    {
      Header: "Country",
      accessor: "address.country",
      render: (row) => (
        <CustomCell value={row.address.country} accessor="country" />
      ),
    },
    {
      Header: "state",
      accessor: "address.state",
      render: (row) => (
        <CustomCell value={row.address.state} accessor="state" />
      ),
    },
    {
      Header: "state district",
      accessor: "address.state_district",
      render: (row) => (
        <CustomCell
          value={row.address.state_district}
          accessor="state district"
        />
      ),
    },
    {
      Header: "Postcode",
      accessor: "address.postCode",
      render: (row) => (
        <CustomCell value={row.address.postCode} accessor="postCode" />
      ),
    },
    {
      Header: "Verified",
      accessor: "isVerified",
      render: (row) => (
        <CustomCell value={row.isVerified} accessor="Verified" />
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

  if (!isLoading && !isError && data?.houses.length > 0) {
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
            records={houses}
            columns={columns}
            textSelectionDisabled
            classNames={{
              root: "bg-transparent",
              pagination: "bg-transparent text-gray-300",
            }}
            // rowStyle={{ background: "transparent" }}
            totalRecords={houses.length}
            fetching={isLoading}
            onScrollToBottom={loadMoreRecords}
            scrollViewportRef={scrollViewportRef}
            rowExpansion={{
              content: ({ record }) => (
                <Stack p="xs" spacing={6}>
                  <Group spacing={6}>
                    <Text>Address:</Text>
                    <Text>
                      {console.log(record)}
                      {record.address.address_display_name}
                    </Text>
                  </Group>
                  <Group spacing={6}>
                    <Text>Mission statement:</Text>
                    {/* <Text italic>“{record.missionStatement}”</Text> */}
                  </Group>
                </Stack>
              ),
            }}
          />
        </Box>

        <Group mt="sm" mx="xs" position="apart">
          <Text size="sm">
            Showing {houses.length} records of {pagination.totalRecords}
            {houses.length < pagination.totalRecords &&
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

export default HouseListTable;
const CustomCell = ({ value, accessor }) => {
  return <td data-cell={accessor}>{value}</td>;
};
