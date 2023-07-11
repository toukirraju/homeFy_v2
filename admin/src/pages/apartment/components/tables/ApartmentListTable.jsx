import { useRef } from "react";
import { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Box, Button, Group, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useFetchOwnersQuery } from "../../../../redux/features/owner/ownerApi";
import { useFetchRentersQuery } from "../../../../redux/features/renter/renterApi";
import { useFetchApartmentsQuery } from "../../../../redux/features/apartment/apartmentApi";

const ApartmentListTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [updateAdminModalOpened, setUpdateAdminModalOpened] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({});

  const { apartments, pagination } = useSelector((state) => state.apartments);

  const { data, isLoading, isError } = useFetchApartmentsQuery({
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
      Header: "houseName",
      accessor: "houseName",
      render: (row) => (
        <CustomCell value={row.houseName} accessor="houseName" />
      ),
    },
    {
      Header: "Owner Name",
      accessor: "ownerName",
      render: (row) => (
        <CustomCell value={row.ownerName} accessor="ownerName" />
      ),
    },

    {
      Header: "renterName",
      accessor: "renterName",
      render: (row) => (
        <CustomCell value={row.renterName} accessor="renterName" />
      ),
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
      Header: "isAvailable",
      accessor: "isAvailable",
      render: (row) => (
        <CustomCell value={row.isAvailable} accessor="isAvailable" />
      ),
    },

    {
      Header: "apartmentDetails.apartmentName",
      accessor: "apartmentDetails.apartmentName",
      render: (row) => (
        <CustomCell
          value={row.apartmentDetails.apartmentName}
          accessor="apartmentDetails.apartmentName"
        />
      ),
    },
    {
      Header: "apartmentDetails.apartmentType",
      accessor: "apartmentDetails.apartmentType",
      render: (row) => (
        <CustomCell
          value={row.apartmentDetails.apartmentType}
          accessor="apartmentDetails.apartmentType"
        />
      ),
    },
    {
      Header: "apartmentDetails.apartment_length",
      accessor: "apartmentDetails.apartment_length",
      render: (row) => (
        <CustomCell
          value={row.apartmentDetails.apartment_length}
          accessor="apartmentDetails.apartment_length"
        />
      ),
    },
    {
      Header: "apartmentDetails.apartment_number",
      accessor: "apartmentDetails.apartment_number",
      render: (row) => (
        <CustomCell
          value={row.apartmentDetails.apartment_number}
          accessor="apartmentDetails.apartment_number"
        />
      ),
    },
    {
      Header: "apartmentDetails.floor",
      accessor: "apartmentDetails.floor",
      render: (row) => (
        <CustomCell
          value={row.apartmentDetails.floor}
          accessor="apartmentDetails.floor"
        />
      ),
    },
    {
      Header: "apartmentDetails.number_of_balcony",
      accessor: "apartmentDetails.number_of_balcony",
      render: (row) => (
        <CustomCell
          value={row.apartmentDetails.number_of_balcony}
          accessor="apartmentDetails.number_of_balcony"
        />
      ),
    },
    {
      Header: "apartmentDetails.number_of_baths",
      accessor: "apartmentDetails.number_of_baths",
      render: (row) => (
        <CustomCell
          value={row.apartmentDetails.number_of_baths}
          accessor="apartmentDetails.number_of_baths"
        />
      ),
    },
    {
      Header: "apartmentDetails.number_of_bed_room",
      accessor: "apartmentDetails.number_of_bed_room",
      render: (row) => (
        <CustomCell
          value={row.apartmentDetails.number_of_bed_room}
          accessor="apartmentDetails.number_of_bed_room"
        />
      ),
    },
    {
      Header: "apartmentDetails.number_of_kitchen",
      accessor: "apartmentDetails.number_of_kitchen",
      render: (row) => (
        <CustomCell
          value={row.apartmentDetails.number_of_kitchen}
          accessor="apartmentDetails.number_of_kitchen"
        />
      ),
    },

    {
      Header: "billDetails.electricity_bill",
      accessor: "billDetails.electricity_bill",
      render: (row) => (
        <CustomCell
          value={row.billDetails.electricity_bill}
          accessor="billDetails.electricity_bill"
        />
      ),
    },
    {
      Header: "billDetails.gas_bill",
      accessor: "billDetails.gas_bill",
      render: (row) => (
        <CustomCell
          value={row.billDetails.gas_bill}
          accessor="billDetails.gas_bill"
        />
      ),
    },
    {
      Header: "billDetails.others",
      accessor: "billDetails.others",
      render: (row) => (
        <CustomCell
          value={row.billDetails.others}
          accessor="billDetails.others"
        />
      ),
    },
    {
      Header: "billDetails.rent",
      accessor: "billDetails.rent",
      render: (row) => (
        <CustomCell value={row.billDetails.rent} accessor="billDetails.rent" />
      ),
    },
    {
      Header: "billDetails.service_charge",
      accessor: "billDetails.service_charge",
      render: (row) => (
        <CustomCell
          value={row.billDetails.service_charge}
          accessor="billDetails.service_charge"
        />
      ),
    },
    {
      Header: "billDetails.totalRent",
      accessor: "billDetails.totalRent",
      render: (row) => (
        <CustomCell
          value={row.billDetails.totalRent}
          accessor="billDetails.totalRent"
        />
      ),
    },
    {
      Header: "billDetails.water_bill",
      accessor: "billDetails.water_bill",
      render: (row) => (
        <CustomCell
          value={row.billDetails.water_bill}
          accessor="billDetails.water_bill"
        />
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

  if (!isLoading && !isError && data?.apartments.length > 0) {
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
            records={apartments}
            groups={[
              {
                id: "User Info",
                columns: [
                  {
                    Header: "houseName",
                    accessor: "houseName",
                    render: (row) => (
                      <CustomCell value={row.houseName} accessor="houseName" />
                    ),
                  },
                  {
                    Header: "Owner Name",
                    accessor: "ownerName",
                    render: (row) => (
                      <CustomCell value={row.ownerName} accessor="ownerName" />
                    ),
                  },

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
                    Header: "House owner Id",
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
                  {
                    Header: "isAvailable",
                    accessor: "isAvailable",
                    render: (row) => (
                      <CustomCell
                        value={row.isAvailable}
                        accessor="isAvailable"
                      />
                    ),
                  },
                ],
              },
              {
                id: "Apartment-info",
                title: <i>Apartment info</i>,
                columns: [
                  {
                    Header: "apartmentName",
                    accessor: "apartmentName",
                    render: (row) => (
                      <CustomCell
                        value={row.apartmentDetails.apartmentName}
                        accessor="apartmentName"
                      />
                    ),
                  },
                  {
                    Header: "apartmentType",
                    accessor: "apartmentType",
                    render: (row) => (
                      <CustomCell
                        value={row.apartmentDetails.apartmentType}
                        accessor="apartmentType"
                      />
                    ),
                  },
                  {
                    Header: "apartment_length",
                    accessor: "apartment_length",
                    render: (row) => (
                      <CustomCell
                        value={row.apartmentDetails.apartment_length}
                        accessor="apartment_length"
                      />
                    ),
                  },
                  {
                    Header: "apartment_number",
                    accessor: "apartment_number",
                    render: (row) => (
                      <CustomCell
                        value={row.apartmentDetails.apartment_number}
                        accessor="apartment_number"
                      />
                    ),
                  },
                  {
                    Header: "floor",
                    accessor: "floor",
                    render: (row) => (
                      <CustomCell
                        value={row.apartmentDetails.floor}
                        accessor="floor"
                      />
                    ),
                  },
                  {
                    Header: "number_of_balcony",
                    accessor: "number_of_balcony",
                    render: (row) => (
                      <CustomCell
                        value={row.apartmentDetails.number_of_balcony}
                        accessor="number_of_balcony"
                      />
                    ),
                  },
                  {
                    Header: "number_of_baths",
                    accessor: "number_of_baths",
                    render: (row) => (
                      <CustomCell
                        value={row.apartmentDetails.number_of_baths}
                        accessor="number_of_baths"
                      />
                    ),
                  },
                  {
                    Header: "number_of_bed_room",
                    accessor: "number_of_bed_room",
                    render: (row) => (
                      <CustomCell
                        value={row.apartmentDetails.number_of_bed_room}
                        accessor="number_of_bed_room"
                      />
                    ),
                  },
                  {
                    Header: "number_of_kitchen",
                    accessor: "number_of_kitchen",
                    render: (row) => (
                      <CustomCell
                        value={row.apartmentDetails.number_of_kitchen}
                        accessor="number_of_kitchen"
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
                    Header: "electricity_bill",
                    accessor: "electricity_bill",
                    render: (row) => (
                      <CustomCell
                        value={row.billDetails.electricity_bill}
                        accessor="electricity_bill"
                      />
                    ),
                  },
                  {
                    Header: "gas_bill",
                    accessor: "gas_bill",
                    render: (row) => (
                      <CustomCell
                        value={row.billDetails.gas_bill}
                        accessor="gas_bill"
                      />
                    ),
                  },
                  {
                    Header: "others",
                    accessor: "others",
                    render: (row) => (
                      <CustomCell
                        value={row.billDetails.others}
                        accessor="others"
                      />
                    ),
                  },
                  {
                    Header: "rent",
                    accessor: "rent",
                    render: (row) => (
                      <CustomCell
                        value={row.billDetails.rent}
                        accessor="rent"
                      />
                    ),
                  },
                  {
                    Header: "service_charge",
                    accessor: "service_charge",
                    render: (row) => (
                      <CustomCell
                        value={row.billDetails.service_charge}
                        accessor="service_charge"
                      />
                    ),
                  },
                  {
                    Header: "totalRent",
                    accessor: "totalRent",
                    render: (row) => (
                      <CustomCell
                        value={row.billDetails.totalRent}
                        accessor="totalRent"
                      />
                    ),
                  },
                  {
                    Header: "water_bill",
                    accessor: "water_bill",
                    render: (row) => (
                      <CustomCell
                        value={row.billDetails.water_bill}
                        accessor="water_bill"
                      />
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
            totalRecords={apartments.length}
            fetching={isLoading}
            onScrollToBottom={loadMoreRecords}
            scrollViewportRef={scrollViewportRef}
          />
        </Box>

        <Group mt="sm" mx="xs" position="apart">
          <Text size="sm">
            Showing {apartments.length} records of {pagination.totalRecords}
            {apartments.length < pagination.totalRecords &&
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

export default ApartmentListTable;
const CustomCell = ({ value, accessor }) => {
  return <td data-cell={accessor}>{value}</td>;
};
