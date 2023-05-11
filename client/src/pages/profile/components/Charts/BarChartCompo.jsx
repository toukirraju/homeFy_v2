import React, { useState } from "react";
import "chart.js/auto";
import DatePicker from "react-datepicker";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useColorScheme, useMediaQuery } from "@mantine/hooks";

const BarChartCompo = (props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const colorScheme = useColorScheme();

  const data = {
    labels: [
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
        label: "Total Rent",
        data: props.data.reduce((acc, curr) => {
          const monthIndex = curr.billMonth - 1;
          acc[monthIndex] = curr.totalRent;
          return acc;
        }, Array(12).fill(0)),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Payable Amount",
        data: props.data.reduce((acc, curr) => {
          const monthIndex = curr.billMonth - 1;
          acc[monthIndex] = curr.payableAmount;
          return acc;
        }, Array(12).fill(0)),
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Paid Amount",
        data: props.data.reduce((acc, curr) => {
          const monthIndex = curr.billMonth - 1;
          acc[monthIndex] = curr.paidAmount;
          return acc;
        }, Array(12).fill(0)),
        backgroundColor: "rgba(255, 206, 86, 0.8)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          customInput={<CustomInput />}
          withPortal
          style={customStyles}
          maxDate={new Date()}
          showYearPicker
          dateFormat="MMM-yyyy"
        />
      </div>
      <div>
        <Bar
          data={data}
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
                // display: false,
                labels: {
                  color: colorScheme === "dark" ? "white" : "gray",
                  font: {
                    size: 12,
                  },
                },
              },
              datalabels: {
                color: colorScheme === "dark" ? "white" : "gray",
                labels: {
                  title: {
                    font: {
                      weight: isMobile ? "bold" : "normal",
                      size: isMobile ? 7 : 10,
                    },
                  },
                },
                formatter: function (value, context) {
                  return value + " /-";
                },
                anchor: "start",
                align: "end",
                rotation: isMobile ? -90 : -45,
              },
            },

            scales: {
              x: {
                ticks: { color: colorScheme === "dark" ? "white" : "gray" },
              },
              y: {
                ticks: { color: colorScheme === "dark" ? "white" : "gray" },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChartCompo;

const customStyles = {
  dateInput: {
    background: "lightgray",
    border: "1px solid gray",
    borderRadius: "5px",
  },
  input: {
    color: "gray",
    fontSize: "16px",
    padding: "6px",
    border: "none",
    width: "100%",
    background: "none",
  },
};
const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <button style={customStyles.input} onClick={onClick} ref={ref}>
    {value} 🔰
  </button>
));
