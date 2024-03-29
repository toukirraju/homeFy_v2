import { useSelector } from "react-redux";
import CustomChart from "../../../../Components/UI/CustomChart";
import { useFetchYearlyBillPaidQuery } from "../../../../redux/features/bills/billApi";
import generateRgbaColors from "../../../../utility/genrateRgbaColors";
import { Loader } from "@mantine/core";
import Error from "../../../../Components/Error";

const PaidAmountBarChart = ({ year = new Date().getFullYear() }) => {
  const {
    data: yearlyPaidAmount,
    isLoading: paidLoading,
    isError: paidError,
  } = useFetchYearlyBillPaidQuery({ year });

  const error = useSelector((state) => state.error);

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
          return value + " /-";
        },
        anchor: "middel",
        align: "center",
        rotation: -49,
      },
    },
  };

  //bar chart
  let barChart;

  if (paidLoading && !paidError) {
    barChart = <Loader />;
  }

  if (!paidLoading && paidError && error) {
    barChart = <Error message={error?.data?.message} />;
  }

  if (!paidLoading && !paidError && Object.keys(yearlyPaidAmount).length > 0) {
    const backgroundColor = generateRgbaColors(
      Object.keys(yearlyPaidAmount).length,
      0.4
    );
    barChart = (
      <CustomChart
        type="bar"
        labels={Object.keys(yearlyPaidAmount)}
        data={Object.values(yearlyPaidAmount)}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        options={options}
      />
    );
  }

  return barChart;
};

export default PaidAmountBarChart;
