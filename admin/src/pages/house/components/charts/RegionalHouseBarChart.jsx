import { useState } from "react";
import CustomChart from "../../../../Components/UI/CustomChart";
import { useFetchRegionalHousesQuery } from "../../../../redux/features/house/houseApi";
import generateRgbaColors from "../../../../utility/genrateRgbaColors";
import { Loader } from "@mantine/core";
import Error from "../../../../Components/Error";
import { useSelector } from "react-redux";

const RegionalHouseBarChart = ({ year = new Date().getFullYear() }) => {
  const error = useSelector((state) => state.error);

  const {
    data: regionalHouses,
    isLoading: regionalLoding,
    isError: regionalError,
  } = useFetchRegionalHousesQuery({ year });

  const labels = [
    "Dhaka",
    "Khulna",
    "Barisal",
    "Sylhet",
    "Rajshahi",
    "Rangpur",
    "Mymensingh",
    "Chittagong",
  ];
  const backgroundColor = generateRgbaColors(labels.length, 0.4);
  const borderColor = "#afafaf";

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "gray",
          font: {
            size: 12,
          },
        },
      },
      datalabels: {
        color: "white",
        labels: {
          title: {
            font: {
              weight: "",
            },
          },
        },
        formatter: function (value, context) {
          return value;
        },
        anchor: "middel",
        align: "center",
        rotation: -49,
      },
    },
  };

  //bar chart
  let barChart;

  if (regionalLoding && !regionalError) {
    barChart = <Loader />;
  }

  if (!regionalLoding && regionalError && error) {
    barChart = <Error message={error?.data?.message} />;
  }

  if (
    !regionalLoding &&
    !regionalError &&
    Object.keys(regionalHouses).length > 0
  ) {
    barChart = (
      <CustomChart
        type="bar"
        labels={Object.keys(regionalHouses)}
        data={Object.values(regionalHouses)}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        options={options}
      />
    );
  }
  return barChart;
};

export default RegionalHouseBarChart;
