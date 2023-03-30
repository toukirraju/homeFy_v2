import React, { useEffect, useState } from "react";
import { Box, Badge } from "@mantine/core";
import { DataTable } from "mantine-datatable";

const TableLoader = () => {
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
            records={[]}
            fetching={true}
            columns={columns}
            textSelectionDisabled
          />
        </Box>
      </div>
    </>
  );
};

export default TableLoader;
