import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
const CustomChart = ({
  type,
  labels,
  data,
  backgroundColor,
  borderColor,
  options,
}) => {
  return (
    <Chart
      type={type}
      data={{
        labels,
        datasets: [{ data, backgroundColor, borderColor, borderWidth: 3 }],
      }}
      plugins={[ChartDataLabels]}
      options={options}
    />
  );
};

export default CustomChart;
