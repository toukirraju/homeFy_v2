import CustomChart from "../../../../Components/UI/CustomChart";
import generateRgbaColors from "../../../../utility/genrateRgbaColors";

const RegionalBarChart = () => {
  const labels = [
    "Dhaka",
    "Khulna",
    "Barisal",
    "Sylhet",
    "Rajshahi",
    "Rangpur",
    "Mymensingh",
    "Chittagong",
  ];
  const data = [75345, 54562, 83452, 93452, 74235, 84523, 66452, 93424];
  const backgroundColor = generateRgbaColors(labels.length, 0.4);
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
      labels={labels}
      data={data}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      options={options}
    />
  );
};

export default RegionalBarChart;
