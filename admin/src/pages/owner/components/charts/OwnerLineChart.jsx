import { useSelector } from "react-redux";
import CustomChart from "../../../../Components/UI/CustomChart";
import { useFetchOwnersChartsQuery } from "../../../../redux/features/owner/ownerApi";
import { Loader } from "@mantine/core";
import Error from "../../../../Components/Error";

const OwnerLineChart = ({ year = new Date().getFullYear() }) => {
  const error = useSelector((state) => state.error);

  const {
    data: yearlyData,
    isLoading,
    isError,
  } = useFetchOwnersChartsQuery({ year });

  const borderColor = "#489f9f";

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
          return value + " /-";
        },
        anchor: "middel",
        align: "center",
        rotation: -49,
      },
    },
  };

  //line chart
  let lineChart;

  if (isLoading && !isError) {
    lineChart = <Loader />;
  }

  if (!isLoading && isError && error) {
    lineChart = <Error message={error?.data?.message} />;
  }

  if (!isLoading && !isError && Object.keys(yearlyData).length > 0) {
    lineChart = (
      <CustomChart
        type="line"
        labels={Object.keys(yearlyData.yearlyCreatedOwner)}
        data={Object.values(yearlyData.yearlyCreatedOwner)}
        borderColor={borderColor}
        options={options}
      />
    );
  }

  return lineChart;
};

export default OwnerLineChart;
