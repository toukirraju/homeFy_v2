import React, { useEffect, useState } from "react";
import "chart.js/auto";
import DatePicker from "react-datepicker";
import Style from "../../styles/Dashboard.module.css";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";
import { getYearlyBills } from "../../../../redux/slices/dashboardSlice";

const BarChartCompo = (props) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedDate, setSelectedDate] = useState(new Date());

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
        data: Object.values(props.data).map(
          (monthNumber) => monthNumber.totalRent
        ),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Payable Amount",
        data: Object.values(props.data).map(
          (monthNumber) => monthNumber.payableAmount
        ),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Paid Amount",
        data: Object.values(props.data).map(
          (monthNumber) => monthNumber.paidAmount
        ),
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    dispatch(getYearlyBills(selectedDate.getFullYear()));
  }, [selectedDate]);

  return (
    <div className={`${Style.bar_chart}`}>
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
