import React, { useEffect } from "react";
import "chart.js/auto";
import { DatePicker } from "@mantine/dates";
import Style from "../../../dashboard/styles/Dashboard.module.css";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";

const BillLineChart = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [date, setDate] = React.useState(new Date());
  // const [startDate, setStartDate] = React.useState(new Date());
  // const { yearlyBills, isPending, isReload } = useSelector(
  //   (state) => state.dashboardData
  // );

  // const year = startDate.getFullYear();

  const handleDateChange = (value) => {
    setDate(value);
  };
  // useEffect(() => {
  //   dispatch(getYearlyBills(year));
  // }, [year, isReload, dispatch]);
  return (
    <div className={`${Style.bar_chart}`}>
      <div>
        <DatePicker
          // className={Style.makeBill__button}
          defaultValue={new Date()}
          placeholder="Pick date"
          dropdownType="modal"
          // withinPortal
          variant="unstyled"
          size="xs"
          inputFormat={"MMMM-YYYY"}
          clearable={false}
          value={date}
          onChange={(value) => handleDateChange(value)}
        />
      </div>
      <div>
        <Line
          data={{
            labels: [
              // "January",
              // "February",
              // "March",
              // "April",
              // "May",
              // "June",
              // "July",
              // "August",
              // "September",
              // "October",
              // "November",
              // "December",
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                label: ["Total"],
                data: [
                  75345, 54562, 83452, 93452, 74235, 84523, 66452, 93424, 2343,
                  // yearlyBills.January,
                  // yearlyBills.February,
                  // yearlyBills.March,
                  // yearlyBills.April,
                  // yearlyBills.May,
                  // yearlyBills.June,
                  // yearlyBills.July,
                  // yearlyBills.August,
                  // yearlyBills.September,
                  // yearlyBills.October,
                  // yearlyBills.November,
                  // yearlyBills.December,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(144, 70, 39, 0.2)",
                  "rgba(204, 201, 51, 0.2)",
                  "rgba(20, 235, 173, 0.2)",
                  "rgba(155, 100, 149, 0.2)",
                  "rgba(66, 252, 158, 0.2)",
                  "rgba(195, 52, 120, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(144, 70, 39, 1)",
                  "rgba(204, 201, 51, 1)",
                  "rgba(20, 235, 173, 1)",
                  "rgba(155, 100, 149, 1)",
                  "rgba(66, 252, 158, 1)",
                  "rgba(195, 52, 120, 1)",
                ],

                borderWidth: 3,
              },
            ],
          }}
          height={180}
          // width={600}
          plugins={[ChartDataLabels]}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            animation: {
              duration: 0,
            },

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
                color: "gray",
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
                anchor: "middel",
                align: "center",
                rotation: isMobile ? -90 : -45,
                // display: function (context) {
                //   return context.dataIndex % 2;
                // },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BillLineChart;
