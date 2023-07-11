import { useRef } from "react";
import { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Box, Button, Group, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useFetchOwnersQuery } from "../../../../redux/features/owner/ownerApi";
import { useFetchRentersQuery } from "../../../../redux/features/renter/renterApi";
import { useFetchApartmentsQuery } from "../../../../redux/features/apartment/apartmentApi";
import { useFetchBillsQuery } from "../../../../redux/features/bills/billApi";

const BillListTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [updateAdminModalOpened, setUpdateAdminModalOpened] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({});

  const { bills, pagination } = useSelector((state) => state.bills);

  const { data, isLoading, isError } = useFetchBillsQuery({
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

  if (!isLoading && !isError && data?.bills.length > 0) {
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
            records={bills}
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
                    Header: "rent",
                    accessor: "rent",
                    render: (row) => (
                      <CustomCell value={row.rent} accessor="rent" />
                    ),
                  },

                  {
                    Header: "totalRent",
                    accessor: "totalRent",
                    render: (row) => (
                      <CustomCell value={row.totalRent} accessor="totalRent" />
                    ),
                  },

                  {
                    Header: "payableAmount",
                    accessor: "payableAmount",
                    render: (row) => (
                      <CustomCell
                        value={row.payableAmount}
                        accessor="payableAmount"
                      />
                    ),
                  },
                  {
                    Header: "paidAmount",
                    accessor: "paidAmount",
                    render: (row) => (
                      <CustomCell
                        value={row.paidAmount}
                        accessor="paidAmount"
                      />
                    ),
                  },
                  {
                    Header: "due",
                    accessor: "due",
                    render: (row) => (
                      <CustomCell value={row.due} accessor="due" />
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
                    Header: "gas_bill",
                    accessor: "gas_bill",
                    render: (row) => (
                      <CustomCell value={row.gas_bill} accessor="gas_bill" />
                    ),
                  },
                  {
                    Header: "others",
                    accessor: "others",
                    render: (row) => (
                      <CustomCell value={row.others} accessor="others" />
                    ),
                  },

                  {
                    Header: "service_charge",
                    accessor: "service_charge",
                    render: (row) => (
                      <CustomCell
                        value={row.service_charge}
                        accessor="service_charge"
                      />
                    ),
                  },
                  {
                    Header: "water_bill",
                    accessor: "water_bill",
                    render: (row) => (
                      <CustomCell
                        value={row.water_bill}
                        accessor="water_bill"
                      />
                    ),
                  },
                  {
                    Header: "billMonth",
                    accessor: "billMonth",
                    render: (row) => (
                      <CustomCell value={row.billMonth} accessor="billMonth" />
                    ),
                  },
                  {
                    Header: "billYear",
                    accessor: "billYear",
                    render: (row) => (
                      <CustomCell value={row.billYear} accessor="billYear" />
                    ),
                  },
                  {
                    Header: "createdAt",
                    accessor: "createdAt",
                    render: (row) => (
                      <CustomCell value={row.createdAt} accessor="createdAt" />
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
            totalRecords={bills.length}
            fetching={isLoading}
            onScrollToBottom={loadMoreRecords}
            scrollViewportRef={scrollViewportRef}
          />
        </Box>

        <Group mt="sm" mx="xs" position="apart">
          <Text size="sm">
            Showing {bills.length} records of {pagination.totalRecords}
            {bills.length < pagination.totalRecords &&
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

export default BillListTable;
const CustomCell = ({ value, accessor }) => {
  return <td data-cell={accessor}>{value}</td>;
};
