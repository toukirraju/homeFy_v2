import React, { useEffect } from "react";
import "chart.js/auto";
import Style from "../../styles/Dashboard.module.css";
import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";
// import { getBillWidget } from "../../../redux/slices/dashboardSlice";

const PieChart = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");
  // const {  billWidgets,  isReload } =
  //   useSelector((state) => state.dashboardData);
  // // console.log(billWidgets);

  // useEffect(() => {
  //   dispatch(getBillWidget());
  // }, [isReload, dispatch]);
  return (
    <>
      <div className={`${Style.circular_pie}`}>
        <Chart
          type="pie"
          data={{
            labels: ["Payable", "Paid", "Remaining"],
            datasets: [
              {
                label: "Dataset 1",
                data: [
                  43, 534, 344,
                  // billWidgets.totalPayable,
                  // billWidgets.totalPaidBill,
                  // billWidgets.remainingBill,
                ],
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
                display: isMobile ? false : true,
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
                  return value + " /-";
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
