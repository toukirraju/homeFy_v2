import "chart.js/auto";
import DatePicker from "react-datepicker";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React, { useEffect, useState } from "react";

const BarchartLoader = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [dummayData, setDummayData] = useState([
    { name: "Jan", total: 344, payable: 200, paid: 104 },
    { name: "Feb", total: 445, payable: 205, paid: 549 },
    { name: "Mar", total: 645, payable: 505, paid: 349 },
    { name: "Apr", total: 445, payable: 305, paid: 649 },
    { name: "May", total: 544, payable: 500, paid: 349 },
    { name: "Jun", total: 745, payable: 705, paid: 649 },
    { name: "Jan", total: 144, payable: 100, paid: 104 },
    { name: "Feb", total: 445, payable: 205, paid: 549 },
    { name: "Mar", total: 645, payable: 505, paid: 349 },
    { name: "Apr", total: 445, payable: 305, paid: 649 },
    { name: "May", total: 544, payable: 500, paid: 349 },
    { name: "Jun", total: 445, payable: 505, paid: 649 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = dummayData.map((item) => {
        return {
          ...item,
          total: (item.total += Math.floor(Math.random() * 442)),
          payable: (item.payable += Math.floor(Math.random() * 220)),
          paid: (item.paid += Math.floor(Math.random() * 150)),
        };
      });
      setDummayData(newData);
    }, 2000);
    return () => clearInterval(interval);
  }, [dummayData]);

  const data = {
    labels: dummayData.map((dummyItem) => dummyItem.name),

    datasets: [
      {
        label: "Total Rent",
        data: dummayData.map((dummyItem) => dummyItem.total),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Payable Amount",
        data: dummayData.map((dummyItem) => dummyItem.payable),
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Paid Amount",
        data: dummayData.map((dummyItem) => dummyItem.paid),
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
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarchartLoader;

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
