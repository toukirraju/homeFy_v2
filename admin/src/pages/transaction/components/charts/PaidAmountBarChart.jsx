import CustomChart from "../../../../Components/UI/CustomChart";
import generateRgbaColors from "../../../../utility/genrateRgbaColors";

const PaidAmountBarChart = ({ yearlyPaidAmount }) => {
  const backgroundColor = generateRgbaColors(
    Object.keys(yearlyPaidAmount).length,
    0.4
  );
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
  return (
    <CustomChart
      type="bar"
      labels={Object.keys(yearlyPaidAmount)}
      data={Object.values(yearlyPaidAmount)}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      options={options}
    />
  );
};

export default PaidAmountBarChart;
