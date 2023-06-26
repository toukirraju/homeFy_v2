import CustomChart from "../../../../Components/UI/CustomChart";
import generateRgbaColors from "../../../../utility/genrateRgbaColors";

const PieChart = ({ labels = [], data = [], type = "pie" }) => {
  const backgroundColor = generateRgbaColors(labels.length, 0.4);
  //   const borderColor = generateRgbaColors(labels.length, 1);

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
              weight: "bold",
            },
          },
        },
        formatter: function (value, context) {
          const label = context.chart.data.labels[context.dataIndex];

          return label;
          // return value + " /-";
        },
        anchor: "end",
        align: "center",
      },
    },
  };

  return (
    <CustomChart
      type={type}
      labels={labels}
      data={data}
      backgroundColor={backgroundColor}
      //   borderColor={borderColor}
      options={options}
    />
  );
};

export default PieChart;
