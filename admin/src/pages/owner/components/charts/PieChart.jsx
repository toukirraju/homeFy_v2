import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useMediaQuery } from "@mantine/hooks";
// import { getBillWidget } from "../../../redux/slices/dashboardSlice";

const PieChart = ({ blokedData }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const ownerData = {
    blocked: blokedData.blockedOwnerCount,
    unblock: blokedData.notBlockedOwnerCount,
  };
  return (
    <>
      <div>
        <Chart
          type="pie"
          data={{
            labels: Object.keys(ownerData),
            datasets: [
              {
                label: "Renters",
                data: Object.values(ownerData),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.4)",
                  "rgba(54, 162, 235, 0.4)",
                  "rgba(255, 206, 86, 0.4)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
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
                // formatter: function (value, context) {
                //   return (
                //     context.chart.data.labels[context.dataIndex] + ":" + value
                //   );
                // },
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default PieChart;
