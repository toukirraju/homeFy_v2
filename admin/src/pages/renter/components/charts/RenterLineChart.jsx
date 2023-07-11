import CustomChart from "../../../../Components/UI/CustomChart";

const RenterLineChart = ({ yearlyData }) => {
  const borderColor = "#4191a5";

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
  return (
    <CustomChart
      type="line"
      labels={Object.keys(yearlyData.yearlyCreatedRenter)}
      data={Object.values(yearlyData.yearlyCreatedRenter)}
      borderColor={borderColor}
      options={options}
    />
  );
};

export default RenterLineChart;
