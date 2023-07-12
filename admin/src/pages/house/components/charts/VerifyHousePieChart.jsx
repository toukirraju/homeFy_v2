import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useMediaQuery } from "@mantine/hooks";
import { useFetchVerifiedHouseCountQuery } from "../../../../redux/features/house/houseApi";
import { Loader } from "@mantine/core";
import Error from "../../../../Components/Error";
import { useSelector } from "react-redux";

const VerifyHousePieChart = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const error = useSelector((state) => state.error);

  const {
    data: verifiedHouses,
    isLoading: verifiedLoding,
    isError: verifiedError,
  } = useFetchVerifiedHouseCountQuery();

  //pie chart
  let pieChart;

  if (verifiedLoding && !verifiedError) {
    pieChart = <Loader />;
  }

  if (!verifiedLoding && verifiedError && error) {
    pieChart = <Error message={error?.data?.message} />;
  }

  if (
    !verifiedLoding &&
    !verifiedError &&
    Object.keys(verifiedHouses).length > 0
  ) {
    pieChart = (
      <Chart
        type="pie"
        data={{
          labels: Object.keys(verifiedHouses),
          datasets: [
            {
              label: "Houses",
              data: Object.values(verifiedHouses),
              backgroundColor: [
                "rgba(54, 162, 235, 0.4)",
                "rgba(255, 99, 132, 0.4)",
                "rgba(255, 206, 86, 0.4)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 3,
            },
          ],
        }}
        plugins={[ChartDataLabels]}
        options={{
          responsive: true,
          maintainAspectRatio: false,

          plugins: {
            legend: {
              // display: isMobile ? false : true,
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
                    weight: "bold",
                  },
                },
              },
              formatter: function (value, context) {
                return value;
              },
            },
          },
        }}
      />
    );
  }

  return <div>{pieChart}</div>;
};

export default VerifyHousePieChart;
