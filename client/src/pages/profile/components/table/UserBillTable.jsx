import React, { useEffect, useState } from "react";
import { Box, Badge } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useColorScheme } from "@mantine/hooks";

const UserBillTable = ({ data }) => {
  const colorScheme = useColorScheme();
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

  const columns = [
    {
      Header: "Date",
      accessor: "createdAt",
      textAlignment: "center",
    },
    { Header: "Paid", accessor: "paidAmount", textAlignment: "center" },
    {
      Header: "Payable",
      accessor: "payableAmount",
      textAlignment: "center",
    },
    {
      Header: "rent",
      textAlignment: "center",
      accessor: "rent",
      width: 100,
    },

    {
      Header: "due",
      textAlignment: "center",
      accessor: "due",
    },

    {
      Header: "gas_bill",
      textAlignment: "center",
      accessor: "gas_bill",
    },
    {
      Header: "water_bill",
      textAlignment: "center",
      accessor: "water_bill",
    },
    {
      Header: "service_charge",
      textAlignment: "center",
      accessor: "service_charge",
    },
    {
      title: "Electricity bill",
      textAlignment: "center",
      accessor: "electricity_bill",
    },

    {
      Header: "others",
      textAlignment: "center",
      accessor: "others",
    },
  ];

  return (
    <>
      <div>
        <Box
          sx={(theme) => ({
            height: 300,
            // width: "calc(100vw - 270px)",
            // Media query with value from theme
            [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
              height: 300,
              width: "calc(100vw - 40px)",
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
            rowStyle={{
              background: "transparent",
              color: colorScheme === "dark" ? "white" : "gray",
            }}
            styles={{
              header: { zIndex: 1 },
              pagination: { backgroundColor: "transparent" },
            }}
            onPageChange={(p) => setPage(p)}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={setPageSize}
            defaultColumnRender={(row, _, accessor) => {
              const data = row[accessor];
              if (accessor === "createdAt") {
                const date = new Date(data);
                const options = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                };
                return date.toLocaleDateString("en-US", options);
              }

              return data;
            }}
          />
        </Box>
      </div>
    </>
  );
};

export default UserBillTable;
